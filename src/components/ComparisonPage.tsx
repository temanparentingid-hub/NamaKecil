import React from 'react';
import { FavoriteName } from '../types';
import { ArrowLeft, Check, Star, HelpCircle, Columns } from 'lucide-react';

interface ComparisonPageProps {
  compareIds: string[];
  favorites: FavoriteName[];
  onBack: () => void;
  onUpdateRating: (id: string, rating: number) => void;
}

export default function ComparisonPage({ compareIds, favorites, onBack, onUpdateRating }: ComparisonPageProps) {
  // Find name details from favorites
  const selectedItems = favorites.filter(item => compareIds.includes(item.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in" id="compare-wrapper">
      {/* Back clicker */}
      <button
        id="btn-compare-back"
        onClick={onBack}
        className="mb-6 text-xs text-brand-darklight/90 hover:text-brand-teal font-semibold flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Shortlist
      </button>

      {/* Intro info */}
      <div className="space-y-2 mb-8" id="compare-intro">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wide">
          <Columns className="w-3.5 h-3.5" />
          Komparasi Seksama
        </span>
        <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-dark">Bandingkan Padanan Nama</h2>
        <p className="text-xs text-brand-darklight">Sandingkan beberapa kandidat nama terkuat secara berdampingan untuk menilai harmoni arti dan getarannya.</p>
      </div>

      {selectedItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border" id="compare-empty-state">
          <p className="text-sm text-brand-darklight">Nama yang dipilih tidak ditemukan atau sudah dihapus.</p>
          <button id="btn-compare-fallback" onClick={onBack} className="mt-4 px-4 py-2 bg-brand-teal text-white rounded-xl">Kembali</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch" id="compare-bento-grid">
          {selectedItems.map((item, idx) => (
            <div 
              key={item.id} 
              id={`compare-column-${item.id}`}
              className="bg-white rounded-3xl border border-brand-mint/60 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Header ribbon */}
                <div className={`h-2 ${
                  item.gender === 'L' ? 'bg-cyan-400' :
                  item.gender === 'P' ? 'bg-pink-400' : 'bg-brand-teal'
                }`} />

                <div className="p-6 space-y-6">
                  {/* Name section */}
                  <div className="space-y-1 text-center pb-4 border-b border-slate-50">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase inline-block ${
                      item.gender === 'L' ? 'bg-cyan-50 text-cyan-700' :
                      item.gender === 'P' ? 'bg-pink-50 text-pink-700' : 'bg-brand-lavender text-purple-700'
                    }`}>
                      {item.gender === 'L' ? 'Laki-laki' : item.gender === 'P' ? 'Perempuan' : 'Universal'}
                    </span>
                    <h3 className="text-2xl font-display font-semibold text-brand-dark pt-1">
                      {item.name}
                    </h3>
                  </div>

                  {/* Star match rate */}
                  <div className="space-y-1 block text-center" id={`compare-rating-sec-${idx}`}>
                    <span className="text-[10px] tracking-wider text-brand-darklight/60 font-semibold block uppercase">Nilai Kecocokan</span>
                    <div className="flex justify-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((starIdx) => (
                        <button
                          key={starIdx}
                          id={`star-compare-${item.id}-${starIdx}`}
                          onClick={() => onUpdateRating(item.id, starIdx)}
                          className="p-0.5"
                        >
                          <Star className={`w-4 h-4 ${starIdx <= item.rating ? 'fill-amber-400 text-amber-400' : 'opacity-20'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Exact details: Meaning */}
                  <div className="space-y-1" id={`compare-meaning-sec-${idx}`}>
                    <span className="text-[10px] tracking-wider text-brand-darklight/60 font-semibold block uppercase">Arti &amp; Filosofi</span>
                    <p className="text-xs text-brand-dark leading-relaxed font-serif italic bg-brand-offwhite/50 p-3 rounded-xl border border-dotted border-slate-250">
                      “{item.meaning}”
                    </p>
                  </div>

                  {/* Cultural origins */}
                  <div className="space-y-1" id={`compare-origins-sec-${idx}`}>
                    <span className="text-[10px] tracking-wider text-brand-darklight/60 font-semibold block uppercase">Bahasa &amp; Nuansa</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.origin.map((o, idx0) => (
                        <span key={`${o}-${idx0}`} className="text-[9px] text-brand-darklight bg-brand-offwhite px-1.5 py-0.5 rounded border border-slate-100">{o}</span>
                      ))}
                      {item.nuances.map((n, idx1) => (
                        <span key={`${n}-${idx1}`} className="text-[9px] text-brand-teal bg-brand-mint/40 px-1.5 py-0.5 rounded font-semibold">#{n}</span>
                      ))}
                    </div>
                  </div>

                  {/* Character stats */}
                  <div className="space-y-1 border-t border-b border-slate-50 py-3 grid grid-cols-2 gap-2 text-[11px]" id={`compare-specs-sec-${idx}`}>
                    <div>
                      <span className="text-brand-darklight/70">Suku Kata:</span>
                      <p className="font-semibold text-brand-dark">{item.name.split(' ').reduce((acc, word) => acc + (word.length > 5 ? 3 : 2), 0)} Suku Kata</p>
                    </div>
                    <div>
                      <span className="text-brand-darklight/70">Panjang Kata:</span>
                      <p className="font-semibold text-brand-dark">{item.name.replace(/\s+/g, '').length} Huruf</p>
                    </div>
                  </div>

                  {/* Personal notes */}
                  <div className="space-y-1 bg-brand-cream/15 p-3 rounded-xl border border-brand-cream/30 text-xs" id={`compare-notes-sec-${idx}`}>
                    <span className="text-[10px] tracking-wider text-brand-darklight/60 font-semibold block uppercase">Catatan Pribadi</span>
                    <p className="text-brand-darklight font-serif italic leading-relaxed pt-0.5">
                      {item.notes ? `“${item.notes}”` : 'Belum menulis catatan pribadi.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Selection confirmation indicators */}
              <div className="p-4 bg-brand-offwhite border-t border-slate-50 text-center flex items-center justify-center gap-1 text-[11px] text-brand-teal font-semibold" id={`compare-footer-sec-${idx}`}>
                <Check className="w-3.5 h-3.5" />
                Masuk Runtunan Shortlist Kita
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gentle parenting note */}
      <div className="mt-8 p-4 rounded-xl bg-amber-50/40 border border-brand-cream text-[11px] text-amber-900 leading-relaxed text-center" id="compare-caring-note">
        <p>
          “Gimana Moms &amp; Dads, kombinasi mana yang getaran maknanya paling pas dengan doa keluarga? Pelan-pelan ya, nama yang indah akan menyentuh hati di saat yang tepat.”
        </p>
      </div>
    </div>
  );
}
