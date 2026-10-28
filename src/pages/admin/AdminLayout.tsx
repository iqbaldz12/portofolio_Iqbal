import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FolderGit2,
  Code2,
  GraduationCap,
  User,
  Mail,
  LogOut,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/admin/hero', label: 'Hero', icon: <User size={18} />, end: false },
  { to: '/admin/about', label: 'About', icon: <User size={18} />, end: false },
  { to: '/admin/experience', label: 'Experience', icon: <Briefcase size={18} />, end: false },
  { to: '/admin/projects', label: 'Projects', icon: <FolderGit2 size={18} />, end: false },
  { to: '/admin/skills', label: 'Skills', icon: <Code2 size={18} />, end: false },
  { to: '/admin/education', label: 'Education', icon: <GraduationCap size={18} />, end: false },
  { to: '/admin/contact', label: 'Contact', icon: <Mail size={18} />, end: false },
];

export const AdminLayout = () => {
  const { logout } = useAuth();
  const { resetAll } = useContent();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Reset semua konten ke data awal? Semua perubahan yang tersimpan akan hilang.',
      )
    ) {
      resetAll();
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-white flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-theme-cardBorder bg-theme-bgSecondary/40 backdrop-blur-xl flex flex-col fixed h-screen">
        <div className="p-6 border-b border-theme-cardBorder">
          <span className="text-xl font-bold tracking-wider">
            <span className="gradient-text">&lt;</span>
            <span className="text-white">Admin</span>
            <span className="gradient-text"> /&gt;</span>
          </span>
          <p className="text-theme-muted text-xs mt-1">Content Manager</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-theme-purple/15 text-white border border-theme-purple/30'
                    : 'text-theme-muted hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-theme-cardBorder space-y-1">
          <a
            href={import.meta.env.BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-theme-muted hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink size={18} />
            Lihat Situs
          </a>
          <button
            onClick={handleReset}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
          >
            <RotateCcw size={18} />
            Reset ke Default
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8 max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
};
