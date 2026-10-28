import { useState } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import type { ContactInfoItem, SocialLinkItem } from '../../../data/types';
import { renderIcon } from '../../../data/icons';
import { Btn, Field, TextInput, IconPicker, SectionTitle } from '../../../components/admin/ui';

type InfoDraft = Omit<ContactInfoItem, 'id'> & { id?: string };
type SocialDraft = Omit<SocialLinkItem, 'id'> & { id?: string };

const emptyInfo: InfoDraft = { icon: 'Mail', label: '', value: '', href: '' };
const emptySocial: SocialDraft = { icon: 'Github', label: '', href: '', color: 'hover:text-white' };

export const ContactEditor = () => {
  const {
    content,
    updateContactEmail,
    addContactInfo,
    updateContactInfo,
    deleteContactInfo,
    addSocial,
    updateSocial,
    deleteSocial,
  } = useContent();

  const contact = content.contact;
  const [email, setEmail] = useState(contact.email);
  const [savedMsg, setSavedMsg] = useState(false);
  const [infoDraft, setInfoDraft] = useState<InfoDraft | null>(null);
  const [socialDraft, setSocialDraft] = useState<SocialDraft | null>(null);

  const saveEmail = () => {
    updateContactEmail(email);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 1500);
  };

  const saveInfo = () => {
    if (!infoDraft) return;
    if (infoDraft.id) updateContactInfo(infoDraft as ContactInfoItem);
    else addContactInfo(infoDraft);
    setInfoDraft(null);
  };

  const saveSocial = () => {
    if (!socialDraft) return;
    if (socialDraft.id) updateSocial(socialDraft as SocialLinkItem);
    else addSocial(socialDraft);
    setSocialDraft(null);
  };

  return (
    <div>
      <SectionTitle title="Contact" subtitle="Kelola email tujuan, info kontak, dan media sosial" />

      {/* Target email */}
      <div className="glass rounded-xl p-6 border border-theme-cardBorder mb-6 space-y-4">
        <Field label="Email Tujuan (untuk form kontak)">
          <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <div className="flex items-center gap-3">
          <Btn onClick={saveEmail}><Save size={16} /> Simpan Email</Btn>
          {savedMsg && <span className="text-green-400 text-sm">Tersimpan ✓</span>}
        </div>
      </div>

      {/* Contact info */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Info Kontak</h3>
        {!infoDraft && <Btn onClick={() => setInfoDraft({ ...emptyInfo })}><Plus size={16} /> Tambah</Btn>}
      </div>

      {infoDraft && (
        <div className="glass rounded-xl p-6 border border-theme-purple/30 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Ikon"><IconPicker value={infoDraft.icon} onChange={(icon) => setInfoDraft({ ...infoDraft, icon })} /></Field>
            <Field label="Label"><TextInput value={infoDraft.label} onChange={(e) => setInfoDraft({ ...infoDraft, label: e.target.value })} placeholder="Email" /></Field>
            <Field label="Nilai"><TextInput value={infoDraft.value} onChange={(e) => setInfoDraft({ ...infoDraft, value: e.target.value })} /></Field>
            <Field label="Link (href)"><TextInput value={infoDraft.href} onChange={(e) => setInfoDraft({ ...infoDraft, href: e.target.value })} placeholder="mailto:... / tel:... / #" /></Field>
          </div>
          <div className="flex gap-3">
            <Btn onClick={saveInfo}><Save size={16} /> Simpan</Btn>
            <Btn variant="ghost" onClick={() => setInfoDraft(null)}><X size={16} /> Batal</Btn>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {contact.info.map((item) => (
          <div key={item.id} className="glass rounded-xl p-4 border border-theme-cardBorder flex items-center gap-3">
            <div className="p-2 rounded-lg bg-theme-purple/10 text-theme-purple shrink-0">{renderIcon(item.icon, 18)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-theme-muted">{item.label}</p>
              <p className="text-sm text-white break-all">{item.value}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Btn variant="ghost" onClick={() => setInfoDraft({ ...item })}><Pencil size={14} /></Btn>
              <Btn variant="danger" onClick={() => { if (window.confirm('Hapus item ini?')) deleteContactInfo(item.id); }}><Trash2 size={14} /></Btn>
            </div>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Media Sosial</h3>
        {!socialDraft && <Btn onClick={() => setSocialDraft({ ...emptySocial })}><Plus size={16} /> Tambah</Btn>}
      </div>

      {socialDraft && (
        <div className="glass rounded-xl p-6 border border-theme-purple/30 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Ikon"><IconPicker value={socialDraft.icon} onChange={(icon) => setSocialDraft({ ...socialDraft, icon })} /></Field>
            <Field label="Label"><TextInput value={socialDraft.label} onChange={(e) => setSocialDraft({ ...socialDraft, label: e.target.value })} placeholder="GitHub" /></Field>
            <Field label="Link (href)"><TextInput value={socialDraft.href} onChange={(e) => setSocialDraft({ ...socialDraft, href: e.target.value })} placeholder="https://..." /></Field>
            <Field label="Hover color (class Tailwind)"><TextInput value={socialDraft.color} onChange={(e) => setSocialDraft({ ...socialDraft, color: e.target.value })} placeholder="hover:text-blue-400" /></Field>
          </div>
          <div className="flex gap-3">
            <Btn onClick={saveSocial}><Save size={16} /> Simpan</Btn>
            <Btn variant="ghost" onClick={() => setSocialDraft(null)}><X size={16} /> Batal</Btn>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {contact.socials.map((s) => (
          <div key={s.id} className="glass rounded-xl p-4 border border-theme-cardBorder flex items-center gap-3">
            <div className="p-2 rounded-lg bg-theme-purple/10 text-theme-purple shrink-0">{renderIcon(s.icon, 18)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white">{s.label}</p>
              <p className="text-xs text-theme-muted break-all">{s.href}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Btn variant="ghost" onClick={() => setSocialDraft({ ...s })}><Pencil size={14} /></Btn>
              <Btn variant="danger" onClick={() => { if (window.confirm('Hapus media sosial ini?')) deleteSocial(s.id); }}><Trash2 size={14} /></Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
