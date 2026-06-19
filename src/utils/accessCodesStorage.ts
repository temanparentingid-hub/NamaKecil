const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return "http://localhost:8787";
};

const API_URL = getApiUrl();
const DEFAULT_CODES = ['2425NK-1', '@temanparenting.id-2456n1'];
const LOCAL_STORAGE_KEY = 'namakecil_access_codes';

// Helper to get fallback codes from localStorage
function getFallbackCodes(): string[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as string[];
    }
  } catch (e) {
    console.error('Failed to parse fallback codes', e);
  }
  return DEFAULT_CODES;
}

// Helper to save fallback codes to localStorage
function saveFallbackCodes(codes: string[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(codes));
  } catch (e) {
    console.error('Failed to save fallback codes', e);
  }
}

export const accessCodesApi = {
  getCodes: async (): Promise<string[]> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for fast fallback
      
      const res = await fetch(`${API_URL}/api/access-codes`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error('API response not ok');
      const data = await res.json() as { code: string; createdAt: string }[];
      const codes = data.map(item => item.code);
      
      // Synchronize back to localStorage for offline cache
      saveFallbackCodes(codes);
      return codes;
    } catch (err) {
      console.warn("Cloudflare D1 API offline or failed, falling back to LocalStorage:", err);
      return getFallbackCodes();
    }
  },

  addCode: async (code: string): Promise<boolean> => {
    const cleanCode = code.trim();
    if (!cleanCode) return false;
    
    // Update local fallback cache immediately (optimistic UI)
    const current = getFallbackCodes();
    if (!current.includes(cleanCode)) {
      saveFallbackCodes([...current, cleanCode]);
    }

    try {
      const res = await fetch(`${API_URL}/api/access-codes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode })
      });
      return res.ok;
    } catch (err) {
      console.warn("Cloudflare D1 API offline or failed, saved to LocalStorage only:", err);
      return true; 
    }
  },

  deleteCode: async (code: string): Promise<boolean> => {
    const cleanCode = code.trim();
    if (!cleanCode || cleanCode === '2425NK-1') return false;

    // Update local fallback cache immediately (optimistic UI)
    const current = getFallbackCodes();
    saveFallbackCodes(current.filter(c => c !== cleanCode));

    try {
      const res = await fetch(`${API_URL}/api/access-codes/${encodeURIComponent(cleanCode)}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (err) {
      console.warn("Cloudflare D1 API offline or failed, deleted from LocalStorage only:", err);
      return true; 
    }
  }
};
