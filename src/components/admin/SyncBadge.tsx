import { Cloud, CloudOff, Loader2, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

// Menampilkan status sinkronisasi konten dengan Supabase di bagian atas admin.
export const SyncBadge = () => {
  const { syncStatus, lastError, refresh } = useContent();

  const map = {
    loading: { icon: <Loader2 size={14} className="animate-spin" />, text: 'Memuat dari server...', cls: 'text-theme-muted border-theme-cardBorder' },
    saving: { icon: <Loader2 size={14} className="animate-spin" />, text: 'Menyimpan...', cls: 'text-amber-300 border-amber-500/30 bg-amber-500/10' },
    synced: { icon: <CheckCircle2 size={14} />, text: 'Tersinkron dengan server', cls: 'text-green-300 border-green-500/30 bg-green-500/10' },
    error: { icon: <AlertTriangle size={14} />, text: 'Gagal sinkron', cls: 'text-red-300 border-red-500/30 bg-red-500/10' },
    offline: { icon: <CloudOff size={14} />, text: 'Mode lokal (Supabase belum dikonfigurasi)', cls: 'text-theme-muted border-theme-cardBorder' },
  }[syncStatus];

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${map.cls}`}>
        {syncStatus === 'offline' ? <CloudOff size={14} /> : <Cloud size={14} />}
        {map.icon}
        <span>{map.text}</span>
      </div>

      {(syncStatus === 'error' || syncStatus === 'synced') && (
        <button
          onClick={() => void refresh()}
          className="inline-flex items-center gap-1.5 text-xs text-theme-muted hover:text-white transition-colors"
        >
          <RefreshCw size={13} /> Muat ulang
        </button>
      )}

      {syncStatus === 'error' && lastError && (
        <span className="text-red-400/70 text-xs truncate max-w-xs" title={lastError}>
          {lastError}
        </span>
      )}
    </div>
  );
};
