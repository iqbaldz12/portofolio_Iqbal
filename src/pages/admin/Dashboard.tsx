import { Link } from 'react-router-dom';
import { Briefcase, FolderGit2, Code2, GraduationCap, User, Mail } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { SectionTitle } from '../../components/admin/ui';

export const Dashboard = () => {
  const { content } = useContent();

  const skillsCount = content.skillCategories.reduce((n, c) => n + c.skills.length, 0);

  const stats = [
    { label: 'Experience', count: content.experiences.length, to: '/admin/experience', icon: <Briefcase size={20} />, color: 'from-purple-500 to-pink-500' },
    { label: 'Projects', count: content.projects.length, to: '/admin/projects', icon: <FolderGit2 size={20} />, color: 'from-cyan-500 to-blue-500' },
    { label: 'Skills', count: skillsCount, to: '/admin/skills', icon: <Code2 size={20} />, color: 'from-emerald-500 to-teal-500' },
    { label: 'Education', count: content.education.length, to: '/admin/education', icon: <GraduationCap size={20} />, color: 'from-orange-500 to-red-500' },
    { label: 'Personal Info', count: content.about.personalInfo.length, to: '/admin/about', icon: <User size={20} />, color: 'from-violet-500 to-purple-600' },
    { label: 'Contact Items', count: content.contact.info.length + content.contact.socials.length, to: '/admin/contact', icon: <Mail size={20} />, color: 'from-blue-500 to-indigo-500' },
  ];

  return (
    <div>
      <SectionTitle
        title="Dashboard"
        subtitle="Kelola semua konten portofolio. Perubahan tersimpan otomatis di browser."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="glass rounded-xl p-5 border border-theme-cardBorder hover:border-theme-purple/40 hover:box-glow transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl bg-gradient-to-r ${s.color} text-white`}>
                {s.icon}
              </div>
              <span className="text-3xl font-bold text-white">{s.count}</span>
            </div>
            <p className="text-theme-muted text-sm mt-4 group-hover:text-white transition-colors">
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="glass rounded-xl p-6 border border-theme-cardBorder mt-6">
        <h3 className="text-white font-semibold mb-2">Catatan</h3>
        <p className="text-theme-muted text-sm leading-relaxed">
          Semua konten disimpan di penyimpanan lokal browser (localStorage). Data awal
          tetap tersedia dan bisa dikembalikan kapan saja lewat tombol{' '}
          <span className="text-amber-400">Reset ke Default</span> di sidebar. Perubahan
          bersifat per-browser; untuk mempublikasikan secara permanen ke semua pengunjung,
          konten perlu dihubungkan ke backend/database.
        </p>
      </div>
    </div>
  );
};
