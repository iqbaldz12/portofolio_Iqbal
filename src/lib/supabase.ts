import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { PortfolioContent } from '../data/types';

// Kredensial dibaca dari environment Vite (.env). Jika belum diisi, aplikasi
// tetap berjalan dengan data default/cache lokal (mode offline).
const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// True hanya jika kedua nilai ada dan terlihat valid.
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

// Seluruh konten disimpan sebagai satu baris pada tabel "portfolio" dengan
// id tetap = 1 dan kolom "data" (JSONB). Pendekatan baris-tunggal ini paling
// sederhana dan langsung cocok dengan struktur PortfolioContent di frontend.
const TABLE = 'portfolio';
const ROW_ID = 1;

// Ambil konten dari Supabase. Mengembalikan null jika belum ada baris
// atau Supabase belum dikonfigurasi. Melempar error jika query gagal.
export const fetchContent = async (): Promise<PortfolioContent | null> => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select('data')
    .eq('id', ROW_ID)
    .maybeSingle();

  if (error) throw error;
  return (data?.data as PortfolioContent) ?? null;
};

// Simpan (upsert) seluruh konten ke Supabase. Melempar error jika gagal.
export const saveContent = async (content: PortfolioContent): Promise<void> => {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: content, updated_at: new Date().toISOString() });

  if (error) throw error;
};
