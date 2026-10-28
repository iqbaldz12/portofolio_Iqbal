import type { PortfolioContent } from './types';

const BASE = import.meta.env.BASE_URL;

// Default seed content, migrated from the previously hardcoded section data.
// This is used the first time the app runs (or after a reset in the admin).
export const defaultContent: PortfolioContent = {
  hero: {
    badge: 'Open to opportunities',
    name: 'Muhamad Iqbal',
    nameHighlight: 'Dzulkarnaen',
    typeSequences: [
      'Laravel Developer',
      'Backend Engineer',
      'Fullstack Builder',
      'API Craftsman',
    ],
    profileJson: {
      name: 'Muhamad Iqbal Dzulkarnaen',
      role: 'Fullstack Web Developer',
      location: 'Bandung, Indonesia 🇮🇩',
      stack: ['Laravel', 'PHP', 'MySQL', 'Git', 'PostgreSQL'],
      available: true,
    },
  },

  about: {
    sectionTag: 'Get to know me',
    heading: 'About',
    paragraphs: [
      'Saya seorang mahasiswa yang berambisi untuk meningkatkan keterampilan dan memperoleh pengalaman di dunia kerja. Saat ini, saya sedang membangun dasar sebagai seorang web developer, dengan passion yang besar dalam dunia pemrograman.',
      'Saya sangat antusias untuk terus belajar, berkembang, dan memberikan kontribusi yang berarti. Berpengalaman di pengembangan Full-Stack dengan fokus pada Laravel, Vue.js, dan sistem informasi manajemen.',
    ],
    personalInfo: [
      { id: 'pi-1', icon: 'MapPin', label: 'Location', value: 'Bandung, Indonesia' },
      { id: 'pi-2', icon: 'Calendar', label: 'Birth Date', value: '05 Oktober 2003' },
      { id: 'pi-3', icon: 'Mail', label: 'Email', value: 'iqbaldzulkarnaen12@gmail.com' },
      { id: 'pi-4', icon: 'Phone', label: 'Phone', value: '0851-5695-4817' },
      { id: 'pi-5', icon: 'User', label: 'Status', value: 'Belum Menikah' },
      { id: 'pi-6', icon: 'GraduationCap', label: 'Education', value: 'S1 Teknik Informatika' },
    ],
  },

  experiences: [
    {
      id: 'exp-1',
      company: 'PT Someah Kreatif Nusantara',
      role: 'Implementor',
      period: 'Agustus 2026 - Sekarang',
      description:
        'Menjadi jembatan komunikasi utama antara klien (pengguna non-teknis) dengan tim developer internal. Melakukan konfigurasi fungsional awal sistem sesuai dengan alur bisnis yang disepakati klien. Membuat modul panduan pengguna serta memimpin sesi User Training untuk mengedukasi seluruh staf klien. Mendampingi proses pengujian sistem dari tahap User Acceptance Testing (UAT) hingga produk sukses diluncurkan resmi (Go-Live).',
      tags: ['Implementasi Sistem', 'UAT', 'User Training', 'Go-Live'],
      color: 'from-green-500 to-cyan-500',
    },
    {
      id: 'exp-2',
      company: 'PT. Jasamedika Saranatama',
      role: 'Fullstack Developer',
      period: 'Desember 2025 - Juni 2026',
      description:
        'Berperan dalam pengembangan dan pemeliharaan sistem informasi kesehatan, berfokus pada integrasi frontend dan backend untuk proyek Klinik Jasamedika dan SIMRS (Sistem Informasi Manajemen Rumah Sakit) Jasamedika Saranatama.',
      tags: ['Laravel', 'Vue.js', 'MySQL', 'REST API'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'exp-3',
      company: 'CV NIKENSHA NIAGA NUSANTARA',
      role: 'Backend Developer',
      period: 'Oktober 2024 - Maret 2025',
      description:
        'Mengembangkan sistem berbasis Laravel dengan API, database, dan optimasi performa.',
      tags: ['Laravel', 'PHP', 'MySQL', 'API'],
      color: 'from-cyan-500 to-purple-500',
    },
    {
      id: 'exp-4',
      company: 'PT Someah Kreatif Nusantara',
      role: 'Fullstack Web Developer',
      period: 'Januari 2024 - April 2024',
      description:
        'Membuat dan mengembangkan website menggunakan framework Laravel.',
      tags: ['Laravel', 'PHP', 'JavaScript', 'Bootstrap'],
      color: 'from-pink-500 to-orange-500',
    },
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'Klinik Transmedic',
      company: 'PT. Jasamedika Saranatama',
      description: 'Sistem informasi klinik untuk manajemen pasien, jadwal dokter, dan rekam medis elektronik.',
      tags: ['Healthcare', 'Full-stack', 'Laravel', 'Vue.js'],
      icon: 'Heart',
      gradient: 'from-purple-600 to-pink-500',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'proj-2',
      title: 'SIMRS TRANSMEDIC',
      company: 'PT. Jasamedika Saranatama',
      description: 'Sistem Informasi Manajemen Rumah Sakit yang terintegrasi untuk manajemen operasional rumah sakit.',
      tags: ['Hospital Management', 'Full-stack', 'Laravel', 'Vue.js'],
      icon: 'Building2',
      gradient: 'from-cyan-500 to-blue-500',
      img: `${BASE}SIMRS TRANSMEDIC.png`,
    },
    {
      id: 'proj-3',
      title: 'SIMAPRO PT.Someah',
      company: 'PT Someah Kreatif Nusantara',
      description: 'Website Sistem Informasi Penyimpanan Projek untuk manajemen dan dokumentasi proyek perusahaan.',
      tags: ['Project Management', 'Laravel', 'Web App'],
      icon: 'Globe',
      gradient: 'from-violet-500 to-purple-600',
      img: `${BASE}simapro.png`,
    },
    {
      id: 'proj-4',
      title: 'Website Presensi SOMEAH',
      company: 'PT Someah Kreatif Nusantara',
      description: 'Sistem presensi online untuk pencatatan kehadiran karyawan secara real-time.',
      tags: ['Attendance', 'Laravel', 'Web App'],
      icon: 'Globe',
      gradient: 'from-emerald-500 to-teal-500',
      img: `${BASE}four-u.png`,
    },
    {
      id: 'proj-5',
      title: 'Website Tiket Customer Service',
      company: 'Freelance Project',
      description: 'Platform ticketing untuk customer service dengan sistem tracking dan prioritas.',
      tags: ['Customer Service', 'Web App', 'Laravel'],
      icon: 'Globe',
      gradient: 'from-orange-500 to-red-500',
      img: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'proj-6',
      title: 'Mobile App Absensi SMP UPI Cibiru',
      company: 'Education Project',
      description: 'Aplikasi mobile absensi untuk sekolah SMP UPI Cibiru dengan fitur GPS tracking.',
      tags: ['Mobile', 'Education', 'App'],
      icon: 'Smartphone',
      gradient: 'from-blue-500 to-indigo-500',
      img: `${BASE}four-ufish.png`,
    },
    {
      id: 'proj-7',
      title: 'Website Hello Blood',
      company: 'Health Project',
      description: 'Platform donor darah online untuk menghubungkan pendonor dengan yang membutuhkan.',
      tags: ['Health', 'Web App', 'Social Impact'],
      icon: 'Heart',
      gradient: 'from-red-500 to-pink-500',
      img: `${BASE}helloblood.png`,
    },
  ],

  skillCategories: [
    {
      id: 'cat-1',
      title: 'Languages & Frameworks',
      skills: [
        { id: 'sk-1', name: 'PHP', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', color: '#777BB4' },
        { id: 'sk-2', name: 'Laravel', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', color: '#FF2D20' },
        { id: 'sk-3', name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
        { id: 'sk-4', name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: '#3178C6' },
        { id: 'sk-5', name: 'Vue.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', color: '#4FC08D' },
        { id: 'sk-6', name: 'Nuxt.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg', color: '#00DC82' },
        { id: 'sk-7', name: 'AngularJS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg', color: '#DD0031' },
        { id: 'sk-8', name: 'HTML', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', color: '#E34F26' },
        { id: 'sk-9', name: 'CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', color: '#1572B6' },
        { id: 'sk-10', name: 'Tailwind', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
        { id: 'sk-11', name: 'Bootstrap', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', color: '#7952B3' },
      ],
    },
    {
      id: 'cat-2',
      title: 'Database & Tools',
      skills: [
        { id: 'sk-12', name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', color: '#4479A1' },
        { id: 'sk-13', name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', color: '#336791' },
        { id: 'sk-14', name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', color: '#F05032' },
        { id: 'sk-15', name: 'REST API', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: '#a855f7' },
        { id: 'sk-16', name: 'Postman', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', color: '#FF6C37' },
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      school: 'STMIK "AMIKBANDUNG"',
      degree: 'S1 Teknik Informatika',
      period: '2021 - 2025',
      location: 'Bandung',
      description: 'Mendalami ilmu komputer, pemrograman, dan pengembangan perangkat lunak.',
      icon: 'GraduationCap',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'edu-2',
      school: 'SMKN 7 Baleendah',
      degree: 'Sekolah Menengah Kejuruan',
      period: '2018 - 2021',
      location: 'Baleendah, Bandung',
      description: 'Membangun fondasi awal dalam dunia teknologi informasi dan pemrograman.',
      icon: 'GraduationCap',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ],

  contact: {
    email: 'iqbaldzulkarnaen12@gmail.com',
    info: [
      { id: 'ci-1', icon: 'Mail', label: 'Email', value: 'iqbaldzulkarnaen12@gmail.com', href: 'mailto:iqbaldzulkarnaen12@gmail.com' },
      { id: 'ci-2', icon: 'Phone', label: 'Phone', value: '0851-5695-4817', href: 'tel:+6285156954817' },
      { id: 'ci-3', icon: 'MapPin', label: 'Location', value: 'Banjaran, Kab. Bandung', href: '#' },
    ],
    socials: [
      { id: 'so-1', icon: 'Github', label: 'GitHub', href: 'https://github.com/iqbaldz12/', color: 'hover:text-white' },
      { id: 'so-2', icon: 'Linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhamad-iqbal-dzulkarnaen', color: 'hover:text-blue-400' },
      { id: 'so-3', icon: 'Mail', label: 'Email', href: 'mailto:iqbaldzulkarnaen12@gmail.com', color: 'hover:text-theme-purple' },
    ],
  },
};
