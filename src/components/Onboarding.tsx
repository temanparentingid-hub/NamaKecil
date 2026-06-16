import React, { useState } from 'react';
import { OnboardingState, GenderType, NuanceType } from '../types';
import { ALL_ORIGINS, ALL_NUANCES } from '../data';
import { Sparkles, Heart, ArrowRight, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: (preferences: OnboardingState) => void;
  onCancel: () => void;
}

export default function Onboarding({ onComplete, onCancel }: OnboardingProps) {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  const [gender, setGender] = useState<GenderType>('U');
  const [initialLetter, setInitialLetter] = useState<string>('');
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedNuances, setSelectedNuances] = useState<NuanceType[]>([]);
  const [numWords, setNumWords] = useState<number>(2);

  const startAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleToggleOrigin = (origin: string) => {
    if (selectedOrigins.includes(origin)) {
      setSelectedOrigins(selectedOrigins.filter(o => o !== origin));
    } else {
      setSelectedOrigins([...selectedOrigins, origin]);
    }
  };

  const handleToggleNuance = (nuance: NuanceType) => {
    if (selectedNuances.includes(nuance)) {
      setSelectedNuances(selectedNuances.filter(n => n !== nuance));
    } else {
      setSelectedNuances([...selectedNuances, nuance]);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({
        gender,
        initialLetter,
        origins: selectedOrigins,
        numWords,
        nuances: selectedNuances,
        completed: true
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onCancel();
    }
  };

  const handleSkipAll = () => {
    onComplete({
      gender: 'U',
      initialLetter: '',
      origins: [],
      numWords: 2,
      nuances: [],
      completed: true
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in" id="onboarding-container">
      {/* Card Header & Step Indicator */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-brand-mint shadow-xl space-y-8" id="onboarding-card">
        <div className="flex justify-between items-center" id="onboarding-step-indicator">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-brand-teal tracking-wider uppercase">Langkah {step} dari {totalSteps}</span>
            <div className="flex gap-1.5 pt-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i + 1 === step ? 'w-8 bg-brand-teal' : i + 1 < step ? 'w-2 bg-brand-teal/40' : 'w-2 bg-slate-100'
                  }`} 
                />
              ))}
            </div>
          </div>
          
          <button 
            id="btn-skip-onboarding"
            onClick={handleSkipAll} 
            className="text-xs text-brand-darklight/60 hover:text-brand-teal font-medium hover:underline"
          >
            Lewati Semua Langkah
          </button>
        </div>

        {/* Dynamic Steps */}
        <div className="min-h-[280px]" id="onboarding-step-content">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in" id="step-1">
              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-brand-dark">Pilih Gender Bayi Terlebih Dahulu</h2>
                <p className="text-sm text-brand-darklight">Apakah Moms & Dads mendambakan bayi laki-laki, perempuan, atau ingin melihat kedua referensinya secara universal?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <button
                  id="gender-opt-l"
                  onClick={() => setGender('L')}
                  className={`p-6 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center gap-3 ${
                    gender === 'L' 
                      ? 'border-cyan-400 bg-cyan-50/40 text-cyan-900 ring-2 ring-cyan-400/20' 
                      : 'border-slate-100 hover:border-slate-300 text-brand-dark'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${gender === 'L' ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-cyan-500'}`}>
                    <span className="text-xl font-bold">L</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Laki-Laki</h4>
                    <p className="text-[11px] text-brand-darklight mt-0.5">Tegas & Gagah</p>
                  </div>
                </button>

                <button
                  id="gender-opt-p"
                  onClick={() => setGender('P')}
                  className={`p-6 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center gap-3 ${
                    gender === 'P' 
                      ? 'border-pink-400 bg-pink-50/40 text-pink-900 ring-2 ring-pink-400/20' 
                      : 'border-slate-100 hover:border-slate-300 text-brand-dark'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${gender === 'P' ? 'bg-pink-500 text-white' : 'bg-slate-100 text-pink-500'}`}>
                    <span className="text-xl font-bold">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Perempuan</h4>
                    <p className="text-[11px] text-brand-darklight mt-0.5">Cantik & Lembut</p>
                  </div>
                </button>

                <button
                  id="gender-opt-u"
                  onClick={() => setGender('U')}
                  className={`p-6 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center gap-3 ${
                    gender === 'U' 
                      ? 'border-brand-teal bg-brand-mint/30 text-brand-dark' 
                      : 'border-slate-100 hover:border-slate-300 text-brand-dark'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${gender === 'U' ? 'bg-brand-teal text-white' : 'bg-slate-100 text-brand-teal'}`}>
                    <span className="text-xl font-bold">U</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Universal / Kedua</h4>
                    <p className="text-[11px] text-brand-darklight mt-0.5 font-light">Luwis & Unik</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in" id="step-2">
              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-brand-dark">Adakah Awalan Huruf Tertentu?</h2>
                <p className="text-sm text-brand-darklight">Pajang inisial impian, atau lewati jika Moms ingin melihat referensi dari semua abjad.</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto p-2 border border-slate-100 rounded-2xl bg-brand-offwhite/50">
                  <button
                    id="initial-opt-none"
                    onClick={() => setInitialLetter('')}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                      initialLetter === '' 
                        ? 'bg-brand-teal text-white'
                        : 'bg-white text-brand-dark border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Semua Abjad
                  </button>
                  {startAlphabet.map(char => (
                    <button
                      key={char}
                      id={`initial-opt-${char}`}
                      onClick={() => setInitialLetter(char)}
                      className={`w-9 h-9 text-xs font-semibold rounded-xl transition-all flex items-center justify-center ${
                        initialLetter === char 
                          ? 'bg-brand-teal text-white'
                          : 'bg-white text-brand-dark border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {char}
                    </button>
                  ))}
                </div>
                
                <p className="text-xs text-brand-darklight/80 italic">
                  {initialLetter ? `Moms & Dads memilih awalan huruf: "${initialLetter}"` : 'Menampilkan seluruh abjad rujukan.'}
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in" id="step-3">
              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-brand-dark">Pilih Asal Bahasa Rujukan</h2>
                <p className="text-sm text-brand-darklight">Moms bisa memilih lebih dari satu rujukan bahasa atau asal kebudayaan.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                {ALL_ORIGINS.map((orig) => {
                  const isSelected = selectedOrigins.includes(orig);
                  return (
                    <button
                      key={orig}
                      id={`origin-opt-${orig}`}
                      onClick={() => handleToggleOrigin(orig)}
                      className={`px-4 py-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        isSelected 
                          ? 'bg-brand-teal border-brand-teal text-white shadow-sm' 
                          : 'bg-white border-slate-100 hover:border-slate-300 text-brand-dark'
                      }`}
                    >
                      {orig}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-darklight italic">
                  Selected: {selectedOrigins.length === 0 ? 'Semua Bahasa' : selectedOrigins.join(', ')}
                </span>
                {selectedOrigins.length > 0 && (
                  <button 
                    id="btn-clear-origins"
                    onClick={() => setSelectedOrigins([])} 
                    className="text-brand-teal hover:underline font-semibold"
                  >
                    Atur Ulang
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in" id="step-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-brand-dark">Pilih Nuansa Karakter Nama</h2>
                <p className="text-sm text-brand-darklight">Nama yang disematkan kelak akan mencerminkan getaran nilai karakter anak. (Dapat memilih lebih dari satu)</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {ALL_NUANCES.map((nu) => {
                  const isSelected = selectedNuances.includes(nu.id);
                  return (
                    <button
                      key={nu.id}
                      id={`nuance-opt-${nu.id}`}
                      onClick={() => handleToggleNuance(nu.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all flex flex-col gap-1 items-center justify-center ${
                        isSelected 
                          ? 'bg-brand-teal border-brand-teal text-white shadow-sm' 
                          : 'bg-white border-slate-100 hover:border-slate-300 text-brand-dark'
                      }`}
                    >
                      <span>{nu.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-darklight italic text-clip max-w-[85%]">
                  Nuansa: {selectedNuances.length === 0 ? 'Semua Nuansa' : selectedNuances.join(', ')}
                </span>
                {selectedNuances.length > 0 && (
                  <button 
                    id="btn-clear-nuances"
                    onClick={() => setSelectedNuances([])} 
                    className="text-brand-teal hover:underline font-semibold"
                  >
                    Atur Ulang
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-100" id="onboarding-actions">
          <button
            id="btn-onboarding-prev"
            onClick={handlePrev}
            className="px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-400 text-brand-dark text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>

          <button
            id="btn-onboarding-next"
            onClick={handleNext}
            className="px-6 py-3 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {step === totalSteps ? 'Selesai & Intip Nama' : 'Langkah Berikutnya'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center pt-6" id="onboarding-supportive-copy">
        <p className="text-xs text-brand-darklight leading-normal max-w-sm mx-auto italic font-light">
          “Jangan terburu-buru ya Dads, kita akan mencari dengan tenang agar nama terasa dekat di sanubari.”
        </p>
      </div>
    </div>
  );
}
