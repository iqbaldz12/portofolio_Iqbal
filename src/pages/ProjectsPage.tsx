import { motion } from 'framer-motion';
import { Building2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { renderIcon } from '../data/icons';
import { useEffect } from 'react';

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const { content } = useContent();
  const projects = content.projects;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-theme-bg relative z-10 pt-24 pb-24">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-theme-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-theme-muted hover:text-white transition-colors mb-6 font-mono text-sm"
            >
              <ArrowLeft size={16} /> KEMBALI KE BERANDA
            </button>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Semua <span className="gradient-text">Proyek</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary rounded-full mt-4" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative glass rounded-2xl overflow-hidden hover:box-glow-strong hover:border-theme-cardBorderHover transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 group-hover:opacity-70"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/60 to-transparent`} />

                {/* Floating icon */}
                <div className={`absolute top-4 right-4 p-2.5 rounded-xl bg-gradient-to-r ${project.gradient} text-white shadow-lg`}>
                  {renderIcon(project.icon, 20)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 -mt-6 relative">
                <p className="text-theme-purple text-xs font-medium mb-2 flex items-center gap-1">
                  <Building2 size={12} />
                  {project.company}
                </p>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>
                <p className="text-theme-muted text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-theme-purple/10 text-theme-purple border border-theme-purple/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
