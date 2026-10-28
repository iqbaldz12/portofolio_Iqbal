import { useState } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { ProjectItem } from '../../../data/types';
import { gradientPresets, renderIcon } from '../../../data/icons';
import { Btn, Field, TextInput, TextArea, TagsInput, GradientPicker, IconPicker, SectionTitle } from '../../../components/admin/ui';

type Draft = Omit<ProjectItem, 'id'> & { id?: string };

const emptyDraft: Draft = {
  title: '',
  company: '',
  description: '',
  tags: [],
  icon: 'Globe',
  gradient: gradientPresets[0],
  img: '',
};

export const ProjectsEditor = () => {
  const { content, addProject, updateProject, deleteProject } = useContent();
  const [draft, setDraft] = useState<Draft | null>(null);

  const save = () => {
    if (!draft) return;
    if (draft.id) updateProject(draft as ProjectItem);
    else addProject(draft);
    setDraft(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle title="Projects" subtitle="Kelola daftar proyek portofolio" />
        {!draft && <Btn onClick={() => setDraft({ ...emptyDraft })}><Plus size={16} /> Tambah</Btn>}
      </div>

      {draft && (
        <div className="glass rounded-xl p-6 border border-theme-purple/30 mb-6 space-y-4">
          <h3 className="text-white font-semibold">{draft.id ? 'Edit Proyek' : 'Proyek Baru'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Judul">
              <TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </Field>
            <Field label="Perusahaan / Kategori">
              <TextInput value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
            </Field>
          </div>
          <Field label="Deskripsi">
            <TextArea rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </Field>
          <Field label="Tags (pisahkan dengan koma)">
            <TagsInput value={draft.tags} onChange={(tags) => setDraft({ ...draft, tags })} />
          </Field>
          <Field label="URL Gambar (URL penuh atau nama file di folder public, mis. simapro.png)">
            <TextInput value={draft.img} onChange={(e) => setDraft({ ...draft, img: e.target.value })} placeholder="https://... atau simapro.png" />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Ikon">
              <IconPicker value={draft.icon} onChange={(icon) => setDraft({ ...draft, icon })} />
            </Field>
            <Field label="Warna Gradient">
              <GradientPicker value={draft.gradient} onChange={(gradient) => setDraft({ ...draft, gradient })} />
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <Btn onClick={save}><Save size={16} /> Simpan</Btn>
            <Btn variant="ghost" onClick={() => setDraft(null)}><X size={16} /> Batal</Btn>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.projects.map((proj) => (
          <div key={proj.id} className="glass rounded-xl p-5 border border-theme-cardBorder">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${proj.gradient} text-white shrink-0`}>
                {renderIcon(proj.icon, 18)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold truncate">{proj.title}</h4>
                <p className="text-theme-purple text-xs">{proj.company}</p>
              </div>
            </div>
            <p className="text-theme-muted text-sm mt-3 line-clamp-2">{proj.description}</p>
            <div className="flex gap-2 mt-4">
              <Btn variant="ghost" onClick={() => setDraft({ ...proj })}><Pencil size={14} /> Edit</Btn>
              <Btn variant="danger" onClick={() => { if (window.confirm('Hapus proyek ini?')) deleteProject(proj.id); }}><Trash2 size={14} /></Btn>
            </div>
          </div>
        ))}
        {content.projects.length === 0 && (
          <p className="text-theme-muted text-sm text-center py-8 col-span-full">Belum ada proyek.</p>
        )}
      </div>
    </div>
  );
};
