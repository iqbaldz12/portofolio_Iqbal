import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { renderIcon } from '../../data/icons';

export const Projects = () => {
  const { content } = useContent();
  const displayedProjects = content.projects.slice(0, 6);

  return (
    <section id="projects" className="py-24 bg-theme-bg relative z-10">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-theme-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-theme-purple text-sm font-mono tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-4" />
          <p className="text-theme-muted mt-6 max-w-xl mx-auto text-sm">
            Berikut beberapa proyek yang pernah saya kerjakan, dari sistem informasi kesehatan hingga aplikasi mobile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full text-theme-purple hover:text-white border border-theme-purple/30 hover:border-theme-purple hover:bg-theme-purple/10 transition-all font-mono tracking-wider group"
          >
            LIHAT SEMUA PROYEK
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
