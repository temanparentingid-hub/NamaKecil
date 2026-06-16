import React from 'react';
import { Sparkles, Heart, Search, Award, HelpCircle, ArrowRight } from 'lucide-react';
import { SAMPLE_NAMES } from '../data';

interface LandingPageProps {
  onStartSearch: () => void;
  onStartOnboarding: () => void;
  onGoToPopular: () => void;
}

export default function LandingPage({ onStartSearch, onStartOnboarding, onGoToPopular }: LandingPageProps) {
  const popularThree = SAMPLE_NAMES.filter(n => n.isPopular).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 animate-fade-in" id="landing-container">
      {/* Hero Section */}
      <div className="text-center space-y-6 md:space-y-8 mb-16" id="hero-header">
        <a 
          href="https://teman-parenting-1081711046276.asia-southeast1.run.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-mint text-brand-teal text-xs font-semibold tracking-wide hover:bg-brand-mint/90 hover:shadow-sm hover:shadow-brand-teal/10 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
        >
          <Sparkles className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-12" />
          Teman Parenting Present
        </a>
        
        <h1 className="font-display text-4xl md:text-6xl text-brand-dark leading-tight tracking-tight">
          Temukan <span className="text-brand-teal italic font-semibold">Nama Kecil</span> penuh doa untuk si buah hati.
        </h1>
        
        <p className="max-w-xl mx-auto text-brand-darklight text-base md:text-lg leading-relaxed font-light">
          Nama Kecil dirancang sebagai sahabat setia Moms dan Dads untuk merangkai rangkaian nama yang damai, indah, dan selaras dengan nilai keluarga.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4" id="cta-group">
          <button
            id="btn-mulai-onboarding"
            onClick={onStartOnboarding}
            className="w-full sm:w-auto px-8 py-4 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-2xl font-semibold shadow-lg shadow-brand-teal/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Cari Lewat Preferensi (Onboarding)
            <Sparkles className="w-4 h-4" />
          </button>
          
          <button
            id="btn-langsung-cari"
            onClick={onStartSearch}
            className="w-full sm:w-auto px-8 py-4 bg-white border border-brand-teal/20 hover:border-brand-teal text-brand-teal rounded-2xl font-semibold hover:bg-brand-mint/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Semua Rujukan Nama
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-brand-darklight/70 italic max-w-sm mx-auto">
          “Pelan-pelan ya Moms & Dads, nama yang tepat biasanya terasa dekat di hati.”
        </p>
      </div>

      {/* Little illustration block */}
      <div className="bg-brand-mint/40 rounded-3xl p-6 md:p-8 border border-brand-mint flex flex-col md:flex-row items-center gap-6 mb-16" id="brand-warm-intro">
        <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center shrink-0">
          <Heart className="w-8 h-8 text-orange-400 fill-orange-400" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-semibold text-brand-dark text-lg font-display">Mengapa Nama Kecil Terasa Spesial?</h3>
          <p className="text-sm text-brand-darklight leading-relaxed">
            Kami mengurasi nama-nama bayi pilihan berdasarkan berbagai akar kebudayaan dan keyakinan, lengkap dengan makna puitis, ide panggilan akrab, hingga simulasi padanan nama lengkap 2-3 kata.
          </p>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" id="benefits-grid">
        <div className="bg-white p-6 rounded-2xl border border-brand-mint shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-brand-mint/60 flex items-center justify-center text-brand-teal">
            <Search className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-brand-dark">Pencarian Fleksibel</h4>
          <p className="text-xs text-brand-darklight leading-relaxed">
            Filter berbasis gender, abjad awalan, asal bahasa, hingga ke makna mendalam yang ingin disematkan sebagai doa si kecil.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-cream shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-brand-cream/60 flex items-center justify-center text-orange-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-brand-dark">Kombinasi Rangkaian Nama</h4>
          <p className="text-xs text-brand-darklight leading-relaxed">
            Gabungkan nama terpilih secara otomatis menjadi nama lengkap dengan harmoni pelafalan depan, tengah, atau belakang yang pas.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-lavender shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-brand-lavender/60 flex items-center justify-center text-purple-600">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-brand-dark">Bandingkan & Catat</h4>
          <p className="text-xs text-brand-darklight leading-relaxed">
            Simpan kandidat nama terbaik ke Shortlist, tambahkan catatan diskusi dengan pasangan, serta bandingkan kecocokan nama secara berdampingan.
          </p>
        </div>
      </div>

      {/* Trending / Highlighted Baby Names Preview */}
      <div className="space-y-6 mb-16" id="trending-section">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-2xl font-display font-semibold text-brand-dark">Inspirasi Terpopuler Minggu Ini</h2>
            <p className="text-xs text-brand-darklight">
              Pilihan teratas Moms & Dads di komunitas{' '}
              <a 
                href="https://teman-parenting-1081711046276.asia-southeast1.run.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-teal font-semibold hover:underline"
              >
                Teman Parenting
              </a>
              .
            </p>
          </div>
          <button 
            id="link-view-all"
            onClick={onGoToPopular} 
            className="text-sm font-semibold text-brand-teal hover:underline flex items-center gap-1"
          >
            Lihat Semua Nama
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="popular-cards-grid">
          {popularThree.map((item) => (
            <div 
              key={item.id} 
              id={`popular-card-${item.id}`}
              className="bg-white p-5 rounded-2xl border border-brand-mint/50 hover:border-brand-teal/30 transition-all duration-300 space-y-3 cursor-pointer group"
              onClick={onStartSearch}
            >
              <div className="flex justify-between items-center">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                  item.gender === 'L' ? 'bg-blue-50 text-blue-600' :
                  item.gender === 'P' ? 'bg-pink-50 text-pink-600' : 'bg-brand-lavender text-purple-600'
                }`}>
                  {item.gender === 'L' ? 'Laki-laki' : item.gender === 'P' ? 'Perempuan' : 'Universal'}
                </span>
                <span className="text-[10px] font-mono text-brand-darklight/60 bg-brand-offwhite px-2 py-0.5 rounded-md">
                  {item.origin[0]}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-brand-dark group-hover:text-brand-teal transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-brand-darklight line-clamp-2">
                {item.meaning}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {item.nuances.map((nu, idx) => (
                  <span key={`${nu}-${idx}`} className="text-[9px] bg-brand-offwhite text-brand-darklight px-1.5 py-0.5 rounded">
                    # {nu}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warm Disclaimer Box */}
      <div className="bg-amber-50/50 rounded-2xl p-5 border border-brand-cream flex gap-3 text-xs text-amber-900 leading-relaxed" id="disclaimer-note">
        <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">Catatan untuk Moms & Dads</p>
          <p className="text-amber-850">
            Arti dan asal bahasa nama yang tersaji di aplikasi ini bersifat sebagai penambah inspirasi atau rujukan awal. Moms dan Dads disarankan untuk selalu merujuk kembali sesuai nilai-nilai keluarga, adat budaya, serta keyakinan rohani masing-masing agar nama terpilih terasa benar-benar utuh dan bermakna mendalam.
          </p>
        </div>
      </div>
    </div>
  );
}
