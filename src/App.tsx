/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BabyName, FavoriteName, OnboardingState, SearchFilters } from './types';
import { SAMPLE_NAMES, COPWRITING_TIPS } from './data';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import SearchPage from './components/SearchPage';
import DetailPage from './components/DetailPage';
import GeneratorPage from './components/GeneratorPage';
import FavoritePage from './components/FavoritePage';
import ComparisonPage from './components/ComparisonPage';
import UnlockModal from './components/UnlockModal';
import FeedbackModal from './components/FeedbackModal';

import { Sparkles, Heart, Search, Wand2, Home, Compass, Bookmark, MessageCircle, RefreshCw, X, Lock } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'namakecil_favorites_v1';

// Initial preloaded favorites to enrich the first impression of our premium platform
const DEFAULT_FAVORITES: FavoriteName[] = [
  {
    id: '1', // Aidan
    name: 'Aidan',
    gender: 'L',
    meaning: 'Api kecil yang bersemangat, cerdas, lambang pembawa harapan hangat',
    origin: ['Keltik'],
    nuances: ['Modern', 'Elegan', 'Kuat'],
    notes: 'Suka nama Aidan karena terdengar sangat ramah dan berenergi positif.',
    rating: 5,
    isLoved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3', // Aila
    name: 'Aila',
    gender: 'P',
    meaning: 'Cahaya pembawa kedamaian yang suci, berkilau seperti rembulan malam',
    origin: ['Keltik'],
    nuances: ['Lembut', 'Modern', 'Unik'],
    notes: 'Nama Aila sangat anggun dan cantik sekali.',
    rating: 4,
    isLoved: false,
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [view, setView] = useState<'landing' | 'onboarding' | 'cari' | 'detail' | 'favorit' | 'generator' | 'bandingkan'>('landing');
  const [selectedNameId, setSelectedNameId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteName[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [onboardingPref, setOnboardingPref] = useState<OnboardingState | null>(null);
  
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('namakecil_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  
  // Feed filters into Search dynamically (Preset from Onboarding)
  const [searchFilterPreset, setSearchFilterPreset] = useState<Partial<SearchFilters> | undefined>(undefined);

  // Load favorites from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as FavoriteName[];
        // Auto-heal/migrate if it has the older preloads
        const hasOldPreloads = parsed.some(f => f.name === 'Kenzo' || f.name === 'Kirana');
        if (hasOldPreloads) {
          saveFavoritesToStorage(DEFAULT_FAVORITES);
        } else {
          setFavorites(parsed);
        }
      } else {
        setFavorites(DEFAULT_FAVORITES);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_FAVORITES));
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
      setFavorites(DEFAULT_FAVORITES);
    }
  }, []);

  // Save favorites helper
  const saveFavoritesToStorage = (updatedList: FavoriteName[]) => {
    setFavorites(updatedList);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  };

  // Toggle favorite on individual database name entries
  const handleToggleFavorite = (id: string) => {
    const isAlreadyFavorited = favorites.some((f) => f.id === id);
    if (isAlreadyFavorited) {
      const updated = favorites.filter((f) => f.id !== id);
      saveFavoritesToStorage(updated);
    } else {
      const nameObj = SAMPLE_NAMES.find((n) => n.id === id);
      if (!nameObj) return;

      const newFav: FavoriteName = {
        id: nameObj.id,
        name: nameObj.name,
        gender: nameObj.gender,
        meaning: nameObj.meaning,
        origin: nameObj.origin,
        nuances: nameObj.nuances,
        notes: '',
        rating: 3,
        isLoved: false,
        createdAt: new Date().toISOString()
      };

      saveFavoritesToStorage([...favorites, newFav]);
    }
  };

  // Add custom combined names generated dynamically
  const handleAddCustomFavorite = (customFav: FavoriteName) => {
    const isExist = favorites.some(f => f.name.toLowerCase() === customFav.name.toLowerCase());
    if (isExist) return; // Prevent duplicates
    saveFavoritesToStorage([...favorites, customFav]);
  };

  // Update notes on a saved shortlist favorite
  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = favorites.map((f) => (f.id === id ? { ...f, notes } : f));
    saveFavoritesToStorage(updated);
  };

  // Update the rating star level (1 to 5)
  const handleUpdateRating = (id: string, rating: number) => {
    const updated = favorites.map((f) => (f.id === id ? { ...f, rating } : f));
    saveFavoritesToStorage(updated);
  };

  // Remove bookmark directly from Shortlist view card
  const handleRemoveFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    saveFavoritesToStorage(updated);
  };

  // Star pinned love toggle
  const handleToggleLove = (id: string) => {
    const updated = favorites.map((f) => (f.id === id ? { ...f, isLoved: !f.isLoved } : f));
    saveFavoritesToStorage(updated);
  };

  // Complete onboarding sequence
  const handleOnboardingComplete = (pref: OnboardingState) => {
    setOnboardingPref(pref);
    
    // Automatically prepare filters based on the choices
    const preset: Partial<SearchFilters> = {
      gender: pref.gender,
      initialLetter: pref.initialLetter,
      origin: pref.origins.length > 0 ? pref.origins[0] : 'ALL',
      nuance: pref.nuances.length > 0 ? pref.nuances[0] : 'ALL'
    };
    
    setSearchFilterPreset(preset);
    setView('cari');
  };

  // Trigger detailed side-by-side comparative chart screen
  const handleTriggerCompare = (ids: string[]) => {
    setCompareIds(ids);
    setView('bandingkan');
  };

  // Select a baby name to open details view
  const handleSelectName = (id: string) => {
    setSelectedNameId(id);
    setView('detail');
  };

  // Get active name item detail object
  const activeNameItem = selectedNameId 
    ? (SAMPLE_NAMES.find(n => n.id === selectedNameId) || null) 
    : null;

  // Curate a small dynamic footer tip at bottom of application
  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % COPWRITING_TIPS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-dark flex flex-col justify-between" id="applet-root">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <header className="no-print bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-brand-mint/60" id="main-header">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            onClick={() => setView('landing')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="brand-logo"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-teal flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-brand-teal/20">
              N
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-display font-bold text-lg text-brand-dark group-hover:text-brand-teal transition-colors">
                  Nama Kecil
                </h1>
                {isUnlocked ? (
                  <span className="text-[9px] bg-amber-500 text-white font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs shadow-amber-500/10 animate-bounce">
                    PREMIUM
                  </span>
                ) : (
                  <span className="text-[9px] bg-amber-50/80 border border-amber-200 text-amber-700 font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                    GRATIS
                  </span>
                )}
              </div>
              <a 
                href="https://temanparenting.web.id/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-brand-teal tracking-wide font-semibold uppercase hover:underline"
              >
                by Teman Parenting
              </a>
            </div>
          </div>

          {/* Mobile Feedback Trigger Button */}
          <button
            id="mobile-btn-feedback"
            onClick={() => setIsFeedbackModalOpen(true)}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-mint/50 hover:bg-brand-mint text-brand-teal text-xs font-semibold select-none transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Saran</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
            <button
              id="nav-btn-home"
              onClick={() => setView('landing')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                view === 'landing' ? 'bg-brand-mint text-brand-teal' : 'text-brand-darklight hover:bg-slate-50'
              }`}
            >
              Beranda
            </button>
            <button
              id="nav-btn-cari"
              onClick={() => {
                setSearchFilterPreset({ gender: 'ALL' });
                setView('cari');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                view === 'cari' || view === 'detail' ? 'bg-brand-mint text-brand-teal' : 'text-brand-darklight hover:bg-slate-50'
              }`}
            >
              Rujukan Nama
            </button>
            <button
              id="nav-btn-generator"
              onClick={() => setView('generator')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                view === 'generator' ? 'bg-brand-cream text-orange-650' : 'text-brand-darklight hover:bg-slate-50'
              }`}
            >
              Rangkai Kombinasi
            </button>
            <button
              id="nav-btn-favorit"
              onClick={() => setView('favorit')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                view === 'favorit' || view === 'bandingkan' ? 'bg-brand-lavender text-purple-700' : 'text-brand-darklight hover:bg-slate-50'
              }`}
            >
              Shortlist
              {favorites.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-purple-600 text-[9px] text-white flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              id="nav-btn-feedback"
              onClick={() => setIsFeedbackModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-darklight hover:bg-brand-mint/20 hover:text-brand-teal transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Saran & Masukan
            </button>
          </nav>
        </div>
      </header>

      {/* 2. DYNAMIC MAIN LAYOUT PANELS */}
      <main className="flex-1 pb-24 md:pb-12" id="main-content-area">
        {view === 'landing' && (
          <LandingPage
            onStartSearch={() => {
              setSearchFilterPreset({ gender: 'ALL' });
              setView('cari');
            }}
            onStartOnboarding={() => setView('onboarding')}
            onGoToPopular={() => {
              setSearchFilterPreset({ gender: 'ALL' });
              setView('cari');
            }}
          />
        )}

        {view === 'onboarding' && (
          <Onboarding
            onComplete={handleOnboardingComplete}
            onCancel={() => setView('landing')}
          />
        )}

        {view === 'cari' && (
          <SearchPage
            names={SAMPLE_NAMES}
            favorites={favorites.map((f) => f.id)}
            onToggleFavorite={handleToggleFavorite}
            onSelectName={handleSelectName}
            initialFilters={searchFilterPreset}
            isUnlocked={isUnlocked}
            onOpenUnlockModal={() => setIsUnlockModalOpen(true)}
          />
        )}

        {view === 'detail' && (
          <DetailPage
            nameItem={activeNameItem}
            favorites={favorites.map((f) => f.id)}
            onToggleFavorite={handleToggleFavorite}
            onBack={() => setView('cari')}
          />
        )}

        {view === 'generator' && (
          <GeneratorPage
            favorites={favorites}
            names={SAMPLE_NAMES}
            onAddCustomFavorite={handleAddCustomFavorite}
            favoritedIds={favorites.map(f => f.id)}
            isUnlocked={isUnlocked}
          />
        )}

        {view === 'favorit' && (
          <FavoritePage
            favorites={favorites}
            onUpdateNotes={handleUpdateNotes}
            onUpdateRating={handleUpdateRating}
            onRemoveFavorite={handleRemoveFavorite}
            onToggleLove={handleToggleLove}
            onTriggerCompare={handleTriggerCompare}
            onGoToSearch={() => setView('cari')}
          />
        )}

        {view === 'bandingkan' && (
          <ComparisonPage
            compareIds={compareIds}
            favorites={favorites}
            onBack={() => setView('favorit')}
            onUpdateRating={handleUpdateRating}
          />
        )}
      </main>

      {/* 3. DYNAMIC PARENTING WISDOM BANNER FOOTER (Desktop only) */}
      <div className="no-print hidden md:block bg-brand-cream/45 border-t border-brand-cream/80 py-3 text-center text-xs text-brand-darklight/90" id="parenting-tip-ticker">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 px-4 transition-all duration-500 font-serif italic text-orange-950">
          <MessageCircle className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{COPWRITING_TIPS[tipIndex]}</span>
        </div>
      </div>

      {/* 4. RESPONSIVE BOTTOM MOBILE FOOTER MENU */}
      <footer className="no-print md:hidden bg-white/95 border-t border-slate-150/80 fixed bottom-0 left-0 right-0 py-2.5 px-6 flex items-center justify-around z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.031)]" id="mobile-nav-bar">
        <button
          id="mob-btn-home"
          onClick={() => setView('landing')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all ${
            view === 'landing' ? 'text-brand-teal' : 'text-brand-darklight/60'
          }`}
        >
          <Home className="w-5 h-5" />
          Beranda
        </button>

        <button
          id="mob-btn-cari"
          onClick={() => {
            setSearchFilterPreset({ gender: 'ALL' });
            setView('cari');
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all ${
            view === 'cari' || view === 'detail' ? 'text-brand-teal' : 'text-brand-darklight/60'
          }`}
        >
          <Compass className="w-5 h-5" />
          Cari Rujukan
        </button>

        <button
          id="mob-btn-generator"
          onClick={() => setView('generator')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all ${
            view === 'generator' ? 'text-brand-teal' : 'text-brand-darklight/60'
          }`}
        >
          <Wand2 className="w-5 h-5" />
          Rangkai Nama
        </button>

        <button
          id="mob-btn-favorit"
          onClick={() => setView('favorit')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all relative ${
            view === 'favorit' || view === 'bandingkan' ? 'text-brand-teal' : 'text-brand-darklight/60'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          Shortlist
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-purple-600 text-[8px] font-black text-white rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>
      </footer>

      <UnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onUnlockSuccess={() => setIsUnlocked(true)}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
}
