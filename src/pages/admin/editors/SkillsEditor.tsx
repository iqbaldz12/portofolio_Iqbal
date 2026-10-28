import { useState } from 'react';
import { Plus, Trash2, Save, X, Pencil, FolderPlus } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { SkillItem } from '../../../data/types';
import { Btn, Field, TextInput, SectionTitle } from '../../../components/admin/ui';

type SkillDraft = Omit<SkillItem, 'id'> & { id?: string; categoryId: string };

const emptySkill = (categoryId: string): SkillDraft => ({
  categoryId,
  name: '',
  iconUrl: '',
  color: '#a855f7',
});

export const SkillsEditor = () => {
  const {
    content,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    addSkill,
    updateSkill,
    deleteSkill,
  } = useContent();

  const [newCategory, setNewCategory] = useState('');
  const [editingCat, setEditingCat] = useState<{ id: string; title: string } | null>(null);
  const [skillDraft, setSkillDraft] = useState<SkillDraft | null>(null);

  const saveSkill = () => {
    if (!skillDraft) return;
    const { categoryId, id, ...rest } = skillDraft;
    if (id) updateSkill(categoryId, { id, ...rest });
    else addSkill(categoryId, rest);
    setSkillDraft(null);
  };

  return (
    <div>
      <SectionTitle title="Skills" subtitle="Kelola kategori dan daftar keahlian" />

      {/* Add category */}
      <div className="glass rounded-xl p-5 border border-theme-cardBorder mb-6 flex gap-3 items-end">
        <div className="flex-1">
          <Field label="Kategori Baru">
            <TextInput value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Languages & Frameworks" />
          </Field>
        </div>
        <Btn
          onClick={() => {
            if (newCategory.trim()) {
              addSkillCategory(newCategory.trim());
              setNewCategory('');
            }
          }}
        >
          <FolderPlus size={16} /> Tambah Kategori
        </Btn>
      </div>

      {/* Skill form */}
      {skillDraft && (
        <div className="glass rounded-xl p-6 border border-theme-purple/30 mb-6 space-y-4">
          <h3 className="text-white font-semibold">{skillDraft.id ? 'Edit Skill' : 'Skill Baru'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Nama">
              <TextInput value={skillDraft.name} onChange={(e) => setSkillDraft({ ...skillDraft, name: e.target.value })} />
            </Field>
            <Field label="Warna (hex, utk fallback)">
              <TextInput value={skillDraft.color} onChange={(e) => setSkillDraft({ ...skillDraft, color: e.target.value })} placeholder="#FF2D20" />
            </Field>
            <Field label="URL Ikon (SVG/PNG)">
              <TextInput value={skillDraft.iconUrl} onChange={(e) => setSkillDraft({ ...skillDraft, iconUrl: e.target.value })} placeholder="https://..." />
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <Btn onClick={saveSkill}><Save size={16} /> Simpan</Btn>
            <Btn variant="ghost" onClick={() => setSkillDraft(null)}><X size={16} /> Batal</Btn>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-6">
        {content.skillCategories.map((cat) => (
          <div key={cat.id} className="glass rounded-xl p-5 border border-theme-cardBorder">
            <div className="flex items-center justify-between mb-4">
              {editingCat?.id === cat.id ? (
                <div className="flex gap-2 items-center flex-1">
                  <TextInput value={editingCat.title} onChange={(e) => setEditingCat({ ...editingCat, title: e.target.value })} />
                  <Btn onClick={() => { updateSkillCategory(cat.id, editingCat.title); setEditingCat(null); }}><Save size={14} /></Btn>
                  <Btn variant="ghost" onClick={() => setEditingCat(null)}><X size={14} /></Btn>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-theme-purple" />
                    {cat.title}
                  </h3>
                  <div className="flex gap-2">
                    <Btn variant="ghost" onClick={() => setEditingCat({ id: cat.id, title: cat.title })}><Pencil size={14} /></Btn>
                    <Btn variant="ghost" onClick={() => setSkillDraft(emptySkill(cat.id))}><Plus size={14} /> Skill</Btn>
                    <Btn variant="danger" onClick={() => { if (window.confirm('Hapus kategori beserta isinya?')) deleteSkillCategory(cat.id); }}><Trash2 size={14} /></Btn>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 bg-white/5 border border-theme-cardBorder rounded-lg pl-2 pr-1 py-1">
                  {skill.iconUrl && (
                    <img src={skill.iconUrl} alt={skill.name} className="w-4 h-4 object-contain" />
                  )}
                  <span className="text-sm text-white">{skill.name}</span>
                  <button
                    className="p-1 text-theme-muted hover:text-white"
                    onClick={() => setSkillDraft({ ...skill, categoryId: cat.id })}
                    aria-label="Edit"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    className="p-1 text-red-400/70 hover:text-red-400"
                    onClick={() => { if (window.confirm('Hapus skill ini?')) deleteSkill(cat.id, skill.id); }}
                    aria-label="Hapus"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              {cat.skills.length === 0 && <p className="text-theme-muted text-sm">Belum ada skill di kategori ini.</p>}
            </div>
          </div>
        ))}
        {content.skillCategories.length === 0 && (
          <p className="text-theme-muted text-sm text-center py-8">Belum ada kategori skill.</p>
        )}
      </div>
    </div>
  );
};
