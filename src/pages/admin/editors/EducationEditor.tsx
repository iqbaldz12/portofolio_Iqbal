import { useState } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { EducationItem } from '../../../data/types';
import { gradientPresets, renderIcon } from '../../../data/icons';
import { Btn, Field, TextInput, TextArea, GradientPicker, IconPicker, SectionTitle } from '../../../components/admin/ui';

type Draft = Omit<EducationItem, 'id'> & { id?: string };

const emptyDraft: Draft = {
  school: '',
  degree: '',
  period: '',
  location: '',
  description: '',
  icon: 'GraduationCap',
  gradient: gradientPresets[0],
};

export const EducationEditor = () => {
  const { content, addEducation, updateEducation, deleteEducation } = useContent();
  const [draft, setDraft] = useState<Draft | null>(null);

  const save = () => {
    if (!draft) return;
    if (draft.id) updateEducation(draft as EducationItem);
    else addEducation(draft);
    setDraft(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle title="Education" subtitle="Kelola riwayat pendidikan" />
        {!draft && <Btn onClick={() => setDraft({ ...emptyDraft })}><Plus size={16} /> Tambah</Btn>}
      </div>

      {draft && (
        <div className="glass rounded-xl p-6 border border-theme-purple/30 mb-6 space-y-4">
          <h3 className="text-white font-semibold">{draft.id ? 'Edit Pendidikan' : 'Pendidikan Baru'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Sekolah / Kampus">
              <TextInput value={draft.school} onChange={(e) => setDraft({ ...draft, school: e.target.value })} />
            </Field>
            <Field label="Jurusan / Gelar">
              <TextInput value={draft.degree} onChange={(e) => setDraft({ ...draft, degree: e.target.value })} />
            </Field>
            <Field label="Periode">
              <TextInput value={draft.period} onChange={(e) => setDraft({ ...draft, period: e.target.value })} placeholder="2021 - 2025" />
            </Field>
            <Field label="Lokasi">
              <TextInput value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
            </Field>
          </div>
          <Field label="Deskripsi">
            <TextArea rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
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
        {content.education.map((edu) => (
          <div key={edu.id} className="glass rounded-xl p-5 border border-theme-cardBorder">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${edu.gradient} text-white shrink-0`}>
                {renderIcon(edu.icon, 18)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold">{edu.school}</h4>
                <p className="text-theme-purple text-xs">{edu.degree}</p>
                <p className="text-theme-muted text-xs mt-0.5">{edu.period} · {edu.location}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Btn variant="ghost" onClick={() => setDraft({ ...edu })}><Pencil size={14} /> Edit</Btn>
              <Btn variant="danger" onClick={() => { if (window.confirm('Hapus data pendidikan ini?')) deleteEducation(edu.id); }}><Trash2 size={14} /></Btn>
            </div>
          </div>
        ))}
        {content.education.length === 0 && (
          <p className="text-theme-muted text-sm text-center py-8 col-span-full">Belum ada data pendidikan.</p>
        )}
      </div>
    </div>
  );
};
