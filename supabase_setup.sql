-- =============================================================================
-- Setup Supabase untuk menyimpan konten portofolio (Opsi 1: anon key).
--
-- Cara pakai:
--   1. Buka proyek Supabase kamu -> menu "SQL Editor" -> "New query".
--   2. Salin-tempel SELURUH isi file ini, lalu klik "Run".
--   3. Selesai. Isi .env di proyek dengan Project URL + anon key, lalu deploy.
--
-- Model data: satu baris JSONB berisi seluruh konten (id = 1).
-- =============================================================================

-- 1. Tabel penyimpanan konten -------------------------------------------------
create table if not exists public.portfolio (
  id         integer primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. Aktifkan Row Level Security ----------------------------------------------
alter table public.portfolio enable row level security;

-- 3. Kebijakan akses (RLS) ----------------------------------------------------
-- PERINGATAN (Opsi 1): kebijakan di bawah mengizinkan SIAPA PUN dengan anon key
-- untuk membaca DAN menulis. Proteksi tulis hanya berupa password di frontend,
-- sehingga tingkat keamanannya rendah. Cocok untuk portofolio pribadi, bukan
-- data sensitif. Untuk keamanan nyata, gunakan Supabase Auth (Opsi 2).

-- Siapa pun boleh membaca konten (situs publik).
drop policy if exists "portfolio_public_read" on public.portfolio;
create policy "portfolio_public_read"
  on public.portfolio
  for select
  using (true);

-- Siapa pun (anon) boleh menambah baris.
drop policy if exists "portfolio_public_insert" on public.portfolio;
create policy "portfolio_public_insert"
  on public.portfolio
  for insert
  with check (true);

-- Siapa pun (anon) boleh memperbarui baris.
drop policy if exists "portfolio_public_update" on public.portfolio;
create policy "portfolio_public_update"
  on public.portfolio
  for update
  using (true)
  with check (true);
