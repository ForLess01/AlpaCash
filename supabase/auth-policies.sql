-- ============================================================
-- AlpaCash · Auth Trigger + Row Level Security Policies
-- Ejecutar en Supabase SQL Editor DESPUÉS de foundation.sql.
-- ============================================================
-- Este archivo es IDEMPOTENTE: se puede correr varias veces.
-- Usa `drop ... if exists` antes de cada `create` para evitar conflictos.
-- ============================================================
--
-- CANONICAL ROLE SET (aligned with foundation.sql):
--   productor · empresa · financiera · admin
--   "comprador" es un alias de capa de aplicación para "empresa".
--   Internamente la DB solo conoce 'empresa'. El rol 'capacitador'
--   está DEPRECADO — no se otorga acceso en ninguna política.
--
-- PROFILE CREATION PATHS:
--   A) Traditional signup (email+password): raw_user_meta_data includes
--      the role. This trigger creates the profiles row only.
--      The role-specific row (productores/empresas/entidades_financieras)
--      is created atomically via the create_profile_with_role RPC when
--      the user completes the onboarding wizard.
--   B) OAuth (Google): trigger does nothing (no role in metadata).
--      CompleteProfileForm calls create_profile_with_role RPC which
--      creates BOTH the profiles row AND the role-specific row atomically.
-- ============================================================


-- ------------------------------------------------------------
-- 1) TRIGGER: AUTO-CREAR PROFILE AL REGISTRARSE (traditional path)
-- ------------------------------------------------------------
-- Cuando un usuario nuevo se crea en auth.users (via signUp del cliente),
-- creamos automáticamente su row en public.profiles tomando el rol
-- desde raw_user_meta_data->>'role' que el frontend envía en signUp options.
--
-- NOTE: auth.uid() is NULL in trigger context, so we cannot call
-- create_profile_with_role RPC here (it requires auth.uid()). This
-- trigger handles the profiles row for traditional signup. The
-- role-specific row is created by create_profile_with_role at the
-- app layer (wizard completion step).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    chosen_role text := new.raw_user_meta_data->>'role';
begin
    -- Si no hay rol en el metadata (caso OAuth/Google), NO creamos profile.
    -- El cliente debe redirigir al usuario a /auth/complete-profile y crear
    -- su profile + tabla rol-específica a través del RPC create_profile_with_role.
    if chosen_role is null then
        return new;
    end if;

    -- Validar que el rol sea canónico antes de persistirlo.
    -- 'capacitador' y otros roles no canónicos se ignoran.
    if chosen_role not in ('productor', 'empresa', 'financiera', 'admin') then
        return new;
    end if;

    -- Signup tradicional (email + password con wizard): el frontend envía
    -- el rol en options.data, lo persistimos automáticamente.
    -- La fila en productores/empresas/entidades_financieras se crea
    -- via create_profile_with_role desde el paso de completar el perfil.
    insert into public.profiles (id, nombre, email, rol, telefono, avatar_url)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', new.email),
        new.email,
        chosen_role,
        new.raw_user_meta_data->>'phone',
        new.raw_user_meta_data->>'avatar_url'
    )
    on conflict (id) do nothing;  -- safe if RPC already created the row
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();


-- ------------------------------------------------------------
-- 2) ENABLE ROW LEVEL SECURITY
-- ------------------------------------------------------------
alter table profiles                enable row level security;
alter table productores             enable row level security;
alter table empresas                enable row level security;
alter table entidades_financieras   enable row level security;
alter table lotes_fibra             enable row level security;
alter table fotos_lote              enable row level security;
alter table solicitudes_compra      enable row level security;
alter table mensajes_solicitud      enable row level security;
alter table transacciones           enable row level security;
alter table validaciones_productor  enable row level security;
alter table calificaciones          enable row level security;
alter table evaluaciones_crediticias enable row level security;
alter table notificaciones          enable row level security;


-- ------------------------------------------------------------
-- 3) PROFILES
-- ------------------------------------------------------------
drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own"
    on profiles for select
    using (auth.uid() = id);

-- Necesario para OAuth flow: el trigger no crea profile si no hay role
-- en metadata, así que el cliente debe insertarlo desde /auth/complete-profile.
drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own"
    on profiles for insert
    with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own"
    on profiles for update
    using (auth.uid() = id);

drop policy if exists "profiles_admin_select_all" on profiles;
create policy "profiles_admin_select_all"
    on profiles for select
    using ( public.is_admin() );


-- ------------------------------------------------------------
-- 4) PRODUCTORES
-- ------------------------------------------------------------
drop policy if exists "productores_insert_own" on productores;
create policy "productores_insert_own"
    on productores for insert
    with check (auth.uid() = profile_id);

drop policy if exists "productores_select_authenticated" on productores;
create policy "productores_select_authenticated"
    on productores for select
    to authenticated
    using (true);

drop policy if exists "productores_update_own" on productores;
create policy "productores_update_own"
    on productores for update
    using (auth.uid() = profile_id);


-- ------------------------------------------------------------
-- 5) EMPRESAS
-- ------------------------------------------------------------
drop policy if exists "empresas_insert_own" on empresas;
create policy "empresas_insert_own"
    on empresas for insert
    with check (auth.uid() = profile_id);

drop policy if exists "empresas_select_own" on empresas;
create policy "empresas_select_own"
    on empresas for select
    using (auth.uid() = profile_id);

drop policy if exists "empresas_update_own" on empresas;
create policy "empresas_update_own"
    on empresas for update
    using (auth.uid() = profile_id);


-- ------------------------------------------------------------
-- 6) ENTIDADES FINANCIERAS
-- ------------------------------------------------------------
drop policy if exists "financiera_insert_own" on entidades_financieras;
create policy "financiera_insert_own"
    on entidades_financieras for insert
    with check (auth.uid() = profile_id);

drop policy if exists "financiera_select_own" on entidades_financieras;
create policy "financiera_select_own"
    on entidades_financieras for select
    using (auth.uid() = profile_id);

drop policy if exists "financiera_update_own" on entidades_financieras;
create policy "financiera_update_own"
    on entidades_financieras for update
    using (auth.uid() = profile_id);


-- ------------------------------------------------------------
-- 7) LOTES_FIBRA
-- ------------------------------------------------------------
drop policy if exists "lotes_productor_manage" on lotes_fibra;
create policy "lotes_productor_manage"
    on lotes_fibra for all
    using (productor_id in (select id from productores where profile_id = auth.uid()))
    with check (productor_id in (select id from productores where profile_id = auth.uid()));

drop policy if exists "lotes_authenticated_read" on lotes_fibra;
create policy "lotes_authenticated_read"
    on lotes_fibra for select
    to authenticated
    using (true);


-- ------------------------------------------------------------
-- 8) NOTIFICACIONES (cada usuario solo las suyas)
-- ------------------------------------------------------------
drop policy if exists "notif_select_own" on notificaciones;
create policy "notif_select_own"
    on notificaciones for select
    using (profile_id = auth.uid());

drop policy if exists "notif_update_own" on notificaciones;
create policy "notif_update_own"
    on notificaciones for update
    using (profile_id = auth.uid());


-- ============================================================
-- FIN
-- ============================================================
-- Después de correr foundation.sql y luego este archivo:
-- 1. Cualquier signUp via frontend creará profile automáticamente.
-- 2. OAuth/Google users van a /auth/complete-profile → RPC atómico.
-- 3. RLS está activo: usuarios solo ven/modifican sus propios datos.
-- 4. Admins pueden ver todos los profiles.
-- 5. Marketplace de lotes es visible para cualquier authenticated.
-- 6. Roles canónicos: productor, empresa, financiera, admin.
--    "capacitador" está deprecado y no tiene acceso.
-- ============================================================
