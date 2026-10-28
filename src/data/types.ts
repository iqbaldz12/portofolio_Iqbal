// Central content types for the portfolio. All icons are stored as string keys
// (see iconRegistry) so the whole content object stays JSON-serializable for
// localStorage persistence and admin editing.

export interface HeroContent {
  badge: string;
  name: string;
  nameHighlight: string;
  typeSequences: string[];
  profileJson: {
    name: string;
    role: string;
    location: string;
    stack: string[];
    available: boolean;
  };
}

export interface PersonalInfoItem {
  id: string;
  icon: string; // icon key
  label: string;
  value: string;
}

export interface AboutContent {
  sectionTag: string;
  heading: string;
  paragraphs: string[];
  personalInfo: PersonalInfoItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  color: string; // tailwind gradient classes e.g. "from-purple-500 to-pink-500"
}

export interface ProjectItem {
  id: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  icon: string; // icon key
  gradient: string; // tailwind gradient classes
  img: string;
}

export interface SkillItem {
  id: string;
  name: string;
  iconUrl: string;
  color: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  icon: string; // icon key
  gradient: string;
}

export interface ContactInfoItem {
  id: string;
  icon: string; // icon key
  label: string;
  value: string;
  href: string;
}

export interface SocialLinkItem {
  id: string;
  icon: string; // icon key
  label: string;
  href: string;
  color: string;
}

export interface ContactContent {
  email: string;
  info: ContactInfoItem[];
  socials: SocialLinkItem[];
}

export interface PortfolioContent {
  hero: HeroContent;
  about: AboutContent;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
  contact: ContactContent;
}
