import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TermIcon } from 'lucide-react';

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  whoami      - About me
  skills      - My tech skills
  experience  - Work experience
  education   - Academic background
  projects    - Project list
  contact     - Contact info
  social      - Social links
  clear       - Clear terminal
  help        - Show this help`,

  whoami: `╔══════════════════════════════════════════╗
║  Muhamad Iqbal Dzulkarnaen              ║
║  Full-Stack Developer & Backend Engineer║
║  Based in Bandung, Indonesia            ║
╚══════════════════════════════════════════╝

Passionate web developer with experience in
building healthcare systems, management apps,
and web platforms using Laravel & Vue.js.`,

  skills: `🔧 Languages & Frameworks:
   PHP · Laravel · JavaScript · TypeScript
   Vue.js · Nuxt.js · AngularJS
   HTML · CSS · Tailwind · Bootstrap

🛢️ Database & Tools:
   MySQL · Git · REST API · Postman`,

  experience: `📋 Work Experience:

  [1] PT. Jasamedika Saranatama
      └─ Full-stack Developer (Des 2025 - Jun 2026)
      └─ Klinik & SIMRS development

  [2] CV NIKENSHA NIAGA NUSANTARA
      └─ Backend Developer (Okt 2024 - Mar 2025)
      └─ Laravel API & database optimization

  [3] PT Someah Kreatif Nusantara
      └─ Fullstack Developer (Jan 2024 - Apr 2024)
      └─ Laravel web development`,

  education: `🎓 Education:

  [1] STMIK "AMIKBANDUNG"
      └─ S1 Teknik Informatika (2021-2025)

  [2] SMKN 7 Baleendah
      └─ SMK (2018-2021)`,

  projects: `📁 Projects:

  • Klinik Jasamedika
  • SIMRS Jasamedika Saranatama
  • SIMAPRO PT.Someah
  • Website Presensi SOMEAH
  • Website Tiket Customer Service
  • Mobile App Absensi SMP UPI Cibiru
  • Website Hello Blood`,

  contact: `📬 Contact Info:

  📧 Email : iqbaldzulkarnaen12@gmail.com
  📱 Phone : 0851-5695-4817
  📍 Addr  : Banjaran, Kab. Bandung`,

  social: `🔗 Social Links:

  GitHub   → github.com/iqbaldz12
  LinkedIn → linkedin.com/in/muhamad-iqbal-dzulkarnaen`,
};

export const Terminal = () => {
  const [history, setHistory] = useState<
    { command: string; output: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === '') return;

    const output =
      COMMANDS[trimmedCmd] ||
      `Command not found: '${trimmedCmd}'. Type 'help' for available commands.`;

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-primary text-white p-4 rounded-2xl shadow-lg hover:shadow-theme-purple/30 hover:shadow-xl transition-all z-50 group"
            aria-label="Open terminal"
          >
            <TermIcon size={20} className="group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 w-[360px] sm:w-[420px] h-[400px] rounded-2xl shadow-2xl shadow-theme-purple/10 border border-theme-cardBorder overflow-hidden z-50 flex flex-col font-mono text-sm bg-[#0d0a1a]"
          >
            {/* Title bar */}
            <div className="bg-[#1a1428] px-4 py-3 flex justify-between items-center shrink-0">
              <div className="flex space-x-2">
                <button
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close terminal"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-theme-muted text-xs">
                guest@iqbal:~
              </span>
              <div className="w-4" />
            </div>

            {/* Terminal body */}
            <div className="flex-1 p-4 overflow-y-auto text-green-400 text-xs leading-relaxed">
              <div className="text-theme-purple mb-1">
                ╭─────────────────────────────────────╮
              </div>
              <div className="text-theme-purple">
                │ Welcome to Iqbal's Terminal! 🚀      │
              </div>
              <div className="text-theme-purple mb-2">
                ╰─────────────────────────────────────╯
              </div>
              <div className="text-theme-muted mb-3">
                Type '<span className="text-green-400">help</span>' to see available commands.
              </div>

              {history.map((item, index) => (
                <div key={index} className="mt-3">
                  <div>
                    <span className="text-theme-purple">guest</span>
                    <span className="text-theme-muted">@</span>
                    <span className="text-theme-cyan">iqbal</span>
                    <span className="text-theme-muted">:~$ </span>
                    <span className="text-white">{item.command}</span>
                  </div>
                  <div className="text-gray-300 mt-1 whitespace-pre-wrap">
                    {item.output}
                  </div>
                </div>
              ))}

              <div className="mt-3 flex items-center">
                <span className="text-theme-purple">guest</span>
                <span className="text-theme-muted">@</span>
                <span className="text-theme-cyan">iqbal</span>
                <span className="text-theme-muted">:~$&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-green-400 border-none w-full focus:ring-0 caret-green-400"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
