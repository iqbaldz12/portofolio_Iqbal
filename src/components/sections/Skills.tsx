import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';

export const Skills = () => {
  const { content } = useContent();
  const skillCategories = content.skillCategories;

  return (
    <section id="skills" className="py-24 bg-theme-bg relative z-10">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-theme-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-theme-purple text-sm font-mono tracking-widest uppercase">
            What I Know
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-theme-purple" />
                {category.title}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="glass rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:box-glow hover:border-theme-cardBorderHover transition-all duration-300 group cursor-default h-full"
                  >
                    <div className="w-12 h-12 flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        className="w-full h-full object-contain drop-shadow-md"
                        onError={(e) => {
                          // Fallback to initial letter if image fails to load
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div
                        className="hidden w-full h-full items-center justify-center text-2xl font-bold text-white rounded-full bg-white/5"
                        style={{ color: skill.color }}
                      >
                        {skill.name.charAt(0)}
                      </div>
                    </div>

                    <span className="text-sm font-medium text-theme-muted group-hover:text-white transition-colors text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
