import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowUpRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { renderIcon } from '../../data/icons';

export const Contact = () => {
  const { content } = useContent();
  const contactInfo = content.contact.info;
  const socialLinks = content.contact.socials;
  const targetEmail = content.contact.email;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(
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
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-xl p-5 flex items-center gap-4 hover:box-glow hover:border-theme-cardBorderHover transition-all duration-300 group block"
              >
                <div className="p-3 rounded-xl bg-theme-purple/10 text-theme-purple group-hover:bg-theme-purple group-hover:text-white transition-all duration-300">
                  {renderIcon(item.icon, 20)}
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
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl glass text-theme-muted ${social.color} hover:box-glow transition-all duration-300`}
                    aria-label={social.label}
                  >
                    {renderIcon(social.icon, 22)}
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
