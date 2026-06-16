import React from 'react';
import { BabyName } from '../types';
import { Heart, ArrowLeft, Sparkles, AlertCircle, Quote } from 'lucide-react';

interface DetailPageProps {
  nameItem: BabyName | null;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onSelectNuance?: (nuance: string) => void;
}

export default function DetailPage({ nameItem, favorites, onToggleFavorite, onBack }: DetailPageProps) {
  if (!nameItem) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center" id="detail-fallback">
        <p className="text-brand-darklight">Silakan pilih nama dari daftar dulu ya Moms.</p>
        <button id="btn-fallback-back" onClick={onBack} className="mt-4 px-4 py-2 bg-brand-teal text-white rounded-xl">Kembali</button>
      </div>
    );
  }

  const isFav = favorites.includes(nameItem.id);

  // Generate a friendly characteristic impression based on nuances and origin
  const generateImpression = () => {
    const mainNuance = nameItem.nuances[0] || 'Lembut';
    const otherNuances = nameItem.nuances.slice(1).join(' & ');
    return `Anak yang menyandang nama "${nameItem.name}" diharapkan tumbuh menjadi pribadi yang sarat dengan karakter ${mainNuance.toLowerCase()}${otherNuances ? `, sekaligus membawa getaran karakter ${otherNuances.toLowerCase()}` : ''}. Sesuai esensi bahasa ${nameItem.origin.join(' / ')}, nama ini melambangkan ketenangan jiwa, kekuatan budi pekerti, serta keindahan akhlak bagi masa depannya.`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in" id="detail-page-wrapper">
      {/* Back Button */}
      <button
        id="btn-detail-back"
        onClick={onBack}
        className="mb-6 text-xs text-brand-darklight/90 hover:text-brand-teal font-semibold flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Rujukan Nama
      </button>

      {/* Main Name Card */}
      <div className="bg-white rounded-3xl border border-brand-mint shadow-lg overflow-hidden" id="detail-main-card">
        {/* Color stripe for gender */}
        <div className={`h-2.5 ${
          nameItem.gender === 'L' ? 'bg-cyan-400' :
          nameItem.gender === 'P' ? 'bg-pink-400' : 'bg-brand-teal'
        }`} />

        <div className="p-6 md:p-10 space-y-8">
          
          {/* Header Area */}
          <div className="flex justify-between items-start gap-4" id="detail-header-row">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
                  nameItem.gender === 'L' ? 'bg-cyan-50 text-cyan-700' :
                  nameItem.gender === 'P' ? 'bg-pink-50 text-pink-700' : 'bg-brand-lavender text-purple-700'
                }`}>
                  {nameItem.gender === 'L' ? 'Laki-laki' : nameItem.gender === 'P' ? 'Perempuan' : 'Universal'}
                </span>
                
                {nameItem.origin.map(orig => (
                  <span key={orig} className="text-xs font-medium text-brand-darklight/80 bg-brand-offwhite px-2 py-0.5 rounded-md">
                    {orig}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-dark tracking-tight">
                {nameItem.name}
              </h2>
            </div>

            <button
              id="detail-fav-btn"
              onClick={() => onToggleFavorite(nameItem.id)}
              className={`p-3.5 rounded-2xl transition-all shadow-sm ${
                isFav 
                  ? 'bg-red-50 text-red-500 hover:bg-red-100 ring-1 ring-red-200' 
                  : 'bg-brand-offwhite hover:bg-slate-100 text-slate-300 hover:text-red-400'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFav ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          {/* Meaning Section */}
          <div className="space-y-3 bg-brand-offwhite/50 p-6 rounded-2xl border border-slate-50" id="detail-meaning-sec">
            <h4 className="text-xs font-semibold text-brand-darklight/80 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-teal" />
              Arti &amp; Nilai Filosofis
            </h4>
            <div className="relative">
              <Quote className="absolute -left-1.5 -top-1.5 w-6 h-6 text-brand-teal/10 rotate-180" />
              <p className="text-base text-brand-dark leading-relaxed font-serif pl-4 italic">
                {nameItem.meaning}
              </p>
            </div>
          </div>

          {/* Persona impression */}
          <div className="space-y-2" id="detail-impression-sec">
            <h4 className="text-xs font-semibold text-brand-darklight/80 uppercase tracking-wider">Kesan Karakter</h4>
            <p className="text-xs text-brand-darklight leading-relaxed">
              {generateImpression()}
            </p>
          </div>

          {/* Nicknames Grid */}
          <div className="space-y-3" id="detail-nick-sec">
            <h4 className="text-xs font-semibold text-brand-darklight/80 uppercase tracking-wider">Rekomendasi Panggilan Sayang</h4>
            <div className="flex flex-wrap gap-2">
              {nameItem.nickIdeas.map((nick) => (
                <span 
                  key={nick} 
                  id={`nick-badge-${nick}`}
                  className="px-4 py-2 bg-brand-mint text-brand-teal text-xs font-semibold rounded-xl border border-brand-teal/10"
                >
                  {nick}
                </span>
              ))}
            </div>
          </div>

          {/* Character length statistics */}
          <div className="grid grid-cols-1 border-t border-b border-slate-100 py-4 text-xs" id="detail-stats-row">
            <div>
              <span className="text-brand-darklight/70">Panjang Karakter:</span>
              <p className="font-semibold text-brand-dark mt-0.5">{nameItem.length} Huruf (1 Kata)</p>
            </div>
          </div>

          {/* Sample Combinations */}
          <div className="space-y-4" id="detail-combinations-sec">
            <h4 className="text-xs font-semibold text-brand-darklight/80 uppercase tracking-wider">Rekomendasi Rangkaian Nama Lengkap</h4>
            <div className="space-y-2.5">
              {nameItem.combinations.map((comb, index) => (
                <div 
                  key={index} 
                  className="p-3.5 rounded-xl bg-brand-cream/25 border border-brand-cream text-xs text-brand-dark flex justify-between items-center"
                >
                  <span className="font-medium tracking-wide">{comb}</span>
                  <span className="text-[10px] text-brand-darklight bg-white/70 px-2 py-0.5 rounded">Ide {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Caring Parenting Note */}
          <div className="p-4 rounded-xl bg-amber-50/40 border border-brand-cream text-[11px] text-amber-900 leading-relaxed flex gap-2" id="detail-caring-note">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              “Moms & Dads, pastikan pelafalan rangkaian nama lengkap terdengar luwes saat dipanggil keras-keras ya. Nama yang tenang di telinga biasanya juga damai di hati.”
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
