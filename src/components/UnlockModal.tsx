import React, { useState } from 'react';
import { X, Lock, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { SAMPLE_NAMES } from '../data';

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: (code: string) => void;
  userCodes: string[];
}

export default function UnlockModal({ isOpen, onClose, onUnlockSuccess, userCodes }: UnlockModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanCode = code.trim();
    if (userCodes.includes(cleanCode)) {
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        onUnlockSuccess(cleanCode);
        onClose();
        // Reset states
        setSuccess(false);
        setCode('');
      }, 1500);
    } else if (cleanCode === '') {
      setError('Kode akses tidak boleh kosong.');
    } else {
      setError('Kode akses salah. Silakan periksa kembali atau hubungi admin.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="unlock-modal-container">
      {/* Backdrop with elegant blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
        id="unlock-modal-backdrop"
      />

      {/* Modal Card */}
      <div 
        className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative z-10 border border-brand-mint/60 overflow-hidden animate-fade-in"
        id="unlock-modal-card"
      >
        {/* Top Accent Decoration */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-teal via-brand-mint to-brand-cream" />

        {/* Close Button */}
        <button
          id="btn-close-unlock-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-brand-offwhite text-brand-darklight hover:text-brand-dark transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4 animate-scale-up" id="unlock-success-screen">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-dark">Akses Berhasil Dibuka! ✨</h3>
              <p className="text-sm text-brand-darklight leading-relaxed max-w-xs mx-auto">
                Terima kasih Moms & Dads! Seluruh {formatNumber(SAMPLE_NAMES.length)}+ pilihan nama premium kini telah sepenuhnya terbuka untuk Anda.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6" id="unlock-form-screen">
            {/* Header */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-brand-dark font-display">Buka Akses Nama Premium 🔑</h3>
                <p className="text-xs text-brand-darklight leading-relaxed">
                  Lengkapi persiapan terbaik untuk buah hati Anda dengan membuka seluruh rekomendasi nama A-Z.
                </p>
              </div>
            </div>

            {/* Premium Benefits Checklist */}
            <div className="bg-brand-offwhite/80 p-4 rounded-2xl border border-slate-100/50 space-y-2.5 text-xs text-brand-dark">
              <h4 className="font-semibold text-brand-teal uppercase tracking-wider text-[10px]">Yang Anda Dapatkan:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>Akses penuh ke semua <strong>{formatNumber(SAMPLE_NAMES.length)}+ nama premium</strong> pilihan dari abjad A-Z.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>Makna lengkap, asal-usul bahasa, dan nuansa karakter terperinci.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>Ide kombinasi nama rangkaian 3 kata tak terbatas.</span>
                </li>
              </ul>
            </div>

            {/* Code Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3" id="unlock-code-form">
              <label htmlFor="code-input" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                MASUKKAN KODE AKSES
              </label>
              <div className="flex gap-2">
                <input
                  id="code-input"
                  type="text"
                  placeholder="Contoh: 12345"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 p-3 rounded-xl border border-slate-200 bg-brand-offwhite text-sm text-brand-dark focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none tracking-wide"
                />
                <button
                  type="submit"
                  id="btn-submit-code"
                  className="px-5 py-3 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Aktifkan
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1 animate-pulse" id="code-error-message">
                  ⚠ {error}
                </p>
              )}
            </form>

            {/* Admin Info Callout */}
            <div className="bg-orange-50/80 p-4 rounded-2xl border border-orange-100 space-y-3" id="admin-info-box">
              <div className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-orange-800">Bagaimana Cara Mendapatkan Kode?</p>
              </div>
              
              <div className="bg-white/60 p-3 rounded-xl border border-orange-100/50 space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-brand-dark">
                  <div className="flex flex-col items-center gap-1 mt-0.5 shrink-0">
                    <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-700">1</span>
                    <div className="w-0.5 h-3 bg-orange-200" />
                  </div>
                  <p className="leading-tight pt-0.5">
                    Klik tombol <strong className="text-brand-teal">Dapatkan Kode Akses</strong> di bawah
                  </p>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-brand-dark">
                  <div className="flex flex-col items-center gap-1 mt-0.5 shrink-0">
                    <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-700">2</span>
                    <div className="w-0.5 h-3 bg-orange-200" />
                  </div>
                  <p className="leading-tight pt-0.5">
                    Klik tombol <strong className="text-brand-dark">Buy Now</strong> pada halaman tujuan
                  </p>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-brand-dark">
                  <div className="flex flex-col items-center gap-1 mt-0.5 shrink-0">
                    <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-700">3</span>
                    <div className="w-0.5 h-3 bg-orange-200" />
                  </div>
                  <p className="leading-tight pt-0.5">
                    Selesaikan proses pembayaran pada form <strong className="text-brand-dark">Checkout</strong> (Rp 15.000)
                  </p>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-brand-dark">
                  <div className="flex items-center justify-center mt-0.5 shrink-0">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✔</span>
                  </div>
                  <p className="leading-snug">
                    <strong className="text-emerald-700 font-bold">Selesai!</strong> Kode akses premium akan dikirim otomatis ke email Moms & Dads
                  </p>
                </div>
              </div>
              
              <a 
                href="https://lynk.id/temanparenting/r48o98kvvom8/checkout?token=cGFyYW1zPSU1QiU1RCZ0aWNrZXRzPSU1QiU1RCZiaWRfcHJpY2U9MCZxdHlfcHJvZD0xJnNlc3NpZD0mdG90YWxfcHJpY2U9JnRvdGFsX3VuaXQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-teal hover:bg-brand-teal/95 active:scale-98 text-white rounded-xl text-xs font-bold transition-all w-full justify-center shadow-xs hover:shadow-md cursor-pointer"
                id="dapatkan-kode-akses-link"
              >
                Dapatkan Kode Akses
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="text-center pt-1" id="support-wa-helper">
                <p className="text-[11px] text-slate-500">
                  Ada kendala?{' '}
                  <a
                    href="https://wa.me/6285111324256?text=Hallo%20Admin%20Teman%20Parenting%2C%20aku%20mengalami%20kendala%20saat%20ingin%20mendapatkan%20akses%20aplikasi%20Nama%20Kecil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-teal hover:underline font-semibold"
                    id="support-wa-link"
                  >
                    hubungi admin via Whatsapp
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
