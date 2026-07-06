import { motion } from 'framer-motion';
import { MapPin, Calendar, Mail, Phone, User, GraduationCap } from 'lucide-react';

const personalInfo = [
  { icon: <MapPin size={18} />, label: 'Location', value: 'Bandung, Indonesia' },
  { icon: <Calendar size={18} />, label: 'Birth Date', value: '05 Oktober 2003' },
  { icon: <Mail size={18} />, label: 'Email', value: 'iqbaldzulkarnaen12@gmail.com' },
  { icon: <Phone size={18} />, label: 'Phone', value: '0851-5695-4817' },
  { icon: <User size={18} />, label: 'Status', value: 'Belum Menikah' },
  { icon: <GraduationCap size={18} />, label: 'Education', value: 'S1 Teknik Informatika' },
];

export const About = () => {
  return (
    <section id="about" className="py-24 bg-theme-bg relative z-10">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-theme-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-theme-purple text-sm font-mono tracking-widest uppercase">Get to know me</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-theme-purple/20 flex items-center justify-center text-theme-purple">
                  <User size={16} />
                </span>
                Tentang Saya
              </h3>
              <p className="text-theme-muted leading-relaxed text-sm md:text-base">
                Saya seorang mahasiswa yang berambisi untuk meningkatkan keterampilan
                dan memperoleh pengalaman di dunia kerja. Saat ini, saya sedang
                membangun dasar sebagai seorang web developer, dengan passion yang
                besar dalam dunia pemrograman.
              </p>
              <p className="text-theme-muted leading-relaxed text-sm md:text-base mt-4">
                Saya sangat antusias untuk terus belajar, berkembang, dan memberikan
                kontribusi yang berarti. Berpengalaman di pengembangan Full-Stack
                dengan fokus pada Laravel, Vue.js, dan sistem informasi manajemen.
              </p>
            </div>

            {/* Code snippet decoration */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 font-mono text-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-theme-muted text-xs ml-2">about.ts</span>
              </div>
              <pre className="text-xs md:text-sm overflow-x-auto">
                <code>
                  <span className="text-theme-purple">const</span>{' '}
                  <span className="text-theme-cyan">developer</span> = {'{\n'}
                  {'  '}<span className="text-theme-pink">name</span>:{' '}
                  <span className="text-green-400">"Muhamad Iqbal"</span>,{'\n'}
                  {'  '}<span className="text-theme-pink">role</span>:{' '}
                  <span className="text-green-400">"Full-Stack Developer"</span>,{'\n'}
                  {'  '}<span className="text-theme-pink">location</span>:{' '}
                  <span className="text-green-400">"Bandung, ID"</span>,{'\n'}
                  {'  '}<span className="text-theme-pink">passion</span>:{' '}
                  <span className="text-green-400">"Building great software"</span>,{'\n'}
                  {'}'};
                </code>
              </pre>
            </motion.div>
          </motion.div>

          {/* Personal Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {personalInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-xl p-5 hover:box-glow hover:border-theme-cardBorderHover transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-theme-purple/10 text-theme-purple group-hover:bg-theme-purple/20 transition-colors">
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-theme-muted mb-1">{info.label}</p>
                    <p className="text-sm text-white font-medium break-all">{info.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
