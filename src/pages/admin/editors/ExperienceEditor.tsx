import { useState } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { ExperienceItem } from '../../../data/types';
import { gradientPresets } from '../../../data/icons';
import { Btn, Field, TextInput, TextArea, TagsInput, GradientPicker, SectionTitle } from '../../../components/admin/ui';

type Draft = Omit<ExperienceItem, 'id'> & { id?: string };

const emptyDraft: Draft = {
  company: '',
  role: '',
  period: '',
  description: '',
  tags: [],
  color: gradientPresets[0],
};

export const ExperienceEditor = () => {
  const { content, addExperience, updateExperience, deleteExperience } = useContent();
  const [draft, setDraft] = useState<Draft | null>(null);

  const save = () => {
    if (!draft) return;
    if (draft.id) {
      updateExperience(draft as ExperienceItem);
    } else {
      addExperience(draft);
    }
    setDraft(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle title="Work Experience" subtitle="Kelola riwayat pengalaman kerja" />
        {!draft && (
          <Btn onClick={() => setDraft({ ...emptyDraft })}>
            <Plus size={16} /> Tambah
          </Btn>
        )}
      </div>

      {draft && (
        <div className="glass rounded-xl p-6 border border-theme-purple/30 mb-6 space-y-4">
          <h3 className="text-white font-semibold">
            {draft.id ? 'Edit Pengalaman' : 'Pengalaman Baru'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Posisi / Role">
              <TextInput value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} placeholder="Fullstack Developer" />
            </Field>
            <Field label="Perusahaan">
              <TextInput value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} placeholder="PT ..." />
            </Field>
          </div>
          <Field label="Periode">
            <TextInput value={draft.period} onChange={(e) => setDraft({ ...draft, period: e.target.value })} placeholder="Agustus 2026 - Sekarang" />
          </Field>
          <Field label="Deskripsi">
            <TextArea rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </Field>
          <Field label="Tags (pisahkan dengan koma)">
            <TagsInput value={draft.tags} onChange={(tags) => setDraft({ ...draft, tags })} />
          </Field>
          <Field label="Warna Gradient">
            <GradientPicker value={draft.color} onChange={(color) => setDraft({ ...draft, color })} />
          </Field>
          <div className="flex gap-3 pt-2">
            <Btn onClick={save}><Save size={16} /> Simpan</Btn>
            <Btn variant="ghost" onClick={() => setDraft(null)}><X size={16} /> Batal</Btn>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {content.experiences.map((exp) => (
          <div key={exp.id} className="glass rounded-xl p-5 border border-theme-cardBorder flex items-start gap-4">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${exp.color} mt-1.5 shrink-0`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold">{exp.role}</h4>
              <p className="text-theme-purple text-sm">{exp.company}</p>
              <p className="text-theme-muted text-xs font-mono mt-0.5">{exp.period}</p>
              <p className="text-theme-muted text-sm mt-2 line-clamp-2">{exp.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Btn variant="ghost" onClick={() => setDraft({ ...exp })}><Pencil size={14} /></Btn>
              <Btn variant="danger" onClick={() => { if (window.confirm('Hapus pengalaman ini?')) deleteExperience(exp.id); }}><Trash2 size={14} /></Btn>
            </div>
          </div>
        ))}
        {content.experiences.length === 0 && (
          <p className="text-theme-muted text-sm text-center py-8">Belum ada data. Klik Tambah untuk membuat.</p>
        )}
      </div>
    </div>
  );
};
