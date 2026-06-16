export type GenderType = 'L' | 'P' | 'U'; // Laki-laki, Perempuan, Universal

export type NuanceType = 
  | 'Lembut'
  | 'Islami'
  | 'Modern'
  | 'Klasik'
  | 'Kuat'
  | 'Elegan'
  | 'Unik'
  | 'Universal';

export interface BabyName {
  id: string;
  name: string;
  gender: GenderType;
  meaning: string;
  origin: string[];
  nuances: NuanceType[];
  length: number;
  nickIdeas: string[];
  combinations: string[];
  isPopular?: boolean;
  syllables?: number;
}

export interface FavoriteName {
  id: string; // matches BabyNameId or custom generated combination id
  name: string; // could be custom combined name
  isCustomCombination?: boolean;
  baseNames?: string[]; // IDs of names used inside the combination
  gender: GenderType;
  meaning: string;
  origin: string[];
  nuances: NuanceType[];
  notes: string;
  rating: number; // 1 to 5 stars
  isLoved?: boolean; // top star favorite
  createdAt: string;
}

export interface SearchFilters {
  searchQuery: string;
  gender: GenderType | 'ALL';
  origin: string | 'ALL';
  nuance: NuanceType | 'ALL';
  numWords: number | 'ALL'; // number of words for generator/combinations
  lengthMin: number;
  lengthMax: number;
  initialLetter: string; // A-Z or ''
  meaningQuery: string;
}

export interface OnboardingState {
  gender: GenderType;
  initialLetter: string;
  origins: string[];
  numWords: number; // 2 or 3
  nuances: NuanceType[];
  completed: boolean;
}
