import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Mail } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanFeedback = feedback.trim();

    if (!cleanName || !cleanEmail || !cleanFeedback) {
      setError('Mohon lengkapi semua baris input (Nama, Email, dan Masukan).');
      return;
    }

    // Standard email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Format alamat email tidak valid.');
      return;
    }

    setSuccess(true);

    // Prepare mailto link to automatically send to temanparenting.id@gmail.com
    const subject = `[Masukan Aplikasi Nama Kecil] dari ${cleanName}`;
    const body = `Berikut adalah detail masukan untuk aplikasi Nama Kecil:\n\n` +
                 `Nama Lengkap: ${cleanName}\n` +
                 `Alamat Email: ${cleanEmail}\n` +
                 `Detail Masukan:\n${cleanFeedback}\n\n` +
                 `--- Sent from Nama Kecil Applet ---`;

    const mailtoUrl = `mailto:temanparenting.id@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default system email client
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);
  };

  const handleResetAndClose = () => {
    onClose();
    // Delay states reset slightly to prevent visual glitch on close animation transition
    setTimeout(() => {
      setName('');
      setEmail('');
      setFeedback('');
      setError(null);
      setSuccess(false);
    }, 305);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="feedback-modal-container">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" 
        onClick={handleResetAndClose}
        id="feedback-modal-backdrop"
      />

      {/* Card Content container */}
      <div 
        className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative z-10 border border-brand-mint/60 overflow-hidden animate-fade-in transition-all duration-300"
        id="feedback-modal-card"
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-teal via-brand-mint to-brand-cream" />

        {/* Close Button */}
        <button
          id="btn-close-feedback-modal"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-brand-offwhite text-brand-darklight hover:text-brand-dark transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4 animate-scale-up" id="feedback-success-screen">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-dark font-display">Masukan Terkirim! ✨</h3>
              <p className="text-sm text-brand-darklight leading-relaxed max-w-sm mx-auto">
                Terima kasih Moms & Dads! Masukan Anda sangat berharga untuk terus menyempurnakan aplikasi ini. Aplikasi email Anda akan terbuka untuk mengirimkan detail ke <strong>temanparenting.id@gmail.com</strong>.
              </p>
            </div>
            <button
              id="feedback-btn-ok"
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 bg-brand-teal text-white text-xs font-bold rounded-xl hover:bg-brand-teal/95 active:scale-95 transition-all shadow-xs"
            >
              Kembali ke Aplikasi
            </button>
          </div>
        ) : (
          <div className="space-y-6" id="feedback-form-screen">
            {/* Header */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-brand-mint/40 rounded-2xl flex items-center justify-center text-brand-teal shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-brand-dark font-display">Beri Masukan Aplikasi 💬</h3>
                <p className="text-xs text-brand-darklight leading-relaxed">
                  Punya ide, kritik, atau saran perbaikan? Bagikan masukan Moms & Dads langsung ke tim Teman Parenting untuk pengembangan lebih lanjut.
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs flex gap-2" id="feedback-error-box">
                <span className="font-bold">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4" id="feedback-form">
              <div className="space-y-1.5">
                <label htmlFor="fb-name" className="block text-xs font-semibold text-brand-darklight uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  id="fb-name"
                  type="text"
                  placeholder="Contoh: Sarah Amalia"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-brand-offwhite text-sm text-brand-dark focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fb-email" className="block text-xs font-semibold text-brand-darklight uppercase tracking-wider">
                  Alamat Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="fb-email"
                    type="email"
                    placeholder="Contoh: sarah@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-brand-offwhite text-sm text-brand-dark focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fb-description" className="block text-xs font-semibold text-brand-darklight uppercase tracking-wider">
                  Saran & Masukan
                </label>
                <textarea
                  id="fb-description"
                  rows={4}
                  placeholder="Tulis ide, perbaikan, atau aspirasi Moms & Dads di sini..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-brand-offwhite text-sm text-brand-dark focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all resize-none"
                  required
                />
              </div>

              <button
                id="feedback-submit-btn"
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-teal hover:bg-brand-teal/95 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer mt-2"
              >
                Kirim Masukan via Email
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
