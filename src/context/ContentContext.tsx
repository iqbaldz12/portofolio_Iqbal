import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { defaultContent } from '../data/defaultContent';
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

// Generate a reasonably unique id for new records.
const genId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

// Merge persisted content with defaults so new fields added later don't break
// older saved data.
const loadContent = (): PortfolioContent => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as Partial<PortfolioContent>;
    return {
      ...defaultContent,
      ...parsed,
      hero: { ...defaultContent.hero, ...parsed.hero },
      about: { ...defaultContent.about, ...parsed.about },
      contact: { ...defaultContent.contact, ...parsed.contact },
      experiences: parsed.experiences ?? defaultContent.experiences,
      projects: parsed.projects ?? defaultContent.projects,
      skillCategories: parsed.skillCategories ?? defaultContent.skillCategories,
      education: parsed.education ?? defaultContent.education,
    };
  } catch {
    return defaultContent;
  }
};

interface ContentContextValue {
  content: PortfolioContent;
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
  const [content, setContent] = useState<PortfolioContent>(loadContent);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      // storage might be full / unavailable; ignore silently
    }
  }, [content]);

  const resetAll = useCallback(() => {
    setContent(defaultContent);
  }, []);

  // ---- Hero / About ----
  const updateHero = useCallback((hero: HeroContent) => {
    setContent((c) => ({ ...c, hero }));
  }, []);

  const updateAbout = useCallback((about: AboutContent) => {
    setContent((c) => ({ ...c, about }));
  }, []);

  // ---- Personal info ----
  const addPersonalInfo = useCallback((item: Omit<PersonalInfoItem, 'id'>) => {
    setContent((c) => ({
      ...c,
      about: {
        ...c.about,
        personalInfo: [...c.about.personalInfo, { ...item, id: genId('pi') }],
      },
    }));
  }, []);

  const updatePersonalInfo = useCallback((item: PersonalInfoItem) => {
    setContent((c) => ({
      ...c,
      about: {
        ...c.about,
        personalInfo: c.about.personalInfo.map((p) => (p.id === item.id ? item : p)),
      },
    }));
  }, []);

  const deletePersonalInfo = useCallback((id: string) => {
    setContent((c) => ({
      ...c,
      about: {
        ...c.about,
        personalInfo: c.about.personalInfo.filter((p) => p.id !== id),
      },
    }));
  }, []);

  // ---- Experiences ----
  const addExperience = useCallback((item: Omit<ExperienceItem, 'id'>) => {
    setContent((c) => ({ ...c, experiences: [{ ...item, id: genId('exp') }, ...c.experiences] }));
  }, []);

  const updateExperience = useCallback((item: ExperienceItem) => {
    setContent((c) => ({
      ...c,
      experiences: c.experiences.map((e) => (e.id === item.id ? item : e)),
    }));
  }, []);

  const deleteExperience = useCallback((id: string) => {
    setContent((c) => ({ ...c, experiences: c.experiences.filter((e) => e.id !== id) }));
  }, []);

  // ---- Projects ----
  const addProject = useCallback((item: Omit<ProjectItem, 'id'>) => {
    setContent((c) => ({ ...c, projects: [...c.projects, { ...item, id: genId('proj') }] }));
  }, []);

  const updateProject = useCallback((item: ProjectItem) => {
    setContent((c) => ({
      ...c,
      projects: c.projects.map((p) => (p.id === item.id ? item : p)),
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setContent((c) => ({ ...c, projects: c.projects.filter((p) => p.id !== id) }));
  }, []);

  // ---- Education ----
  const addEducation = useCallback((item: Omit<EducationItem, 'id'>) => {
    setContent((c) => ({ ...c, education: [...c.education, { ...item, id: genId('edu') }] }));
  }, []);

  const updateEducation = useCallback((item: EducationItem) => {
    setContent((c) => ({
      ...c,
      education: c.education.map((e) => (e.id === item.id ? item : e)),
    }));
  }, []);

  const deleteEducation = useCallback((id: string) => {
    setContent((c) => ({ ...c, education: c.education.filter((e) => e.id !== id) }));
  }, []);

  // ---- Skill categories ----
  const addSkillCategory = useCallback((title: string) => {
    setContent((c) => ({
      ...c,
      skillCategories: [...c.skillCategories, { id: genId('cat'), title, skills: [] }],
    }));
  }, []);

  const updateSkillCategory = useCallback((id: string, title: string) => {
    setContent((c) => ({
      ...c,
      skillCategories: c.skillCategories.map((cat) => (cat.id === id ? { ...cat, title } : cat)),
    }));
  }, []);

  const deleteSkillCategory = useCallback((id: string) => {
    setContent((c) => ({
      ...c,
      skillCategories: c.skillCategories.filter((cat) => cat.id !== id),
    }));
  }, []);

  // ---- Skills ----
  const addSkill = useCallback((categoryId: string, skill: Omit<SkillItem, 'id'>) => {
    setContent((c) => ({
      ...c,
      skillCategories: c.skillCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, { ...skill, id: genId('sk') }] }
          : cat,
      ),
    }));
  }, []);

  const updateSkill = useCallback((categoryId: string, skill: SkillItem) => {
    setContent((c) => ({
      ...c,
      skillCategories: c.skillCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.map((s) => (s.id === skill.id ? skill : s)) }
          : cat,
      ),
    }));
  }, []);

  const deleteSkill = useCallback((categoryId: string, skillId: string) => {
    setContent((c) => ({
      ...c,
      skillCategories: c.skillCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter((s) => s.id !== skillId) }
          : cat,
      ),
    }));
  }, []);

  // ---- Contact ----
  const updateContactEmail = useCallback((email: string) => {
    setContent((c) => ({ ...c, contact: { ...c.contact, email } }));
  }, []);

  const addContactInfo = useCallback((item: Omit<ContactInfoItem, 'id'>) => {
    setContent((c) => ({
      ...c,
      contact: { ...c.contact, info: [...c.contact.info, { ...item, id: genId('ci') }] },
    }));
  }, []);

  const updateContactInfo = useCallback((item: ContactInfoItem) => {
    setContent((c) => ({
      ...c,
      contact: {
        ...c.contact,
        info: c.contact.info.map((i) => (i.id === item.id ? item : i)),
      },
    }));
  }, []);

  const deleteContactInfo = useCallback((id: string) => {
    setContent((c) => ({
      ...c,
      contact: { ...c.contact, info: c.contact.info.filter((i) => i.id !== id) },
    }));
  }, []);

  const addSocial = useCallback((item: Omit<SocialLinkItem, 'id'>) => {
    setContent((c) => ({
      ...c,
      contact: { ...c.contact, socials: [...c.contact.socials, { ...item, id: genId('so') }] },
    }));
  }, []);

  const updateSocial = useCallback((item: SocialLinkItem) => {
    setContent((c) => ({
      ...c,
      contact: {
        ...c.contact,
        socials: c.contact.socials.map((s) => (s.id === item.id ? item : s)),
      },
    }));
  }, []);

  const deleteSocial = useCallback((id: string) => {
    setContent((c) => ({
      ...c,
      contact: { ...c.contact, socials: c.contact.socials.filter((s) => s.id !== id) },
    }));
  }, []);

  const value: ContentContextValue = {
    content,
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
