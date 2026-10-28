import { useState } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { PersonalInfoItem } from '../../../data/types';
import { renderIcon } from '../../../data/icons';
import { Btn, Field, TextInput, TextArea, IconPicker, SectionTitle } from '../../../components/admin/ui';

type InfoDraft = Omit<PersonalInfoItem, 'id'> & { id?: string };

const emptyInfo: InfoDraft = { icon: 'User', label: '', value: '' };

export const AboutEditor = () => {
  const {
    content,
    updateAbout,
    addPersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
  } = useContent();

  const about = content.about;
  const [sectionTag, setSectionTag] = useState(about.sectionTag);
  const [heading, setHeading] = useState(about.heading);
  const [paragraphs, setParagraphs] = useState<string[]>(about.paragraphs);
  const [savedMsg, setSavedMsg] = useState(false);
  const [infoDraft, setInfoDraft] = useState<InfoDraft | null>(null);

  const saveAbout = () => {
    updateAbout({ ...about, sectionTag, heading, paragraphs: paragraphs.filter((p) => p.trim()) });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 1500);
  };

  const saveInfo = () => {
    if (!infoDraft) return;
    if (infoDraft.id) updatePersonalInfo(infoDraft as PersonalInfoItem);
    else addPersonalInfo(infoDraft);
    setInfoDraft(null);
  };

  return (
    <div>
      <SectionTitle title="About" subtitle="Kelola bio dan informasi pribadi" />

      {/* Bio section */}
      <div className="glass rounded-xl p-6 border border-theme-cardBorder mb-6 space-y-4">
        <h3 className="text-white font-semibold">Bio & Judul Bagian</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Section Tag (teks kecil di atas judul)">
            <TextInput value={sectionTag} onChange={(e) => setSectionTag(e.target.value)} />
          </Field>
          <Field label="Judul (diikuti kata 'Me')">
            <TextInput value={heading} onChange={(e) => setHeading(e.target.value)} />
          </Field>
        </div>

        <div>
          <span className="text-xs text-theme-muted mb-1.5 block">Paragraf Bio</span>
          <div className="space-y-3">
            {paragraphs.map((p, idx) => (
              <div key={idx} className="flex gap-2">
                <TextArea
                  rows={3}
                  value={p}
                  onChange={(e) => {
                    const next = [...paragraphs];
                    next[idx] = e.target.value;
                    setParagraphs(next);
                  }}
                />
                <Btn variant="danger" onClick={() => setParagraphs(paragraphs.filter((_, i) => i !== idx))}>
                  <Trash2 size={14} />
                </Btn>
              </div>
            ))}
          </div>
          <Btn variant="ghost" className="mt-3" onClick={() => setParagraphs([...paragraphs, ''])}>
            <Plus size={14} /> Tambah Paragraf
          </Btn>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Btn onClick={saveAbout}><Save size={16} /> Simpan Bio</Btn>
          {savedMsg && <span className="text-green-400 text-sm">Tersimpan ✓</span>}
        </div>
      </div>

      {/* Personal info */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Informasi Pribadi</h3>
        {!infoDraft && <Btn onClick={() => setInfoDraft({ ...emptyInfo })}><Plus size={16} /> Tambah</Btn>}
      </div>

      {infoDraft && (
        <div className="glass rounded-xl p-6 border border-theme-purple/30 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Ikon">
              <IconPicker value={infoDraft.icon} onChange={(icon) => setInfoDraft({ ...infoDraft, icon })} />
            </Field>
            <Field label="Label">
              <TextInput value={infoDraft.label} onChange={(e) => setInfoDraft({ ...infoDraft, label: e.target.value })} placeholder="Location" />
            </Field>
            <Field label="Nilai">
              <TextInput value={infoDraft.value} onChange={(e) => setInfoDraft({ ...infoDraft, value: e.target.value })} placeholder="Bandung, Indonesia" />
            </Field>
          </div>
          <div className="flex gap-3">
            <Btn onClick={saveInfo}><Save size={16} /> Simpan</Btn>
            <Btn variant="ghost" onClick={() => setInfoDraft(null)}><X size={16} /> Batal</Btn>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {about.personalInfo.map((info) => (
          <div key={info.id} className="glass rounded-xl p-4 border border-theme-cardBorder flex items-center gap-3">
            <div className="p-2 rounded-lg bg-theme-purple/10 text-theme-purple shrink-0">{renderIcon(info.icon, 18)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-theme-muted">{info.label}</p>
              <p className="text-sm text-white break-all">{info.value}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Btn variant="ghost" onClick={() => setInfoDraft({ ...info })}><Pencil size={14} /></Btn>
              <Btn variant="danger" onClick={() => { if (window.confirm('Hapus item ini?')) deletePersonalInfo(info.id); }}><Trash2 size={14} /></Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
