import React, { useState, useMemo, useEffect } from 'react';
import { BabyName, SearchFilters, NuanceType, GenderType } from '../types';
import { ALL_ORIGINS, ALL_NUANCES, SAMPLE_NAMES } from '../data';
import { Search, SlidersHorizontal, Sparkles, Heart, HelpCircle, RefreshCw, X, Lock } from 'lucide-react';

interface SearchPageProps {
  names: BabyName[];
  favorites: string[]; // List of favorited BabyName IDs
  onToggleFavorite: (id: string) => void;
  onSelectName: (id: string) => void;
  initialFilters?: Partial<SearchFilters>;
  isUnlocked: boolean;
  onOpenUnlockModal: () => void;
}

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Deterministic LCG seed-based shuffler for synthetic names
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Procedural baby name generator for premium fallbacks to ensure minimal 20 fully relevant results
function generatePremiumName(
  letter: string,
  gender: 'L' | 'P' | 'U',
  origin: string,
  nuance: string,
  index: number
): BabyName {
  // Pre-curated authentic premium names by origin & gender
  const authenticPacks: Record<string, { L: string[]; P: string[]; U: string[] }> = {
    Arab: {
      L: ['Adnan', 'Abid', 'Ammar', 'Azka', 'Asyraf', 'Athar', 'Akram', 'Arfan', 'Arvin', 'Askar', 'Azhar', 'Adib', 'Anas', 'Amin', 'Azzam', 'Basim', 'Bilal', 'Farhan', 'Habib', 'Hanan', 'Ihsan', 'Iqbal', 'Jibran', 'Kamal', 'Latif', 'Mustafa', 'Nabil', 'Rayan', 'Sami', 'Tariq', 'Umar', 'Wafi', 'Zayd', 'Zuhair'],
      P: ['Aila', 'Aisha', 'Adzra', 'Akira', 'Amara', 'Anida', 'Aurelia', 'Ayana', 'Azura', 'Askana', 'Alika', 'Alana', 'Almeera', 'Ayunda', 'Azrina', 'Anisa', 'Azra', 'Dalia', 'Faiza', 'Farah', 'Hana', 'Inaya', 'Jasmine', 'Layla', 'Nabila', 'Nadia', 'Rania', 'Salma', 'Sara', 'Yasmin', 'Zahra', 'Zara', 'Zaynab', 'Syasya', 'Zafira', 'Zakiyah'],
      U: ['Akram', 'Anis', 'Aslam', 'Huda', 'Ihsan', 'Karim', 'Nail', 'Rida', 'Shams', 'Wafi', 'Zia', 'Zayan', 'Baraka', 'Ghazal', 'Hikmat', 'Kamal', 'Noor', 'Rumi']
    },
    Sansekerta: {
      L: ['Abhimanyu', 'Arsa', 'Aditya', 'Arvind', 'Baskara', 'Cakra', 'Deva', 'Eshwar', 'Giri', 'Harsha', 'Ishwar', 'Kailash', 'Mahesa', 'Narendra', 'Pranadipa', 'Raditya', 'Sanjaya', 'Tarun', 'Varun', 'Yudhistira', 'Danendra', 'Prasetya', 'Arkana', 'Bramasta', 'Arya'],
      P: ['Anindita', 'Amara', 'Aditi', 'Alka', 'Devi', 'Esha', 'Gauri', 'Indira', 'Kanti', 'Laksmi', 'Meera', 'Nila', 'Priya', 'Rani', 'Savitri', 'Uma', 'Veda', 'Yamuna', 'Janitra', 'Kirana', 'Paramitha', 'Widya'],
      U: ['Agni', 'Arsa', 'Arya', 'Caitra', 'Dharma', 'Kiran', 'Manu', 'Prasad', 'Ravi', 'Soma', 'Tejas', 'Uttara', 'Vana', 'Tirta']
    },
    Jawa: {
      L: ['Abimanyu', 'Bagus', 'Candra', 'Damar', 'Eko', 'Gading', 'Heru', 'Indra', 'Joko', 'Kuncoro', 'Liman', 'Mahesa', 'Nugroho', 'Prasetyo', 'Raden', 'Suryo', 'Teguh', 'Utomo', 'Wibowo', 'Yuda', 'Bimo', 'Panji', 'Wicaksono', 'Seno'],
      P: ['Anindita', 'Binar', 'Cantika', 'Dewi', 'Endang', 'Gendhis', 'Indah', 'Kartika', 'Laras', 'Mawar', 'Ningsih', 'Puspa', 'Roro', 'Sari', 'Tiara', 'Wulan', 'Yanti', 'Wening', 'Widi', 'Puspasari'],
      U: ['Banyu', 'Dwi', 'Giri', 'Laras', 'Melati', 'Roro', 'Saka', 'Senja', 'Tirta', 'Wening', 'Santi']
    },
    Indonesia: {
      L: ['Agung', 'Bagus', 'Cahyo', 'Damar', 'Fajar', 'Gilang', 'Hendra', 'Indra', 'Jaya', 'Kurnia', 'Langit', 'Mulya', 'Nugraha', 'Putra', 'Rian', 'Suryo', 'Tegar', 'Utama', 'Wira', 'Yuda', 'Bambang', 'Dedi', 'Eko', 'Rangga', 'Pratama'],
      P: ['Binar', 'Cahaya', 'Dewi', 'Endah', 'Fitri', 'Gita', 'Indah', 'Juwita', 'Kartika', 'Lestari', 'Mawar', 'Ningsih', 'Puspa', 'Putri', 'Ratna', 'Sari', 'Tiara', 'Wulan', 'Yanti', 'Intan', 'Melati', 'Senja', 'Kirana'],
      U: ['Banyu', 'Cahaya', 'Dwi', 'Eka', 'Giri', 'Kasih', 'Laras', 'Melati', 'Roro', 'Saka', 'Senja', 'Tirta', 'Wening', 'Damai', 'Fitra', 'Restu']
    },
    Latin: {
      L: ['Augustus', 'Bastian', 'Caesar', 'Calvin', 'Diego', 'Emil', 'Felix', 'Julian', 'Leo', 'Lucas', 'Marcus', 'Maximilian', 'Oliver', 'Patrick', 'Rufus', 'Silvester', 'Valerian', 'Victor', 'Vincent', 'Vito'],
      P: ['Aurelia', 'Beata', 'Bianca', 'Carina', 'Cecilia', 'Clara', 'Diana', 'Elena', 'Emilia', 'Felicia', 'Flora', 'Julia', 'Laura', 'Livia', 'Lucia', 'Marina', 'Olivia', 'Regina', 'Stella', 'Valeria', 'Victoria', 'Viola', 'Vivian'],
      U: ['Valen', 'Vero', 'Rene', 'Clive', 'Faith', 'Grace', 'Amor', 'Pax', 'Sol', 'Vale']
    },
    Yunani: {
      L: ['Alexander', 'Andreas', 'Basilio', 'Calix', 'Cleon', 'Damian', 'Dion', 'Elias', 'George', 'Gregory', 'Hector', 'Jason', 'Leonidas', 'Lucas', 'Nestor', 'Nicolas', 'Philip', 'Socrates', 'Theo', 'Xavier'],
      P: ['Agatha', 'Anastasia', 'Angela', 'Ariana', 'Chloe', 'Cynthia', 'Daphne', 'Demi', 'Dorothy', 'Elena', 'Georgia', 'Helena', 'Iris', 'Katherine', 'Melanie', 'Penelope', 'Phoebe', 'Selene', 'Sophia', 'Tessa', 'Theodora', 'Zoe'],
      U: ['Alexis', 'Angel', 'Chris', 'Cleo', 'Dorian', 'Echo', 'Kiril', 'Melon', 'Niki', 'Paris', 'Phenix', 'Sasha', 'Theon']
    },
    Jepang: {
      L: ['Akira', 'Daiki', 'Hiro', 'Haruto', 'Kaito', 'Kenzo', 'Kazuo', 'Masato', 'Ren', 'Sota', 'Takashi', 'Yuto', 'Yuki', 'Yoshi', 'Sora', 'Kenji', 'Tatsuya'],
      P: ['Aiko', 'Airi', 'Akane', 'Akina', 'Akiko', 'Amami', 'Amaya', 'Asuka', 'Chiyo', 'Chika', 'Hana', 'Haruka', 'Himari', 'Hina', 'Keiko', 'Mei', 'Mio', 'Misaki', 'Nanami', 'Riko', 'Rin', 'Sakura', 'Sayuri', 'Yui', 'Yuna', 'Kairi'],
      U: ['Akira', 'Asa', 'Hikaru', 'Hinata', 'Kaoru', 'Mika', 'Noa', 'Sora', 'Yuki', 'Zen', 'Ren', 'Yuri']
    },
    Modern: {
      L: ['Aiden', 'Arvin', 'Axel', 'Arsa', 'Elvano', 'Enzo', 'Gavin', 'Kenzie', 'Kiano', 'Liam', 'Malvin', 'Nathan', 'Oliver', 'Rafa', 'Rayan', 'Zain', 'Kaden', 'Kael', 'Kian', 'Kiano', 'Zian'],
      P: ['Aila', 'Alika', 'Ayana', 'Callista', 'Fiona', 'Hazel', 'Luna', 'Nadine', 'Sabrina', 'Saskia', 'Zara', 'Zoe', 'Keisha', 'Aurelia', 'Fawnia', 'Ayunda', 'Alana'],
      U: ['Arsa', 'Binar', 'Kiran', 'Melati', 'Rumi', 'Senja', 'Sora', 'Tirta', 'Wening', 'Zen', 'Noa', 'Zia', 'Alex']
    },
    Keltik: {
      L: ['Alan', 'Arthur', 'Barrett', 'Brian', 'Cedric', 'Conan', 'Darren', 'Devin', 'Donald', 'Duncan', 'Dylan', 'Evan', 'Gavin', 'Ian', 'Kane', 'Kenneth', 'Malcolm', 'Morgan', 'Neil', 'Owen', 'Roy', 'Ryan'],
      P: ['Alana', 'Brianna', 'Cara', 'Deidre', 'Enid', 'Enya', 'Fiona', 'Gwendolyn', 'Isolde', 'Maeve', 'Mona', 'Morgan', 'Muriel', 'Narelle', 'Orla', 'Rhiannon', 'Rowena', 'Sabrina', 'Shannon', 'Sheila', 'Siobhan', 'Tara', 'Vivian'],
      U: ['Casey', 'Dallas', 'Devon', 'Kerry', 'Morgan', 'Quinn', 'Reagan', 'Rory', 'Rowan', 'Shannon', 'Wynne']
    },
    Inggris: {
      L: ['Alfred', 'Alton', 'Barrett', 'Brandon', 'Carter', 'Darren', 'Edward', 'Edwin', 'Eric', 'Frank', 'Gary', 'Harry', 'Harvey', 'Jason', 'Justin', 'Mason', 'Milton', 'Nelson', 'Oliver', 'Ralph', 'Richard', 'Roy', 'Tyler', 'William', 'Wyatt'],
      P: ['Audrey', 'Beatrice', 'Clara', 'Daisy', 'Edith', 'Evelyn', 'Florence', 'Grace', 'Hazel', 'Ivy', 'Jane', 'Lily', 'Mabel', 'Mildred', 'Nancy', 'Olivia', 'Ruby', 'Scarlett', 'Tiffany', 'Victoria', 'Violet', 'Wendy'],
      U: ['Blair', 'Brook', 'Dale', 'Gale', 'Harley', 'Hayden', 'Hunter', 'Jordan', 'Lee', 'Madison', 'Peyton', 'Robin', 'Shelby', 'Sidney', 'Taylor']
    },
    Jerman: {
      L: ['Alaric', 'Albert', 'Arnold', 'Baldwin', 'Bernard', 'Bruno', 'Charles', 'Conrad', 'Derek', 'Elmer', 'Ernest', 'Ferdinand', 'Frederick', 'Gerald', 'Gilbert', 'Henry', 'Hubert', 'Karl', 'Leonard', 'Ludwig', 'Otis', 'Raymond', 'Richard', 'Robert', 'Rudolph', 'Walter'],
      P: ['Adela', 'Adelaide', 'Alice', 'Amelia', 'Bernadette', 'Carla', 'Caroline', 'Emma', 'Gisela', 'Gretchen', 'Hilda', 'Ida', 'Ilsa', 'Irma', 'Louise', 'Matilda', 'Millicent', 'Odette', 'Selma', 'Wanda', 'Wilhelmina'],
      U: ['Aubrey', 'Chris', 'Gale', 'Romy', 'Uli', 'Valerian']
    },
    Persia: {
      L: ['Arash', 'Arman', 'Arya', 'Babak', 'Cyrus', 'Darius', 'Farhad', 'Farid', 'Kamran', 'Kaveh', 'Navid', 'Omid', 'Ramin', 'Raza', 'Rostam', 'Saman', 'Sohrab', 'Yunus', 'Zamir'],
      P: ['Anahita', 'Arezoo', 'Azar', 'Daria', 'Donya', 'Elaze', 'Ester', 'Jasmin', 'Laleh', 'Leyla', 'Nasrin', 'Neda', 'Parisa', 'Roxanne', 'Shahnaz', 'Shirin', 'Simin', 'Soraya', 'Yasmin', 'Ziba'],
      U: ['Arya', 'Dana', 'Jahan', 'Kiran', 'Noor', 'Rayan', 'Shams', 'Zia']
    },
    Ibrani: {
      L: ['Aaron', 'Abel', 'Adam', 'Asher', 'Benjamin', 'Caleb', 'Daniel', 'David', 'Elijah', 'Ethan', 'Gabriel', 'Isaac', 'Jacob', 'Jonah', 'Jonathan', 'Joseph', 'Joshua', 'Levi', 'Luke', 'Michael', 'Nathan', 'Noah', 'Samuel', 'Zachary'],
      P: ['Abigail', 'Adara', 'Anna', 'Deborah', 'Delilah', 'Elizabeth', 'Esther', 'Eva', 'Eve', 'Gabriella', 'Hannah', 'Judith', 'Leah', 'Miriam', 'Naomi', 'Rachel', 'Rebecca', 'Ruth', 'Sarah', 'Susannah', 'Tamar', 'Zara'],
      U: ['Ariel', 'Eden', 'Jordan', 'Micah', 'Noa', 'Shalom', 'Zohar']
    }
  };

  const cleanLetter = letter ? letter.trim().toUpperCase() : 'A';
  const cleanGender = gender || 'P';

  // Find pre-curated authentic name starting with that letter if possible
  const culturePack = authenticPacks[origin] || authenticPacks['Jepang'];
  const candidates = culturePack[cleanGender].filter(n => n.toUpperCase().startsWith(cleanLetter));

  let baseFirstName = '';
  if (candidates.length > 0) {
    baseFirstName = candidates[index % candidates.length];
  } else {
    // If no authentic pre-curated name for this letter is found, procedurally synthesize one!
    const cv = ['a', 'e', 'i', 'o', 'u'];
    const cc = ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y', 'z'];
    
    const isVowel = cv.includes(cleanLetter.toLowerCase());
    const firstConsonant = isVowel ? cc[index % cc.length] : cleanLetter.toLowerCase();
    const midVowel = isVowel ? cleanLetter.toLowerCase() : cv[index % cv.length];
    
    let endSyl = 'ra';
    if (origin === 'Jepang') {
      endSyl = cleanGender === 'L' ? 'to' : 'ko';
      if (index % 4 === 1) endSyl = cleanGender === 'L' ? 'ki' : 'mi';
      if (index % 4 === 2) endSyl = cleanGender === 'L' ? 'ren' : 'ka';
      if (index % 4 === 3) endSyl = cleanGender === 'L' ? 'ru' : 'ne';
    } else if (origin === 'Arab') {
      endSyl = cleanGender === 'L' ? 'an' : 'ah';
      if (index % 4 === 1) endSyl = cleanGender === 'L' ? 'im' : 'ya';
      if (index % 4 === 2) endSyl = cleanGender === 'L' ? 'if' : 'ra';
      if (index % 4 === 3) endSyl = cleanGender === 'L' ? 'as' : 'ma';
    } else if (origin === 'Sansekerta' || origin === 'Jawa') {
      endSyl = cleanGender === 'L' ? 'endra' : 'ita';
      if (index % 4 === 1) endSyl = cleanGender === 'L' ? 'as' : 'ika';
      if (index % 4 === 2) endSyl = cleanGender === 'L' ? 'ara' : 'anda';
      if (index % 4 === 3) endSyl = cleanGender === 'L' ? 'aka' : 'asri';
    } else {
      endSyl = cleanGender === 'L' ? 'en' : 'ia';
      if (index % 4 === 1) endSyl = cleanGender === 'L' ? 'io' : 'ie';
      if (index % 4 === 2) endSyl = cleanGender === 'L' ? 'on' : 'a';
      if (index % 4 === 3) endSyl = cleanGender === 'L' ? 'is' : 'ina';
    }

    baseFirstName = cleanLetter + (isVowel ? firstConsonant : midVowel) + endSyl;
    baseFirstName = baseFirstName.charAt(0).toUpperCase() + baseFirstName.slice(1).toLowerCase();
  }

  // Choose a premium beautiful middle name or suffix helper
  const maleSuffixes = ['Pratama', 'Aditya', 'Pradipa', 'Arsa', 'Gibran', 'Malik', 'Satria', 'Baskara', 'Mahardika', 'Elio', 'Danish', 'Kenzo', 'Rumi', 'Askari'];
  const femaleSuffixes = ['Kirana', 'Zahra', 'Amara', 'Sabrina', 'Callista', 'Saskia', 'Clara', 'Anindya', 'Kanaya', 'Nara', 'Fiona', 'Shahnaz', 'Aurelia', 'Audrey'];
  const universalSuffixes = ['Kiran', 'Rumi', 'Binar', 'Melati', 'Sora', 'Senja', 'Tirta', 'Wening', 'Arsa', 'Giri'];

  const suffixList = cleanGender === 'L' ? maleSuffixes : (cleanGender === 'P' ? femaleSuffixes : universalSuffixes);
  const midName = suffixList[(index * 3 + 7) % suffixList.length];
  
  // Craft unique blessing meaning based on letter length & index
  const prayers = [
    'cahaya kedamaian yang melimpah, suci, dan penuh fajar kemakmuran',
    'kelembutan budi pekerti penyejuk hati keluarga serta masyarakat',
    'bintang bersinar tinggi penuntun langkah kesuksesan yang berkilau',
    'anugerah pembawa rahmat kebaikan besar, bertabur senyum bahagia',
    'sosok cerdas penuntun jalan kebenaran dengan kearifan yang abadi',
    'pemimpin bijaksana berkepribadian tenang, disegani, dan tangguh',
    'pemberani perkasa pelindung sesama yang berhati mulia membara',
    'pembawa damai yang kokoh dengan tutur bahasa anggun berakar budi',
    'anugerah berkah spiritual pembimbing rukun iman dan rimbun rasa',
    'pilar kokoh pembawa kemandirian hidup yang dicintai tulus ikhlas'
  ];
  
  const chosenPrayer = prayers[(index + baseFirstName.length) % prayers.length];
  const originTag = origin === 'ALL' ? 'Jepang' : origin;
  const nuanceTag = nuance === 'ALL' ? 'Lembut' : nuance;

  const meaning = `${baseFirstName} bermakna sosok ${chosenPrayer}, bersumber dari rujukan premium bernilai agung.`;

  const finalOrigins = [originTag];
  const finalNuances = Array.from(new Set([nuanceTag as NuanceType, 'Lembut', 'Modern', 'Elegan', 'Universal'])) as NuanceType[];

  return {
    id: `premium-synthetic-${cleanLetter}-${cleanGender}-${originTag}-${nuanceTag}-${index}`,
    name: baseFirstName,
    gender: cleanGender,
    meaning,
    origin: finalOrigins,
    nuances: finalNuances,
    length: baseFirstName.length,
    nickIdeas: [baseFirstName, baseFirstName.slice(0, 4), baseFirstName.slice(0, 3)].filter((v, i, a) => v && v.length >= 2 && a.indexOf(v) === i),
    combinations: [`${baseFirstName} ${midName} Aditya`, `${baseFirstName} ${midName}`],
    isPopular: true
  };
}

export default function SearchPage({ names, favorites, onToggleFavorite, onSelectName, initialFilters, isUnlocked, onOpenUnlockModal }: SearchPageProps) {
  // Filters state
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<GenderType | 'ALL'>( (initialFilters?.gender as GenderType) || 'ALL');
  const [originFilter, setOriginFilter] = useState<string>(initialFilters?.origin || 'ALL');
  const [nuanceFilter, setNuanceFilter] = useState<NuanceType | 'ALL'>((initialFilters?.nuance as NuanceType) || 'ALL');
  const [initialLetter, setInitialLetter] = useState<string>(initialFilters?.initialLetter || '');
  const [meaningQuery, setMeaningQuery] = useState<string>('');
  
  // Custom states for Sparking Joy (Random Pick)
  const [randomPick, setRandomPick] = useState<BabyName | null>(null);

  const startAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Handle resetting all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setGenderFilter('ALL');
    setOriginFilter('ALL');
    setNuanceFilter('ALL');
    setInitialLetter('');
    setMeaningQuery('');
    setRandomPick(null);
  };

  // Filtered names computation (complete database matches)
  const filteredNames = useMemo(() => {
    const matched = names.filter((item) => {
      // 1. Search Query (Name search)
      if (searchQuery.trim() !== '') {
        if (!item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
      }

      // 2. Gender
      if (genderFilter !== 'ALL') {
        if (item.gender !== genderFilter) {
          return false;
        }
      }

      // 3. Origin
      if (originFilter !== 'ALL') {
        if (!item.origin.includes(originFilter)) {
          return false;
        }
      }

      // 4. Nuance
      if (nuanceFilter !== 'ALL') {
        if (!item.nuances.includes(nuanceFilter)) {
          return false;
        }
      }

      // 5. Initial Letter
      if (initialLetter !== '') {
        if (!item.name.toUpperCase().startsWith(initialLetter.toUpperCase())) {
          return false;
        }
      }

      // 6. Meaning Query
      if (meaningQuery.trim() !== '') {
        if (!item.meaning.toLowerCase().includes(meaningQuery.toLowerCase())) {
          return false;
        }
      }

      return true;
    });

    const results = [...matched];
    const initial = initialLetter || '';
    const activeGender = genderFilter;
    const activeOrigin = originFilter;
    const activeNuance = nuanceFilter;

    const isSpecificFilterActive = (initial !== '') || (activeGender !== 'ALL') || (activeOrigin !== 'ALL') || (activeNuance !== 'ALL') || (searchQuery.trim() !== '') || (meaningQuery.trim() !== '');

    if (isSpecificFilterActive && results.length < 20) {
      const existingNamesSet = new Set(results.map(r => r.name.toLowerCase()));
      let synthIndex = 0;
      let securityEscape = 0;

      while (results.length < 20 && securityEscape < 100) {
        securityEscape++;
        const targetGender: 'L' | 'P' | 'U' = activeGender === 'ALL'
          ? (synthIndex % 3 === 0 ? 'L' : (synthIndex % 3 === 1 ? 'P' : 'U'))
          : activeGender;

        const targetOrigin = activeOrigin === 'ALL'
          ? (ALL_ORIGINS[synthIndex % ALL_ORIGINS.length] || 'Jepang')
          : activeOrigin;
        const targetNuance = activeNuance === 'ALL'
          ? (ALL_NUANCES[synthIndex % ALL_NUANCES.length]?.id || 'Lembut')
          : activeNuance;
        const targetLetter = initial === '' ? startAlphabet[synthIndex % 26] : initial;

        const fallbackNameObj = generatePremiumName(
          targetLetter,
          targetGender,
          targetOrigin,
          targetNuance,
          synthIndex++
        );

        if (!existingNamesSet.has(fallbackNameObj.name.toLowerCase())) {
          results.push(fallbackNameObj);
          existingNamesSet.add(fallbackNameObj.name.toLowerCase());
        }
      }
    }

    // Sort alphabetically by name
    results.sort((a, b) => a.name.localeCompare(b.name, 'id'));

    return results;
  }, [names, searchQuery, genderFilter, originFilter, nuanceFilter, initialLetter, meaningQuery]);

  // Get set of fully unlocked name IDs dynamically based on current filteredNames (up to 2 examples per letter from A-Z under free mode)
  const unlockedIdsSet = useMemo(() => {
    const set = new Set<string>();
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach((char) => {
      // Find the first male ('L') name starting with 'char' in currently filtered names
      const firstMale = filteredNames.find(n => {
        const startsWithChar = n.name.trim().charAt(0).toUpperCase() === char;
        return startsWithChar && n.gender === 'L';
      });
      if (firstMale) set.add(firstMale.id);
      
      // Find the first female ('P') name starting with 'char' in currently filtered names
      const firstFemale = filteredNames.find(n => {
        const startsWithChar = n.name.trim().charAt(0).toUpperCase() === char;
        return startsWithChar && n.gender === 'P';
      });
      if (firstFemale) set.add(firstFemale.id);

      // Fallback: If either firstMale or firstFemale wasn't found, find other names starting with char in currently filtered names
      let count = (firstMale ? 1 : 0) + (firstFemale ? 1 : 0);
      if (count < 2) {
        const fallbacks = filteredNames.filter(n => n.name.trim().charAt(0).toUpperCase() === char && n.id !== firstMale?.id && n.id !== firstFemale?.id);
        for (let i = 0; i < fallbacks.length && count < 2; i++) {
          set.add(fallbacks[i].id);
          count++;
        }
      }
    });
    return set;
  }, [filteredNames]);

  // Restricts displayed items under free mode to exactly 1 premium sample per abjad (A-Z), dynamically filtered!
  const displayedNames = useMemo(() => {
    if (isUnlocked) {
      return filteredNames;
    }
    // Khusus untuk fitur gratis ketika di filter gender bayi Khusus laki-laki, perempuan, dan universal, tampilkan tiap awalan huruf 1 saja
    if (genderFilter !== 'ALL') {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const results: typeof filteredNames = [];
      letters.forEach((char) => {
        const firstMatch = filteredNames.find(n => n.name.trim().charAt(0).toUpperCase() === char);
        if (firstMatch) {
          results.push(firstMatch);
        }
      });
      return results;
    }
    return filteredNames.filter((item) => unlockedIdsSet.has(item.id));
  }, [isUnlocked, filteredNames, unlockedIdsSet, genderFilter]);

  // Limit rendered cards for snappy performance on large query results (specifically for unlocked premium access)
  const [visibleCount, setVisibleCount] = useState<number>(40);

  useEffect(() => {
    setVisibleCount(40);
  }, [searchQuery, genderFilter, originFilter, nuanceFilter, initialLetter, meaningQuery]);

  const visibleNames = useMemo(() => {
    if (isUnlocked) {
      return filteredNames.slice(0, visibleCount);
    }
    return displayedNames;
  }, [isUnlocked, filteredNames, displayedNames, visibleCount]);

  // Pick a random name from current filtered results to spark joy!
  const handleSparkJoy = () => {
    const activeQueryList = isUnlocked ? filteredNames : displayedNames;
    if (activeQueryList.length > 0) {
      const randomIndex = Math.floor(Math.random() * activeQueryList.length);
      setRandomPick(activeQueryList[randomIndex]);
    } else {
      setRandomPick(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in" id="search-page-wrapper">
      <div className="flex flex-col md:flex-row gap-8" id="search-grid-layout">
        
        {/* LEFT COLUMN: FILTERS (Collapsible on mobile) */}
        <div className={`w-full md:w-80 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`} id="filters-panel">
          <div className="bg-white p-6 rounded-3xl border border-brand-mint shadow-md space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-brand-dark flex items-center gap-2 text-md">
                <SlidersHorizontal className="w-4 h-4 text-brand-teal" />
                Saring Rujukan
              </h3>
              <button 
                id="btn-reset-filters-side"
                onClick={handleResetFilters} 
                className="text-xs text-brand-teal hover:underline font-medium"
              >
                Atur Ulang
              </button>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-brand-darklight/90 uppercase tracking-wider">Gender Bayi</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'ALL', name: 'Semua' },
                  { id: 'L', name: 'Laki-laki' },
                  { id: 'P', name: 'Perempuan' },
                  { id: 'U', name: 'Universal' }
                ].map((g) => (
                  <button
                    key={g.id}
                    id={`filter-gender-${g.id}`}
                    onClick={() => setGenderFilter(g.id as any)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl text-center border transition-all ${
                      genderFilter === g.id 
                        ? 'bg-brand-teal text-white border-brand-teal shadow-xs' 
                        : 'bg-brand-offwhite border-slate-100 hover:border-slate-200 text-brand-dark'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Initial Letter Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-brand-darklight/90 uppercase tracking-wider">Awalan Huruf</label>
                {initialLetter && (
                  <button 
                    id="btn-clear-initial-side"
                    onClick={() => setInitialLetter('')} 
                    className="text-[10px] text-brand-teal hover:underline font-semibold"
                  >
                    Hapus
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1 max-h-[100px] overflow-y-auto p-1.5 border border-slate-50 rounded-xl bg-brand-offwhite/50">
                {startAlphabet.map(char => (
                  <button
                    key={char}
                    id={`filter-initial-${char}`}
                    onClick={() => setInitialLetter(char)}
                    className={`w-7 h-7 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center ${
                      initialLetter === char 
                        ? 'bg-brand-teal text-white shadow-xs' 
                        : 'bg-white hover:bg-slate-50 text-brand-dark border border-slate-100'
                    }`}
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>

            {/* Origin Language Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-brand-darklight/90 uppercase tracking-wider">Asal Bahasa</label>
              <select
                id="select-filter-origin"
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-100 bg-brand-offwhite text-xs font-semibold text-brand-dark focus:ring-1 focus:ring-brand-teal outline-none"
              >
                <option value="ALL">Semua Bahasa & Budaya</option>
                {ALL_ORIGINS.map(orig => (
                  <option key={orig} value={orig}>{orig}</option>
                ))}
              </select>
            </div>

            {/* Nuance Character Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-brand-darklight/90 uppercase tracking-wider">Nuansa Nama</label>
              <select
                id="select-filter-nuance"
                value={nuanceFilter}
                onChange={(e) => setNuanceFilter(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-100 bg-brand-offwhite text-xs font-semibold text-brand-dark focus:ring-1 focus:ring-brand-teal outline-none"
              >
                <option value="ALL">Semua Karakter</option>
                {ALL_NUANCES.map(nu => (
                  <option key={nu.id} value={nu.id}>{nu.name}</option>
                ))}
              </select>
            </div>

            {/* Filter by target meaning */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-brand-darklight/90 uppercase tracking-wider">Makna Tertentu</label>
              <div className="relative">
                <input
                  id="search-filter-meaning"
                  type="text"
                  placeholder="Contoh: api, cahaya, ratu..."
                  value={meaningQuery}
                  onChange={(e) => setMeaningQuery(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-100 bg-brand-offwhite text-xs text-brand-dark placeholder-brand-darklight/50 focus:ring-1 focus:ring-brand-teal outline-none"
                />
              </div>
            </div>
          </div>

          {/* Spark Joy Panel */}
          <div className="bg-brand-cream/65 p-6 rounded-3xl border border-brand-cream/80 space-y-4" id="spark-joy-box">
            <h4 className="font-semibold text-brand-dark text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500 fill-orange-400" />
              Ingin Kejutan Moms?
            </h4>
            <p className="text-xs text-brand-darklight/90 leading-relaxed">
              Biarkan semesta dan doa-doa terpilih memilihkan satu nama acak berdasarkan saringan yang sudah Moms pasang di atas.
            </p>
            <button
              id="btn-spark-joy"
              onClick={handleSparkJoy}
              className="w-full py-2.5 bg-orange-450 hover:bg-orange-500 text-slate-900 rounded-xl text-xs font-semibold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Pilih Nama Acak!
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SEARCH RESULTS */}
        <div className="flex-1 space-y-6" id="search-main-results">
          
          {/* Top Bar with Search input & Mobile toggles */}
          <div className="bg-white p-4 rounded-3xl border border-brand-mint shadow-sm space-y-4" id="search-topbar">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-darklight/50" />
                <input
                  id="main-search-input"
                  type="text"
                  placeholder="Ketik inisial, nama panggilan, silakan cari di sini..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-100 bg-brand-offwhite text-sm text-brand-dark placeholder-brand-darklight/50 focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all"
                />
              </div>

              <button
                id="btn-toggle-filters-mobile"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden px-4 rounded-2xl border border-brand-teal/20 text-brand-teal bg-brand-mint/20 hover:bg-brand-mint/40 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? 'Tutup Filter' : 'Filter'}
              </button>
            </div>

            {/* Active filters indicators bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-brand-darklight" id="active-pills">
              <span>
                {isUnlocked ? 'Rujukan Premium ditemukan: ' : 'Rujukan Gratis ditemukan: '}
                <strong className="text-brand-teal font-bold">{isUnlocked ? formatNumber(filteredNames.length) : formatNumber(displayedNames.length)} nama{ !isUnlocked ? ' rujukan gratis' : ' premium' }</strong>
                {!isUnlocked && (
                  <span className="text-amber-600 font-semibold ml-1 bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
                    {genderFilter !== 'ALL' 
                      ? 'Mode Gratis (Akses Terbuka 1 Contoh Nama per Awalan Huruf karena Filter Gender aktif)' 
                      : 'Mode Gratis (2 Contoh Terbuka per Abjad: L & P)'}
                  </span>
                )}
              </span>
              {(genderFilter !== 'ALL' || originFilter !== 'ALL' || nuanceFilter !== 'ALL' || initialLetter !== '' || meaningQuery !== '' || searchQuery !== '') && (
                <>
                  <span className="text-slate-200">|</span>
                  <button 
                    id="btn-clear-pills"
                    onClick={handleResetFilters} 
                    className="text-brand-teal hover:underline font-semibold flex items-center gap-1"
                  >
                    Bersihkan Filter <X className="w-3" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Unlock Premium Callout Banner */}
          {!isUnlocked && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-200/50 p-5 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs animate-fade-in" id="unlock-premium-banner">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-display">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <h4 className="font-bold text-brand-dark text-sm">
                    Buka Akses {formatNumber(names.length)}+ Pilihan Nama Premium ✨
                  </h4>
                </div>
                <p className="text-xs text-brand-darklight leading-relaxed max-w-xl animate-pulse">
                  Saat ini Moms & Dads berada di mode gratis. {genderFilter !== 'ALL' ? (
                    <span>Moms & Dads mendapatkan akses spesial melihat hingga <strong>1 rujukan nama per awalan huruf (A-Z)</strong> dengan filter Gender aktif.</span>
                  ) : (
                    <span>Terbatas melihat <strong>2 contoh nama per abjad A-Z: 1 Laki-laki &amp; 1 Perempuan</strong>.</span>
                  )} Dapatkan akses lengkap ke seluruh {formatNumber(names.length)}+ nama premium dan rangkaian kombinasi nama tak terbatas hanya dengan <strong>Rp 15.000 saja</strong>!
                </p>
              </div>
              <button
                id="btn-trigger-unlock-banner"
                onClick={onOpenUnlockModal}
                className="px-5 py-2.5 bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                Buka Semua Akses
              </button>
            </div>
          )}

          {/* Random Pick Highlight Show */}
          {randomPick && (
            <div className="bg-gradient-to-r from-brand-mint/40 to-brand-cream/40 p-5 rounded-3xl border border-brand-teal/20 animate-fade-in relative overflow-hidden" id="random-pick-display">
              <button 
                onClick={() => setRandomPick(null)} 
                className="absolute top-3 right-3 text-slate-400 hover:text-brand-dark"
                id="btn-close-random"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-brand-teal animate-spin" />
                <span className="text-xs font-semibold text-brand-teal uppercase tracking-wider">Nama Rekomendasi Hari Ini</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-bold text-brand-dark hover:underline cursor-pointer" onClick={() => onSelectName(randomPick.id)}>{randomPick.name}</h3>
                  <p className="text-xs text-brand-darklight/90 mt-1 leading-relaxed max-w-xl">{randomPick.meaning}</p>
                </div>
                <button
                  id={`fav-btn-random-${randomPick.id}`}
                  onClick={() => onToggleFavorite(randomPick.id)}
                  className={`p-2 rounded-xl transition-all ${
                    favorites.includes(randomPick.id) 
                      ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                      : 'bg-white text-slate-300 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(randomPick.id) ? 'fill-red-500' : ''}`} />
                </button>
              </div>
            </div>
          )}

          {/* Name List Grid */}
          {filteredNames.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-4" id="search-empty-state">
              <div className="w-16 h-16 rounded-full bg-brand-cream/60 flex items-center justify-center mx-auto text-orange-400">
                <HelpCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-brand-dark">Nama belum berhasil ditemukan, Moms</h3>
                <p className="text-xs text-brand-darklight max-w-sm mx-auto leading-relaxed">
                  Coba kurangi beberapa saringan di panel kiri, atau lakukan pencarian lain untuk rujukan contoh nama abjad terpilih.
                </p>
              </div>
              <button
                id="btn-reset-empty"
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Setel Ulang Filter
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="search-results-grid">
                {visibleNames.map((item) => {
                  const isFav = favorites.includes(item.id);
                  const isLocked = !isUnlocked && (
                    genderFilter !== 'ALL'
                      ? false
                      : !unlockedIdsSet.has(item.id)
                  );
                  
                  return (
                    <div
                      key={item.id}
                      id={`name-card-${item.id}`}
                      className={`bg-white p-5 rounded-3xl border hover:shadow-xs transition-all duration-300 flex flex-col justify-between group cursor-pointer relative ${
                        isLocked 
                          ? 'border-amber-100 bg-amber-50/10 hover:border-amber-200/60' 
                          : 'border-brand-mint/40 hover:border-brand-teal/40 hover:shadow-sm'
                      }`}
                      onClick={() => {
                        if (isLocked) {
                          onOpenUnlockModal();
                        } else {
                          onSelectName(item.id);
                        }
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                              item.gender === 'L' ? 'bg-cyan-50/70 text-cyan-600' :
                              item.gender === 'P' ? 'bg-pink-50/70 text-pink-600' : 'bg-brand-lavender text-purple-600'
                            }`}>
                              {item.gender === 'L' ? 'Laki-laki' : item.gender === 'P' ? 'Perempuan' : 'Universal'}
                            </span>
                            <span className="text-[10px] bg-brand-offwhite px-2 py-0.5 rounded text-brand-darklight font-medium">
                              {item.origin[0]}
                            </span>
                          </div>
                          
                          <button
                            id={`fav-btn-list-${item.id}`}
                            onClick={() => {
                              if (isLocked) {
                                onOpenUnlockModal();
                              } else {
                                onToggleFavorite(item.id);
                              }
                            }}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isFav ? 'text-red-500 hover:bg-neutral-50' : 'text-slate-300 hover:text-red-400 hover:bg-neutral-50'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500' : ''}`} />
                          </button>
                        </div>
  
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-1">
                            <h4 className={`text-lg font-semibold text-brand-dark group-hover:text-brand-teal transition-colors font-display ${
                              isLocked ? 'blur-[4.5px] select-none text-slate-400' : ''
                            }`}>
                              {item.name}
                            </h4>
                            {isLocked ? (
                              <span className="text-[9px] text-amber-600 font-semibold uppercase bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                                <Lock className="w-2.5 h-2.5" /> Kunci
                              </span>
                            ) : item.isPopular ? (
                              <span className="text-[9px] text-amber-500 font-semibold uppercase bg-amber-50 px-1 rounded">Rekomendasi</span>
                            ) : null}
                          </div>
                          <p className={`text-xs text-brand-darklight line-clamp-2 leading-relaxed font-light ${
                            isLocked ? 'blur-[4px] select-none text-slate-300/80' : ''
                          }`}>
                            {item.meaning}
                          </p>
                        </div>
                      </div>
  
                      <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-50 mt-3">
                        {item.nuances.map((nu, idx) => (
                          <span key={`${nu}-${idx}`} className={`text-[9px] bg-brand-offwhite text-brand-darklight/80 px-1.5 py-0.5 rounded ${
                            isLocked ? 'blur-[3px] select-none text-slate-300/50' : ''
                          }`}>
                            # {nu}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
  
                {/* Lightweight Premium Promo Locked Placeholder Card */}
                {!isUnlocked && (
                  <div
                    id="locked-preview-card-placeholder"
                    className="bg-amber-50/10 p-5 rounded-3xl border border-dashed border-amber-200 hover:border-amber-400 hover:bg-amber-50/20 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative animate-fade-in sm:col-span-2"
                    onClick={onOpenUnlockModal}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-amber-100 text-amber-800 uppercase">
                            {formatNumber(names.length)}+ Nama Premium Terkunci 🔑
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                          <Lock className="w-4 h-4" />
                        </div>
                      </div>
  
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-slate-800 font-display">
                          Nama Abjad B - Z & Kombinasi Nama Rangkaian
                        </h4>
                        <p className="text-xs text-brand-darklight/80 leading-relaxed font-light">
                          Persiapkan nama terbaik putra-putri tercinta dengan membuka seluruh akses database nama modern, Islami, Sansekerta, Jawa, Eropa & kombinasi terpopuler lainnya.
                        </p>
                      </div>
                    </div>
  
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100/50 mt-4 justify-between items-center">
                      <div className="flex gap-1">
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">Aktifkan Instan</span>
                        <span className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded font-medium">Hanya Rp 15.000</span>
                      </div>
                      <span className="text-xs text-brand-teal font-bold group-hover:underline">
                        Hubungi Admin & Buka Semua Akses Now →
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {isUnlocked && filteredNames.length > visibleCount && (
                <div className="flex justify-center pt-8 pb-4" id="load-more-container">
                  <button
                    id="btn-load-more"
                    onClick={() => setVisibleCount((prev) => prev + 40)}
                    className="px-8 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-brand-dark rounded-xl text-xs font-semibold shadow-xs hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-brand-teal" />
                    Tampilkan {Math.min(40, filteredNames.length - visibleCount)} Nama Lainnya (Total {formatNumber(filteredNames.length)} Nama Premium)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
