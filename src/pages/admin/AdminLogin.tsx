import { useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Btn, Field, TextInput } from '../../components/admin/ui';

export const AdminLogin = () => {
  const { isAuthed, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Tujuan setelah login: kembali ke halaman yang tadi ingin diakses,
  // atau ke dashboard admin jika langsung membuka halaman login.
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/admin';

  // Kalau sudah login, jangan tampilkan halaman login lagi.
  if (isAuthed) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate(from, { replace: true });
    } else {
      setError('Password salah. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-theme-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <form
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-8 w-full max-w-sm relative z-10 border border-theme-cardBorder"
      >
        <div className="flex flex-col items-center mb-7">
          <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-theme-muted text-sm mt-1">Masuk untuk mengelola konten</p>
        </div>

        <div className="space-y-4">
          <Field label="Password">
            <TextInput
              type="password"
              value={password}
              autoFocus
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
            />
          </Field>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <Btn type="submit" className="w-full">
            Masuk
          </Btn>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-theme-muted text-xs mt-5 w-full text-center hover:text-white transition-colors"
        >
          ← Kembali ke beranda
        </button>
      </form>
    </div>
  );
};
