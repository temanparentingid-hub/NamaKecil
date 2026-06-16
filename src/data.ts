import { BabyName, NuanceType } from './types';
import { extendNameList } from './namePool';

export const ALL_ORIGINS = [
  'Arab',
  'Sansekerta',
  'Jawa',
  'Indonesia',
  'Latin',
  'Yunani',
  'Jepang',
  'Keltik',
  'Inggris',
  'Jerman',
  'Persia',
  'Ibrani'
];

export const ALL_NUANCES: { id: NuanceType; name: string; desc: string }[] = [
  { id: 'Lembut', name: 'Lembut', desc: 'Nama yang terdengar halus, tenang, dan damai di telinga.' },
  { id: 'Islami', name: 'Islami', desc: 'Nama yang diambil dari Al-Qur’an dan bahasa Arab, syarat makna berkah.' },
  { id: 'Modern', name: 'Modern', desc: 'Nama kontemporer, kekinian, trendi, dan berjiwa muda.' },
  { id: 'Klasik', name: 'Klasik', desc: 'Nama yang tak lekang oleh waktu, bernilai historis, dan bersahaja.' },
  { id: 'Kuat', name: 'Kuat', desc: 'Nama yang tegas, gagah, membangkitkan keberanian dan kepemimpinan.' },
  { id: 'Elegan', name: 'Elegan', desc: 'Nama anggun, berwibawa, mencerminkan kelas, keindahan dan kemewahan.' },
  { id: 'Unik', name: 'Unik', desc: 'Nama yang jarang digunakan, kreatif, dan menonjol daripada yang lain.' },
  { id: 'Universal', name: 'Universal', desc: 'Nama yang mudah diucapkan di berbagai belahan dunia dan budaya.' }
];

const BASE_SAMPLE_NAMES: BabyName[] = [
  // A
  {
    id: '1',
    name: 'Aidan',
    gender: 'L',
    meaning: 'Api kecil yang bersemangat, cerdas, lambang pembawa harapan hangat',
    origin: ['Modern', 'Keltik'],
    nuances: ['Modern', 'Elegan', 'Kuat'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Aidan', 'Ian', 'Adi'],
    combinations: ['Aidan Mahardika Pratama', 'Kenzo Aidan Elio', 'Farhan Aidan Satria'],
    isPopular: true
  },
  {
    id: '2',
    name: 'Arsa',
    gender: 'L',
    meaning: 'Kegembiraan yang tenang, kesucian hati, dan lambang kedamaian',
    origin: ['Sansekerta', 'Jawa'],
    nuances: ['Lembut', 'Klasik', 'Universal'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Arsa', 'Saka', 'Ari'],
    combinations: ['Arsa Danendra Yoga', 'Pranadipa Arsa Putra', 'Arsa Kenzo Elio'],
    isPopular: false
  },
  {
    id: '3',
    name: 'Aila',
    gender: 'P',
    meaning: 'Cahaya pembawa kedamaian yang suci, berkilau seperti rembulan malam',
    origin: ['Modern', 'Keltik'],
    nuances: ['Lembut', 'Modern', 'Unik'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Aila', 'Ais', 'La'],
    combinations: ['Aila Amara Sabrina', 'Aila Callista Kirana', 'Ayana Aila Saskia'],
    isPopular: true
  },
  {
    id: '4',
    name: 'Aisha',
    gender: 'P',
    meaning: 'Kehidupan yang penuh kemakmuran, gembira, dan bersemangat membina kebaikan',
    origin: ['Arab'],
    nuances: ['Islami', 'Klasik', 'Lembut'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Aisha', 'Icha', 'Sasha'],
    combinations: ['Aisha Rania Kirana', 'Aisha Zahra Amara', 'Aila Aisha Sabrina'],
    isPopular: true
  },

  // B
  {
    id: '5',
    name: 'Bumi',
    gender: 'L',
    meaning: 'Dunia tempat tinggal, melambangkan sosok yang kokoh, tenang, dan rendah hati',
    origin: ['Indonesia', 'Jawa'],
    nuances: ['Klasik', 'Kuat', 'Unik'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Bumi', 'Mimi'],
    combinations: ['Bumi Gibran Askari', 'Bumi Aditya Sanjaya', 'Senja Bumi Pratama'],
    isPopular: true
  },
  {
    id: '6',
    name: 'Bagas',
    gender: 'L',
    meaning: 'Kesehatan yang prima, kebugaran fisik, serta keteguhan jiwa dan budi pekerti',
    origin: ['Jawa', 'Indonesia'],
    nuances: ['Klasik', 'Kuat', 'Lembut'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Bagas', 'Bagong', 'Agas'],
    combinations: ['Bagas Aditya Farhan', 'Askari Bagas Sanjaya', 'Bagas Kenzo Rumi'],
    isPopular: false
  },
  {
    id: '7',
    name: 'Binar',
    gender: 'P',
    meaning: 'Sinar cahaya kebahagiaan yang berbinar indah dan menyejukkan hati sekitarnya',
    origin: ['Indonesia', 'Jawa'],
    nuances: ['Lembut', 'Modern', 'Unik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Binar', 'Inar', 'Bibi'],
    combinations: ['Binar Kirana Amara', 'Binar Shahnaz Fiona', 'Callista Binar Saskia'],
    isPopular: true
  },
  {
    id: '8',
    name: 'Belvina',
    gender: 'P',
    meaning: 'Gadis yang putih, murni, jujur, berhati mulia dan dikelilingi kecantikan abadi',
    origin: ['Keltik', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Lembut'],
    syllables: 3,
    length: 7,
    nickIdeas: ['Belva', 'Vina', 'Bella'],
    combinations: ['Belvina Amara Callista', 'Belvina Zahra Rania', 'Aila Belvina Kirana'],
    isPopular: false
  },

  // C
  {
    id: '9',
    name: 'Cakra',
    gender: 'L',
    meaning: 'Senjata berbentuk roda pelindung, melambangkan kekuatan mistis yang adil dan berani',
    origin: ['Sansekerta', 'Jawa'],
    nuances: ['Kuat', 'Klasik', 'Elegan'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Cakra', 'Coko', 'Aka'],
    combinations: ['Cakra Aditya Sanjaya', 'Cakra Kenzo Danendra', 'Malik Cakra Pranadipa'],
    isPopular: true
  },
  {
    id: '10',
    name: 'Chandra',
    gender: 'L',
    meaning: 'Indah laksana cahaya rembulan malam, bercahaya lembut dan membawa ketenangan',
    origin: ['Sansekerta'],
    nuances: ['Klasik', 'Lembut', 'Elegan'],
    syllables: 2,
    length: 7,
    nickIdeas: ['Chandra', 'Chan', 'Andra'],
    combinations: ['Chandra Arsa Gibran', 'Chandra Elio Askari', 'Bumi Chandra Mahardika'],
    isPopular: false
  },
  {
    id: '11',
    name: 'Callista',
    gender: 'P',
    meaning: 'Yang paling cantik jelita, memesona dengan kehalusan budi pekerti',
    origin: ['Yunani'],
    nuances: ['Elegan', 'Modern', 'Lembut'],
    syllables: 3,
    length: 8,
    nickIdeas: ['Callista', 'Calla', 'Lista'],
    combinations: ['Callista Kirana Amara', 'Aila Callista Sabrina', 'Callista Ayana Zahra'],
    isPopular: true
  },
  {
    id: '12',
    name: 'Chika',
    gender: 'P',
    meaning: 'Anak perempuan yang cerdas, riang gembira, dan menyebarkan kedekatan sosial',
    origin: ['Jepang', 'Modern'],
    nuances: ['Modern', 'Lembut', 'Universal'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Chika', 'Chik', 'Ika'],
    combinations: ['Chika Amara Sabrina', 'Chika Kirana Amara', 'Ayana Chika Fiona'],
    isPopular: false
  },

  // D
  {
    id: '13',
    name: 'Danish',
    gender: 'L',
    meaning: 'Kebijaksanaan, berpengetahuan tinggi, dan penuh dengan kecerdasan',
    origin: ['Arab'],
    nuances: ['Islami', 'Modern', 'Elegan'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Danish', 'Danis', 'Dane'],
    combinations: ['Danish Rayyan Farhan', 'Danish Kenzo Kaelan', 'Avanish Danish Maulana'],
    isPopular: true
  },
  {
    id: '14',
    name: 'Danendra',
    gender: 'L',
    meaning: 'Raja yang kaya raya dan mulia hati, pembawa kemakmuran bagi rakyatnya',
    origin: ['Sansekerta'],
    nuances: ['Klasik', 'Elegan', 'Kuat'],
    syllables: 3,
    length: 8,
    nickIdeas: ['Danendra', 'Andra', 'Dendra'],
    combinations: ['Danendra Arsa Putra', 'Malik Danendra Askari', 'Danendra Kenzo Elio'],
    isPopular: true
  },
  {
    id: '15',
    name: 'Dafina',
    gender: 'P',
    meaning: 'Harta karun tersembunyi yang berharga tinggi, lambang keunikan dan kehormatan',
    origin: ['Arab', 'Persia'],
    nuances: ['Islami', 'Unik', 'Elegan'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Dafina', 'Dafi', 'Fina'],
    combinations: ['Dafina Amara Kirana', 'Dafina Nadia Sabrina', 'Aisha Dafina Zahra'],
    isPopular: false
  },
  {
    id: '16',
    name: 'Dian',
    gender: 'P',
    meaning: 'Lilin atau pelita penerang jalan kehidupan, setia menyinari di dalam gulita',
    origin: ['Indonesia', 'Jawa'],
    nuances: ['Klasik', 'Lembut', 'Kuat'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Dian', 'Didi', 'Iyan'],
    combinations: ['Dian Kirana Amara', 'Dian Callista Sabrina', 'Zahra Dian Rania'],
    isPopular: false
  },

  // E
  {
    id: '17',
    name: 'Elio',
    gender: 'L',
    meaning: 'Matahari yang memberikan kehangatan dan benderang menerangi jalan hidup',
    origin: ['Latin', 'Yunani'],
    nuances: ['Modern', 'Elegan', 'Universal'],
    syllables: 3,
    length: 4,
    nickIdeas: ['Elio', 'Eli', 'Lio'],
    combinations: ['Elio Aria Mahardika', 'Kenzo Elio Askari', 'Aidan Elio Pranadipa'],
    isPopular: true
  },
  {
    id: '18',
    name: 'Ezra',
    gender: 'L',
    meaning: 'Sang penyelamat, penolong yang penuh kasih sayang dan pembawa kedamaian',
    origin: ['Ibrani', 'Universal'],
    nuances: ['Modern', 'Kuat', 'Universal'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Ezra', 'Ezzi', 'Rara'],
    combinations: ['Ezra Gibran Askari', 'Ezra Aidan Elio', 'Farhan Ezra Bagas'],
    isPopular: true
  },
  {
    id: '19',
    name: 'Elina',
    gender: 'P',
    meaning: 'Wanita yang cerdas bermata cemerlang, bersinar benderang laksana fajar',
    origin: ['Yunani', 'Latin'],
    nuances: ['Elegan', 'Modern', 'Lembut'],
    syllables: 3,
    length: 5,
    nickIdeas: ['Elina', 'Elin', 'Lina'],
    combinations: ['Elina Amara Kirana', 'Elina Sabrina Callista', 'Aila Elina Zahra'],
    isPopular: true
  },
  {
    id: '20',
    name: 'Emira',
    gender: 'P',
    meaning: 'Putri bangsawan yang agung, berjiwa pemimpin bijaksana dan anggun',
    origin: ['Arab'],
    nuances: ['Islami', 'Elegan', 'Kuat'],
    syllables: 3,
    length: 5,
    nickIdeas: ['Emira', 'Emi', 'Mira'],
    combinations: ['Emira Zahra Rania', 'Emira Aisha Kirana', 'Nadia Emira Sabrina'],
    isPopular: false
  },

  // F
  {
    id: '21',
    name: 'Farhan',
    gender: 'L',
    meaning: 'Kegembiraan hati yang abadi, selalu ceria dan penuh kebahagiaan',
    origin: ['Arab'],
    nuances: ['Islami', 'Klasik', 'Lembut'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Farhan', 'Rahan', 'Arhan'],
    combinations: ['Farhan Rayyan Gibran', 'Farhan Askari Bagas', 'Danish Farhan Aditya'],
    isPopular: false
  },
  {
    id: '22',
    name: 'Fadhil',
    gender: 'L',
    meaning: 'Sosok yang mulia, memiliki keutamaan akhlak yang terpuji dan murah hati',
    origin: ['Arab'],
    nuances: ['Islami', 'Elegan', 'Kuat'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Fadhil', 'Fadil', 'Adil'],
    combinations: ['Fadhil Rayyan Danish', 'Fadhil Askari Bumi', 'Aditya Fadhil Gibran'],
    isPopular: false
  },
  {
    id: '23',
    name: 'Fiona',
    gender: 'P',
    meaning: 'Putih dan bersih, adil, berjiwa mulia dan bersinar menerangi kegelapan',
    origin: ['Keltik', 'Modern'],
    nuances: ['Lembut', 'Unik', 'Universal'],
    syllables: 3,
    length: 5,
    nickIdeas: ['Fiona', 'Fio', 'Ona'],
    combinations: ['Fiona Amara Sabrina', 'Saskia Fiona Kirana', 'Fiona Zahra Rania'],
    isPopular: false
  },
  {
    id: '24',
    name: 'Farah',
    gender: 'P',
    meaning: 'Sukacita yang berseri, membawa keceriaan dan kehangatan bagi keluarga',
    origin: ['Arab'],
    nuances: ['Islami', 'Lembut', 'Klasik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Farah', 'Fara', 'Ara'],
    combinations: ['Farah Aisha Rania', 'Farah Amara Callista', 'Kirana Farah Sabrina'],
    isPopular: true
  },

  // G
  {
    id: '25',
    name: 'Gibran',
    gender: 'L',
    meaning: 'Yang paling pandai memecahkan masalah, penyatu keluarga, dan bijaksana',
    origin: ['Arab'],
    nuances: ['Islami', 'Modern', 'Kuat'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Gibran', 'Ibra', 'Gibby'],
    combinations: ['Gibran Askari Bagas', 'Danish Gibran Rumi', 'Gibran Arsa Pranadipa'],
    isPopular: true
  },
  {
    id: '26',
    name: 'Gavin',
    gender: 'L',
    meaning: 'Elang putih perang yang tangguh, setia, berjiwa ksatria dan pemberani',
    origin: ['Keltik', 'Modern'],
    nuances: ['Modern', 'Kuat', 'Universal'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Gavin', 'Gav', 'Vin'],
    combinations: ['Gavin Aidan Elio', 'Gavin Kenzo Gibran', 'Arsa Gavin Pratama'],
    isPopular: true
  },
  {
    id: '27',
    name: 'Gisela',
    gender: 'P',
    meaning: 'Janji yang manis dan setia, membawa kedamaian dan harmoni',
    origin: ['Latin', 'Modern'],
    nuances: ['Elegan', 'Lembut', 'Modern'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Gisela', 'Gisel', 'Ela'],
    combinations: ['Gisela Callista Amara', 'Kirana Gisela Sabrina', 'Gisela Zahra Rania'],
    isPopular: false
  },
  {
    id: '28',
    name: 'Gita',
    gender: 'P',
    meaning: 'Sebuah nyanyian suci atau lagu pujian pendorong takdir yang agung',
    origin: ['Sansekerta', 'Indonesia'],
    nuances: ['Klasik', 'Elegan', 'Lembut'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Gita', 'Agit', 'Ta'],
    combinations: ['Gita Kirana Amara', 'Gita Amara Callista', 'Saskia Gita Sabrina'],
    isPopular: false
  },

  // H
  {
    id: '29',
    name: 'Hanif',
    gender: 'L',
    meaning: 'Muslim yang lurus, teguh mempertahankan kebenaran dan jujur',
    origin: ['Arab'],
    nuances: ['Islami', 'Kuat', 'Klasik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Hanif', 'Hani', 'Anif'],
    combinations: ['Hanif Rayyan Farhan', 'Hanif Askari Bagas', 'Gibran Hanif Rumi'],
    isPopular: true
  },
  {
    id: '30',
    name: 'Hadi',
    gender: 'L',
    meaning: 'Penunjuk jalan kebenaran yang tenang, pembina kedamaian budi pekerti',
    origin: ['Arab'],
    nuances: ['Islami', 'Lembut', 'Klasik'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Hadi', 'Adit', 'Iyan'],
    combinations: ['Hadi Aditya Sanjaya', 'Hadi Danish Elio', 'Arsa Hadi Pranadipa'],
    isPopular: false
  },
  {
    id: '31',
    name: 'Hana',
    gender: 'P',
    meaning: 'Bunga mawar yang mekar cantik, berkah karunia yang paling dinanti',
    origin: ['Arab', 'Jepang'],
    nuances: ['Islami', 'Lembut', 'Universal'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Hana', 'Anah', 'Han'],
    combinations: ['Hana Sabrina Kirana', 'Hana Zahra Kamila', 'Aila Hana Callista'],
    isPopular: true
  },
  {
    id: '32',
    name: 'Hilya',
    gender: 'P',
    meaning: 'Perhiasan indah yang suci, berkilau memancarkan kemuliaan akhlak',
    origin: ['Arab'],
    nuances: ['Islami', 'Lembut', 'Unik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Hilya', 'Hily', 'Lya'],
    combinations: ['Hilya Amara Sabrina', 'Hilya Aisha Rania', 'Ayana Hilya Zahra'],
    isPopular: false
  },

  // I
  {
    id: '33',
    name: 'Ihsan',
    gender: 'L',
    meaning: 'Kebaikan yang tulus dari lubuk hati, tindakan mulia yang penuh empati',
    origin: ['Arab'],
    nuances: ['Islami', 'Lembut', 'Klasik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Ihsan', 'Isan', 'San'],
    combinations: ['Ihsan Rayyan Gibran', 'Ihsan Aditya Farhan', 'Danish Ihsan Askari'],
    isPopular: false
  },
  {
    id: '34',
    name: 'Irfan',
    gender: 'L',
    meaning: 'Pengetahuan yang mendalam, kebijaksanaan spiritual, rasa bersyukur yang tinggi',
    origin: ['Arab'],
    nuances: ['Islami', 'Klasik', 'Kuat'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Irfan', 'Irvan', 'Ipan'],
    combinations: ['Irfan Gibran Askari', 'Irfan Danish Elio', 'Bumi Irfan Mahardika'],
    isPopular: false
  },
  {
    id: '35',
    name: 'Inara',
    gender: 'P',
    meaning: 'Cahaya kepintaran yang bersinar menerangi sekelilingnya, berjiwa pemimpin',
    origin: ['Arab'],
    nuances: ['Islami', 'Modern', 'Elegan'],
    syllables: 3,
    length: 5,
    nickIdeas: ['Inara', 'Inar', 'Nara'],
    combinations: ['Inara Callista Kirana', 'Inara Amara Sabrina', 'Aila Inara Zahra'],
    isPopular: true
  },
  {
    id: '36',
    name: 'Irene',
    gender: 'P',
    meaning: 'Dewi perdamaian yang membawa suasana tenang, harmonis, dan aman jaya',
    origin: ['Yunani', 'Universal'],
    nuances: ['Elegan', 'Klasik', 'Universal'],
    syllables: 3,
    length: 5,
    nickIdeas: ['Irene', 'Iren', 'Rene'],
    combinations: ['Irene Sabrina Amara', 'Irene Kirana Callista', 'Fiona Irene Zahra'],
    isPopular: false
  },

  // J
  {
    id: '37',
    name: 'Janu',
    gender: 'L',
    meaning: 'Berpikir jernih, berjiwa hidup penuh semangat, tulus dan setia kawan',
    origin: ['Jawa', 'Indonesia'],
    nuances: ['Lembut', 'Klasik', 'Unik'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Janu', 'Anu', 'Jojo'],
    combinations: ['Janu Aditya Sanjaya', 'Janu Danendra Arsa', 'Kenzo Janu Gibran'],
    isPopular: false
  },
  {
    id: '38',
    name: 'Javier',
    gender: 'L',
    meaning: 'Rumah baru yang terang benderang, megah, dan diberkati cahaya kesuksesan',
    origin: ['Latin', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Universal'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Javier', 'Javi', 'Vier'],
    combinations: ['Javier Aidan Elio', 'Javier Kenzo Gibran', 'Rayyan Javier Danish'],
    isPopular: true
  },
  {
    id: '39',
    name: 'Jihan',
    gender: 'P',
    meaning: 'Tempat yang megah, berkelimpahan berkah, perempuan bunga surga yang cantik',
    origin: ['Arab', 'Persia'],
    nuances: ['Islami', 'Elegan', 'Klasik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Jihan', 'Jih', 'Hana'],
    combinations: ['Jihan Zahra Amara', 'Jihan Kirana Sabrina', 'Aisha Jihan Rania'],
    isPopular: true
  },
  {
    id: '40',
    name: 'Jasmine',
    gender: 'P',
    meaning: 'Bunga melati putih yang harum semerbak, melambangkan kesucian dan keanggunan',
    origin: ['Persia', 'Inggris'],
    nuances: ['Elegan', 'Klasik', 'Universal'],
    syllables: 2,
    length: 7,
    nickIdeas: ['Jasmine', 'Jas', 'Mimi'],
    combinations: ['Jasmine Callista Kirana', 'Jasmine Amara Sabrina', 'Aila Jasmine Zahra'],
    isPopular: true
  },

  // K
  {
    id: '41',
    name: 'Kenzo',
    gender: 'L',
    meaning: 'Anak yang sehat, kuat, kreatif, dan membawa keberuntungan',
    origin: ['Jepang', 'Modern'],
    nuances: ['Modern', 'Kuat', 'Unik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Kenzo', 'Ken', 'Kenz'],
    combinations: ['Kenzo Aidan Elio', 'Kenzo Gibran Aditya', 'Arsa Kenzo Malik'],
    isPopular: true
  },
  {
    id: '42',
    name: 'Kenzie',
    gender: 'L',
    meaning: 'Pemimpin yang bijaksana, adil, tampan rupawan dan disenangi banyak orang',
    origin: ['Keltik', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Universal'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Kenzie', 'Kenz', 'Zie'],
    combinations: ['Kenzie Aidan Rayyan', 'Kenzie Askari Gibran', 'Kenzie Elio Arsa'],
    isPopular: true
  },
  {
    id: '43',
    name: 'Kirana',
    gender: 'P',
    meaning: 'Sinar cahaya yang terang benderang, cantik berseri dan bersemangat mulia',
    origin: ['Sansekerta', 'Jawa'],
    nuances: ['Klasik', 'Elegan', 'Lembut'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Kirana', 'Rana', 'Kiki'],
    combinations: ['Kirana Amara Rania', 'Aisha Kirana Callista', 'Kirana Saskia Ayana'],
    isPopular: true
  },
  {
    id: '44',
    name: 'Keysha',
    gender: 'P',
    meaning: 'Wanita pelindung yang disayangi sekitarnya, membawa keceriaan tiada tara',
    origin: ['Modern', 'Inggris'],
    nuances: ['Modern', 'Unik', 'Universal'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Keysha', 'Key', 'Sha'],
    combinations: ['Keysha Amara Sabrina', 'Keysha Kirana Callista', 'Aila Keysha Zahra'],
    isPopular: true
  },

  // L
  {
    id: '45',
    name: 'Luthfi',
    gender: 'L',
    meaning: 'Sopan santun yang murni, lembut hatinya dan penuh kasih persahabatan',
    origin: ['Arab'],
    nuances: ['Islami', 'Lembut', 'Klasik'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Luthfi', 'Upi', 'Lup'],
    combinations: ['Luthfi Rayyan Farhan', 'Luthfi Askari Gibran', 'Danish Luthfi Rumi'],
    isPopular: false
  },
  {
    id: '46',
    name: 'Leon',
    gender: 'L',
    meaning: 'Singa yang perkasa, berani luar biasa, melambangkan kepemimpinan mandiri',
    origin: ['Latin', 'Universal'],
    nuances: ['Modern', 'Kuat', 'Universal'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Leon', 'Leo', 'Eon'],
    combinations: ['Leon Aidan Elio', 'Leon Kenzo Gibran', 'Ezra Leon Askari'],
    isPopular: true
  },
  {
    id: '47',
    name: 'Laras',
    gender: 'P',
    meaning: 'Harmoni yang seimbang, serasi, tenang jiwanya laksana melodi yang syahdu',
    origin: ['Jawa', 'Indonesia'],
    nuances: ['Klasik', 'Lembut', 'Elegan'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Laras', 'Rara', 'Lala'],
    combinations: ['Laras Kirana Amara', 'Laras Callista Sabrina', 'Zahra Laras Rania'],
    isPopular: false
  },
  {
    id: '48',
    name: 'Latisha',
    gender: 'P',
    meaning: 'Kegembiraan yang meluap, menyebarkan aura bahagia penuh sukacita positif',
    origin: ['Latin', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Universal'],
    syllables: 3,
    length: 7,
    nickIdeas: ['Latisha', 'Tisha', 'Isha'],
    combinations: ['Latisha Amara Sabrina', 'Latisha Kirana Callista', 'Aila Latisha Zahra'],
    isPopular: false
  },

  // M
  {
    id: '49',
    name: 'Malik',
    gender: 'L',
    meaning: 'Raja penguasa yang adil, berwibawa tinggi, tegar dalam memimpin kebenaran',
    origin: ['Arab'],
    nuances: ['Islami', 'Kuat', 'Klasik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Malik', 'Alik', 'Lik'],
    combinations: ['Malik Askari Bagas', 'Malik Gibran Rumi', 'Aditya Malik Farhan'],
    isPopular: true
  },
  {
    id: '50',
    name: 'Mika',
    gender: 'L',
    meaning: 'Cerdas, wangi keharuman, berjiwa muda yang kreatif dan pembawa tawa',
    origin: ['Jepang', 'Modern'],
    nuances: ['Modern', 'Unik', 'Lembut'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Mika', 'Koko', 'Mik'],
    combinations: ['Mika Aidan Elio', 'Mika Kenzo Gibran', 'Arsa Mika Pratama'],
    isPopular: false
  },
  {
    id: '51',
    name: 'Malika',
    gender: 'P',
    meaning: 'Ratu, pemimpin perempuan yang bijak, melindungi yang lemah',
    origin: ['Arab'],
    nuances: ['Islami', 'Elegan', 'Kuat'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Malika', 'Ika', 'Mala'],
    combinations: ['Malika Kirana Sabrina', 'Zahra Malika Amara', 'Aisha Malika Rania'],
    isPopular: true
  },
  {
    id: '52',
    name: 'Misha',
    gender: 'P',
    meaning: 'Cantik jelita, berhati mulia, penuh tawa gembira yang menular riang',
    origin: ['Modern', 'Universal'],
    nuances: ['Modern', 'Lembut', 'Universal'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Misha', 'Mimi', 'Isha'],
    combinations: ['Misha Amara Sabrina', 'Misha Kirana Callista', 'Aila Misha Zahra'],
    isPopular: true
  },

  // N
  {
    id: '53',
    name: 'Naufal',
    gender: 'L',
    meaning: 'Pemuda tampan yang dermawan, berjiwa ksatria dan suka menolong sesama',
    origin: ['Arab'],
    nuances: ['Islami', 'Klasik', 'Elegan'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Naufal', 'Nau', 'Opal'],
    combinations: ['Naufal Rayyan Farhan', 'Naufal Askari Gibran', 'Danish Naufal Rumi'],
    isPopular: true
  },
  {
    id: '54',
    name: 'Narendra',
    gender: 'L',
    meaning: 'Raja di antara manusia yang berdaulat, kokoh, berwibawa dan beruntung',
    origin: ['Sansekerta', 'Jawa'],
    nuances: ['Klasik', 'Kuat', 'Elegan'],
    syllables: 3,
    length: 8,
    nickIdeas: ['Narendra', 'Naren', 'Rendra'],
    combinations: ['Narendra Arsa Putra', 'Malik Narendra Askari', 'Narendra Aditya Sanjaya'],
    isPopular: false
  },
  {
    id: '55',
    name: 'Nadia',
    gender: 'P',
    meaning: 'Harapan indah yang membawa kabahagiaan baru, berjiwa penolong',
    origin: ['Latin', 'Arab'],
    nuances: ['Lembut', 'Modern', 'Universal'],
    syllables: 3,
    length: 5,
    nickIdeas: ['Nadia', 'Nadi', 'Dea'],
    combinations: ['Nadia Sabrina Zahra', 'Nadia Kirana Amara', 'Ayana Nadia Gisela'],
    isPopular: false
  },
  {
    id: '56',
    name: 'Nayara',
    gender: 'P',
    meaning: 'Anak perempuan pembawa kehangatan fajar dan bimbingan cahaya hidup rukun',
    origin: ['Sansekerta', 'Modern'],
    nuances: ['Modern', 'Lembut', 'Unik'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Nayara', 'Naya', 'Ara'],
    combinations: ['Nayara Amara Sabrina', 'Nayara Kirana Callista', 'Aila Nayara Zahra'],
    isPopular: true
  },

  // O
  {
    id: '57',
    name: 'Oskar',
    gender: 'L',
    meaning: 'Tombak suci pelindung yang tangguh, setia menjaga kedamaian dan keadilan',
    origin: ['Jerman', 'Keltik'],
    nuances: ['Kuat', 'Klasik', 'Universal'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Oskar', 'Oki', 'Kar'],
    combinations: ['Oskar Aidan Elio', 'Oskar Kenzo Gibran', 'Arsa Oskar Pratama'],
    isPopular: false
  },
  {
    id: '58',
    name: 'Owen',
    gender: 'L',
    meaning: 'Pejuang muda yang murni, lahir dari keturunan mulia yang diberkati keberuntungan',
    origin: ['Keltik', 'Modern'],
    nuances: ['Modern', 'Lembut', 'Universal'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Owen', 'Owe', 'Wen'],
    combinations: ['Owen Aidan Rayyan', 'Owen Askari Gibran', 'Ezra Owen Elio'],
    isPopular: true
  },
  {
    id: '59',
    name: 'Olivia',
    gender: 'P',
    meaning: 'Pohon zaitun lambang perdamaian abadi, kemakmuran, kesetiaan dan kesuburan',
    origin: ['Latin', 'Universal'],
    nuances: ['Elegan', 'Klasik', 'Universal'],
    syllables: 4,
    length: 6,
    nickIdeas: ['Olivia', 'Olive', 'Via'],
    combinations: ['Olivia Amara Sabrina', 'Olivia Kirana Callista', 'Aila Olivia Zahra'],
    isPopular: true
  },
  {
    id: '60',
    name: 'Odelia',
    gender: 'P',
    meaning: 'Wanita kaya raya yang memuji tuhan, berhati emas penenang badai emosi',
    origin: ['Ibrani', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Unik'],
    syllables: 4,
    length: 6,
    nickIdeas: ['Odelia', 'Odel', 'Lia'],
    combinations: ['Odelia Zahra Rania', 'Odelia Aisha Kirana', 'Nadia Odelia Sabrina'],
    isPopular: false
  },

  // P
  {
    id: '61',
    name: 'Pranadipa',
    gender: 'L',
    meaning: 'Lampu penerang kehidupan yang mulia, penuntun keluarga menuju kebahagiaan',
    origin: ['Sansekerta', 'Jawa'],
    nuances: ['Klasik', 'Elegan', 'Kuat'],
    syllables: 4,
    length: 10,
    nickIdeas: ['Prana', 'Dipa', 'Adip'],
    combinations: ['Pranadipa Arsa Putra', 'Askari Pranadipa Gibran', 'Pranadipa Elio Kenzo'],
    isPopular: false
  },
  {
    id: '62',
    name: 'Pandu',
    gender: 'L',
    meaning: 'Penunjuk arah jalan kebaikan, pelopor, melambangkan kebijaksanaan kepemimpinan',
    origin: ['Jawa', 'Indonesia'],
    nuances: ['Klasik', 'Kuat', 'Lembut'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Pandu', 'Pan', 'Dudu'],
    combinations: ['Pandu Aditya Sanjaya', 'Pandu Arsa Putra', 'Gibran Pandu Askari'],
    isPopular: false
  },
  {
    id: '63',
    name: 'Putri',
    gender: 'P',
    meaning: 'Anak perempuan raja yang agung, mulia, santun berbudi pekerti luhur',
    origin: ['Indonesia', 'Sansekerta'],
    nuances: ['Klasik', 'Elegan', 'Lembut'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Putri', 'Mput', 'Tatri'],
    combinations: ['Putri Kirana Amara', 'Putri Callista Sabrina', 'Zahra Putri Rania'],
    isPopular: true
  },
  {
    id: '64',
    name: 'Prisha',
    gender: 'P',
    meaning: 'Karunia cinta tuhan yang paling berharga, penuh keindahan cinta kasih murni',
    origin: ['Sansekerta', 'Modern'],
    nuances: ['Modern', 'Lembut', 'Unik'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Prisha', 'Isha', 'Pipi'],
    combinations: ['Prisha Amara Sabrina', 'Prisha Kirana Callista', 'Aila Prisha Zahra'],
    isPopular: false
  },

  // Q
  {
    id: '65',
    name: 'Qais',
    gender: 'L',
    meaning: 'Pecinta yang teguh pendiriannya, penuh percaya diri dan tegar berkuasa',
    origin: ['Arab'],
    nuances: ['Islami', 'Kuat', 'Unik'],
    syllables: 1,
    length: 4,
    nickIdeas: ['Qais', 'Kais', 'Ais'],
    combinations: ['Qais Rayyan Farhan', 'Qais Askari Bagas', 'Gibran Qais Rumi'],
    isPopular: false
  },
  {
    id: '66',
    name: 'Qiana',
    gender: 'P',
    meaning: 'Sosok wanita yang anggun bagaikan sutra, diberkati berkah kejayaan',
    origin: ['Arab', 'Modern'],
    nuances: ['Islami', 'Modern', 'Elegan'],
    syllables: 3,
    length: 5,
    nickIdeas: ['Qiana', 'Kiana', 'Ana'],
    combinations: ['Qiana Amara Sabrina', 'Qiana Kirana Callista', 'Aila Qiana Zahra'],
    isPopular: true
  },

  // R
  {
    id: '67',
    name: 'Rayyan',
    gender: 'L',
    meaning: 'Pintu surga yang diperuntukkan bagi jiwa-jiwa suci, penuh berkah, tampan rupawan',
    origin: ['Arab'],
    nuances: ['Islami', 'Modern', 'Elegan'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Rayyan', 'Rayan', 'Rian'],
    combinations: ['Rayyan Farhan Danish', 'Rayyan Askari Gibran', 'Aidan Rayyan Kaelan'],
    isPopular: true
  },
  {
    id: '68',
    name: 'Raka',
    gender: 'L',
    meaning: 'Kakak laki-laki pelindung keluarga yang tegar, setia, dan berpendirian kokoh',
    origin: ['Jawa', 'Indonesia'],
    nuances: ['Klasik', 'Kuat', 'Lembut'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Raka', 'Kaka', 'Ara'],
    combinations: ['Raka Aditya Farhan', 'Raka Askari Bagas', 'Bumi Raka Sanjaya'],
    isPopular: false
  },
  {
    id: '69',
    name: 'Rania',
    gender: 'P',
    meaning: 'Ratu yang memesona, berwibawa tinggi, tenang menghadapi rintangan',
    origin: ['Arab'],
    nuances: ['Islami', 'Elegan', 'Lembut'],
    syllables: 3,
    length: 5,
    nickIdeas: ['Rania', 'Rani', 'Nia'],
    combinations: ['Rania Kirana Amara', 'Zahra Rania Sabrina', 'Aisha Rania Kirana'],
    isPopular: false
  },
  {
    id: '70',
    name: 'Rhea',
    gender: 'P',
    meaning: 'Aliran sungai yang menyejukkan, anggun, mencerminkan cinta kasih keibuan',
    origin: ['Yunani', 'Universal'],
    nuances: ['Elegan', 'Modern', 'Universal'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Rhea', 'Rea', 'Rere'],
    combinations: ['Rhea Amara Sabrina', 'Rhea Kirana Callista', 'Aila Rhea Zahra'],
    isPopular: true
  },

  // S
  {
    id: '71',
    name: 'Saka',
    gender: 'L',
    meaning: 'Soko guru atau tiang penyangga yang kokoh, teguh pendiriannya memegang janji',
    origin: ['Jawa', 'Indonesia'],
    nuances: ['Klasik', 'Kuat', 'Unik'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Saka', 'Aka', 'Sasa'],
    combinations: ['Saka Aditya Sanjaya', 'Saka Danendra Arsa', 'Gibran Saka Askari'],
    isPopular: false
  },
  {
    id: '72',
    name: 'Satria',
    gender: 'L',
    meaning: 'Pejuang ksatria pembela kebenaran yang gagah berani, jujur dan berjiwa luhur',
    origin: ['Indonesia', 'Jawa'],
    nuances: ['Klasik', 'Kuat', 'Elegan'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Satria', 'Sat', 'Oti'],
    combinations: ['Satria Aditya Farhan', 'Satria Askari Bagas', 'Rayyan Satria Gibran'],
    isPopular: true
  },
  {
    id: '73',
    name: 'Sabrina',
    gender: 'P',
    meaning: 'Putri legendaris yang agung, anggun menawan hati setiap orang',
    origin: ['Latin', 'Inggris'],
    nuances: ['Elegan', 'Modern', 'Universal'],
    syllables: 3,
    length: 7,
    nickIdeas: ['Sabrina', 'Bina', 'Saby'],
    combinations: ['Sabrina Callista Kirana', 'Nadia Sabrina Amara', 'Aila Sabrina Zahra'],
    isPopular: true
  },
  {
    id: '74',
    name: 'Saskia',
    gender: 'P',
    meaning: 'Pelindung umat manusia yang cerdas, tangguh, dan berjiwa merdeka',
    origin: ['Modern', 'Latin'],
    nuances: ['Kuat', 'Unik', 'Modern'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Saskia', 'Sasa', 'Kia'],
    combinations: ['Saskia Kirana Amara', 'Saskia Fiona Zahra', 'Saskia Aisha Rania'],
    isPopular: false
  },

  // T
  {
    id: '75',
    name: 'Tegar',
    gender: 'L',
    meaning: 'Keteguhan hati yang luar biasa, kuat menahan cobaan hidup dan sabar',
    origin: ['Indonesia'],
    nuances: ['Kuat', 'Klasik', 'Lembut'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Tegar', 'Ega', 'Arya'],
    combinations: ['Tegar Aditya Sanjaya', 'Tegar Askari Gibran', 'Arsa Tegar Pratama'],
    isPopular: true
  },
  {
    id: '76',
    name: 'Talitha',
    gender: 'P',
    meaning: 'Gadis kecil yang belia, suci, lincah, membawa keceriaan bersemangat muda',
    origin: ['Arab', 'Universal'],
    nuances: ['Islami', 'Lembut', 'Universal'],
    syllables: 3,
    length: 7,
    nickIdeas: ['Talitha', 'Tali', 'Itha'],
    combinations: ['Talitha Kirana Amara', 'Talitha Callista Sabrina', 'Zahra Talitha Rania'],
    isPopular: false
  },

  // U
  {
    id: '77',
    name: 'Umar',
    gender: 'L',
    meaning: 'Pemimpin yang memakmurkan, berjiwa luhur, berani membela kaum tertindas',
    origin: ['Arab'],
    nuances: ['Islami', 'Kuat', 'Klasik'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Umar', 'Uma', 'Mari'],
    combinations: ['Umar Rayyan Farhan', 'Umar Askari Bagas', 'Gibran Umar Rumi'],
    isPopular: true
  },
  {
    id: '78',
    name: 'Ulya',
    gender: 'P',
    meaning: 'Tempat yang tertinggi, kedudukan mulia di mata sosial, berhati luhur berkah',
    origin: ['Arab'],
    nuances: ['Islami', 'Elegan', 'Unik'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Ulya', 'Uly', 'Lya'],
    combinations: ['Ulya Amara Sabrina', 'Ulya Aisha Rania', 'Ayana Ulya Zahra'],
    isPopular: false
  },

  // V
  {
    id: '79',
    name: 'Vito',
    gender: 'L',
    meaning: 'Kehidupan yang penuh energi positif, membawa kesegaran, semangat membara',
    origin: ['Latin', 'Universal'],
    nuances: ['Modern', 'Elegan', 'Universal'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Vito', 'Vit', 'Ito'],
    combinations: ['Vito Aidan Elio', 'Vito Kenzo Gibran', 'Rayyan Vito Danish'],
    isPopular: true
  },
  {
    id: '80',
    name: 'Vanya',
    gender: 'P',
    meaning: 'Anak perempuan anugerah tuhan yang penuh kemurahan hati, ramah tamah',
    origin: ['Modern', 'Universal'],
    nuances: ['Modern', 'Lembut', 'Universal'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Vanya', 'Vany', 'Anya'],
    combinations: ['Vanya Amara Sabrina', 'Vanya Kirana Callista', 'Aila Vanya Zahra'],
    isPopular: false
  },

  // W
  {
    id: '81',
    name: 'Wira',
    gender: 'L',
    meaning: 'Pahlawan pemberani yang gagah perkasa, berjiwa kurnia agung dan teguh',
    origin: ['Jawa', 'Indonesia'],
    nuances: ['Kuat', 'Klasik', 'Lembut'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Wira', 'Wiro', 'Aka'],
    combinations: ['Wira Aditya Sanjaya', 'Wira Askari Gibran', 'Arsa Wira Pratama'],
    isPopular: false
  },
  {
    id: '82',
    name: 'Widya',
    gender: 'P',
    meaning: 'Sains atau ilmu pengetahuan yang mendalam, bijasana, berpenampilan tenang',
    origin: ['Sansekerta', 'Indonesia'],
    nuances: ['Klasik', 'Elegan', 'Lembut'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Widya', 'Widi', 'Iya'],
    combinations: ['Widya Kirana Amara', 'Widya Callista Sabrina', 'Zahra Widya Rania'],
    isPopular: false
  },

  // X
  {
    id: '83',
    name: 'Xavier',
    gender: 'L',
    meaning: 'Rumah baru benderang yang bersinar megah, penuh kejayaan fajar pagi',
    origin: ['Latin', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Universal'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Xavier', 'Xave', 'Vier'],
    combinations: ['Xavier Aidan Elio', 'Xavier Kenzo Gibran', 'Rayyan Xavier Danish'],
    isPopular: true
  },
  {
    id: '84',
    name: 'Xaviera',
    gender: 'P',
    meaning: 'Terang benderang cahayanya, mandiri, menginspirasi sekeliling dengan tawa riang',
    origin: ['Latin', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Unik'],
    syllables: 4,
    length: 8,
    nickIdeas: ['Xaviera', 'Xave', 'Vera'],
    combinations: ['Xaviera Amara Sabrina', 'Xaviera Kirana Callista', 'Aila Xaviera Zahra'],
    isPopular: true
  },

  // Y
  {
    id: '85',
    name: 'Yusuf',
    gender: 'L',
    meaning: 'Sangat rupawan bertabur ketampanan, berakhlak mulia tegar memimpin',
    origin: ['Arab'],
    nuances: ['Islami', 'Klasik', 'Elegan'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Yusuf', 'Usu', 'Uf'],
    combinations: ['Yusuf Rayyan Farhan', 'Yusuf Askari Gibran', 'Danish Yusuf Rumi'],
    isPopular: true
  },
  {
    id: '86',
    name: 'Yasmin',
    gender: 'P',
    meaning: 'Bunga melati yang mekar anggun, harum suci semerbak lambang kedamaian',
    origin: ['Arab', 'Persia'],
    nuances: ['Islami', 'Elegan', 'Lembut'],
    syllables: 2,
    length: 6,
    nickIdeas: ['Yasmin', 'Mimi', 'Yas'],
    combinations: ['Yasmin Callista Kirana', 'Yasmin Amara Sabrina', 'Aila Yasmin Zahra'],
    isPopular: true
  },

  // Z
  {
    id: '87',
    name: 'Zayan',
    gender: 'L',
    meaning: 'Cemerlang rupawan, berpenampilan indah mulia, membawa cahaya kebahagiaan',
    origin: ['Arab'],
    nuances: ['Islami', 'Modern', 'Elegan'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Zayan', 'Zay', 'Anan'],
    combinations: ['Zayan Aidan Elio', 'Zayan Kenzo Gibran', 'Rayyan Zayan Danish'],
    isPopular: true
  },
  {
    id: '88',
    name: 'Zahra',
    gender: 'P',
    meaning: 'Bunga mawar yang mekar menguarkan wangi, bersinar terang dengan pesona suci',
    origin: ['Arab'],
    nuances: ['Islami', 'Klasik', 'Lembut'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Zahra', 'Ara', 'Zara'],
    combinations: ['Zahra Aisha Rania', 'Zahra Amara Sabrina', 'Ayana Zahra Kirana'],
    isPopular: true
  },

  // Universal Extra
  {
    id: '101',
    name: 'Aria',
    gender: 'U',
    meaning: 'Melodi yang indah, mengalir dengan penuh harmoni dan menyejukkan jiwa',
    origin: ['Latin', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Universal'],
    syllables: 3,
    length: 4,
    nickIdeas: ['Aria', 'Ari', 'Ria'],
    combinations: ['Aria Mahardika Gibran', 'Kenzo Aria Kirana', 'Aria Sabrina Callista'],
    isPopular: true
  },
  {
    id: '102',
    name: 'Banyu',
    gender: 'U',
    meaning: 'Air kehidupan yang tenang, damai, namun membelah rintangan dengan tekun',
    origin: ['Jawa', 'Indonesia'],
    nuances: ['Klasik', 'Kuat', 'Unik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Banyu', 'Bany', 'Ayu'],
    combinations: ['Banyu Gibran Rumi', 'Banyu Kirana Rayyan', 'Arsa Banyu Aditya'],
    isPopular: false
  },
  {
    id: '103',
    name: 'Genta',
    gender: 'U',
    meaning: 'Genta suara penyeru kebajikan, gema kebenaran, pembawa pesan damai',
    origin: ['Indonesia', 'Jawa'],
    nuances: ['Klasik', 'Kuat', 'Unik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Genta', 'Gen', 'Tata'],
    combinations: ['Genta Askari Bumi', 'Genta Kirana Rumi', 'Aditya Genta Farhan'],
    isPopular: false
  },
  {
    id: '104',
    name: 'Kaelan',
    gender: 'U',
    meaning: 'Pejuang yang ramping, murni dan bersih hati dari segala keburukan',
    origin: ['Keltik', 'Modern'],
    nuances: ['Lembut', 'Modern', 'Universal'],
    syllables: 3,
    length: 6,
    nickIdeas: ['Kaelan', 'Kael', 'Lan'],
    combinations: ['Kaelan Aidan Rayyan', 'Kaelan Callista Kirana', 'Aria Kaelan Sabrina'],
    isPopular: false
  },
  {
    id: '105',
    name: 'Senja',
    gender: 'U',
    meaning: 'Keindahan langit sore yang menenangkan, penuh warna kedamaian dan syahdu',
    origin: ['Indonesia'],
    nuances: ['Lembut', 'Klasik', 'Unik'],
    syllables: 2,
    length: 5,
    nickIdeas: ['Senja', 'Enja', 'Jeja'],
    combinations: ['Senja Bumi Pratama', 'Senja Kirana Amara', 'Danish Senja Pranadipa'],
    isPopular: true
  },
  {
    id: '106',
    name: 'Rumi',
    gender: 'U',
    meaning: 'Sastrawan dan penyair sufi agung, lambang kebijaksanaan, cinta universal abadi',
    origin: ['Arab', 'Modern'],
    nuances: ['Modern', 'Elegan', 'Unik'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Rumi', 'Rum', 'Mimi'],
    combinations: ['Rumi Gibran Askari', 'Rumi Aisha Kirana', 'Kenzo Rumi Banyu'],
    isPopular: true
  },
  {
    id: '107',
    name: 'Nara',
    gender: 'U',
    meaning: 'Manusia yang membawa kebahagiaan, kokoh laksana pohon ek yang mulia',
    origin: ['Jepang', 'Sansekerta'],
    nuances: ['Lembut', 'Modern', 'Universal'],
    syllables: 2,
    length: 4,
    nickIdeas: ['Nara', 'Rara', 'Nar'],
    combinations: ['Nara Aidan Elio', 'Nara Callista Zahra', 'Danish Nara Askari'],
    isPopular: false
  }
];

const ADDITIONAL_COMPACT: string[] = [
  // A
  "A|L|Aditya|Sansekerta|Matahari pertama, bijaksana, jasmani kuat|Klasik,Kuat|3",
  "A|P|Adzra|Arab|Anugerah suci, pembawa bersemangat kebahagiaan|Islami,Lembut|2",
  "A|L|Afiq|Arab|Cerdas, jujur, berpengetahuan luas dan mulia|Islami,Elegan|2",
  "A|L|Agra|Sansekerta|Puncak tertinggi, melambangkan kesuksesan|Klasik,Kuat|2",
  "A|U|Akira|Jepang|Cemerlang, terang, jernih pikirannya|Modern,Universal|3",
  "A|P|Amara|Latin|Kecantikan abadi yang anggun, penuh kasih|Elegan,Modern|3",
  "A|L|Andra|Yunani|Ksatria tangguh yang berjiwa pemimpin|Kuat,Lembut|2",
  "A|P|Anindita|Sansekerta|Sempurna, tidak memiliki kekurangan|Klasik,Elegan|4",
  "A|L|Arkan|Arab|Tiang penyangga yang kokoh dan lurus jalannya|Islami,Kuat|2",
  "A|L|Arkananta|Jawa|Selalu diterangi cahaya kebaikan dan membawa hangat|Klasik,Elegan|4",
  "A|L|Arya|Sansekerta|Bangsawan yang berbudi luhur, berwibawa tinggi|Klasik,Kuat|2",
  "A|L|Asher|Ibrani|Diberkati kebahagiaan, keberuntungan, penuh tawa|Modern,Universal|2",
  "A|P|Aurelia|Latin|Emas berkilau benderang, makmur, anggun rupawan|Elegan,Modern|4",
  "A|P|Ayana|Arab|Bunga berkembang indah, lambang keanggunan|Lembut,Islami|3",
  "A|L|Azhar|Arab|Bunga berkilau, bersinar terang menerangi gulita|Islami,Elegan|2",
  "A|P|Azura|Persia|Biru langit yang jernih, membawa ketenangan jiwa|Modern,Lembut|3",

  // B
  "B|L|Bachtiar|Persia|Kaya raya, diberkati keberuntungan hidup|Klasik,Elegan|3",
  "B|L|Badri|Arab|Rembulan purnama yang bersinar indah dan terang|Islami,Klasik|2",
  "B|L|Bahij|Arab|Ceria, gembira, elok rupawan, bawa gembira|Islami,Lembut|2",
  "B|L|Banyu|Jawa|Air kehidupan yang tenang, damai, rendah hati|Klasik,Kuat|2",
  "B|L|Bariq|Arab|Bercahaya kemilau, cemerlang, cerdas pemikiran|Islami,Modern|2",
  "B|L|Barra|Arab|Kekuatan pertahanan yang kokoh, jujur, bersih|Islami,Kuat|2",
  "B|L|Basara|Jepang|Memiliki kepemimpinan yang teguh dan wibawa|Unik,Kuat|3",
  "B|L|Bastian|Latin|Patut dimuliakan, dihormati karena keluhuran|Modern,Elegan|3",
  "B|L|Bayu|Sansekerta|Angin sepoi menyejukkan, membawa kesegaran|Klasik,Lembut|2",
  "B|P|Bella|Latin|Kecantikan yang memikat hati, anggun, ramah|Lembut,Universal|2",
  "B|P|Belleza|Latin|Keindahan paras dan kehalusan rasa yang memikat|Elegan,Modern|3",
  "B|P|Belva|Latin|Pemandangan indah, murni hatinya dan penuh kasih|Lembut,Elegan|2",
  "B|L|Ben|Ibrani|Anak kesayangan lambang keberuntungan tuhan|Universal,Lembut|1",
  "B|L|Benito|Latin|Diberkati kemakmuran, keberhasilan, dan gembira|Modern,Elegan|3",
  "B|P|Bianca|Latin|Putih bersih, murni, bercahaya menenteramkan|Modern,Elegan|3",
  "B|L|Brian|Keltik|Kekuatan, kehormatan, bangsawan yang teguh|Kuat,Universal|2",

  // C
  "C|L|Caesar|Latin|Raja kaisar agung, pemimpin berkekuasaan tinggi|Kuat,Elegan|2",
  "C|U|Cahya|Jawa|Sinar terang fajar, bawa kecemerlangan hidup|Klasik,Lembut|2",
  "C|L|Caleb|Ibrani|Kesetiaan yang tulus dari lubuk hati, gigih|Modern,Universal|2",
  "C|P|Callia|Yunani|Cantik bersuara indah merdu, bawa keharmonisan|Lembut,Elegan|3",
  "C|L|Calvin|Latin|Bersinar benderang, pintar, berpikir tajam|Modern,Universal|2",
  "C|P|Camelia|Latin|Bunga camelia yang anggun, setia, tahan ujian|Elegan,Lembut|4",
  "C|P|Cara|Latin|Teman tersayang yang manis, perhatian dan tulus|Lembut,Universal|2",
  "C|P|Caria|Latin|Aliran air segar murni, menyejukkan hati gundah|Unik,Lembut|3",
  "C|P|Carina|Latin|Yang disayangi dengan tulus, manis penuh kasih|Lembut,Elegan|3",
  "C|L|Carter|Inggris|Pekerja keras yang kreatif, tangguh, bersemangat|Modern,Kuat|2",
  "C|P|Casia|Latin|Pohon kayu manis yang harum, penenang alami|Unik,Lembut|3",
  "C|P|Cassandra|Yunani|Penolong pria, penjelas kebenaran yang anggun|Elegan,Klasik|3",
  "C|P|Cataleya|Modern|Bunga anggrek yang langka, eksotis, memikat|Unik,Elegan|4",
  "C|P|Catharina|Yunani|Murni, suci jiwanya, terhindar keburukan|Elegan,Klasik|4",
  "C|P|Celine|Latin|Surgawi, agung laksana rembulan di malam gelap|Elegan,Modern|2",
  "C|P|Cetta|Sansekerta|Berpengetahuan luas, bijaksana dan tajam pikiran|Klasik,Unik|2",

  // D
  "D|L|Dafa|Arab|Pembela perkasa, pertahanan kokoh mengayomi|Islami,Kuat|2",
  "D|P|Dahlia|Modern|Bunga dahlia mekar indah rimbun berkelimpahan|Lembut,Klasik|3",
  "D|L|Damar|Jawa|Sumber cahaya penerang jiwa, bawa kehangatan|Klasik,Lembut|2",
  "D|L|Damian|Yunani|Sahabat penakluk yang tenang budi dan setia|Modern,Lembut|3",
  "D|L|Daniel|Ibrani|Tuhan hakimku, keadilan mutlak, berjiwa kksatria|Universal,Kuat|3",
  "D|L|Daniswara|Sansekerta|Raja yang mulia, kaya raya, berbudi luhur|Klasik,Elegan|4",
  "D|P|Daphne|Yunani|Pohon salam lambang kemenangan, keindahan abadi|Elegan,Unik|2",
  "D|L|Darian|Latin|Pelindung kemakmuran, bawa damai dan harta|Modern,Elegan|3",
  "D|L|Darius|Persia|Menjaga kebaikan, pemimpin berwibawa adil|Kuat,Klasik|3",
  "D|L|Darren|Keltik|Hebat, pemimpin berpengetahuan luas dan ksatria|Modern,Kuat|2",
  "D|P|Dasha|Latin|Anugerah indah tuhan, berparas manis dan santun|Lembut,Lembut|2",
  "D|P|Davina|Ibrani|Kekasih tersayang, dicintai dengan ketulusan|Lembut,Elegan|3",
  "D|P|Destina|Latin|Takdir yang indah, memiliki tujuan hidup luhur|Elegan,Unik|3",
  "D|U|Deva|Sansekerta|Ilahi, bersinar terang laksana surgawi|Klasik,Universal|2",
  "D|P|Dewi|Sansekerta|Ratu surgawi, lambang kecantikan dan anggun|Klasik,Elegan|2",
  "D|L|Dimas|Jawa|Adik laki-laki kesayangan, lembut berkasih|Klasik,Lembut|2",

  // E
  "E|L|Earl|Inggris|Bangsawan agung, pemimpin ksatria dihormati|Klasik,Elegan|1",
  "E|P|Echa|Modern|Cerdas, periang, membawa gembira sekeliling|Lembut,Modern|2",
  "E|P|Edeline|Jerman|Mulia, ramah tamah, berjiwa kurnia penuh setia|Elegan,Lembut|3",
  "E|U|Eden|Ibrani|Taman surga yang penuh kenikmatan murni|Universal,Lembut|2",
  "E|L|Edgardo|Jerman|Penjaga harta kekayaan pertahanan yang sukses|Klasik,Kuat|3",
  "E|L|Edmund|Inggris|Pelindung kemakmuran yang kaya raya murah hati|Klasik,Elegan|2",
  "E|L|Edward|Inggris|Penjaga kemakmuran yang gagah berani, setia|Klasik,Kuat|2",
  "E|P|Eisya|Arab|Kehidupan penuh kemakmuran, gembira, sejahtera|Islami,Modern|2",
  "E|P|Eldora|Latin|Diberkahi emas kemewahan, mulia berhati hangat|Unik,Elegan|3",
  "E|P|Elena|Yunani|Terang benderang cahayanya, bersinar memandu|Elegan,Universal|3",
  "E|P|Elenora|Modern|Cahaya tuhan menyejukkan fajar menerang gelap|Elegan,Lembut|4",
  "E|L|Elijah|Ibrani|Tuhan adalah pelindung keselamatanku agung|Universal,Kuat|3",
  "E|P|Elvina|Keltik|Sahabat mulia yang ramah, bijaksana rahasia|Lembut,Elegan|3",
  "E|L|Elya|Arab|Tinggi martabatnya, berwibawa mulia, kokoh jalan|Islami,Elegan|2",
  "E|L|Eman|Arab|Kepercayaan, iman kuat teguh memegang benar|Islami,Kuat|2",
  "E|L|Emilio|Latin|Penuh energi bersaing, rajin pembawa sukses|Modern,Elegan|3",

  // F
  "F|L|Fabian|Latin|Penanam kebaikan, makmur, bijaksana dalam langkah|Modern,Universal|3",
  "F|L|Faisal|Arab|Pemisah kebenaran dari kebathilan, tegas adil|Islami,Kuat|2",
  "F|L|Fakhri|Arab|Kebanggaan keluarga karena akhlak luhur sukses|Islami,Elegan|2",
  "F|L|Fandi|Indonesia|Pemuda kuat jasmaninya, jujur bawa ketenangan|Klasik,Kuat|2",
  "F|P|Fania|Yunani|Wanita riang gembira, menyebarkan cinta murni|Lembut,Universal|2",
  "F|L|Fariz|Arab|Berpikiran jernih, cerdas, pembeda benar salah|Islami,Elegan|2",
  "F|P|Farra|Persia|Cantik rupawan membawa ketulusan gembira riang|Lembut,Elegan|2",
  "F|L|Fatir|Arab|Pencipta pembuka babak baru hidup gemilang|Islami,Unik|2",
  "F|L|Fauzan|Arab|Kemenangan jaya, untung abadi, penuh berkah|Islami,Kuat|2",
  "F|P|Fawnia|Modern|Anak rusa kecil lincah, sangat berharga disayang|Unik,Lembut|3",
  "F|U|Faza|Arab|Mekar berkembang, fajar menyembul membawa berkah|Islami,Modern|2",
  "F|L|Federico|Jerman|Pemimpin pembawa kedamaian agung berwibawa|Elegan,Kuat|4",
  "F|P|Felicia|Latin|Bahagia melimpah, beruntung diberkati tawa|Modern,Elegan|3",
  "F|L|Felix|Latin|Sangat beruntung, bahagia lahir batin, berkah|Universal,Elegan|2",
  "F|P|Fidelia|Latin|Bisa dipercaya, setia memegang janji penuh kasih|Elegan,Lembut|4",
  "F|L|Finley|Keltik|Pejuang adil berkulit bersih, bela kedamaian|Modern,Universal|2",

  // G
  "G|L|Gabriel|Ibrani|Tuhan kekuatanku, pembawa kabar baik mulia|Universal,Kuat|3",
  "G|L|Gada|Jawa|Senjata pemukul lambang pertahanan kokoh perkasa|Klasik,Kuat|2",
  "G|L|Gading|Jawa|Putih bersih kokoh bernilai tinggi, bersahaja|Klasik,Lembut|2",
  "G|P|Gaila|Modern|Kegembiraan yang meluap, sebar kehangatan tawa|Lembut,Modern|2",
  "G|L|Galang|Indonesia|Menyatukan, menggalang kekuatan kejayaan rukun|Kuat,Klasik|2",
  "G|L|Galih|Jawa|Inti hati terdalam, berpikir matang, mandiri|Klasik,Lembut|2",
  "G|L|Gamal|Arab|Unta gagah penjelajah, tampan berkarisma tinggi|Islami,Klasik|2",
  "G|L|Ganesa|Sansekerta|Dewa kebijaksanaan pelindung rintangan, sukses|Klasik,Elegan|3",
  "G|P|Ganis|Jawa|Cantik anggun, berbicara sopan bawa tenang Rukun|Lembut,Klasik|2",
  "G|L|Garuda|Sansekerta|Burung rajawali raksasa, lambang gagah mulia|Kuat,Klasik|3",
  "G|L|Gemilang|Indonesia|Bercahaya sangat terang, sukses besar, cerah|Kuat,Elegan|3",
  "G|P|Gemma|Latin|Batu permata indah berkilau, sangat berharga|Elegan,Modern|2",
  "G|U|Genta|Indonesia|Suara genta kebajikan, pembawa pesan damai|Klasik,Kuat|2",
  "G|L|Geraldo|Jerman|Pejuang tombak tangguh, setia berjiwa kksatria|Modern,Kuat|3",
  "G|L|Ghani|Arab|Kaya raya, mandiri, berkecukupan suka sedekah|Islami,Elegan|2",
  "G|P|Grace|Latin|Kemurahan tuhan, keanggunan pesona menawan|Universal,Elegan|1",

  // H
  "H|L|Hadiat|Arab|Karunia hidayah pemberian yang berharga tinggi|Islami,Elegan|3",
  "H|L|Hafiz|Arab|Penjaga amanah, pelindung kebaikan penghafal|Islami,Kuat|2",
  "H|L|Haika|Arab|Sejarah perjuangan suci agung membanggakan|Islami,Kuat|2",
  "H|L|Haikal|Arab|Kuil suci megah tinggi, lambang bijak jiwa|Islami,Klasik|2",
  "H|L|Halim|Arab|Lembut hatinya, sabar pemaaf penyayang sesama|Islami,Lembut|2",
  "H|L|Hamdan|Arab|Orang terpuji, bersyukur atas karunia tuhan|Islami,Klasik|2",
  "H|L|Hamzah|Arab|Singa gurun pejuang berani sahabat nabi agung|Islami,Kuat|2",
  "H|P|Hanifah|Arab|Wanita teguh lurus hatinya berpegang benar|Islami,Lembut|3",
  "H|L|Haris|Arab|Penjaga pertahanan perkasa setia kawal damai|Islami,Kuat|2",
  "H|L|Harlan|Jerman|Tanah kelahiran pahlawan pejuang kokoh mandiri|Klasik,Kuat|2",
  "H|L|Harun|Arab|Mulia tinggi luhur nabi pendorong kebaikan|Islami,Klasik|2",
  "H|L|Haryo|Jawa|Mulia agung keturunan raja berjiwa kksatria|Klasik,Elegan|2",
  "H|L|Hartono|Jawa|Kaya akan harta dan kebajikan budi penolong|Klasik,Kuat|3",
  "H|P|Hasna|Arab|Cantik rupawan molek parasnya santun budi|Islami,Lembut|2",
  "H|U|Hazel|Modern|Pohon hazel asri cerah bermata madu hangat|Modern,Universal|2",
  "H|P|Helena|Yunani|Cahaya benderang malam pembimbing kesuksesan|Elegan,Universal|3",

  // I
  "I|L|Ibrahim|Arab|Ayah dari bangsa nabi teladan kesabaran mulia|Islami,Klasik|3",
  "I|U|Idra|Keltik|Pohon ara lambang kemakmuran kedamaian subur|Unik,Lembut|2",
  "I|L|Idris|Arab|Nabi pandai tekun belajar penemu tulis pertama|Islami,Klasik|2",
  "I|P|Iffat|Arab|Kesucian diri kehormatan wanita mulia menjaga|Islami,Lembut|2",
  "I|L|Ignatius|Latin|Api berkobar semangat membela kebenaran suci|Klasik,Kuat|3",
  "I|P|Ika|Jawa|Anak pertama pemersatu kerukunan keluarga|Klasik,Lembut|2",
  "I|L|Ikram|Arab|Penghormatan kemuliaan menyambut agung mulia|Islami,Elegan|2",
  "I|L|Ilham|Arab|Inspirasi suci petunjuk tuhan pembawa karya|Islami,Lembut|2",
  "I|L|Imad|Arab|Pilar utama pertahanan kokoh penopang adil|Islami,Kuat|2",
  "I|L|Imran|Arab|Kemakmuran pembangunan keluarga nabi berkah|Islami,Klasik|2",
  "I|P|Indah|Indonesia|Sedap dipandang mendamaikan rasa penuh seni|Klasik,Lembut|2",
  "I|L|Indra|Sansekerta|Dewa petir awan kksatria sakti ketegasan|Klasik,Kuat|2",
  "I|P|Inggrid|Jerman|Pahlawan padang rumput cantik anggun penabur|Klasik,Elegan|2",
  "I|L|Iqbal|Arab|Keberuntungan fajar kejayaan pujangga pembangun|Islami,Kuat|2",
  "I|L|Ismail|Arab|Tuhan mendengar doa nabi teladan ikhlas bakti|Islami,Klasik|3",
  "I|L|Ivan|Universal|Anugerah termulia tuhan gagah berani asri|Modern,Universal|2",

  // J
  "J|L|Jacob|Ibrani|Penerus takdir teguh melangkah di bawah|Universal,Kuat|2",
  "J|L|Jafar|Arab|Aliran sungai kecil gemercik membawa subur|Islami,Klasik|2",
  "J|L|Jaka|Jawa|Pemuda gagah beranjak dewasa berakhlak ksatria|Klasik,Kuat|2",
  "J|L|Jamal|Arab|Keindahan paras keanggunan lakon mulia terhormat|Islami,Klasik|2",
  "J|L|James|Inggris|Pemimpin kksatria penakluk ramah bersahabat|Universal,Kuat|1",
  "J|P|Janitra|Sansekerta|Berdrajat tinggi mulia hati bawa keagungan|Klasik,Elegan|3",
  "J|L|Jatmiko|Jawa|Sopan santun berbudi luhur laras tenang damai|Klasik,Lembut|3",
  "J|L|Jauhar|Arab|Batu mulia permata suci berharga tinggi luhur|Islami,Elegan|2",
  "J|L|Jaya|Indonesia|Kemenangan besar kesuksesan gilang mulia jaya|Kuat,Klasik|2",
  "J|P|Jessica|Ibrani|Pandangan penuh keindahan berkah tuhan mulia|Universal,Elegan|3",
  "J|P|Jocelyn|Latin|Ceria riang gembira pembawa sorak tawa rukun|Modern,Lembut|3",
  "J|L|Johan|Universal|Kurnia kemurahan tuhan kksatria tangguh jaya|Klasik,Kuat|2",
  "J|L|Jonathan|Ibrani|Anugerah terindah tuhan setia perkasa sejati|Universal,Elegan|3",
  "J|L|Jordan|Ibrani|Mengalir menyuburkan asri penyembuh damai|Universal,Lembut|2",
  "J|P|Julia|Latin|Rambut lembut awet muda berjiwa merdeka ceria|Klasik,Universal|3",
  "J|L|Julio|Latin|Lahir di fajar musim panas ceria berkarisma|Modern,Elegan|3",

  // K
  "K|U|Kaelan|Keltik|Pejuang murni bersih hati dari noda hidup|Lembut,Modern|3",
  "K|L|Kahfi|Arab|Gua perlindungan luhur pemuda gua beriman|Islami,Klasik|2",
  "K|L|Kamal|Arab|Kesempurnaan akhlak watak utama tidak ada cela|Islami,Elegan|2",
  "K|P|Kamila|Arab|Sempurna tanpa kekurangan bercahaya anggun|Islami,Lembut|3",
  "K|P|Kanti|Sansekerta|Cahaya kecantikan karunia cinta ketenteraman|Klasik,Lembut|2",
  "K|P|Kartika|Jawa|Bintang bersinar indah pemandu arah pelaut malam|Klasik,Elegan|3",
  "K|P|Karunia|Indonesia|Berkah karunia kurnia langsung maha pencipta|Lembut,Klasik|3",
  "K|L|Kavi|Sansekerta|Penyair pujangga bijak mempesona merdu kata|Unik,Elegan|2",
  "K|L|Kavin|Sansekerta|Tampan rupawan disukai banyak kawan setia|Modern,Lembut|2",
  "K|L|Keanu|Modern|Hembusan angin sejuk pegunungan pembawa damai|Modern,Universal|3",
  "K|P|Keisha|Modern|Hidup sejahtera penuh tawa gembira wanita|Modern,Lembut|2",
  "K|L|Kemal|Arab|Sempurna kedudukan kehormatan tinggi berkarisma|Islami,Klasik|2",
  "K|U|Kencana|Jawa|Emas bernilai luhur agung lambang kejayaan|Klasik,Elegan|3",
  "K|L|Kevin|Keltik|Lahir tampan rupawan bangsawan cerdas mandiri|Universal,Lembut|2",
  "K|L|Khair|Arab|Kebaikan paling utama berkah melimpah pendorong|Islami,Lembut|1",
  "K|L|Khalid|Arab|Abadi jaya kksatria tak terkalahkan kokoh|Islami,Kuat|2",

  // L
  "L|L|Laksana|Jawa|Memiliki sifat tanda baik pembawa kejayaan|Klasik,Kuat|3",
  "L|P|Lana|Keltik|Lembut terapung tenang laksana awan fajar|Lembut,Universal|2",
  "L|L|Latif|Arab|Halus beradab sopan santun penyayang bersahabat|Islami,Lembut|2",
  "L|P|Laura|Latin|Pohon daun laurel mahkota jaya kehormatan|Universal,Elegan|2",
  "L|L|Leandro|Latin|Singa manusia berjiwa tangguh perkasa pelindung|Modern,Elegan|3",
  "L|P|Lelya|Arab|Malam jernih berbintang sejuk menentramkan|Islami,Lembut|2",
  "L|L|Leo|Latin|Singa rasi bintang pemimpin perkasa berdaulat|Universal,Kuat|2",
  "L|L|Leonardo|Latin|Singa tangguh berani berjiwa seni kreativitas|Modern,Elegan|4",
  "L|U|Leslie|Keltik|Kebun suci asri tenang kedamaian alam semesta|Universal,Lembut|2",
  "L|P|Leticia|Latin|Kebahagiaan sukacita agung membawa nikmat|Elegan,Lembut|3",
  "L|L|Liam|Keltik|Pelindung berkehendak kuat kksatria setia jaya|Modern,Universal|2",
  "L|P|Lina|Arab|Pohon palem lembut bersahaja penyejuk pandangan|Lembut,Universal|2",
  "L|P|Linh|Modern|Jiwa spiritual suci damai murni cahaya fajar|Unik,Lembut|1",
  "L|U|Lintang|Jawa|Bintang tinggi berkilau penunjuk jalan malam|Klasik,Unik|2",
  "L|L|Louis|Jerman|Prajurit terkenal petarung jaya dihormati|Modern,Elegan|2",
  "L|P|Luna|Latin|Dewi rembulan malam bercahaya kemilau anggun|Modern,Elegan|2",

  // M
  "M|L|Mada|Jawa|Kegembiraan seni kreativitas melimpah tiada tara|Klasik,Unik|2",
  "M|P|Madeline|Yunani|Menara tinggi megah lambang pertahanan kokoh|Elegan,Klasik|3",
  "M|L|Mahardika|Indonesia|Berbudi luhur cerdas merdeka berkepribadian|Klasik,Kuat|4",
  "M|L|Mahendra|Sansekerta|Raja dewa agung pelindung bumi wibawa ksatria|Klasik,Kuat|3",
  "M|P|Maia|Yunani|Dewi keibuan bumi pengasuh kelembutan cinta|Lembut,Universal|2",
  "M|P|Maisie|Keltik|Permata mutiara kecil cantik berkilau bersih|Unik,Lembut|2",
  "M|L|Majid|Arab|Mulia terhormat agung kurnia sejarah keluarga|Islami,Klasik|2",
  "M|L|Manggala|Jawa|Panglima pemimpin pelopor garda depan gagah|Klasik,Kuat|3",
  "M|L|Marcus|Latin|Dewa perang ksatria kokoh mandiri tangguh|Universal,Kuat|2",
  "M|P|Marsha|Modern|Dihormati pejuang wanita lembut asri pandangan|Lembut,Modern|2",
  "M|L|Martin|Latin|Pejuang berdedikasi tinggi murni membela kawan|Universal,Klasik|2",
  "M|P|Marwa|Arab|Bukit sejarah suci tanah arab perjuangan ibu|Islami,Lembut|2",
  "M|L|Matthew|Ibrani|Hadiah kurnia langsung dari tuhan berkah|Universal,Elegan|2",
  "M|L|Maulana|Arab|Pelindung penuntun dihormati berkah luhur|Islami,Klasik|4",
  "M|P|Melodi|Indonesia|Alunan nada musik indah menyatukan kawan|Lembut,Modern|3",
  "M|L|Muhammad|Arab|Terpuji luhur akhlak nabi agung membawa rahmat|Islami,Klasik|3",

  // N
  "N|L|Nabil|Arab|Cerdas mulia terhormat berwatak kurnia agung|Islami,Elegan|2",
  "N|P|Nabila|Arab|Keturunan bangsawan cerdas mulia berwajah indah|Islami,Lembut|3",
  "N|P|Nada|Arab|Embun pagi melodi nada musik mendamaikan rasa|Islami,Lembut|2",
  "N|U|Nadi|Indonesia|Tempat bertumpu denyut kehidupan pembawa kesegaran|Unik,Lembut|2",
  "N|P|Nadin|Persia|Penuh harapan luhur teguh pendirian asri|Lembut,Elegan|2",
  "N|L|Nafi|Arab|Memberikan manfaat kebaikan bagi lingkungan sosial|Islami,Lembut|2",
  "N|P|Najma|Arab|Bintang berkilau tinggi fajar menyinari gulita|Islami,Lembut|2",
  "N|P|Najwa|Arab|Bisikan kalbu rahasia suci percakapan intim|Islami,Elegan|2",
  "N|U|Nara|Jepang|Manusia membawa kebahagiaan kokoh laksana pohon|Lembut,Modern|2",
  "N|L|Nasim|Arab|Angin sepoi-sepoi fajar menenteramkan padang|Islami,Lembut|2",
  "N|L|Nasri|Arab|Kemenangan pertolonganku pembela perdamaian|Islami,Kuat|2",
  "N|L|Natha|Sansekerta|Pelindung penguasa agung penuntun jalan luhur|Klasik,Kuat|2",
  "N|L|Nathan|Ibrani|Pemberian nikmat dari tuhan agung perkasa|Universal,Elegan|2",
  "N|P|Naydine|Modern|Harapan bersih jujur teguh memendam cita kasih|Lembut,Elegan|2",
  "N|L|Niaz|Persia|Doa permohonan tulus kepasrahan rasa syukur|Unik,Lembut|2",
  "N|P|Nisha|Sansekerta|Malam tenang damai bertabur impian indah syahdu|Klasik,Lembut|2",

  // O
  "O|L|Obadiah|Ibrani|Hamba pelayan tuhan yang taat setia memegang|Klasik,Kuat|4",
  "O|P|Octavia|Latin|Lahir anak kedelapan pembawa untung rukun|Elegan,Klasik|4",
  "O|L|Odin|Modern|Pemimpin spiritual dewa tertinggi kksatria|Modern,Kuat|2",
  "O|P|Ofelia|Yunani|Penolong bijak pembantu kesulitan penabur kasih|Lembut,Klasik|3",
  "O|U|Oki|Jepang|Lautan luas membentang pikiran dalam tenang|Modern,Lembut|2",
  "O|L|Oktavianus|Latin|Lahir di fajar agustus kejayaan kaisar|Klasik,Kuat|5",
  "O|P|Ola|Latin|Peninggalan berharga nenek moyang berkah|Lembut,Universal|2",
  "O|P|Olga|Universal|Mulia suci diberkati jalannya membawa damai|Klasik,Elegan|2",
  "O|L|Oliver|Latin|Zaitun hijau lambang kedamaian kksatria asri|Universal,Elegan|3",
  "O|P|Oni|Jawa|Dilahirkan di tempat suci dilindungi dewa damai|Klasik,Lembut|2",
  "O|U|Onyx|Modern|Batu permata onyx hitam melambangkan tegar|Unik,Kuat|2",
  "O|L|Ophir|Ibrani|Tanah penghasil emas murni dalam sejarah berkah|Unik,Elegan|2",
  "O|P|Ophelia|Yunani|Penolong yang bijaksana anggun bersuara indah|Elegan,Lembut|3",
  "O|L|Orion|Yunani|Rasi bintang pemburu fajar benderang penunjuk|Modern,Universal|3",
  "O|L|Orlando|Jerman|Terkenal seantero negeri pahlawan tangguh|Klasik,Elegan|3",
  "O|L|Ozzy|Jerman|Kekuatan ilahi kksatria perkasa pembela rukun|Modern,Kuat|2",

  // P
  "P|L|Pahlawan|Indonesia|Pejuang gagah perkasa membela tanah air kejayaan|Klasik,Kuat|3",
  "P|P|Pamela|Yunani|Madu manis keliling kelembutan budi paras manis|Elegan,Lembut|3",
  "P|L|Panji|Jawa|Bendera kebesaran lambang kksatria mulia|Klasik,Kuat|2",
  "P|P|Paramitha|Sansekerta|Kebajikan sempurna kebijaksanaan tinggi mulia|Klasik,Elegan|4",
  "P|L|Parikesit|Jawa|Ksatria mulia murni sejarah pandawa adil|Klasik,Kuat|4",
  "P|U|Paris|Prancis|Kota keindahan mode cinta fajar seni benderang|Universal,Elegan|2",
  "P|L|Parker|Inggris|Penjaga taman asri mandiri kreatif pencinta|Modern,Universal|2",
  "P|L|Parta|Sansekerta|Pejuang kksatria panah luhur budi keteguhan|Klasik,Kuat|2",
  "P|L|Pascal|Latin|Lahir di hari raya paska fajar kebangkitan|Klasik,Elegan|2",
  "P|P|Patricia|Latin|Bangsawan agung wanita terhormat lemah lembut|Elegan,Klasik|3",
  "P|L|Patrick|Latin|Bangsawan pelindung berjiwa kstaria tangguh|Universal,Kuat|2",
  "P|P|Paulina|Latin|Kecantil mungil bersahaja ramah tamah|Lembut,Universal|3",
  "P|L|Pedro|Latin|Batu karang kokoh pertahanan tegar pendirian|Klasik,Kuat|2",
  "P|P|Penelope|Yunani|Penenun kesetiaan cinta sejati menanti pulang|Elegan,Klasik|3",
  "P|L|Pratama|Sansekerta|Anak sulung pertama paling unggul sukses mulia|Klasik,Kuat|3",
  "P|P|Prita|Sansekerta|Kekasih tercinta yang disayangi segenap|Klasik,Lembut|2",

  // Q
  "Q|L|Qabil|Arab|Cakap menyetujui sanggup memikul tanggung jawab|Islami,Kuat|2",
  "Q|L|Qadi|Arab|Hakim adil bijaksana memutus perkara sengketa|Islami,Elegan|2",
  "Q|L|Qadir|Arab|Maha Kuasa berkemampuan tinggi perkasa mandiri|Islami,Kuat|2",
  "Q|L|Qadry|Arab|Kemuliaanku kehormatan kedudukan sosial tinggi|Islami,Elegan|2",
  "Q|L|Qahar|Arab|Gagah perkasa penakluk kelaliman pelindung kaum|Islami,Kuat|2",
  "Q|L|Qani|Arab|Puas merasa cukup karunia tuhan rendah bersyukur|Islami,Lembut|2",
  "Q|L|Qanit|Arab|Taat beribadah khusyuk kepada maha pencipta|Islami,Lembut|2",
  "Q|L|Qantaka|Sansekerta|Ksatria panah perkasa melibas angkara murka|Klasik,Kuat|3",
  "Q|L|Qarun|Arab|Tokoh sejarah kekayaan berlimpah melambangkan|Islami,Klasik|2",
  "Q|L|Qasim|Arab|Pembagi adil adil rupawan tampan pembawa|Islami,Elegan|2",
  "Q|P|Qatrunada|Arab|Tetesan embun pagi penyejuk daun asri kemurnian|Islami,Lembut|4",
  "Q|L|Qawi|Arab|Kuat jasmani rohani tegar hadapi rintangan|Islami,Kuat|2",
  "Q|L|Qazi|Arab|Hakim pembela hukum keadilan mutlak rukun tertib|Islami,Elegan|2",
  "Q|P|Qila|Arab|Mahkota kejayaan berkandungan emas kemilau asri|Islami,Lembut|2",
  "Q|P|Qirana|Sansekerta|Sinar cahaya fajar terang benderang penyejuk|Lembut,Elegan|3",
  "Q|P|Qonita|Arab|Wanita taat beribadah khusyuk santun mulia akhlak|Islami,Lembut|3",
  "Q|P|Qoriah|Arab|Pembaca tulisan suci bersuara merdu pembuka|Islami,Unik|3",
  "Q|P|Qorira|Arab|Pandangan mata sejuk menenteramkan hati orangtua|Islami,Lembut|3",

  // R
  "R|L|Radian|Indonesia|Pancaran fajar benderang masa depan|Modern,Kuat|3",
  "R|L|Raditya|Sansekerta|Matahari agung pemimpin berkarisma menerani|Klasik,Kuat|3",
  "R|L|Rafa|Arab|Tinggi derajat kemakmuran penyembuh berkah|Islami,Elegan|2",
  "R|L|Rafif|Arab|Berakhlak baik soleh rajin gemar menolong|Islami,Lembut|2",
  "R|P|Rahma|Arab|Limpahan kasih sayang nikmat pemaaf menyejuk|Islami,Lembut|2",
  "R|L|Raihan|Arab|Tumbuhan wangi kemuliaan dicintai tuhan berkah|Islami,Lembut|2",
  "R|L|Ramadhan|Indonesia|Lahir di bulan suci ramadhan pembakar dosa suci|Islami,Klasik|3",
  "R|L|Rangga|Jawa|Pelindung kksatria bunga wangi kehormatan bapak|Klasik,Kuat|2",
  "R|P|Raniaah|Arab|Memesona pandangan mata kelembutan berseri asri|Islami,Elegan|3",
  "R|L|Ray|Universal|Sinar cahaya pemandu jalan mandiri ramah|Universal,Lembut|1",
  "R|P|Rebecca|Ibrani|Pengikat tali persahabatan tulus penawan hati|Universal,Klasik|3",
  "R|P|Regina|Latin|Ratu agung kekuasaan adil anggun rupawan subur|Elegan,Klasik|3",
  "R|P|Renata|Latin|Lahir kembali suci murni bersemangat baru|Modern,Elegan|3",
  "R|L|Reza|Persia|Rida ikhlas menerima berkah tuhan pemimpin asri|Islami,Modern|2",
  "R|L|Richard|Jerman|Penguasa perkasa berani dihormati kksatria|Universal,Kuat|2",
  "R|P|Rosalind|Latin|Mawar cantik anggun semerbak harum penyejuk|Elegan,Lembut|3",

  // S
  "S|L|Saddam|Arab|Penguasa tangguh kksatria luhur penyejuk hukum|Islami,Kuat|2",
  "S|P|Safira|Arab|Batu permata nilam biru megah indah berkilau|Islami,Elegan|3",
  "S|P|Salma|Arab|Kedamaian keselamatan murni terhindar bahaya|Islami,Lembut|2",
  "S|L|Samudra|Indonesia|Lautan luas membentang jiwa besar tenang teduh|Kuat,Klasik|3",
  "S|L|Samuel|Ibrani|Tuhan mendengar doa anak kesayangan kksatria|Universal,Kuat|3",
  "S|U|Sani|Jawa|Pemberian berkah cemerlang penyejuk rasa damai|Klasik,Lembut|2",
  "S|L|Sanjaya|Sansekerta|Selalu menang jaya kksatria penakluk rintangan|Klasik,Kuat|3",
  "S|P|Sarah|Ibrani|Putri bangsawan terhormat ramah pembawa tawa|Islami,Klasik|2",
  "S|P|Sari|Jawa|Inti pati kebaikan sekuntum bunga wangi asri|Klasik,Lembut|2",
  "S|L|Satriaji|Jawa|Ksatria utama berbudi sangat luhur wibawa|Klasik,Kuat|4",
  "S|P|Savitri|Sansekerta|Matahari pagi menyinari fajar lambang setia|Klasik,Elegan|3",
  "S|P|Selena|Latin|Dewi bulan bercahaya anggun terang fajar malam|Elegan,Modern|3",
  "S|U|Senja|Indonesia|Keindahan langit sore menenangkan penuh damai|Lembut,Klasik|2",
  "S|P|Shahnaz|Persia|Kebanggaan raja putri tercinta anggun rupawan|Elegan,Unik|2",
  "S|L|Syafiq|Arab|Penyayang penuh empati lembut hatinya pembina|Islami,Lembut|2",
  "S|L|Syamil|Arab|Menyeluruh lengkap sempurna mencakup kebaikan|Islami,Elegan|2",

  // T
  "T|P|Tadya|Sansekerta|Tertib patuh aturan berakhlak mulia tenang|Klasik,Lembut|2",
  "T|L|Taha|Arab|Nama surat dalam Al-Quran mulia terhormat lurus|Islami,Klasik|2",
  "T|L|Tahir|Arab|Murni bersih dari segala dosa keburukan budi|Islami,Elegan|2",
  "T|L|Taimur|Arab|Baja perkasa kekuatan pertahanan tegar mandiri|Islami,Kuat|2",
  "T|P|Tamara|Latin|Pohon palem lambang kesuburan kemenangan makmur|Elegan,Universal|3",
  "T|L|Tamin|Arab|Perlindungan jaminan keamanan kedamaian rukun|Islami,Kuat|2",
  "T|L|Tanjung|Indonesia|Semenanjung tanah asri bunga tanjung wangi|Klasik,Lembut|2",
  "T|L|Tariq|Arab|Bintang fajar pengetuk pintu malam penjelajah|Islami,Kuat|2",
  "T|P|Tatiana|Universal|Ratu peri baik hati mengayomi kedamaian asri|Elegan,Klasik|4",
  "T|L|Taufiq|Arab|Petunjuk kemudahan kesuksesan dari tuhan rukun|Islami,Klasik|2",
  "T|L|Tawfiq|Arab|Pertolongan tuhan keberhasilan kemudahan hidup|Islami,Lembut|2",
  "T|P|Tazkia|Arab|Penyucian jiwa murni suci dari prasangka sosial|Islami,Lembut|3",
  "T|L|Ted|Inggris|Hadiah tuhan kksatria mandiri ramah asri|Universal,Lembut|1",
  "T|L|Teguh|Indonesia|Kukuh kuat pendirian tidak mudah goyah janji|Kuat,Klasik|2",
  "T|L|Theodore|Latin|Anugerah terindah tuhan gagah berkarisma setia|Universal,Elegan|3",
  "T|P|Theresa|Yunani|Pemanen hasil bumi berkelimpahan kemakmuran|Elegan,Klasik|3",
  "T|L|Thomas|Ibrani|Anak kembar lambang keseimbangan kesetiaan|Universal,Klasik|2",
  "T|P|Tiara|Indonesia|Mahkota perhiasan rambut agung mempesona|Klasik,Elegan|3",

  // U
  "U|L|Ubaid|Arab|Hamba beriman taat sujud bersimpuh tawadhu|Islami,Lembut|2",
  "U|L|Uhban|Arab|Nama sahabat nabi sejarah perjuangan mulia berani|Islami,Klasik|2",
  "U|L|Ukail|Arab|Pintar pandai bijaksana memecahkan kebuntuan|Islami,Elegan|2",
  "U|L|Ukasyah|Arab|Sahabat nabi gagah berani tegap memegang panji|Islami,Kuat|3",
  "U|P|Ulfa|Arab|Kemesraan keakraban ramah bersahabat menyejuk|Islami,Lembut|2",
  "U|L|Ulhaq|Arab|Kebenaran mutlak teguh berdiri membela benar|Islami,Kuat|2",
  "U|L|Ulil|Arab|Orang memiliki kepandaian bijaksana pemikiran|Islami,Klasik|2",
  "U|P|Umaiza|Arab|Cantik cemerlang anggun rupawan fajar penyejuk|Islami,Elegan|3",
  "U|L|Umarah|Arab|Kemakmuran pembangunan rukun sejahtera asri|Islami,Klasik|3",
  "U|L|Umran|Arab|Pembangunan kemakmuran kestabilan keluarga|Islami,Klasik|2",
  "U|L|Unais|Arab|Kawan karib setia ramah tamah suka berteman|Islami,Lembut|2",
  "U|P|Unaisa|Arab|Kegembiraan pelipur lara penyejuk hati gndah|Islami,Lembut|3",
  "U|P|Uraiza|Arab|Berhati bersih suci berseri senang berbagi kasih|Islami,Unik|3",
  "U|L|Urfee|Arab|Pujangga penyair terkenal pesona kata merdu|Unik,Elegan|2",
  "U|L|Urwa|Arab|Pegangan kuat pohon rindang tempat berteduh asri|Islami,Klasik|2",
  "U|L|Usama|Arab|Singa gagah perkasa rasi bintang pemimpin|Islami,Kuat|3",
  "U|L|Utbah|Arab|Ambang pintu kemuliaan keridaan tuhan pembuka|Islami,Klasik|2",
  "U|L|Uthman|Arab|Sahabat nabi penyayang dermawan penolong fakir|Islami,Klasik|2",

  // V
  "V|U|Valen|Latin|Kuat sehat penuh kasih sayang ramah bersahaja|Modern,Universal|2",
  "V|P|Valentina|Latin|Kekuatan kesehatan mutlak keanggunan wanita|Elegan,Lembut|4",
  "V|L|Valentino|Latin|Ksatria gagah berani sehat fisik tegar|Modern,Kuat|4",
  "V|P|Valeria|Latin|Kekuatan kesehatan prima gadis mandiri sukses|Elegan,Modern|4",
  "V|P|Valerie|Latin|Gadis kuat pemberani mandiri tegar hadapi|Modern,Kuat|3",
  "V|L|Valerio|Latin|Sehat kuat berjiwa kurnia ksatria pelindung|Modern,Elegan|4",
  "V|P|Valda|Jerman|Pejuang wanita tangguh kksatria pembela lemah|Kuat,Unik|2",
  "V|L|Vance|Keltik|Tinggal di dataran tinggi asri murni bebas|Modern,Universal|1",
  "V|P|Vanessa|Yunani|Kupu-kupu cantik terbang bebas pembawa warna|Modern,Elegan|3",
  "V|L|Varun|Sansekerta|Dewa air langit penjaga keharmonisan alam|Klasik,Kuat|2",
  "V|P|Vasya|Modern|Pemimpin ramah tamah disukai kawan suka damai|Modern,Lembut|2",
  "V|U|Veasna|Modern|Keberuntungan nasib takdir gilang benderang|Modern,Unik|2",
  "V|P|Veda|Sansekerta|Pengetahuan suci kebijaksanaan tinggi penuntun|Klasik,Elegan|2",
  "V|P|Vega|Arab|Bintang jatuh terang rasi lyra bersinar fajar|Lembut,Elegan|2",
  "V|P|Vera|Latin|Kebenaran kesetiaan abadi jujur bersahaja|Lembut,Universal|2",
  "V|P|Verena|Latin|Pelindung jujur benar membawa kabar selamat|Elegan,Lembut|3",
  "V|L|Victor|Latin|Sang pemenang jaya kksatria tangguh dihormati|Universal,Kuat|2",
  "V|L|Vincent|Latin|Sang penakluk rintangan perkasa mengayomi|Modern,Elegan|2",

  // W
  "W|L|Wade|Inggris|Penjelajah sungai berani suka tantangan asri|Modern,Universal|1",
  "W|P|Wafa|Arab|Kesetiaan ketulusan rukun rukun membawa berkah|Islami,Lembut|2",
  "W|L|Wafi|Arab|Sempurna setia jujur memegang amanah janji|Islami,Elegan|2",
  "W|L|Wafiq|Arab|Sukses diberkati tuhan kemudahan jalannya jaya|Islami,Elegan|2",
  "W|L|Wahid|Arab|Yang pertama tunggal istimewa pembuka jalan|Islami,Klasik|2",
  "W|L|Wahyu|Indonesia|Petunjuk suci langsung dari tuhan terang|Klasik,Lembut|2",
  "W|L|Walid|Arab|Bayi dilahirkan selamat masa depan sejahtera|Islami,Klasik|2",
  "W|P|Wanda|Jerman|Pengembara mandiri bebas tangguh pencinta|Lembut,Modern|2",
  "W|P|Wardah|Arab|Bunga mawar merah harum kesucian tebarkan|Islami,Lembut|2",
  "W|L|Wardi|Jawa|Bunga mawar penyejuk rasa pelindung keluarga|Klasik,Lembut|2",
  "W|L|Wasiat|Indonesia|Pesan suci berharga peninggalan luhur bimbingan|Klasik,Elegan|3",
  "W|L|Wibisana|Jawa|Bijaksana berbudi luhur membela yang adil|Klasik,Elegan|4",
  "W|L|Wibowo|Jawa|Berwibawa berkekuasaan tinggi dihormati khalayak|Klasik,Kuat|3",
  "W|L|Wicaksono|Jawa|Bijaksana penuh kecerdasan tajam analisis|Klasik,Elegan|4",
  "W|L|Widodo|Jawa|Sejahtera selamat lahir batin rukun membawa|Klasik,Lembut|3",
  "W|L|Wijaya|Indonesia|Kemenangan gilang-gemilang jaya kksatria|Kuat,Klasik|3",
  "W|P|Winola|Jerman|Sahabat ramah tulus membawa keharmonisan|Lembut,Modern|3",
  "W|L|Wyatt|Inggris|Pejuang tangguh pertempuran kksatria setia|Modern,Kuat|2",

  // X
  "X|L|Xander|Yunani|Pelindung umat manusia kksatria berani bela|Modern,Kuat|2",
  "X|P|Xandra|Yunani|Pembela pelindung manusia wanita tangguh berdaya|Modern,Lembut|2",
  "X|P|Xanthe|Yunani|Kuning keemasan cerah berseri laksana fajar|Elegan,Unik|2",
  "X|L|Xanthos|Yunani|Berambut emas bercahaya kemilau bangsawan|Klasik,Elegan|2",
  "X|L|Xavi|Modern|Pemimpin bersinar cerdas cekatan mengatur|Modern,Unik|2",
  "X|P|Xena|Yunani|Tamu ramah hangat menyenangkan menyambut|Kuat,Universal|2",
  "X|P|Xenia|Yunani|Keramahan kehangatan menyambut baik datang|Lembut,Universal|3",
  "X|L|Xenon|Yunani|Tamu zat bersinar terang benderang malam asri|Modern,Unik|2",
  "X|L|Xerxes|Persia|Pemimpin pahlawan kksatria bermahkotakan jaya|Klasik,Kuat|2",
  "X|P|Xia|Modern|Cahaya fajar fajar fajar fajar|Lembut,Modern|2",
  "X|L|Xiang|Modern|Harum semerbak terbang fajar tinggi gapai|Modern,Unik|1",
  "X|U|Xiao|Modern|Kecil berbakti menyayangi sesama rukun keluarga|Lembut,Universal|2",
  "X|P|Xin|Modern|Pikiran indah emas murni bersahaja tenang|Modern,Lembut|1",
  "X|P|Xuan|Modern|Musim semi indah mekar asri pembawa hangat|Modern,Lembut|1",
  "X|P|Xyla|Modern|Pohon fajar asri mandiri menyukai petualangan|Unik,Lembut|2",
  "X|P|Xyleena|Modern|Wanita penghuni hutan asri menjaga kedamaian|Unik,Lembut|3",
  "X|L|Xylon|Yunani|Kayu pohon kokoh pertahanan kokoh tak goyah|Kuat,Unik|2",
  "X|L|Xylo|Modern|Suara merdu musisi kksatria kreatif mandiri|Modern,Unik|2",

  // Y
  "Y|L|Yaqub|Arab|Nama nabi yang sabar, penerus risalah mulia|Islami,Klasik|2",
  "Y|P|Yadira|Arab|Layak berharga pantas dipuji kemuliaan hati|Islami,Elegan|3",
  "Y|P|Yafa|Arab|Kecantikan keindahan luar biasa berseri asri|Lembut,Elegan|2",
  "Y|L|Yahya|Arab|Hidup diberkati kasih sayang tuhan penuh amanah|Islami,Lembut|2",
  "Y|L|Yamin|Arab|Tangan kanan berkah kebenaran kemakmuran jaya|Islami,Kuat|2",
  "Y|P|Yani|Indonesia|Cahaya kedamaian pembawa ramah tamah asri|Lembut,Klasik|2",
  "Y|P|Yara|Persia|Kupu-kupu kecil kekuatan cinta sejati manis|Lembut,Modern|2",
  "Y|L|Yaris|Arab|Diberkati kemakmuran kaya raya berwibawa tinggi|Islami,Elegan|2",
  "Y|L|Yaser|Arab|Memudahkan jalan makmur kaya raya penolong|Islami,Lembut|2",
  "Y|L|Yasif|Arab|Pemberani pelindung keluarga tegar pendirian|Islami,Kuat|2",
  "Y|L|Yasin|Arab|Nama surat Al-Quran terhormat mulia berkarisma|Islami,Klasik|2",
  "Y|P|Yasira|Arab|Lembut toleran membawa kemudahan kelancaran|Islami,Lembut|3",
  "Y|P|Yasmina|Arab|Melati mekar harum kesucian keanggunan wanita|Islami,Elegan|3",
  "Y|P|Yasmine|Arab|Bunga melati yang cantik jelita harum semerbak|Elegan,Lembut|2",
  "Y|L|Yazid|Arab|Berkembang bertambah berkah melimpah sukses|Islami,Kuat|2",
  "Y|L|Yehuda|Ibrani|Pujian bersyukur kepada tuhan agung perkasa|Klasik,Kuat|3",
  "Y|P|Yemima|Ibrani|Merpati kecil manis membawa perdamaian rukun|Lembut,Universal|3",
  "Y|P|Yumna|Arab|Diberkati keberuntungan kanan pembawa berkah|Islami,Lembut|2",

  // Z
  "Z|L|Zachary|Ibrani|Tuhan mengingat kebaikan kksatria setia jaya|Universal,Klasik|3",
  "Z|L|Zafar|Arab|Kemenangan jaya kejayaan nyata pembawa gembira|Islami,Kuat|2",
  "Z|P|Zafira|Arab|Pemenang sukses beruntung jaya penuh karisma|Islami,Elegan|3",
  "Z|L|Zahid|Arab|Rendah hati zuhud mencintai tuhan takdir suci|Islami,Lembut|2",
  "Z|L|Zahir|Arab|Cemerlang benderang bersinar terang menerangi|Islami,Elegan|2",
  "Z|P|Zahira|Arab|Bercahaya fajar anggun rupawan subur asri|Islami,Elegan|3",
  "Z|L|Zid|Arab|Bertambah berkembang fajar kemakmuran hidup|Islami,Kuat|1",
  "Z|P|Zaida|Arab|Keberuntungan berlimpah berkah melimpah ceria|Islami,Lembut|2",
  "Z|L|Zain|Arab|Perhiasan indah ketampanan rukun penuh pesona|Islami,Elegan|2",
  "Z|P|Zaina|Arab|Cantik jelita anggun memesona budi pekerti|Islami,Lembut|3",
  "Z|L|Zakaria|Arab|Nama nabi tuhan mengingat kebaikan hamba suci|Islami,Klasik|4",
  "Z|L|Zaki|Arab|Murni suci pintar cerdas cekatan tajam pemikiran|Islami,Kuat|2",
  "Z|P|Zakiyah|Arab|Tumbuh baik suci murni amanah terpelihara|Islami,Lembut|3",
  "Z|P|Zara|Arab|Bunga mawar putri bangsawan terhormat anggun|Elegan,Lembut|2",
  "Z|P|Zarina|Persia|Emas berharga berkilau fajar fajar asri|Unik,Elegan|3",
  "Z|L|Zehan|Modern|Imam besar bijaksana penuntun jalan luhur|Modern,Unik|2",
  "Z|P|Zia|Arab|Cahaya benderang fajar pagi penyejuk pandangan|Islami,Lembut|2",
  "Z|P|Zora|Modern|Kecantikan fajar pagi cerah berseri membahagiakan|Modern,Lembut|2"
];

function expandNames(baseNames: BabyName[]): BabyName[] {
  const result = [...baseNames];
  let nextId = 200;
  
  ADDITIONAL_COMPACT.forEach((str) => {
    const parts = str.split('|');
    if (parts.length < 6) return;
    const letter = parts[0];
    const gender = parts[1] as any;
    const name = parts[2];
    const origin = parts[3].split(',');
    const meaning = parts[4];
    const nuances = parts[5].split(',') as any;
    
    // Check if name already exists (case-insensitive)
    const exists = baseNames.some(b => b.name.toLowerCase() === name.toLowerCase());
    if (exists) return;
    
    const id = String(nextId++);
    const length = name.length;
    
    const nickIdeas = [name, name.slice(0, 4), name.slice(0, 3)].filter((v, i, a) => v && v.length >= 2 && a.indexOf(v) === i);
    
    const combinations: string[] = [];
    if (gender === 'L') {
      combinations.push(`${name} Aditya Pratama`);
      combinations.push(`Gibran ${name} Askari`);
    } else if (gender === 'P') {
      combinations.push(`${name} Kirana Amara`);
      combinations.push(`Aisha ${name} Sabrina`);
    } else {
      combinations.push(`${name} Gibran Rumi`);
      combinations.push(`Aria ${name} Kirana`);
    }
    
    result.push({
      id,
      name,
      gender,
      meaning,
      origin,
      nuances,
      length,
      nickIdeas,
      combinations,
      isPopular: Math.random() > 0.6
    });
  });
  
  return result;
}

function cleanAndSortNames(names: BabyName[]): BabyName[] {
  const seen = new Set<string>();
  const uniqCleaned: BabyName[] = [];

  names.forEach(item => {
    let rawName = item.name.trim();
    if (rawName.includes(' ')) {
      rawName = rawName.split(' ')[0]; // Ambil kata pertama saja
    }
    // Hapus karakter non-huruf dan rapihkan kapitalisasi (Title-Case)
    const cleanedName = rawName.replace(/[^a-zA-Z]/g, '');
    if (!cleanedName) return;
    const formattedName = cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1).toLowerCase();

    const lower = formattedName.toLowerCase();
    if (seen.has(lower)) {
      return; // Kembalikan/Skip jika duplikat
    }
    seen.add(lower);

    const updatedNickIdeas = [formattedName, formattedName.slice(0, 4), formattedName.slice(0, 3)].filter(
      (v, i, a) => v && v.length >= 2 && a.indexOf(v) === i
    );
    const updatedCombinations = item.gender === 'L' ? [
      `${formattedName} Aditya Pratama`,
      `Gibran ${formattedName} Askari`
    ] : [
      `${formattedName} Kirana Amara`,
      `Aisha ${formattedName} Sabrina`
    ];

    // Bersihkan deskripsi makna jika ada referensi nama dua kata
    let cleanMeaning = item.meaning;
    if (item.name && item.name.includes(' ')) {
      cleanMeaning = cleanMeaning.replace(new RegExp(item.name, 'g'), formattedName);
    }

    // Keep only a single proper origin
    let primaryOrigin = item.origin.filter(o => o !== 'Universal' && o !== 'Modern');
    if (primaryOrigin.length > 1) {
      const nonGeneric = primaryOrigin.filter(o => o !== 'Indonesia');
      if (nonGeneric.length > 0) {
        primaryOrigin = [nonGeneric[0]];
      } else {
        primaryOrigin = [primaryOrigin[0]];
      }
    } else if (primaryOrigin.length === 0) {
      primaryOrigin = ['Indonesia'];
    }

    uniqCleaned.push({
      ...item,
      name: formattedName,
      length: formattedName.length,
      meaning: cleanMeaning,
      origin: primaryOrigin,
      nickIdeas: updatedNickIdeas,
      combinations: updatedCombinations,
    });
  });

  // Urutkan secara abjad A-Z demi kerapihan data
  uniqCleaned.sort((a, b) => a.name.localeCompare(b.name, 'id'));

  return uniqCleaned;
}

export const SAMPLE_NAMES: BabyName[] = cleanAndSortNames(extendNameList(expandNames(BASE_SAMPLE_NAMES)));

export const COPWRITING_TIPS = [
  '“Pelan-pelan ya Moms & Dads, nama yang tepat biasanya terasa dekat di hati.”',
  '“Simpan dulu nama yang menarik, nanti bisa dibahas bareng pasangan saat santai.”',
  '“Nama adalah doa pertama yang kita berikan pada si kecil untuk sepanjang umurnya.”',
  '“Pilihlah nama dengan getaran yang penuh kasih sayang dan harapan luhur.”',
  '“Dengarkan intonasi nama lengkap saat diucapkan keras-keras ya, Moms.”'
];
