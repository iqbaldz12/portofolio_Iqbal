import { useState } from 'react';
import { Save } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { Btn, Field, TextInput, TagsInput, SectionTitle } from '../../../components/admin/ui';

export const HeroEditor = () => {
  const { content, updateHero } = useContent();
  const [hero, setHero] = useState(content.hero);
  const [savedMsg, setSavedMsg] = useState(false);

  const save = () => {
    updateHero(hero);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 1500);
  };

  const pj = hero.profileJson;

  return (
    <div>
      <SectionTitle title="Hero" subtitle="Kelola bagian utama (landing) halaman" />

      <div className="glass rounded-xl p-6 border border-theme-cardBorder space-y-4">
        <Field label="Badge (teks 'Open to opportunities')">
          <TextInput value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nama (baris pertama)">
            <TextInput value={hero.name} onChange={(e) => setHero({ ...hero, name: e.target.value })} />
          </Field>
          <Field label="Nama Highlight (baris kedua, gradient)">
            <TextInput value={hero.nameHighlight} onChange={(e) => setHero({ ...hero, nameHighlight: e.target.value })} />
          </Field>
        </div>
        <Field label="Teks Animasi Ketik (pisahkan dengan koma)">
          <TagsInput
            value={hero.typeSequences}
            onChange={(typeSequences) => setHero({ ...hero, typeSequences })}
            placeholder="Laravel Developer, Backend Engineer"
          />
        </Field>

        <div className="pt-2 border-t border-theme-cardBorder">
          <h3 className="text-white font-semibold my-3">Terminal profile.json</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="name">
              <TextInput value={pj.name} onChange={(e) => setHero({ ...hero, profileJson: { ...pj, name: e.target.value } })} />
            </Field>
            <Field label="role">
              <TextInput value={pj.role} onChange={(e) => setHero({ ...hero, profileJson: { ...pj, role: e.target.value } })} />
            </Field>
            <Field label="location">
              <TextInput value={pj.location} onChange={(e) => setHero({ ...hero, profileJson: { ...pj, location: e.target.value } })} />
            </Field>
            <Field label="available">
              <select
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-theme-cardBorder text-white text-sm focus:outline-none focus:border-theme-purple/50"
                value={pj.available ? 'true' : 'false'}
                onChange={(e) => setHero({ ...hero, profileJson: { ...pj, available: e.target.value === 'true' } })}
              >
                <option value="true" className="bg-theme-bg">true</option>
                <option value="false" className="bg-theme-bg">false</option>
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="stack (pisahkan dengan koma)">
              <TagsInput value={pj.stack} onChange={(stack) => setHero({ ...hero, profileJson: { ...pj, stack } })} />
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Btn onClick={save}><Save size={16} /> Simpan</Btn>
          {savedMsg && <span className="text-green-400 text-sm">Tersimpan ✓</span>}
        </div>
      </div>
    </div>
  );
};
