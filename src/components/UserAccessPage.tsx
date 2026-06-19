import React, { useState } from 'react';
import { ArrowLeft, Users, Plus, Trash2, ShieldCheck, AlertCircle, Key } from 'lucide-react';

interface UserAccessPageProps {
  userCodes: string[];
  onAddCode: (code: string) => Promise<void>;
  onDeleteCode: (code: string) => Promise<void>;
  onBack: () => void;
}

export default function UserAccessPage({ userCodes, onAddCode, onDeleteCode, onBack }: UserAccessPageProps) {
  const [newCode, setNewCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanCode = newCode.trim();
    if (!cleanCode) {
      setError('Kode akses tidak boleh kosong.');
      return;
    }

    if (userCodes.includes(cleanCode)) {
      setError('Kode akses sudah terdaftar.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddCode(cleanCode);
      setSuccess(`Kode akses "${cleanCode}" berhasil ditambahkan!`);
      setNewCode('');
    } catch (err) {
      console.error(err);
      setError('Gagal menambahkan kode akses. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (code: string) => {
    if (code === '2425NK-1') return; // Protection
    
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus kode akses "${code}"?`);
    if (!confirmDelete) return;

    setError(null);
    setSuccess(null);
    try {
      await onDeleteCode(code);
      setSuccess(`Kode akses "${code}" berhasil dihapus.`);
    } catch (err) {
      console.error(err);
      setError('Gagal menghapus kode akses. Silakan coba lagi.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in" id="user-access-page-container">
      {/* Header Back Button */}
      <button
        id="btn-back-from-admin"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 text-brand-darklight hover:text-brand-dark text-xs font-semibold transition-all mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Beranda
      </button>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="admin-layout-grid">
        
        {/* Left Side: Add Code Form */}
        <div className="bg-white p-6 rounded-3xl border border-brand-mint shadow-md h-fit space-y-5" id="add-code-section">
          <div className="space-y-1">
            <h3 className="font-semibold text-brand-dark text-base flex items-center gap-2">
              <Plus className="w-5 h-5 text-brand-teal" />
              Tambah Akses Baru
            </h3>
            <p className="text-xs text-brand-darklight/80 leading-normal">
              Buat kode akses premium baru agar Moms & Dads dapat membuka akses menu A-Z.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" id="add-code-form">
            <div className="space-y-2">
              <label htmlFor="new-code-input" className="text-xs font-semibold text-brand-darklight/90 block">
                KODE AKSES
              </label>
              <div className="relative">
                <input
                  id="new-code-input"
                  type="text"
                  placeholder="Contoh: KODENK-99"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full p-3 pl-10 rounded-xl border border-slate-200 bg-brand-offwhite text-sm text-brand-dark focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none tracking-wide"
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex gap-1.5 items-start">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs flex gap-1.5 items-start">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              id="btn-submit-new-code"
              className="w-full py-3 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-brand-teal/10 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {isSubmitting ? 'Memproses...' : 'Daftarkan Kode'}
            </button>
          </form>
        </div>

        {/* Right Side: List of Codes (Spans 2 columns) */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6" id="codes-list-section">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-brand-mint/40 rounded-xl flex items-center justify-center text-brand-teal">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark text-base font-display">Akses Pengguna Terdaftar</h3>
                <p className="text-xs text-brand-darklight">Total: {userCodes.length} kode akses premium</p>
              </div>
            </div>
          </div>

          {/* List Wrapper */}
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1" id="codes-list-wrapper">
            {userCodes.length === 0 ? (
              <div className="text-center py-12 text-brand-darklight/60 text-xs">
                Tidak ada kode akses terdaftar.
              </div>
            ) : (
              userCodes.map((code) => {
                const isMasterAdmin = code === '2425NK-1';
                
                return (
                  <div
                    key={code}
                    id={`access-code-item-${code}`}
                    className="flex justify-between items-center p-4 rounded-2xl bg-brand-offwhite border border-slate-100 hover:border-brand-mint/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isMasterAdmin ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Key className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-mono text-sm font-bold text-brand-dark tracking-wide">
                          {code}
                        </span>
                        {isMasterAdmin && (
                          <div className="flex items-center gap-1 text-[9px] text-amber-600 font-extrabold uppercase bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded-md w-fit">
                            <ShieldCheck className="w-3 h-3" />
                            Master Admin
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete Button */}
                    {!isMasterAdmin ? (
                      <button
                        id={`btn-delete-code-${code}`}
                        onClick={() => handleDelete(code)}
                        className="p-2 rounded-xl bg-white border border-slate-100 text-brand-darklight hover:text-red-500 hover:border-red-100 hover:bg-red-50/50 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
                        title="Hapus Kode Akses"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg select-none">
                        Protected
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          
          <div className="p-4 bg-brand-cream/35 border border-brand-cream rounded-2xl flex gap-2.5 items-start text-xs text-orange-950">
            <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-orange-950">Catatan Privasi Keamanan</p>
              <p className="text-orange-900/90 leading-relaxed text-[11px]">
                Kode akses utama <strong>"2425NK-1"</strong> bertindak sebagai Master Administrator dan tidak dapat dihapus. Menambahkan kode akses baru akan langsung memungkinkannya digunakan untuk membuka akses premium pada WebApp Nama Kecil.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
