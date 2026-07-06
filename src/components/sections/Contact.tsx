import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const contactInfo = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'iqbaldzulkarnaen12@gmail.com',
    href: 'mailto:iqbaldzulkarnaen12@gmail.com',
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: '0851-5695-4817',
    href: 'tel:+6285156954817',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: 'Banjaran, Kab. Bandung',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: <GithubIcon />,
    label: 'GitHub',
    href: 'https://github.com/iqbaldz12/',
    color: 'hover:text-white',
  },
  {
    icon: <LinkedinIcon />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhamad-iqbal-dzulkarnaen',
    color: 'hover:text-blue-400',
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    href: 'mailto:iqbaldzulkarnaen12@gmail.com',
    color: 'hover:text-theme-purple',
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:iqbaldzulkarnaen12@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-theme-bg relative z-10">
      {/* Ambient glows */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-theme-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-theme-pink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-theme-purple text-sm font-mono tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-4" />
          <p className="text-theme-muted mt-6 max-w-xl mx-auto text-sm">
            Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya melalui form di bawah atau media sosial.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact cards */}
            {contactInfo.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-xl p-5 flex items-center gap-4 hover:box-glow hover:border-theme-cardBorderHover transition-all duration-300 group block"
              >
                <div className="p-3 rounded-xl bg-theme-purple/10 text-theme-purple group-hover:bg-theme-purple group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-theme-muted">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-6"
            >
              <h4 className="text-sm font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl glass text-theme-muted ${social.color} hover:box-glow transition-all duration-300`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-theme-muted mb-2 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-theme-cardBorder text-white text-sm placeholder-theme-muted/50 focus:outline-none focus:border-theme-purple/50 focus:ring-1 focus:ring-theme-purple/30 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-theme-muted mb-2 block">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-theme-cardBorder text-white text-sm placeholder-theme-muted/50 focus:outline-none focus:border-theme-purple/50 focus:ring-1 focus:ring-theme-purple/30 transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-theme-muted mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-theme-cardBorder text-white text-sm placeholder-theme-muted/50 focus:outline-none focus:border-theme-purple/50 focus:ring-1 focus:ring-theme-purple/30 transition-all"
                  placeholder="Project Discussion"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-theme-muted mb-2 block">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-theme-cardBorder text-white text-sm placeholder-theme-muted/50 focus:outline-none focus:border-theme-purple/50 focus:ring-1 focus:ring-theme-purple/30 transition-all resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-theme-purple/25 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-theme-cardBorder text-center"
        >
          <p className="text-theme-muted text-sm">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-white font-medium">Muhamad Iqbal Dzulkarnaen</span>.
            All rights reserved.
          </p>
          <p className="text-theme-muted/50 text-xs mt-2">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
};
