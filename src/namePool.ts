import { BabyName, GenderType, NuanceType } from './types';

const PREFIX_MEANINGS_L = [
  'Kekuatan pemenang yang mulia',
  'Cahaya fajar penyinar jiwa',
  'Pemimpin bijaksana yang berwibawa tinggi',
  'Pemberani perkasa pelindung sesama',
  'Harapan masa depan yang berjiwa kurnia',
  'Sosok tangguh pembawa kedamaian',
  'Ksatria cerdas berbudi luhur tinggi',
  'Sinar kemakmuran penuntun kebenaran',
  'Pecinta kebajikan yang berwatak bersih',
  'Pilar kokoh pembawa kesuksesan abadi'
];

const PREFIX_MEANINGS_P = [
  'Kecantikan anggun rasi kejora',
  'Kelembutan budi penyejuk rasa kalbu',
  'Bunga mekar pembawa bahagia sejati',
  'Cahaya rembulan penenteram jiwa gundah',
  'Anugerah suci yang penuh berkah melimpah',
  'Gadis cerdas berparas jelita memikat',
  'Jiwa spiritual pembimbing jalan mulia',
  'Embun pagi lambang kesucian rasa kasih',
  'Bintang bersinar tinggi penuntun langkah',
  'Pewaris kemakmuran penuh senyum gembira'
];

const SUFFIX_MEANINGS = [
  'yang dicintai tulus oleh keluarga',
  'yang memancarkan aura benderang kurnia',
  'yang membawa kedamaian dan rukun tertib',
  'yang kokoh pendiriannya laksana gunung',
  'yang selalu bersyukur atas berkah tuhan',
  'yang perkasa melibas rintangan hidup',
  'yang berhati bersih terhindar mara bahaya',
  'yang mengharumkan nama bangsa dan agama',
  'yang dikagumi banyak kawan karena setia',
  'yang berwibawa menyejukkan hati orangtua'
];

// Curated roots for A-Z
const LETTER_ROOTS: Record<string, { L: string[]; P: string[] }> = {
  A: {
    L: ['Adnan', 'Alaric', 'Ammar', 'Azka', 'Asyraf', 'Athar', 'Akram', 'Abid', 'Arfan', 'Arvin', 'Askar', 'Azhar', 'Ariendra', 'Abimanyu', 'Arkana'],
    P: ['Aila', 'Aisha', 'Adzra', 'Akira', 'Amara', 'Anindita', 'Aurelia', 'Ayana', 'Azura', 'Askana', 'Alika', 'Alana', 'Almeera', 'Ayunda', 'Azrina']
  },
  B: {
    L: ['Bagus', 'Belva', 'Bachtiar', 'Badri', 'Bahij', 'Banyu', 'Bariq', 'Barra', 'Basara', 'Bastian', 'Bayu', 'Bramasta', 'Bimo', 'Baskara', 'Byantara'],
    P: ['Bella', 'Belleza', 'Belva', 'Bianca', 'Belvina', 'Beata', 'Binar', 'Bulan', 'Buna', 'Bintari', 'Bora', 'Birgitta', 'Blaire', 'Beryl', 'Bernice']
  },
  C: {
    L: ['Cakra', 'Candra', 'Catra', 'Cendrika', 'Chiko', 'Calvin', 'Caleb', 'Caesar', 'Cleon', 'Colin', 'Cyrus', 'Conrad', 'Cantaka', 'Cedric', 'Clive'],
    P: ['Cahya', 'Callia', 'Camelia', 'Cara', 'Caria', 'Carina', 'Casia', 'Cassandra', 'Cataleya', 'Catharina', 'Celine', 'Cetta', 'Cantika', 'Carissa', 'Caroline']
  },
  D: {
    L: ['Danish', 'Danendra', 'Darma', 'Dhika', 'Diandra', 'Diego', 'Digdaya', 'Dion', 'Dirgantara', 'Damar', 'Damian', 'Darius', 'Darren', 'Dafa'],
    P: ['Dahlia', 'Daphne', 'Dasha', 'Davina', 'Destina', 'Dewi', 'Damara', 'Dania', 'Danica', 'Daniela', 'Dara', 'Darla', 'Deandra', 'Delilah', 'Della']
  },
  E: {
    L: ['Erlangga', 'Elio', 'Elan', 'Elden', 'Elias', 'Elkan', 'Elmer', 'Elroy', 'Elvin', 'Elvano', 'Emil', 'Emran', 'Enzo', 'Eqan', 'Eric'],
    P: ['Echa', 'Edeline', 'Eden', 'Eisya', 'Eldora', 'Elena', 'Elenora', 'Elvina', 'Earline', 'Eartha', 'Echo', 'Edela', 'Eileen', 'Eira', 'Elara']
  },
  F: {
    L: ['Fadil', 'Fadlan', 'Fadli', 'Fahmi', 'Fahreza', 'Fahri', 'Faiq', 'Fajar', 'Fakhri', 'Fandi', 'Farid', 'Faris', 'Farhan', 'Fathan', 'Fathur'],
    P: ['Fania', 'Farra', 'Fawnia', 'Faza', 'Felicia', 'Fidelia', 'Fabia', 'Fabiola', 'Fadila', 'Faeqa', 'Fahima', 'Faida', 'Faiha', 'Fairuz', 'Faith']
  },
  G: {
    L: ['Gading', 'Gandhi', 'Gardana', 'Gary', 'Gavin', 'Genta', 'Gerald', 'Ghufron', 'Gian', 'Gilbert', 'Gilang', 'Ghazi', 'Giovanni', 'Glenn', 'Guntur'],
    P: ['Gaila', 'Ganis', 'Gemma', 'Grace', 'Gabriella', 'Gaby', 'Gaea', 'Gaia', 'Galena', 'Gendhis', 'Genevieve', 'Georgia', 'Geraldine', 'Ghada', 'Ghaida']
  },
  H: {
    L: ['Habib', 'Hadi', 'Hakim', 'Hanif', 'Hanan', 'Harry', 'Hasan', 'Hasbi', 'Hasyim', 'Haydar', 'Hazim', 'Helmi', 'Hendra', 'Henry', 'Hilal'],
    P: ['Hanifah', 'Hasna', 'Hazel', 'Helena', 'Habibah', 'Hadarah', 'Hadia', 'Hafizah', 'Haiba', 'Haida', 'Haifa', 'Halilah', 'Halimah', 'Halina', 'Hana']
  },
  I: {
    L: ['Ihsan', 'Ikhsan', 'Ikhwan', 'Ikram', 'Ilman', 'Imad', 'Imran', 'Inas', 'Iqbal', 'Irfan', 'Irshad', 'Isaac', 'Iskandar', 'Ismet', 'Ivan'],
    P: ['Idra', 'Iffat', 'Ika', 'Indah', 'Inggrid', 'Ida', 'Idelia', 'Idina', 'Iffah', 'Ikrima', 'Ilsa', 'Ilysa', 'Imelda', 'Inas', 'Inaya']
  },
  J: {
    L: ['Jibran', 'Jad', 'Jafar', 'Jafi', 'Jahid', 'Jajang', 'Jalal', 'Jalu', 'Jamil', 'Jan', 'Jandra', 'Jared', 'Jarot', 'Jason', 'Jasper'],
    P: ['Janitra', 'Jessica', 'Jocelyn', 'Julia', 'Jacqueline', 'Jada', 'Jade', 'Jael', 'Jaida', 'Jamilah', 'Jana', 'Jane', 'Janet', 'Janice', 'Jasmine']
  },
  K: {
    L: ['Kenzie', 'Kaden', 'Kael', 'Kafi', 'Kaivan', 'Kamal', 'Kamil', 'Karim', 'Karl', 'Karsten', 'Kevin', 'Khalid', 'Khalil', 'Kian', 'Kiano'],
    P: ['Kamila', 'Kanti', 'Kartika', 'Karunia', 'Keisha', 'Kencana', 'Kaelen', 'Kaela', 'Kaeli', 'Kaila', 'Kailani', 'Kairi', 'Kaitlyn', 'Kalila', 'Kalista']
  },
  L: {
    L: ['Labib', 'Laka', 'Lamar', 'Lambert', 'Lando', 'Landon', 'Lane', 'Langit', 'Lars', 'Leander', 'Leo', 'Leon', 'Leonard', 'Leonardo', 'Leonel'],
    P: ['Lana', 'Laura', 'Lelya', 'Leticia', 'Lina', 'Linh', 'Lintang', 'Luna', 'Leslie', 'Lacey', 'Lael', 'Laela', 'Lahira', 'Laili', 'Laksmi']
  },
  M: {
    L: ['Mahesa', 'Madani', 'Magnus', 'Mahardika', 'Mahendra', 'Maher', 'Mahfuz', 'Mahir', 'Malik', 'Malvin', 'Mandra', 'Manish', 'Manuel', 'Mario', 'Mark'],
    P: ['Madeline', 'Maia', 'Maisie', 'Marsha', 'Marwa', 'Melodi', 'Mabel', 'Madalena', 'Maeve', 'Magda', 'Magdalena', 'Maggie', 'Magnolia', 'Maha', 'Mahala']
  },
  N: {
    L: ['Nabil', 'Nafi', 'Nasim', 'Nasri', 'Natha', 'Nathan', 'Nizar', 'Nadim', 'Nadhif', 'Nadhir', 'Nadir', 'Nafis', 'Naufal', 'Nail', 'Naeem'],
    P: ['Nabila', 'Nada', 'Nadin', 'Najma', 'Najwa', 'Nara', 'Naydine', 'Nisha', 'Naava', 'Nadia', 'Nadine', 'Nadira', 'Nadya', 'Naila', 'Naima']
  },
  O: {
    L: ['Obadiah', 'Odin', 'Oktavianus', 'Oliver', 'Ophir', 'Orion', 'Orlando', 'Ozzy', 'Obby', 'Obe', 'Octave', 'Octavian', 'Octavio', 'Odell', 'Odon'],
    P: ['Octavia', 'Ofelia', 'Ola', 'Olga', 'Oni', 'Onyx', 'Ophelia', 'Oby', 'Oda', 'Odelia', 'Odella', 'Odette', 'Ofilia', 'Olafur', 'Oland']
  },
  P: {
    L: ['Panji', 'Parikesit', 'Pratama', 'Pahlawan', 'Parker', 'Parta', 'Pascal', 'Patricia', 'Patrick', 'Pedro', 'Penelope', 'Pramana', 'Pradipa', 'Prakasa'],
    P: ['Pamela', 'Paramitha', 'Patricia', 'Paulina', 'Penelope', 'Prita', 'Pradipa', 'Prakasa', 'Pia', 'Pipit', 'Pratiwi', 'Puspa', 'Putri', 'Pandora']
  },
  Q: {
    L: ['Qabil', 'Qadi', 'Qadir', 'Qadry', 'Qahar', 'Qani', 'Qanit', 'Qantaka', 'Qarun', 'Qasim', 'Qawi', 'Qazi', 'Qorir', 'Quis', 'Qais'],
    P: ['Qatrunada', 'Qila', 'Qirana', 'Qonita', 'Qoriah', 'Qorira', 'Quana', 'Quinn', 'Qiana', 'Qasrina', 'Qistina', 'Qamara', 'Qadira', 'Qaleesya', 'Qasandra']
  },
  R: {
    L: ['Raditya', 'Rafa', 'Rafif', 'Raihan', 'Ramadhan', 'Rangga', 'Ray', 'Richard', 'Reza', 'Rian', 'Ridho', 'Rival', 'Rizal', 'Rizky', 'Rumi'],
    P: ['Rahma', 'Raniaah', 'Rebecca', 'Regina', 'Renata', 'Rosalind', 'Rania', 'Rosa', 'Rosalie', 'Rose', 'Rowena', 'Roxanne', 'Ruby', 'Ruth']
  },
  S: {
    L: ['Samudra', 'Samuel', 'Sani', 'Sanjaya', 'Satriaji', 'Syafiq', 'Syamil', 'Saddam', 'Soleh', 'Sultan', 'Syahiddin', 'Syahid', 'Sadid', 'Salim', 'Satria'],
    P: ['Safira', 'Salma', 'Sarah', 'Sari', 'Savitri', 'Selena', 'Senja', 'Shahnaz', 'Sona', 'Syira', 'Syasya', 'Syafia', 'Saskia', 'Sabrina', 'Sonia']
  },
  T: {
    L: ['Taha', 'Tahir', 'Taimur', 'Tamin', 'Tanjung', 'Tariq', 'Taufiq', 'Tawfiq', 'Ted', 'Teguh', 'Theodore', 'Thomas', 'Tri', 'Timbul', 'Tito'],
    P: ['Tadya', 'Tamara', 'Tatiana', 'Tazkia', 'Theresa', 'Tiara', 'Tabitha', 'Talia', 'Tanya', 'Tara', 'Teresa', 'Tessa', 'Thea', 'Thelma', 'Tilda']
  },
  U: {
    L: ['Ubaid', 'Uhban', 'Ukail', 'Ukasyah', 'Ulhaq', 'Ulil', 'Umarah', 'Umran', 'Unais', 'Urfee', 'Urwa', 'Usama', 'Utbah', 'Uthman', 'Umar'],
    P: ['Ulfa', 'Umaiza', 'Unaisa', 'Uraiza', 'Ulima', 'Ulrika', 'Uma', 'Una', 'Undine', 'Unity', 'Ura', 'Urania', 'Urit', 'Ursula', 'Ushi']
  },
  V: {
    L: ['Valen', 'Valentino', 'Valerio', 'Vance', 'Varun', 'Victor', 'Vincent', 'Vandy', 'Vero', 'Viko', 'Vito', 'Vian', 'Vardis', 'Valian', 'Valdi'],
    P: ['Valentina', 'Valeria', 'Valerie', 'Valda', 'Vanessa', 'Vasya', 'Veda', 'Vega', 'Vera', 'Verena', 'Vania', 'Viola', 'Violet', 'Virginia', 'Vivian']
  },
  W: {
    L: ['Wade', 'Wafi', 'Wafiq', 'Wahid', 'Wahyu', 'Walid', 'Wardi', 'Wasiat', 'Wibisana', 'Wibowo', 'Wicaksono', 'Widodo', 'Wijaya', 'Wyatt', 'Wira'],
    P: ['Wafa', 'Wanda', 'Wardah', 'Winola', 'Wulan', 'Wening', 'Widi', 'Widya', 'Winda', 'Windy', 'Winona', 'Warna', 'Whitney', 'Wida', 'Widia']
  },
  X: {
    L: ['Xander', 'Xanthos', 'Xavi', 'Xenon', 'Xerxes', 'Xiang', 'Xylon', 'Xylo', 'Xavion', 'Xenophon', 'Xerces', 'Xaverius', 'Xavier', 'Xan', 'Xanthus'],
    P: ['Xandra', 'Xanthe', 'Xena', 'Xenia', 'Xia', 'Xin', 'Xuan', 'Xyla', 'Xyleena', 'Xiamara', 'Xiomara', 'Xuxa', 'Xylona', 'Xylia', 'Xaviera']
  },
  Y: {
    L: ['Yaqub', 'Yahya', 'Yamin', 'Yaris', 'Yaser', 'Yasif', 'Yasin', 'Yazid', 'Yehuda', 'Yuda', 'Yudi', 'Yudha', 'Yudhistira', 'Yusuf', 'Yusril', 'Yumna'],
    P: ['Yadira', 'Yafa', 'Yani', 'Yara', 'Yasira', 'Yasmina', 'Yasmine', 'Yemima', 'Yumna', 'Yolanda', 'Yuko', 'Yvette', 'Yvonne', 'Yura', 'Yustina']
  },
  Z: {
    L: ['Zachary', 'Zafar', 'Zahid', 'Zahir', 'Zid', 'Zain', 'Zakaria', 'Zki', 'Zehan', 'Ziyad', 'Zian', 'Zuhair', 'Zul', 'Zulfikar', 'Zamir'],
    P: ['Zafira', 'Zahira', 'Zaida', 'Zaina', 'Zakiyah', 'Zara', 'Zarina', 'Zia', 'Zora', 'Zahra', 'Zeta', 'Zia', 'Zelda', 'Zenobia', 'Zina']
  }
};

const SUFFIXES_L = [
  'andra', 'indra', 'ananta', 'dika', 'sanjaya', 'putra', 'kurnia', 'pradipa', 'askari', 'elio',
  'mahardika', 'saka', 'banyu', 'yoga', 'wibowo', 'wijaya', 'gibran', 'wan', 'athar', 'esta'
];

const SUFFIXES_P = [
  'alika', 'iana', 'isya', 'rina', 'amara', 'kirana', 'sabrina', 'zahra', 'callista', 'saskia',
  'amira', 'anindya', 'arisha', 'audrey', 'ayudia', 'belva', 'bianca', 'celine', 'clara', 'nara'
];

const ALL_POSSIBLE_ORIGINS = ['Arab', 'Sansekerta', 'Jawa', 'Indonesia', 'Latin', 'Yunani', 'Jepang', 'Keltik', 'Inggris', 'Jerman', 'Persia', 'Ibrani'];
const ALL_POSSIBLE_NUANCES: NuanceType[] = ['Lembut', 'Islami', 'Modern', 'Klasik', 'Kuat', 'Elegan', 'Unik', 'Universal'];

function selectRandomSubset<T>(arr: T[], count: number, seed: number): T[] {
  const result = [...arr];
  let state = seed;
  const lcg = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(lcg() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result.slice(0, count);
}

function getTruePropertiesOfRoot(root: string, gender: GenderType): { origins: string[], nuances: NuanceType[] } {
  const r = root.toLowerCase();
  
  // Default values
  let origins: string[] = ['Indonesia'];
  let nuances: NuanceType[] = ['Lembut', 'Modern'];
  
  // 1. Arab / Islami roots
  const isArab = /^(adnan|abid|ammar|azka|asyraf|athar|akram|arfan|arvin|askar|azhar|adib|anas|amin|azzam|basim|bilal|farhan|habib|hanan|ihsan|iqbal|jibran|kamal|latif|mustafa|nabil|rayan|sami|tariq|umar|wafi|zayd|aila|aisha|adzra|amara|anida|ayana|azura|askana|alika|alana|almeera|ayunda|azrina|anisa|azra|dalia|faiza|farah|hana|inaya|jasmine|layla|nabila|nadia|rania|salma|sara|yasmin|zahra|zara|zaynab|syasya|zafira|zakiyah|badri|bahij|bariq|barra|dafa|fadil|fadlan|fadli|fahmi|fahreza|fahri|faiq|fakhri|farid|faris|fathan|fathur|ghuforn|ghufron|ghazi|habib|hanif|hasan|hasbi|hasyim|haydar|hazim|hilal|hanifah|hasna|habibah|hadarah|hadia|hafizah|haiba|haida|haifa|halilah|halimah|halina|ihsan|ikhsan|ikhwan|ikram|ilman|imad|imran|inas|irfan|irshad|janitra|jafar|jafi|jahid|jamil|jamilah|kafi|kamal|kamil|karim|khalid|khalil|labib|maher|mahfuz|mahir|malik|marwa|maha|mahala|nabil|naeem|nasim|nasri|nadim|nadhif|nadhir|nadir|nafis|naufal|nail|naeem|najma|najwa|naava|nadia|nadine|nadira|nadya|naila|naima|qabil|qadi|qadir|qadry|qahar|qani|qanit|qasim|qawi|qazi|qorir|qais|qatrunada|qila|qirana|qonita|qoriah|qorir|quana|qiana|qasrina|qistina|qamara|qadira|qaleesya|rafa|rafif|raihan|ramadhan|reya|reza|ridho|rizal|rizky|rumi|rafid|safira|salma|syafiq|syamil|saddam|soleh|sultan|syahiddin|syahid|sadid|salim|syasya|syafia|sabrina|taha|tahir|taimur|tamin|tariq|taufiq|tawfiq|ubaid|uhban|ukail|ukasyah|ulhaq|ulil|umarah|umran|unais|urfee|urwa|usama|utbah|uthman|umar|ulfa|umaiza|unaisa|uraiza|ulima|wafi|wafiq|wahid|wahyu|walid|wafa|wardah|wida|yaqub|yahya|yamin|yaris|yaser|yasif|yasin|yazid|yusuf|yusril|yumna|yadira|yafa|yasira|yasmina|yasmine|zachary|zafar|zahid|zahir|zain|zakaria|zehan|ziyad|zian|zuhair|zul|zulfikar|zamir|zafira|zahira|zaida|zaina|zakiyah|zara|zarina|zia|zora|zahra|zelda)/i.test(r);

  // 2. Sansekerta roots
  const isSanskrit = /^(abhimanyu|arsa|aditya|arvind|baskara|cakra|deva|eshwar|giri|harsha|ishwar|kailash|mahesa|narendra|pranadipa|raditya|sanjaya|tarun|varun|yudhistira|anindita|amara|aditi|alka|devi|esha|gauri|indira|kanti|laksmi|meera|nila|priya|rani|savitri|uma|veda|yamuna|agni|artsa|arya|caitra|dharma|kiran|manu|prasad|ravi|soma|tejas|uttara|vana|bramasta|byantara|danendra|digdaya|dirgantara|gandhi|gardana|janitra|mahesa|mahendra|parikesit|pramana|pradipa|prakasa|paramitha|widya|wiradharma|adyatma|anindya|basudewa|nayaka)/i.test(r);

  // 3. Jawa roots
  const isJawa = /^(abimanyu|bagus|candra|damar|eko|gading|heru|indra|joko|kuncoro|liman|mahesa|nugroho|prasetyo|raden|suryo|teguh|utomo|wibowo|yuda|binar|cantika|dewi|endang|gendhis|indah|kartika|laras|mawar|ningsih|puspa|roro|sari|tiara|wulan|yanti|banyu|dwi|giri|melati|saka|senja|tirta|wening|santi|panji|wibisana|wicaksono|widodo|winda|widi|purbasari|puspasari|suharto|yudha)/i.test(r);

  // 4. Jepang roots
  const isJepang = /^(akira|daiki|hiro|haruto|kaito|kenzo|kazuo|masato|ren|sota|takashi|yuto|yuki|yoshi|aiko|airi|akane|akina|akiko|amami|amaya|asuka|chiyo|chika|hana|haruka|himari|hina|keiko|mei|mio|misaki|nanami|riko|rin|sakura|sayuri|yui|yuna|asa|hikaru|hinata|kaoru|mika|noa|sora|zen|kenji|tatsuya|yuri)/i.test(r);

  // 5. Latin roots
  const isLatin = /^(augustus|bastian|caesar|calvin|diego|emil|felix|julian|leo|lucas|marcus|maximilian|oliver|patrick|rufus|silvester|valerian|victor|vincent|vito|aurelia|beata|bianca|carina|cecilia|clara|diana|elena|emilia|felicia|flora|julia|laura|livia|lucia|marina|olivia|regina|stella|valeria|victoria|viola|vivian|valen|vero|rene|amor|pax|sol|vale|belva|belleza|clara|fiona)/i.test(r);

  // 6. Yunani roots
  const isYunani = /^(alexander|andreas|basilio|calix|cleon|damian|dion|elias|george|gregory|hector|jason|leonidas|lucas|nestor|nicolas|philip|socrates|theo|gaila|agatha|anastasia|angela|ariana|chloe|cynthia|daphne|demi|dorothy|elena|georgia|helena|iris|katherine|melanie|penelope|phoebe|selene|sophia|tessa|theodora|zoe|alexis|angel|chris|cleo|dorian|echo|kiril|melon|niki|paris|phenix|sasha|theon)/i.test(r);

  // 7. Keltik roots
  const isKeltik = /^(alan|arthur|barrett|brian|cedric|conan|darren|devin|donald|duncan|dylan|evan|gavin|ian|kane|kenneth|malcolm|morgan|neil|owen|roy|ryan|alana|brianna|cara|deidre|enid|enya|fiona|gwendolyn|isolde|maeve|mona|morgan|muriel|narelle|orla|rhiannon|rowena|sabrina|shannon|sheila|siobhan|tara|casey|dallas|devon|kerry|quinn|reagan|rory|rowan|wynne)/i.test(r);

  // 8. Inggris roots
  const isInggris = /^(alfred|alton|barrett|brandon|carter|darren|edward|edwin|eric|frank|gary|harry|harvey|jason|justin|mason|milton|nelson|oliver|ralph|richard|roy|tyler|william|wyatt|audrey|beatrice|clara|daisy|edith|evelyn|florence|grace|hazel|ivy|jane|lily|mabel|mildred|nancy|olivia|ruby|shadow|scarlett|tiffany|victoria|violet|wendy|blair|brook|dale|gale|harley|hayden|hunter|jordan|lee|madison|peyton|robin|shelby|sidney|taylor)/i.test(r);

  // 9. Jerman roots
  const isJerman = /^(alaric|albert|arnold|baldwin|bernard|bruno|charles|conrad|derek|elmer|ernest|ferdinand|frederick|gerald|gilbert|henry|hubert|karl|leonard|ludwig|otis|raymond|richard|robert|rudolph|walter|adela|adelaide|alice|amelia|bernadette|carla|caroline|emma|gisela|gretchen|hilda|ida|ilsa|irma|louise|matilda|millicent|odette|selma|wanda|wilhelmina|aubrey|romy|uli)/i.test(r);

  // 10. Persia roots
  const isPersia = /^(arash|arman|arya|babak|cyrus|darius|farhad|farid|kamran|kaveh|navid|omid|ramin|raza|rostam|saman|sohrab|yunus|zamir|anahita|arezoo|azar|daria|donya|elaze|ester|jasmin|laleh|leyla|nasrin|neda|parisa|roxanne|shahnaz|shirin|simin|soraya|yasmin|ziba|jahan|shams)/i.test(r);

  // 11. Ibrani roots
  const isIbrani = /^(aaron|abel|adam|asher|benjamin|caleb|daniel|david|elijah|ethan|gabriel|isaac|jacob|jonah|jonathan|joseph|joshua|levi|luke|michael|nathan|noah|samuel|zachary|abigail|adara|anna|deborah|delilah|elizabeth|esther|eva|eve|gabriella|hannah|judith|leah|miriam|naomi|rachel|rebecca|ruth|sarah|susannah|tamar|zohar|ariel|eden|jordan|micah|noa|shalom)/i.test(r);

  // Nuance and Origin assignment logic based on language matches
  if (isArab) {
    origins = ['Arab'];
    nuances = ['Islami', 'Modern', 'Lembut'];
    if (gender === 'L') nuances.push('Kuat');
    else nuances.push('Elegan');
  } else if (isSanskrit) {
    origins = ['Sansekerta'];
    nuances = ['Klasik', 'Elegan', 'Lembut'];
    if (gender === 'L') nuances.push('Kuat');
    else nuances.push('Unik');
  } else if (isJawa) {
    origins = ['Jawa'];
    nuances = ['Klasik', 'Lembut', 'Elegan'];
    if (gender === 'L') nuances.push('Kuat');
    else nuances.push('Unik');
  } else if (isJepang) {
    origins = ['Jepang'];
    nuances = ['Modern', 'Lembut', 'Unik'];
    if (gender === 'P') nuances.push('Elegan');
    else nuances.push('Kuat');
  } else if (isLatin) {
    origins = ['Latin'];
    nuances = ['Klasik', 'Elegan', 'Lembut'];
    if (gender === 'L') nuances.push('Kuat');
  } else if (isYunani) {
    origins = ['Yunani'];
    nuances = ['Modern', 'Elegan', 'Klasik'];
  } else if (isKeltik) {
    origins = ['Keltik'];
    nuances = ['Klasik', 'Unik', 'Modern'];
  } else if (isInggris) {
    origins = ['Inggris'];
    nuances = ['Modern', 'Elegan', 'Lembut'];
  } else if (isJerman) {
    origins = ['Jerman'];
    nuances = ['Klasik', 'Kuat', 'Elegan'];
  } else if (isPersia) {
    origins = ['Persia'];
    nuances = ['Islami', 'Elegan', 'Lembut'];
  } else if (isIbrani) {
    origins = ['Ibrani'];
    nuances = ['Klasik', 'Lembut', 'Islami'];
  } else {
    // Generik Indonesia
    origins = ['Indonesia'];
    nuances = ['Modern', 'Lembut', 'Universal'];
  }

  // Ensure 'Universal' is in origins if gender is U
  if (gender === 'U') {
    if (!origins.includes('Universal')) origins.push('Universal');
    if (!nuances.includes('Universal')) nuances.push('Universal');
  }

  return { origins, nuances: nuances as NuanceType[] };
}

function generateNamesForLetter(letter: string, countNeeded: number, existingNamesSet: Set<string>): BabyName[] {
  const generated: BabyName[] = [];
  const roots = LETTER_ROOTS[letter] || LETTER_ROOTS['A'];
  
  let attempts = 0;
  let nextGenId = 100000 + letter.charCodeAt(0) * 10000;

  while (generated.length < countNeeded && attempts < 5000) {
    attempts++;
    // Alternate gender: L, P, U
    const gender: GenderType = (attempts % 3 === 0) ? 'U' : (attempts % 2 === 0 ? 'P' : 'L');
    
    // Choose root
    const rootList = gender === 'P' ? roots.P : roots.L;
    const rootIndex = (nextGenId + attempts) % rootList.length;
    const root = rootList[rootIndex];
    if (!root) continue;

    // Choose suffix
    const suffixList = gender === 'P' ? SUFFIXES_P : SUFFIXES_L;
    const suffixIndex = (nextGenId * attempts + 17) % suffixList.length;
    const suffix = suffixList[suffixIndex];

    // Combine beautifully as a single word without spaces
    let finalCombinedName = '';
    const lastCharRoot = root.slice(-1).toLowerCase();
    const firstCharSuffix = suffix.charAt(0).toLowerCase();
    
    if (lastCharRoot === firstCharSuffix) {
      finalCombinedName = root + suffix.slice(1);
    } else if (['a','e','i','o','u'].includes(lastCharRoot) && ['a','e','i','o','u'].includes(firstCharSuffix)) {
      // Merge vowels cleanly for natural flow
      finalCombinedName = root + suffix.slice(1);
    } else {
      finalCombinedName = root + suffix;
    }
    
    // Strict cleaning: remove any whitespace and format as single word Title-Case
    finalCombinedName = finalCombinedName.replace(/\s+/g, '');
    finalCombinedName = finalCombinedName.charAt(0).toUpperCase() + finalCombinedName.slice(1).toLowerCase();

    if (existingNamesSet.has(finalCombinedName.toLowerCase()) || finalCombinedName.length > 25) {
      continue;
    }

    const normalized = finalCombinedName.toLowerCase();

    const prefixMeaningList = gender === 'P' ? PREFIX_MEANINGS_P : PREFIX_MEANINGS_L;
    const pMeaning = prefixMeaningList[rootIndex % prefixMeaningList.length];
    const sMeaning = SUFFIX_MEANINGS[suffixIndex % SUFFIX_MEANINGS.length];
    
    const meaning = `${pMeaning}, ${sMeaning}.`;

    const seed = nextGenId + attempts * 13;
    const { origins, nuances } = getTruePropertiesOfRoot(root, gender);

    const combinations = gender === 'L' ? [
      `${finalCombinedName} Aditya Pratama`,
      `Gibran ${finalCombinedName} Askari`
    ] : [
      `${finalCombinedName} Kirana Amara`,
      `Aisha ${finalCombinedName} Sabrina`
    ];

    const nickIdeas = [root, root.slice(0, 4), root.slice(0, 3)].filter((v, i, a) => v && v.length >= 2 && a.indexOf(v) === i);

    const isPopular = (seed) % 7 === 0;

    const babyName: BabyName = {
      id: String(nextGenId++),
      name: finalCombinedName,
      gender,
      meaning,
      origin: origins,
      nuances,
      length: finalCombinedName.replace(/\s+/g, '').length,
      nickIdeas,
      combinations,
      isPopular
    };

    generated.push(babyName);
    existingNamesSet.add(normalized);
  }

  return generated;
}

export function extendNameList(baseNames: BabyName[]): BabyName[] {
  const result = [...baseNames];
  
  const existingNamesSet = new Set<string>();
  result.forEach(b => existingNamesSet.add(b.name.toLowerCase()));

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  letters.forEach(letter => {
    const currentListForLetter = result.filter(b => b.name.trim().charAt(0).toUpperCase() === letter);
    const countExist = currentListForLetter.length;
    
    // We want at least 450 names per letter so that under any filter combinations we have extremely diverse reference names
    const targetCount = 450;
    if (countExist < targetCount) {
      const needed = targetCount - countExist;
      const additional = generateNamesForLetter(letter, needed, existingNamesSet);
      result.push(...additional);
    }
  });

  return result;
}
