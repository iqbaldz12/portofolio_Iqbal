import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthed } = useAuth();
  const location = useLocation();

  // Belum login -> selalu arahkan ke halaman login.
  // Simpan lokasi tujuan agar bisa dikembalikan setelah login berhasil.
  if (!isAuthed) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
