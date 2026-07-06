import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    skills: [
      { name: 'PHP', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', color: '#777BB4' },
      { name: 'Laravel', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', color: '#FF2D20' },
      { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
      { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: '#3178C6' },
      { name: 'Vue.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', color: '#4FC08D' },
      { name: 'Nuxt.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg', color: '#00DC82' },
      { name: 'AngularJS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg', color: '#DD0031' },
      { name: 'HTML', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', color: '#E34F26' },
      { name: 'CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', color: '#1572B6' },
      { name: 'Tailwind', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
      { name: 'Bootstrap', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', color: '#7952B3' },
    ],
  },
  {
    title: 'Database & Tools',
    skills: [
      { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', color: '#4479A1' },
      { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', color: '#F05032' },
      { name: 'REST API', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: '#a855f7' },
      { name: 'Postman', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', color: '#FF6C37' },
    ],
  },
];

export const Skills = () => {
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
              key={catIdx}
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
                    key={idx}
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
