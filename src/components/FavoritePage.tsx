import React, { useState } from 'react';
import { FavoriteName } from '../types';
import { Heart, Star, Edit3, Trash2, Printer, Check, ArrowRight, HelpCircle, Columns } from 'lucide-react';

interface FavoritePageProps {
  favorites: FavoriteName[];
  onUpdateNotes: (id: string, notes: string) => void;
  onUpdateRating: (id: string, rating: number) => void;
  onRemoveFavorite: (id: string) => void;
  onToggleLove: (id: string) => void;
  onTriggerCompare: (ids: string[]) => void;
  onGoToSearch: () => void;
}

export default function FavoritePage({
  favorites,
  onUpdateNotes,
  onUpdateRating,
  onRemoveFavorite,
  onToggleLove,
  onTriggerCompare,
  onGoToSearch
}: FavoritePageProps) {
  const [editingId, setEditingId] = useState<string>('');
  const [tempNotes, setTempNotes] = useState<string>('');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'COMBINATION'>('ALL');

  const filteredFavorites = favorites.filter(fav => {
    if (activeTab === 'COMBINATION') return fav.isCustomCombination;
    return true;
  });

  const handleStartEditing = (id: string, currentNotes: string) => {
    setEditingId(id);
    setTempNotes(currentNotes);
  };

  const handleSaveNotes = (id: string) => {
    onUpdateNotes(id, tempNotes);
    setEditingId('');
  };

  // Handle building selected list for comparison
  const handleToggleCompareSelection = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i !== id));
    } else {
      if (selectedForCompare.length >= 3) {
        alert('Moms & Dads hanya bisa membandingkan maksimal 3 nama sekaligus.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const handleCompareClick = () => {
    if (selectedForCompare.length < 2) {
      alert('Pilih minimal 2 nama untuk dibandingkan ya, Moms & Dads.');
      return;
    }
    onTriggerCompare(selectedForCompare);
  };

  const triggerPrintShortlist = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in" id="favorites-wrapper">
      
      {/* Hidden print header */}
      <div className="hidden print:block mb-8 border-b-2 border-brand-teal pb-4 text-center space-y-2 print-only">
        <h1 className="text-3xl font-display font-bold text-teal-600">Shortlist Nama Si Kecil</h1>
        <p className="text-sm text-slate-500 font-medium font-sans">
          Kurasi Pilihan Keluarga persembahan{' '}
          <a
            href="https://teman-parenting-1081711046276.asia-southeast1.run.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 font-semibold hover:underline"
          >
            Teman Parenting
          </a>
        </p>
        <p className="text-xs text-slate-400">Dicetak pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
      </div>

      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 no-print" id="favorites-header">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-dark">Shortlist Pilihan Hati</h2>
          <p className="text-xs text-brand-darklight">Kumpulan nama terbaik yang membisikkan harapan indah di dalam doamu.</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto" id="favorites-global-actions">
          {favorites.length > 0 && (
            <button
              id="btn-print-shortlist"
              onClick={triggerPrintShortlist}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-brand-teal/20 text-brand-teal rounded-xl text-xs font-semibold hover:bg-brand-mint/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Cetak / Ekspor PDF
            </button>
          )}

          <button
            id="btn-favorites-search-more"
            onClick={onGoToSearch}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            Pencarian Nama Baru
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main interaction logic */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 space-y-6 no-print" id="favorites-empty">
          <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mx-auto text-orange-400">
            <Heart className="w-8 h-8 text-orange-400/90" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-brand-dark">Daftar Pilihan Masih Kosong</h3>
            <p className="text-xs text-brand-darklight max-w-sm mx-auto leading-relaxed">
              “Simpan dulu nama yang menarik perhatian, nanti bisa Moms bahas bareng pasangan di waktu santai.”
            </p>
          </div>
          <button
            id="btn-empty-fav-cta"
            onClick={onGoToSearch}
            className="px-6 py-3 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Jelajahi Rujukan Nama
          </button>
        </div>
      ) : (
        <div className="space-y-6" id="favorites-main-panel">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-brand-cream/60 flex flex-col md:flex-row gap-4 justify-between items-center no-print shadow-sm" id="favorites-filter-compare-bar">
            {/* Filter Tabs */}
            <div className="flex gap-1.5 p-1 bg-brand-offwhite rounded-xl border border-slate-200/40 w-full md:w-auto">
              <button
                id="tab-fav-all"
                onClick={() => setActiveTab('ALL')}
                className={`flex-1 md:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-colors text-center ${
                  activeTab === 'ALL' ? 'bg-white text-brand-dark shadow-xs' : 'text-brand-darklight/60 hover:text-brand-dark'
                }`}
              >
                Semua Shortlist ({favorites.length})
              </button>
              <button
                id="tab-fav-combination"
                onClick={() => setActiveTab('COMBINATION')}
                className={`flex-1 md:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-colors text-center ${
                  activeTab === 'COMBINATION' ? 'bg-white text-brand-dark shadow-xs' : 'text-brand-darklight/60 hover:text-brand-dark'
                }`}
              >
                Kombinasi Dirangkai ({favorites.filter(f => f.isCustomCombination).length})
              </button>
            </div>

            {/* Compare Trigger Indicator */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-xs text-brand-darklight">
                Dipilih: <strong className="text-brand-teal">{selectedForCompare.length}/3 nama</strong> untuk dibanding
              </span>
              <button
                id="btn-top-compare-trigger"
                onClick={handleCompareClick}
                disabled={selectedForCompare.length < 2}
                className="px-4 py-2 bg-neutral-900 text-white hover:bg-brand-dark rounded-xl text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-1.5"
              >
                <Columns className="w-3.5 h-3.5" />
                Mulai Bandingkan!
              </button>
            </div>
          </div>

          {/* PRINT-ONLY SIMPLE TABLE LIST */}
          <div className="hidden print:block space-y-6 print-only" id="print-view-table">
            <table className="w-full border-collapse border border-slate-350 text-left text-xs bg-white rounded-lg">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-3 font-semibold">Nama Anak</th>
                  <th className="border border-slate-300 p-3 font-semibold">Gender</th>
                  <th className="border border-slate-300 p-3 font-semibold">Asal / Karakter</th>
                  <th className="border border-slate-300 p-3 font-semibold">Arti &amp; Nilai Filosofis Doa</th>
                  <th className="border border-slate-300 p-3 font-semibold">Catatan Kita</th>
                </tr>
              </thead>
              <tbody>
                {filteredFavorites.map((fav) => (
                  <tr key={fav.id}>
                    <td className="border border-slate-300 p-3 font-bold text-sm text-slate-900">{fav.name}</td>
                    <td className="border border-slate-300 p-3 font-medium">
                      {fav.gender === 'L' ? 'Laki-laki' : fav.gender === 'P' ? 'Perempuan' : 'Universal'}
                    </td>
                    <td className="border border-slate-300 p-3 leading-relaxed text-slate-600">
                      Asal: {fav.origin.join(', ')}<br />Nuansa: {fav.nuances.join(', ')}
                    </td>
                    <td className="border border-slate-300 p-3 leading-relaxed text-slate-800 italic">{fav.meaning}</td>
                    <td className="border border-slate-300 p-3 text-slate-600 italic">{fav.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* INTERACTIVE CARDS GRID (NO-PRINT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-print" id="favorites-cards-grid">
            {filteredFavorites.map((fav) => {
              const isSelected = selectedForCompare.includes(fav.id);
              return (
                <div
                  key={fav.id}
                  id={`fav-card-${fav.id}`}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative shadow-sm ${
                    isSelected ? 'border-brand-teal ring-2 ring-brand-teal/15 bg-brand-mint/5' : 'border-brand-mint/50'
                  }`}
                >
                  
                  {/* Select button for comparison */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      id={`love-btn-${fav.id}`}
                      onClick={() => onToggleLove(fav.id)}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-slate-50 transition-colors"
                      title={fav.isLoved ? 'Hapus dari Bintang Favorit Utama' : 'Suka Sekali! Pin ke Puncak'}
                    >
                      <Star className={`w-4 h-4 ${fav.isLoved ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                    </button>

                    <button
                      id={`compare-check-${fav.id}`}
                      onClick={() => handleToggleCompareSelection(fav.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all border ${
                        isSelected 
                          ? 'bg-brand-teal text-white border-brand-teal' 
                          : 'bg-brand-offwhite text-brand-dark border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {isSelected ? '✓ Terpilih' : '+ Banding'}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 pr-20">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide uppercase ${
                          fav.gender === 'L' ? 'bg-cyan-50 text-cyan-600' :
                          fav.gender === 'P' ? 'bg-pink-50 text-pink-600' : 'bg-brand-lavender text-purple-600'
                        }`}>
                          {fav.gender === 'L' ? 'Laki-laki' : fav.gender === 'P' ? 'Perempuan' : 'Universal'}
                        </span>
                        
                        {fav.isCustomCombination && (
                          <span className="text-[9px] bg-brand-cream/80 text-orange-600 px-2 py-0.5 rounded font-extrabold">Rangkaian</span>
                        )}
                      </div>

                      <h3 className="text-xl font-display font-medium text-brand-dark">
                        {fav.name}
                      </h3>
                      
                      <p className="text-xs text-brand-darklight leading-relaxed font-light font-serif italic">
                        “{fav.meaning}”
                      </p>
                    </div>

                    {/* Metadata chips */}
                    <div className="flex flex-wrap gap-1">
                      {fav.origin.map((o, idx0) => (
                        <span key={`${o}-${idx0}`} className="text-[9px] text-brand-darklight bg-brand-offwhite px-1.5 py-0.5 rounded">{o}</span>
                      ))}
                      {fav.nuances.map((n, idx1) => (
                        <span key={`${n}-${idx1}`} className="text-[9px] text-brand-teal bg-brand-mint/40 px-1.5 py-0.5 rounded font-medium">#{n}</span>
                      ))}
                    </div>

                    {/* User Rating logic */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-semibold text-brand-darklight/80">Kecocokan Kita:</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((starIdx) => (
                          <button
                            key={starIdx}
                            id={`star-btn-${fav.id}-${starIdx}`}
                            onClick={() => onUpdateRating(fav.id, starIdx)}
                            className="p-0.5 group"
                          >
                            <Star className={`w-3.5 h-3.5 transition-all text-amber-400 ${starIdx <= fav.rating ? 'fill-amber-400' : 'opacity-20 hover:opacity-100'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes Box Section */}
                    <div className="bg-brand-offwhite p-3 rounded-2xl border border-slate-100 text-xs">
                      {editingId === fav.id ? (
                        <div className="space-y-2">
                          <textarea
                            id={`textarea-notes-${fav.id}`}
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            placeholder="Tulis kesan Moms di sini..."
                            className="w-full p-2 bg-white rounded-lg border border-slate-200 outline-none text-xs text-brand-dark h-16"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              id={`cancel-notes-${fav.id}`}
                              onClick={() => setEditingId('')}
                              className="px-2.5 py-1 text-[10px] border border-slate-200 rounded-md font-medium text-slate-500"
                            >
                              Batal
                            </button>
                            <button
                              id={`save-notes-${fav.id}`}
                              onClick={() => handleSaveNotes(fav.id)}
                              className="px-2.5 py-1 text-[10px] bg-brand-teal text-white rounded-md font-medium flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Simpan
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-0.5 leading-relaxed">
                            <p className="text-[10px] uppercase tracking-wider text-brand-darklight/60 font-semibold">Refleksi kita:</p>
                            <p className="text-brand-darklight font-serif italic">
                              {fav.notes || 'Belum ada catatan pribadi. Tulis di sini yuk Moms...'}
                            </p>
                          </div>
                          <button
                            id={`edit-notes-btn-${fav.id}`}
                            onClick={() => handleStartEditing(fav.id, fav.notes)}
                            className="p-1 text-slate-400 hover:text-brand-teal"
                            title="Edit Catatan"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex justify-end pt-4 border-t border-slate-50 mt-4">
                    <button
                      id={`delete-fav-btn-${fav.id}`}
                      onClick={() => {
                        if (confirm('Apakah Moms & Dads yakin ingin menghapus nama ini dari Shortlist?')) {
                          onRemoveFavorite(fav.id);
                        }
                      }}
                      className="text-[10px] text-red-500 hover:text-red-650 font-semibold flex items-center gap-1 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus Rujukan
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Supportive Disclaimer Card */}
          <div className="bg-brand-mint/20 border border-brand-mint/70 rounded-3xl p-5 text-center leading-relaxed text-xs text-brand-darklight/90 no-print" id="favorites-parenting-tip">
            <p>
              “Ingat ya Moms & Dads, tidak perlu buru-buru memutuskan. Pilihlah nama yang terasa memberikan getaran kehangatan dan rasa damai saat diucapkan lisan bersama.”
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
