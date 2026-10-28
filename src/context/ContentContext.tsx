import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { defaultContent } from '../data/defaultContent';
import { fetchContent, saveContent, isSupabaseConfigured } from '../lib/supabase';
import type {
  PortfolioContent,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  SkillItem,
  PersonalInfoItem,
  ContactInfoItem,
  SocialLinkItem,
  HeroContent,
  AboutContent,
} from '../data/types';

const STORAGE_KEY = 'portfolio_content_v1';

// Status sinkronisasi dengan Supabase, dipakai admin untuk menampilkan indikator.
export type SyncStatus = 'loading' | 'synced' | 'saving' | 'error' | 'offline';

// Generate a reasonably unique id for new records.
const genId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

// Gabungkan konten tersimpan dengan default agar field baru yang ditambahkan
// kemudian tidak merusak data lama.
const mergeWithDefaults = (parsed: Partial<PortfolioContent>): PortfolioContent => ({
  ...defaultContent,
  ...parsed,
  hero: { ...defaultContent.hero, ...parsed.hero },
  about: { ...defaultContent.about, ...parsed.about },
  contact: { ...defaultContent.contact, ...parsed.contact },
  experiences: parsed.experiences ?? defaultContent.experiences,
  projects: parsed.projects ?? defaultContent.projects,
  skillCategories: parsed.skillCategories ?? defaultContent.skillCategories,
  education: parsed.education ?? defaultContent.education,
});

// Muat dari cache localStorage (dipakai sebagai nilai awal cepat sebelum
// data Supabase tiba, dan sebagai fallback saat offline).
const loadCache = (): PortfolioContent => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    return mergeWithDefaults(JSON.parse(raw) as Partial<PortfolioContent>);
  } catch {
    return defaultContent;
  }
};

const writeCache = (content: PortfolioContent) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // storage penuh / tidak tersedia; abaikan
  }
};

interface ContentContextValue {
  content: PortfolioContent;
  syncStatus: SyncStatus;
  lastError: string | null;
  refresh: () => Promise<void>;
  resetAll: () => void;

  // Hero / About (single objects)
  updateHero: (hero: HeroContent) => void;
  updateAbout: (about: AboutContent) => void;

  // Personal info (inside about)
  addPersonalInfo: (item: Omit<PersonalInfoItem, 'id'>) => void;
  updatePersonalInfo: (item: PersonalInfoItem) => void;
  deletePersonalInfo: (id: string) => void;

  // Experiences
  addExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (item: ExperienceItem) => void;
  deleteExperience: (id: string) => void;

  // Projects
  addProject: (item: Omit<ProjectItem, 'id'>) => void;
  updateProject: (item: ProjectItem) => void;
  deleteProject: (id: string) => void;

  // Education
  addEducation: (item: Omit<EducationItem, 'id'>) => void;
  updateEducation: (item: EducationItem) => void;
  deleteEducation: (id: string) => void;

  // Skill categories
  addSkillCategory: (title: string) => void;
  updateSkillCategory: (id: string, title: string) => void;
  deleteSkillCategory: (id: string) => void;

  // Skills (inside a category)
  addSkill: (categoryId: string, skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (categoryId: string, skill: SkillItem) => void;
  deleteSkill: (categoryId: string, skillId: string) => void;

  // Contact
  updateContactEmail: (email: string) => void;
  addContactInfo: (item: Omit<ContactInfoItem, 'id'>) => void;
  updateContactInfo: (item: ContactInfoItem) => void;
  deleteContactInfo: (id: string) => void;
  addSocial: (item: Omit<SocialLinkItem, 'id'>) => void;
  updateSocial: (item: SocialLinkItem) => void;
  deleteSocial: (id: string) => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<PortfolioContent>(loadCache);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(
    isSupabaseConfigured ? 'loading' : 'offline',
  );
  const [lastError, setLastError] = useState<string | null>(null);

  // Simpan konten terbaru di ref agar debounce save selalu memakai nilai mutakhir.
  const latestRef = useRef(content);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Muat data dari Supabase saat pertama kali (sumber kebenaran untuk publik).
  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setSyncStatus('offline');
      return;
    }
    setSyncStatus('loading');
    try {
      const remote = await fetchContent();
      if (remote) {
        const merged = mergeWithDefaults(remote);
        setContent(merged);
        latestRef.current = merged;
        writeCache(merged);
      } else {
        // Belum ada baris di Supabase: tanam konten saat ini sebagai data awal.
        await saveContent(latestRef.current);
      }
      setSyncStatus('synced');
      setLastError(null);
    } catch (err) {
      setSyncStatus('error');
      setLastError(err instanceof Error ? err.message : 'Gagal memuat dari server.');
    }
  }, []);

  useEffect(() => {
    void refresh();
    // hanya sekali saat mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dorong perubahan ke Supabase dengan debounce (hindari spam saat mengetik).
  const scheduleSave = useCallback((next: PortfolioContent) => {
    writeCache(next);
    if (!isSupabaseConfigured) {
      setSyncStatus('offline');
      return;
    }
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncStatus('saving');
    saveTimer.current = setTimeout(async () => {
      try {
        await saveContent(next);
        setSyncStatus('synced');
        setLastError(null);
      } catch (err) {
        setSyncStatus('error');
        setLastError(err instanceof Error ? err.message : 'Gagal menyimpan ke server.');
      }
    }, 600);
  }, []);

  // Helper tunggal untuk semua mutasi: update state, cache lokal, dan sinkron.
  const mutate = useCallback(
    (updater: (c: PortfolioContent) => PortfolioContent) => {
      setContent((c) => {
        const next = updater(c);
        latestRef.current = next;
        scheduleSave(next);
        return next;
      });
    },
    [scheduleSave],
  );

  const resetAll = useCallback(() => {
    mutate(() => defaultContent);
  }, [mutate]);

  // ---- Hero / About ----
  const updateHero = useCallback((hero: HeroContent) => mutate((c) => ({ ...c, hero })), [mutate]);
  const updateAbout = useCallback((about: AboutContent) => mutate((c) => ({ ...c, about })), [mutate]);

  // ---- Personal info ----
  const addPersonalInfo = useCallback(
    (item: Omit<PersonalInfoItem, 'id'>) =>
      mutate((c) => ({
        ...c,
        about: { ...c.about, personalInfo: [...c.about.personalInfo, { ...item, id: genId('pi') }] },
      })),
    [mutate],
  );
  const updatePersonalInfo = useCallback(
    (item: PersonalInfoItem) =>
      mutate((c) => ({
        ...c,
        about: {
          ...c.about,
          personalInfo: c.about.personalInfo.map((p) => (p.id === item.id ? item : p)),
        },
      })),
    [mutate],
  );
  const deletePersonalInfo = useCallback(
    (id: string) =>
      mutate((c) => ({
        ...c,
        about: { ...c.about, personalInfo: c.about.personalInfo.filter((p) => p.id !== id) },
      })),
    [mutate],
  );

  // ---- Experiences ----
  const addExperience = useCallback(
    (item: Omit<ExperienceItem, 'id'>) =>
      mutate((c) => ({ ...c, experiences: [{ ...item, id: genId('exp') }, ...c.experiences] })),
    [mutate],
  );
  const updateExperience = useCallback(
    (item: ExperienceItem) =>
      mutate((c) => ({ ...c, experiences: c.experiences.map((e) => (e.id === item.id ? item : e)) })),
    [mutate],
  );
  const deleteExperience = useCallback(
    (id: string) => mutate((c) => ({ ...c, experiences: c.experiences.filter((e) => e.id !== id) })),
    [mutate],
  );

  // ---- Projects ----
  const addProject = useCallback(
    (item: Omit<ProjectItem, 'id'>) =>
      mutate((c) => ({ ...c, projects: [...c.projects, { ...item, id: genId('proj') }] })),
    [mutate],
  );
  const updateProject = useCallback(
    (item: ProjectItem) =>
      mutate((c) => ({ ...c, projects: c.projects.map((p) => (p.id === item.id ? item : p)) })),
    [mutate],
  );
  const deleteProject = useCallback(
    (id: string) => mutate((c) => ({ ...c, projects: c.projects.filter((p) => p.id !== id) })),
    [mutate],
  );

  // ---- Education ----
  const addEducation = useCallback(
    (item: Omit<EducationItem, 'id'>) =>
      mutate((c) => ({ ...c, education: [...c.education, { ...item, id: genId('edu') }] })),
    [mutate],
  );
  const updateEducation = useCallback(
    (item: EducationItem) =>
      mutate((c) => ({ ...c, education: c.education.map((e) => (e.id === item.id ? item : e)) })),
    [mutate],
  );
  const deleteEducation = useCallback(
    (id: string) => mutate((c) => ({ ...c, education: c.education.filter((e) => e.id !== id) })),
    [mutate],
  );

  // ---- Skill categories ----
  const addSkillCategory = useCallback(
    (title: string) =>
      mutate((c) => ({
        ...c,
        skillCategories: [...c.skillCategories, { id: genId('cat'), title, skills: [] }],
      })),
    [mutate],
  );
  const updateSkillCategory = useCallback(
    (id: string, title: string) =>
      mutate((c) => ({
        ...c,
        skillCategories: c.skillCategories.map((cat) => (cat.id === id ? { ...cat, title } : cat)),
      })),
    [mutate],
  );
  const deleteSkillCategory = useCallback(
    (id: string) =>
      mutate((c) => ({ ...c, skillCategories: c.skillCategories.filter((cat) => cat.id !== id) })),
    [mutate],
  );

  // ---- Skills ----
  const addSkill = useCallback(
    (categoryId: string, skill: Omit<SkillItem, 'id'>) =>
      mutate((c) => ({
        ...c,
        skillCategories: c.skillCategories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, skills: [...cat.skills, { ...skill, id: genId('sk') }] }
            : cat,
        ),
      })),
    [mutate],
  );
  const updateSkill = useCallback(
    (categoryId: string, skill: SkillItem) =>
      mutate((c) => ({
        ...c,
        skillCategories: c.skillCategories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, skills: cat.skills.map((s) => (s.id === skill.id ? skill : s)) }
            : cat,
        ),
      })),
    [mutate],
  );
  const deleteSkill = useCallback(
    (categoryId: string, skillId: string) =>
      mutate((c) => ({
        ...c,
        skillCategories: c.skillCategories.map((cat) =>
          cat.id === categoryId ? { ...cat, skills: cat.skills.filter((s) => s.id !== skillId) } : cat,
        ),
      })),
    [mutate],
  );

  // ---- Contact ----
  const updateContactEmail = useCallback(
    (email: string) => mutate((c) => ({ ...c, contact: { ...c.contact, email } })),
    [mutate],
  );
  const addContactInfo = useCallback(
    (item: Omit<ContactInfoItem, 'id'>) =>
      mutate((c) => ({
        ...c,
        contact: { ...c.contact, info: [...c.contact.info, { ...item, id: genId('ci') }] },
      })),
    [mutate],
  );
  const updateContactInfo = useCallback(
    (item: ContactInfoItem) =>
      mutate((c) => ({
        ...c,
        contact: { ...c.contact, info: c.contact.info.map((i) => (i.id === item.id ? item : i)) },
      })),
    [mutate],
  );
  const deleteContactInfo = useCallback(
    (id: string) =>
      mutate((c) => ({
        ...c,
        contact: { ...c.contact, info: c.contact.info.filter((i) => i.id !== id) },
      })),
    [mutate],
  );
  const addSocial = useCallback(
    (item: Omit<SocialLinkItem, 'id'>) =>
      mutate((c) => ({
        ...c,
        contact: { ...c.contact, socials: [...c.contact.socials, { ...item, id: genId('so') }] },
      })),
    [mutate],
  );
  const updateSocial = useCallback(
    (item: SocialLinkItem) =>
      mutate((c) => ({
        ...c,
        contact: { ...c.contact, socials: c.contact.socials.map((s) => (s.id === item.id ? item : s)) },
      })),
    [mutate],
  );
  const deleteSocial = useCallback(
    (id: string) =>
      mutate((c) => ({
        ...c,
        contact: { ...c.contact, socials: c.contact.socials.filter((s) => s.id !== id) },
      })),
    [mutate],
  );

  const value: ContentContextValue = {
    content,
    syncStatus,
    lastError,
    refresh,
    resetAll,
    updateHero,
    updateAbout,
    addPersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addProject,
    updateProject,
    deleteProject,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    addSkill,
    updateSkill,
    deleteSkill,
    updateContactEmail,
    addContactInfo,
    updateContactInfo,
    deleteContactInfo,
    addSocial,
    updateSocial,
    deleteSocial,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};
