import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { renderIcon } from '../../data/icons';

export const Education = () => {
  const { content } = useContent();
  const educationData = content.education;

  return (
    <section id="education" className="py-24 bg-theme-bg relative z-10">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-theme-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-theme-purple text-sm font-mono tracking-widest uppercase">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="glass rounded-2xl p-8 hover:box-glow-strong hover:border-theme-cardBorderHover transition-all duration-500 group relative overflow-hidden"
            >
              {/* Gradient accent top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${edu.gradient}`} />

              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${edu.gradient} text-white mb-5`}>
                {renderIcon(edu.icon, 24)}
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:gradient-text transition-all">
                {edu.school}
              </h3>
              <p className="text-theme-purple text-sm font-medium mb-3">
                {edu.degree}
              </p>
              <p className="text-theme-muted text-sm leading-relaxed mb-4">
                {edu.description}
              </p>

              <div className="flex items-center gap-4 text-theme-muted text-xs">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {edu.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
