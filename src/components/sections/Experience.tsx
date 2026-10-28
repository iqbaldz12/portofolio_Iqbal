import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const Experience = () => {
  const { content } = useContent();
  const experiences = content.experiences;

  return (
    <section id="experience" className="py-24 bg-theme-bg relative z-10">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-theme-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-theme-purple text-sm font-mono tracking-widest uppercase">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-theme-purple/50 via-theme-purple/20 to-transparent" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="relative pl-12 md:pl-20 mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 md:left-6 top-2">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} ring-4 ring-theme-bg`} />
                <div className={`absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} animate-ping opacity-20`} />
              </div>

              {/* Card */}
              <div className="glass rounded-2xl p-6 md:p-8 hover:box-glow hover:border-theme-cardBorderHover transition-all duration-500 group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:gradient-text transition-all">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-theme-purple mt-1">
                      <Briefcase size={14} />
                      <span className="text-sm font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-theme-muted text-xs md:text-sm font-mono shrink-0">
                    <Calendar size={14} />
                    {exp.period}
                  </div>
                </div>

                <p className="text-theme-muted text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-theme-purple/10 text-theme-purple border border-theme-purple/20"
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
    </section>
  );
};
