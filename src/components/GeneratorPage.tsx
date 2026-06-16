import React, { useState, useMemo } from 'react';
import { BabyName, FavoriteName, NuanceType } from '../types';
import { SAMPLE_NAMES, ALL_NUANCES, ALL_ORIGINS } from '../data';
import { Sparkles, Heart, Wand2, Info, RefreshCw, Layers } from 'lucide-react';

interface GeneratorPageProps {
  favorites: FavoriteName[];
  names: BabyName[];
  onAddCustomFavorite: (customFav: FavoriteName) => void;
  favoritedIds: string[];
  isUnlocked: boolean;
}

// A collection of beautiful middle and suffix name modifiers for premium synthesis
const PREFIX_MIDDLE_SUFFIX_COMPONENTS: {
  name: string;
  gender: 'L' | 'P' | 'U';
  nuances: NuanceType[];
  origins: string[];
  meaning: string;
}[] = [
  { name: 'Mahardika', gender: 'L', nuances: ['Kuat', 'Elegan'], origins: ['Jawa', 'Indonesia'], meaning: 'berbudi luhur dan merdeka' },
  { name: 'Pratama', gender: 'L', nuances: ['Klasik', 'Kuat'], origins: ['Indonesia'], meaning: 'anak pertama yang paling unggul' },
  { name: 'Danendra', gender: 'L', nuances: ['Elegan', 'Klasik'], origins: ['Sansekerta'], meaning: 'raja yang kaya raya dan bijak' },
  { name: 'Sanjaya', gender: 'L', nuances: ['Klasik', 'Kuat'], origins: ['Jawa', 'Sansekerta'], meaning: 'selamanya berjaya dan pemenang' },
  { name: 'Wijaya', gender: 'L', nuances: ['Klasik'], origins: ['Jawa', 'Indonesia'], meaning: 'kemenangan yang gilang-gemilang' },
  { name: 'Satria', gender: 'L', nuances: ['Kuat', 'Klasik'], origins: ['Indonesia'], meaning: 'pejuang, ksatria yang berani' },
  
  { name: 'Putri', gender: 'P', nuances: ['Klasik', 'Lembut'], origins: ['Indonesia', 'Sansekerta'], meaning: 'anak perempuan yang anggun' },
  { name: 'Putra', gender: 'L', nuances: ['Klasik', 'Kuat'], origins: ['Indonesia', 'Sansekerta'], meaning: 'anak laki-laki yang gagah dan mulia' },
  
  { name: 'Nareswari', gender: 'P', nuances: ['Elegan', 'Klasik'], origins: ['Sansekerta', 'Jawa'], meaning: 'ratu yang jujur dan dihormati' },
  { name: 'Permata', gender: 'P', nuances: ['Lembut', 'Elegan'], origins: ['Indonesia'], meaning: 'batu berharga yang dicintai keluarga' },
  { name: 'Prameswari', gender: 'P', nuances: ['Elegan', 'Klasik'], origins: ['Jawa', 'Sansekerta'], meaning: 'permaisuri utama yang mulia' },
  { name: ' Lestari', gender: 'P', nuances: ['Klasik', 'Lembut'], origins: ['Jawa', 'Indonesia'], meaning: 'abadi, menjaga keindahan budi' },
  { name: 'Kartika', gender: 'P', nuances: ['Klasik', 'Unik'], origins: ['Jawa', 'Sansekerta'], meaning: 'bintang bersinar di langit malam' },
  
  { name: 'Mulia', gender: 'U', nuances: ['Elegan', 'Lembut'], origins: ['Indonesia'], meaning: 'berjiwa luhur, berharga tingi' },
  { name: 'Abadi', gender: 'U', nuances: ['Klasik', 'Kuat'], origins: ['Indonesia'], meaning: 'kekal, berkah yang tak lekang waktu' },
  { name: 'Cahaya', gender: 'U', nuances: ['Lembut', 'Modern'], origins: ['Indonesia'], meaning: 'menerangi sekelilingnya dengan terang' },
  { name: 'Mentari', gender: 'U', nuances: ['Lembut', 'Unik'], origins: ['Indonesia'], meaning: 'matahari pembawa kehidupan hangat' },
  { name: 'Nur', gender: 'U', nuances: ['Islami', 'Lembut'], origins: ['Arab'], meaning: 'sinar petunjuk yang suci' },
  { name: 'Saka', gender: 'U', nuances: ['Unik', 'Klasik'], origins: ['Jawa', 'Modern'], meaning: 'tiang penyangga, kokoh berdiri' }
];

export default function GeneratorPage({ favorites, names, onAddCustomFavorite, favoritedIds, isUnlocked }: GeneratorPageProps) {
  const [selectedBaseId, setSelectedBaseId] = useState<string>('');
  const [numWords, setNumWords] = useState<number>(3);
  const [selectedNuance, setSelectedNuance] = useState<NuanceType | 'ALL'>('ALL');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('ALL');
  const [generatedResults, setGeneratedResults] = useState<{
    id: string;
    fullName: string;
    baseName: string;
    details: string;
    originList: string[];
    nuanceList: NuanceType[];
    gender: 'L' | 'P' | 'U';
    saved: boolean;
  }[]>([]);

  // Get set of fully unlocked name IDs (exactly 2 examples per letter from A-Z under free mode: 1 male and 1 female)
  const unlockedIdsSet = useMemo(() => {
    const set = new Set<string>();
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach((char) => {
      // Find the first male ('L') name starting with 'char'
      const firstMale = names.find(n => {
        const startsWithChar = n.name.trim().charAt(0).toUpperCase() === char;
        return startsWithChar && n.gender === 'L';
      });
      if (firstMale) set.add(firstMale.id);
      
      // Find the first female ('P') name starting with 'char'
      const firstFemale = names.find(n => {
        const startsWithChar = n.name.trim().charAt(0).toUpperCase() === char;
        return startsWithChar && n.gender === 'P';
      });
      if (firstFemale) set.add(firstFemale.id);

      // Fallback: If either firstMale or firstFemale wasn't found, find any names starting with char to make sure we have exactly 2 examples per letter.
      let count = (firstMale ? 1 : 0) + (firstFemale ? 1 : 0);
      if (count < 2) {
        const fallbacks = names.filter(n => n.name.trim().charAt(0).toUpperCase() === char && n.id !== firstMale?.id && n.id !== firstFemale?.id);
        for (let i = 0; i < fallbacks.length && count < 2; i++) {
          set.add(fallbacks[i].id);
          count++;
        }
      }
    });

    return set;
  }, [names]);

  // Choose options for the base name. 
  // It should consist of either favorited items, or the whole list if empty.
  const baseNameOptions = useMemo(() => {
    let rawOptions = favorites.length > 0 
      ? favorites.map(f => ({ id: f.id, name: f.name, gender: f.gender, meaning: f.meaning }))
      : names.map(n => ({ id: n.id, name: n.name, gender: n.gender, meaning: n.meaning }));

    if (isUnlocked) {
      return rawOptions;
    }

    // In free mode, filter selection to only include unlocked names, but ALWAYS preserve any items currently in the users favorites/shortlist!
    rawOptions = rawOptions.filter((opt) => {
      const isInFavorites = favorites.some(f => f.id === opt.id);
      return isInFavorites || unlockedIdsSet.has(opt.id);
    });

    // Fallback if favorites are locked or empty, show standard unlocked names list
    if (rawOptions.length === 0) {
      rawOptions = names
        .filter(n => unlockedIdsSet.has(n.id))
        .map(n => ({ id: n.id, name: n.name, gender: n.gender, meaning: n.meaning }));
    }

    return rawOptions;
  }, [favorites, names, isUnlocked, unlockedIdsSet]);

  // Initialize selected base id if empty or if previously selected id is no longer in options
  React.useEffect(() => {
    if (baseNameOptions.length > 0) {
      const exists = baseNameOptions.some(opt => opt.id === selectedBaseId);
      if (!selectedBaseId || !exists) {
        setSelectedBaseId(baseNameOptions[0].id);
      }
    } else {
      setSelectedBaseId('');
    }
  }, [baseNameOptions, selectedBaseId]);

  const handleGenerate = () => {
    const baseItem = names.find(n => n.id === selectedBaseId) || SAMPLE_NAMES.find(s => s.id === selectedBaseId);
    if (!baseItem) return;

    // Filter secondary and tertiary modifiers by compatibilities
    const pool = PREFIX_MIDDLE_SUFFIX_COMPONENTS.filter(item => {
      // Gender must match
      if (item.gender !== baseItem.gender && item.gender !== 'U' && baseItem.gender !== 'U') {
        return false;
      }
      // Nuance matching if selected
      if (selectedNuance !== 'ALL') {
        if (!item.nuances.includes(selectedNuance)) {
          return false;
        }
      }
      // Origin matching if selected
      if (selectedOrigin !== 'ALL') {
        if (!item.origins.includes(selectedOrigin)) {
          return false;
        }
      }
      return true;
    });

    // Fallback if filter is too restrictive: use the unfiltered components pool matching gender
    const finalPool = pool.length >= 4 
      ? pool 
      : PREFIX_MIDDLE_SUFFIX_COMPONENTS.filter(item => item.gender === baseItem.gender || item.gender === 'U' || baseItem.gender === 'U');

    // Shuffle pool
    const shuffledPool = [...finalPool].sort(() => 0.5 - Math.random());

    // Filter other baby names matching same criteria to join as middle names
    const partnerNamePool = names.filter(n => n.id !== baseItem.id && (n.gender === baseItem.gender || n.gender === 'U' || baseItem.gender === 'U'));
    const shuffledPartnerPool = [...partnerNamePool].sort(() => 0.5 - Math.random());

    const resultList: typeof generatedResults = [];

    // Synthesize 4 combinations
    for (let i = 0; i < 4; i++) {
      const modifier1 = shuffledPool[i % shuffledPool.length];
      const modifier2 = shuffledPartnerPool[i % shuffledPartnerPool.length] || names[0];
      
      let fullName = '';
      let combinedMeaning = '';
      let combinedOrigins = new Set<string>([...baseItem.origin]);
      let combinedNuances = new Set<NuanceType>([...baseItem.nuances]);

      if (numWords === 2) {
        // Option 1 & 3: Base name + Suffix modifier
        // Option 2 & 4: Prefix modifier + Base name
        if (i % 2 === 0) {
          fullName = `${baseItem.name} ${modifier1.name}`;
          combinedMeaning = `${baseItem.meaning}, dirangkaikan dengan sosok yang ${modifier1.meaning}.`;
          modifier1.origins.forEach(o => combinedOrigins.add(o));
          modifier1.nuances.forEach(n => combinedNuances.add(n));
        } else {
          fullName = `${modifier1.name} ${baseItem.name}`;
          combinedMeaning = `Sosok yang ${modifier1.meaning}, sekaligus pembawa ${baseItem.meaning.toLowerCase()}.`;
          modifier1.origins.forEach(o => combinedOrigins.add(o));
          modifier1.nuances.forEach(n => combinedNuances.add(n));
        }
      } else {
        // 3 Words combination
        // Option 1: Base + Modifier + PartnerName
        // Option 2: PartnerName + Base + Modifier
        // Option 3: Base + PartnerName + Modifier
        if (i === 0) {
          fullName = `${baseItem.name} ${modifier1.name} ${modifier2.name}`;
          combinedMeaning = `${baseItem.meaning}, dirangkaikan dengan karakter yang ${modifier1.meaning}, serta memiliki harapan menjadi rujukan ${modifier2.meaning.toLowerCase()}.`;
        } else if (i === 1) {
          fullName = `${modifier2.name} ${baseItem.name} ${modifier1.name}`;
          combinedMeaning = `Membawa rujukan ${modifier2.meaning}, dilengkapi dengan ${baseItem.meaning.toLowerCase()}, berkepribadian ${modifier1.meaning}.`;
        } else {
          fullName = `${baseItem.name} ${modifier2.name} ${modifier1.name}`;
          combinedMeaning = `${baseItem.meaning}, didampingi berkah ${modifier2.meaning.toLowerCase()}, serta berkarakter ${modifier1.meaning}.`;
        }
        
        modifier1.origins.forEach(o => combinedOrigins.add(o));
        modifier1.nuances.forEach(n => combinedNuances.add(n));
        modifier2.origin.forEach(o => combinedOrigins.add(o));
        modifier2.nuances.forEach(n => combinedNuances.add(n));
      }

      resultList.push({
        id: `gen-${selectedBaseId}-${i}-${Date.now()}`,
        fullName,
        baseName: baseItem.name,
        details: combinedMeaning,
        originList: Array.from(combinedOrigins),
        nuanceList: Array.from(combinedNuances).slice(0, 3),
        gender: baseItem.gender,
        saved: false
      });
    }

    setGeneratedResults(resultList);
  };

  const handleSaveCombination = (itemIndex: number) => {
    const rawResult = generatedResults[itemIndex];
    if (!rawResult || rawResult.saved) return;

    // Create a FavoriteName entry
    const newFav: FavoriteName = {
      id: rawResult.id,
      name: rawResult.fullName,
      isCustomCombination: true,
      baseNames: [rawResult.baseName],
      gender: rawResult.gender,
      meaning: rawResult.details,
      origin: rawResult.originList,
      nuances: rawResult.nuanceList,
      notes: 'Dirangkai menggunakan generator kombinasi Nama Kecil.',
      rating: 5,
      isLoved: true,
      createdAt: new Date().toISOString()
    };

    onAddCustomFavorite(newFav);

    // Mark as saved in local state
    const updated = [...generatedResults];
    updated[itemIndex].saved = true;
    setGeneratedResults(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in" id="generator-wrapper">
      
      {/* Intro section */}
      <div className="text-center space-y-3 mb-10" id="generator-intro">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream text-orange-600 text-xs font-semibold tracking-wide">
          <Wand2 className="w-3.5 h-3.5" />
          Rangkai Padu Harmonis
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-dark">
          Generator Kombinasi Nama
        </h2>
        <p className="max-w-xl mx-auto text-xs text-brand-darklight/90 leading-relaxed font-light">
          Rangkai nama panggilan pilihan menjadi rangkaian nama lengkap 2 sampai 3 kata yang indah, merdu diucapkan, serta membawa kedalaman makna bagi masa depannya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="generator-layout">
        
        {/* INPUT PARAMETERS CARD (LEFT side) */}
        <div className="bg-white p-6 rounded-3xl border border-brand-mint shadow-md h-fit space-y-5" id="generator-controls">
          <h3 className="font-semibold text-brand-dark text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-teal" />
            Pengaturan Rangkaian
          </h3>

          {/* Base Name Dropdown Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-semibold text-brand-darklight/90">Nama Dasar/Utama</label>
              {favorites.length === 0 ? (
                <span className="text-[10px] text-orange-500 font-medium">Beralih ke Contoh Nama</span>
              ) : (
                !isUnlocked && <span className="text-[10px] text-amber-600 font-semibold">Mode Gratis</span>
              )}
            </div>
            
            <select
              id="select-gen-base-name"
              value={selectedBaseId}
              onChange={(e) => setSelectedBaseId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-100 bg-brand-offwhite text-xs font-semibold text-brand-dark focus:ring-1 focus:ring-brand-teal outline-none"
            >
              {baseNameOptions.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.name} ({opt.gender === 'L' ? 'Laki-laki' : opt.gender === 'P' ? 'Perempuan' : 'Universal'})
                </option>
              ))}
            </select>
            <p className="text-[10.5px] text-brand-darklight/70">
              * Rangkaian akan dirajut memutari kata utama ini.
            </p>
          </div>

          {/* Word count target */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-darklight/90 uppercase tracking-wider block">Jumlah Kata</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-gen-words-2"
                onClick={() => setNumWords(2)}
                className={`py-2 text-xs font-semibold rounded-lg text-center border transition-all ${
                  numWords === 2 
                    ? 'bg-brand-teal text-white border-brand-teal' 
                    : 'bg-brand-offwhite border-slate-100 text-brand-dark'
                }`}
              >
                2 Kata
              </button>
              <button
                id="btn-gen-words-3"
                onClick={() => setNumWords(3)}
                className={`py-2 text-xs font-semibold rounded-lg text-center border transition-all ${
                  numWords === 3 
                    ? 'bg-brand-teal text-white border-brand-teal' 
                    : 'bg-brand-offwhite border-slate-100 text-brand-dark'
                }`}
              >
                3 Kata
              </button>
            </div>
          </div>

          {/* Suffix Nuance Preference */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-darklight/90 uppercase tracking-wider">Gaya/Nuansa Pendamping</label>
            <select
              id="select-gen-nuance"
              value={selectedNuance}
              onChange={(e) => setSelectedNuance(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-100 bg-brand-offwhite text-xs text-brand-dark font-medium focus:ring-1 focus:ring-brand-teal outline-none"
            >
              <option value="ALL">Semua Nuansa (Acak)</option>
              {ALL_NUANCES.map(nu => (
                <option key={nu.id} value={nu.id}>{nu.name}</option>
              ))}
            </select>
          </div>

          {/* Suffix Origin Preference */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-darklight/90">Asal Bahasa Pendamping</label>
            <select
              id="select-gen-origin"
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-100 bg-brand-offwhite text-xs text-brand-dark font-medium focus:ring-1 focus:ring-brand-teal outline-none"
            >
              <option value="ALL">Semua Bahasa (Acak)</option>
              {ALL_ORIGINS.map(orig => (
                <option key={orig} value={orig}>{orig}</option>
              ))}
            </select>
          </div>

          <button
            id="btn-run-generation"
            onClick={handleGenerate}
            disabled={!selectedBaseId}
            className="w-full py-3 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-teal/10 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Wand2 className="w-4 h-4" />
            Rangkai Kombinasi Sekarang!
          </button>
        </div>

        {/* RESULTS PANEL (RIGHT side) */}
        <div className="flex-1 space-y-4" id="generator-results">
          {generatedResults.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center space-y-4" id="generator-empty-state">
              <div className="w-12 h-12 rounded-full bg-brand-mint/60 flex items-center justify-center mx-auto text-brand-teal">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-brand-dark">Kombinasi Belum Dirangkai</h4>
                <p className="text-xs text-brand-darklight/90 max-w-sm mx-auto leading-relaxed">
                  Pasang atau pilih nama utama Moms di kiri, sesuaikan gaya kata, lalu klik tombol Rangkai Kombinasi untuk memicu harmoni nama puitis.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4" id="generator-results-list">
              <div className="flex justify-between items-baseline px-1">
                <span className="text-xs font-semibold text-brand-dark/80">Hasil Runtunan Kombinasi:</span>
                <span className="text-[10px] text-brand-darklight">Acakan didasarkan pada getaran makna tersemat</span>
              </div>

              {generatedResults.map((item, index) => (
                <div 
                  key={item.id} 
                  id={`generated-item-${index}`}
                  className="bg-white p-5 rounded-3xl border border-brand-mint/40 hover:border-brand-teal/35 hover:shadow-xs transition-all duration-300 space-y-3"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1">
                      <span className="text-[9px] bg-brand-mint text-brand-teal font-extrabold px-1.5 py-0.5 rounded uppercase">Ide #{index + 1}</span>
                      <h3 className="text-xl font-display font-semibold text-brand-dark tracking-wide">{item.fullName}</h3>
                    </div>

                    <button
                      id={`save-gen-combination-${index}`}
                      onClick={() => handleSaveCombination(index)}
                      className={`px-3 py-1.5 text-[10px] font-semibold rounded-xl border transition-all flex items-center gap-1 ${
                        item.saved 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                          : 'bg-white hover:bg-red-55 border-slate-200 hover:border-red-250 text-brand-dark hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.saved ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                      {item.saved ? 'Tersimpan!' : 'Simpan Rangkaian'}
                    </button>
                  </div>

                  <p className="text-xs text-brand-darklight leading-normal bg-brand-offwhite/50 p-3 rounded-xl border border-dotted border-slate-200">
                    <strong className="text-brand-dark font-medium">Gabungan Filosofi:</strong> {item.details}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.originList.map((o, idx0) => (
                      <span key={`${o}-${idx0}`} className="text-[9px] text-brand-darklight font-semibold bg-brand-offwhite border border-slate-100 px-2 py-0.5 rounded-md">{o}</span>
                    ))}
                    {item.nuanceList.map((n, idx1) => (
                      <span key={`${n}-${idx1}`} className="text-[9px] text-brand-teal bg-brand-mint/40 px-2 py-0.5 rounded-md font-medium">#{n}</span>
                    ))}
                  </div>
                </div>
              ))}
              
              <p className="text-center text-[11px] text-brand-darklight/80 italic mt-2">
                “Moms & Dads bisa menekan tombol Rangkai di kiri lagi untuk melahirkan paduan ide baru.”
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
