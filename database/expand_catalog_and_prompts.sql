begin;
alter table public.salas add column if not exists consignas text[] not null default array[]::text[];
alter table public.salas add column if not exists consigna_version integer not null default 0;
CREATE OR REPLACE FUNCTION duelo_privado.jugar(p_accion text, p_codigo text, p_nombre text, p_valor text, p_ronda integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  s public.salas;
  yo public.participantes;
  destino public.propuestas;

  cantidad integer;
  v_nombre text := trim(coalesce(p_nombre, ''));
  v_codigo text := upper(trim(coalesce(p_codigo, '')));

  participantes_json jsonb;
  propuestas_json jsonb;

  votos_actuales integer;
  seleccionados integer;
  ya_vote boolean;
  error_juego text;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar una sesión.';
  end if;

  if p_accion is null or p_accion not in (
    'crear',
    'unirse',
    'consultar',
    'iniciar',
    'elegir',
    'votar',
    'salir',
    'cambiar_consigna'
  ) then
    raise exception 'Acción no válida.';
  end if;

  if p_accion in ('crear', 'unirse') then
    if char_length(v_nombre) not between 1 and 20 then
      raise exception
        'Escribe un sobrenombre de 1 a 20 caracteres.';
    end if;
  end if;

  -- -------------------------------------------------------
  -- CREAR SALA
  -- -------------------------------------------------------

  if p_accion = 'crear' then
    -- Serializa la creación de salas del mismo usuario.
    perform pg_advisory_xact_lock(
      hashtextextended(auth.uid()::text, 0)
    );

    select count(*) into cantidad
    from public.salas sa
    where sa.anfitrion_id = auth.uid()
      and sa.creada_en > now() - interval '1 day';

    if cantidad >= 10 then
      raise exception
        'Límite del demo: 10 salas por día por jugador.';
    end if;

    loop
      v_codigo := upper(
        substr(
          replace(gen_random_uuid()::text, '-', ''),
          1,
          6
        )
      );

      begin
        insert into public.salas (
          codigo,
          anfitrion_id
        )
        values (
          v_codigo,
          auth.uid()
        )
        returning * into s;

        exit;
      exception when unique_violation then
        -- Si el código ya existe, se genera otro.
      end;
    end loop;

    insert into public.participantes (
      sala_id,
      usuario_id,
      sobrenombre
    )
    values (
      s.id,
      auth.uid(),
      v_nombre
    )
    returning * into yo;

  else
    -- -----------------------------------------------------
    -- LOCALIZAR SALA Y PARTICIPANTE
    -- -----------------------------------------------------

    select sa.* into s
    from public.salas sa
    where sa.codigo = v_codigo
    for update;

    if not found then
      raise exception
        'Código incorrecto. Revisa la sala.';
    end if;

    select p.* into yo
    from public.participantes p
    where p.sala_id = s.id
      and p.usuario_id = auth.uid();

    -- -----------------------------------------------------
    -- UNIRSE A UNA SALA
    -- -----------------------------------------------------

    if p_accion = 'unirse' and yo.id is null then
      if s.estado <> 'espera' then
        raise exception 'La partida ya comenzó.';
      end if;

      select count(*) into cantidad
      from public.participantes p
      where p.sala_id = s.id;

      if cantidad >= 6 then
        raise exception
          'La sala está llena: máximo 6 jugadores.';
      end if;

      if exists (
        select 1
        from public.participantes p
        where p.sala_id = s.id
          and lower(trim(p.sobrenombre)) = lower(v_nombre)
      ) then
        raise exception
          'Ese sobrenombre ya está ocupado.';
      end if;

      insert into public.participantes (
        sala_id,
        usuario_id,
        sobrenombre
      )
      values (
        s.id,
        auth.uid(),
        v_nombre
      )
      returning * into yo;
    end if;

    if yo.id is null then
      raise exception
        'Primero debes unirte a esta sala.';
    end if;
  end if;

  -- La lista se baraja una sola vez por sala y es compartida por todos.
  if cardinality(s.consignas) = 0 then
    update public.salas sa set consignas = (
      select array_agg(tema order by random()) from unnest(array['Una canción para animar una fiesta','Una canción para un viaje con amigos','Una canción para cantar a todo pulmón','Una canción que te recuerde al colegio','Una canción para superar un desamor','Una canción para dedicar a alguien especial','Una canción que te ponga de buen humor','Una canción para entrenar con energía','Una canción para una noche de karaoke','Una canción para bailar sin vergüenza','Una canción para un día de lluvia','Una canción que pondrías al ganar un premio','Una canción para mirar el atardecer','Una canción que te recuerde a tu infancia','Una canción para una escena de película','Una canción para celebrar con tu familia','Una canción para empezar de nuevo','Una canción para un concierto con amigos']) as b(tema)
    ) where sa.id = s.id returning sa.* into s;
  end if;

  -- Verificar etapa y tiempo antes de aceptar acciones.
  s := duelo_privado.avanzar(s.id);

  -- -------------------------------------------------------
  -- INICIAR PARTIDA
  -- -------------------------------------------------------

  if p_accion = 'iniciar' then
    if s.anfitrion_id <> auth.uid() then
      error_juego :=
        'Solo el anfitrión puede iniciar.';

    elsif s.estado <> 'espera' then
      error_juego :=
        'La partida ya comenzó.';

    else
      select count(*) into cantidad
      from public.participantes p
      where p.sala_id = s.id;

      if cantidad < 3 then
        error_juego :=
          'Se necesitan al menos 3 jugadores.';
      else
        update public.salas sa
        set estado = 'seleccion',
            ronda = 1,
            fin_etapa = null
        where sa.id = s.id
        returning sa.* into s;
      end if;
    end if;

  -- -------------------------------------------------------
  -- ELEGIR CANCIÓN
  -- -------------------------------------------------------

  elsif p_accion = 'cambiar_consigna' then
    if s.anfitrion_id <> auth.uid() then
      error_juego := 'Solo el anfitrión puede cambiar la consigna.';
    elsif s.estado not in ('espera','seleccion') or p_ronda is distinct from s.ronda then
      error_juego := 'La consigna solo puede cambiarse antes de elegir canciones.';
    elsif p_nombre is distinct from s.consigna_version::text then
      error_juego := 'La consigna ya cambió. Revisa la nueva pregunta.';
    elsif exists (select 1 from public.propuestas pr where pr.sala_id=s.id and pr.ronda=s.ronda) then
      error_juego := 'Alguien ya eligió. La consigna queda fija hasta terminar la ronda.';
    else
      update public.salas sa set consignas = coalesce(sa.consignas[1:greatest(s.ronda,1)-1],array[]::text[]) || sa.consignas[greatest(s.ronda,1)+1:cardinality(sa.consignas)] || sa.consignas[greatest(s.ronda,1):greatest(s.ronda,1)], consigna_version=sa.consigna_version+1 where sa.id=s.id returning sa.* into s;
    end if;

  elsif p_accion = 'elegir' then
    if p_ronda is distinct from s.ronda
      or s.estado <> 'seleccion' then

      error_juego :=
        'La selección de esta ronda ya terminó.';

    elsif p_nombre is distinct from s.consigna_version::text then
      error_juego := 'La consigna cambió. Revisa la nueva pregunta y vuelve a elegir.';
    elsif p_valor is null or p_valor !~ '^c(0[1-9]|[1-3][0-9]|4[0-8])$' then
      error_juego :=
        'Selecciona una canción del catálogo.';

    elsif exists (
      select 1
      from public.propuestas pr
      where pr.sala_id = s.id
        and pr.ronda = s.ronda
        and pr.participante_id = yo.id
    ) then
      error_juego :=
        'Ya enviaste una canción en esta ronda.';

    elsif exists (
      select 1
      from public.propuestas pr
      where pr.sala_id = s.id
        and pr.ronda = s.ronda
        and pr.cancion_id = p_valor
    ) then
      error_juego :=
        'Alguien ya eligió esa canción. Escoge otra.';

    else
      insert into public.propuestas (
        sala_id,
        participante_id,
        ronda,
        cancion_id
      )
      values (
        s.id,
        yo.id,
        s.ronda,
        p_valor
      );
    end if;

  -- -------------------------------------------------------
  -- VOTAR
  -- -------------------------------------------------------

  elsif p_accion = 'votar' then
    if p_ronda is distinct from s.ronda
      or s.estado <> 'votacion' then

      error_juego :=
        'La votación de esta ronda ya terminó.';

    elsif clock_timestamp() >= s.fin_etapa then
      error_juego :=
        'El tiempo para votar terminó.';

    elsif exists (
      select 1
      from public.votos v
      where v.sala_id = s.id
        and v.ronda = s.ronda
        and v.votante_id = yo.id
    ) then
      error_juego :=
        'Ya votaste en esta ronda.';

    else
      select pr.* into destino
      from public.propuestas pr
      where pr.sala_id = s.id
        and pr.ronda = s.ronda
        and pr.id::text = p_valor;

      if destino.id is null then
        error_juego :=
          'La propuesta no existe en esta ronda.';

      elsif destino.participante_id = yo.id then
        error_juego :=
          'No puedes votar por tu propia canción.';

      else
        insert into public.votos (
          sala_id,
          ronda,
          votante_id,
          propuesta_id
        )
        values (
          s.id,
          s.ronda,
          yo.id,
          destino.id
        );
      end if;
    end if;

  -- -------------------------------------------------------
  -- SALIR
  -- -------------------------------------------------------

  elsif p_accion = 'salir' then
    if s.estado = 'espera' then

      if s.anfitrion_id = auth.uid() then
        select count(*) into cantidad
        from public.participantes p
        where p.sala_id = s.id;

        if cantidad > 1 then
          error_juego :=
            'Como anfitrión, espera a que salgan los demás.';
        else
          delete from public.participantes p
          where p.id = yo.id;

          delete from public.salas sa
          where sa.id = s.id;

          return jsonb_build_object('salio', true);
        end if;

      else
        delete from public.participantes p
        where p.id = yo.id;

        return jsonb_build_object('salio', true);
      end if;

    elsif s.estado = 'finalizada' then
      return jsonb_build_object('salio', true);

    else
      error_juego :=
        'La partida está en curso. Puedes recargar para reconectarte.';
    end if;
  end if;

  -- Avanzar si todos eligieron o todos votaron.
  s := duelo_privado.avanzar(s.id);

  -- -------------------------------------------------------
  -- CONTADORES
  -- -------------------------------------------------------

  select count(*) into seleccionados
  from public.propuestas pr
  where pr.sala_id = s.id
    and pr.ronda = s.ronda;

  select count(*) into votos_actuales
  from public.votos v
  where v.sala_id = s.id
    and v.ronda = s.ronda;

  select exists (
    select 1
    from public.votos v
    where v.sala_id = s.id
      and v.ronda = s.ronda
      and v.votante_id = yo.id
  ) into ya_vote;

  -- -------------------------------------------------------
  -- PARTICIPANTES Y PUNTOS
  -- Solo se cuentan rondas cerradas.
  -- -------------------------------------------------------

  select coalesce(
    jsonb_agg(
      to_jsonb(t)
      order by t.puntos desc, t.nombre
    ),
    '[]'::jsonb
  )
  into participantes_json
  from (
    select
      p.id,
      p.sobrenombre as nombre,
      p.id = yo.id as soy_yo,
      p.usuario_id = s.anfitrion_id as anfitrion,
      (
        select count(*)
        from public.votos v
        join public.propuestas pr
          on pr.id = v.propuesta_id
        where pr.participante_id = p.id
          and pr.sala_id = s.id
          and (
            pr.ronda < s.ronda
            or s.estado in (
              'resultados',
              'finalizada'
            )
          )
      ) as puntos
    from public.participantes p
    where p.sala_id = s.id
  ) t;

  -- -------------------------------------------------------
  -- PROPUESTAS
  -- Se ocultan autores y puntajes durante la votación.
  -- -------------------------------------------------------

  select coalesce(
    jsonb_agg(
      to_jsonb(t)
      order by t.id
    ),
    '[]'::jsonb
  )
  into propuestas_json
  from (
    select
      pr.id,
      pr.cancion_id,
      pr.participante_id = yo.id as mia,

      case
        when s.estado in ('resultados', 'finalizada')
        then p.sobrenombre
        else null
      end as autor,

      case
        when s.estado in ('resultados', 'finalizada')
        then (
          select count(*)
          from public.votos v
          where v.propuesta_id = pr.id
        )
        else null
      end as puntos

    from public.propuestas pr
    join public.participantes p
      on p.id = pr.participante_id

    where pr.sala_id = s.id
      and pr.ronda = s.ronda
      and (
        s.estado <> 'seleccion'
        or pr.participante_id = yo.id
      )
  ) t;

  -- -------------------------------------------------------
  -- RESPUESTA PARA LA INTERFAZ
  -- -------------------------------------------------------

  return jsonb_build_object(
    'codigo', s.codigo,
    'estado', s.estado,
    'ronda', s.ronda,
    'consigna', s.consignas[greatest(s.ronda,1)],
    'consigna_version', s.consigna_version,
    'fin_etapa', s.fin_etapa,
    'servidor', clock_timestamp(),
    'soy_anfitrion', s.anfitrion_id = auth.uid(),
    'participantes', participantes_json,
    'propuestas', propuestas_json,
    'seleccionados', seleccionados,
    'votos', votos_actuales,
    'ya_vote', ya_vote,
    'error', error_juego
  );
end;
$function$;
notify pgrst, 'reload schema';
commit;