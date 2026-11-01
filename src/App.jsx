import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles, Calendar, BookOpen, Clock, CheckCircle2, AlertCircle, BarChart3,
  BrainCircuit, Settings, Sun, Moon, Plus, Trash2, Edit3, Play, Pause, RotateCcw,
  Search, Download, Upload, Check, X, Bell, ChevronRight, Award, GraduationCap,
  FileText, Bookmark, Target, Zap, LayoutDashboard, Compass, HelpCircle, Heart,
  Flame, Volume2, VolumeX, ArrowRight, RefreshCw, Layers
} from 'lucide-react';

// --- INITIAL DEMO DATA FOR S1 GI (SEC 2 / GR 4) ---
const INITIAL_TIMETABLE = [
  { id: '1', day: 1, name: 'Architecture Ordinateur', type: 'Cours', time: '08h30 - 10h30', room: 'Amphi B', teacher: 'Pr. Alami', color: 'bg-pink-100 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800 text-pink-900 dark:text-pink-200', completed: false, unverified: false },
  { id: '2', day: 1, name: 'Algorithmique & C', type: 'TD', time: '10h30 - 12h30', room: 'Salle 12', teacher: 'Pr. Bennani', color: 'bg-purple-100 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200', completed: false, unverified: false },
  { id: '3', day: 1, name: 'Système Linux', type: 'TP', time: '14h30 - 16h30', room: 'Labo Info 3', teacher: 'Pr. Chraibi', color: 'bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200', completed: false, unverified: false },
  
  { id: '4', day: 2, name: 'Base de Données', type: 'Cours', time: '08h30 - 10h30', room: 'Amphi A', teacher: 'Pr. Daoudi', color: 'bg-rose-100 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200', completed: false, unverified: false },
  { id: '5', day: 2, name: 'Base de Données', type: 'TP', time: '10h30 - 12h30', room: 'Labo Info 1', teacher: 'Pr. Daoudi', color: 'bg-rose-100 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200', completed: false, unverified: false },
  { id: '6', day: 2, name: 'Algèbre', type: 'Cours', time: '14h30 - 16h30', room: 'Amphi B', teacher: 'Pr. El Fassi', color: 'bg-fuchsia-100 dark:bg-fuchsia-950/40 border-fuchsia-300 dark:border-fuchsia-800 text-fuchsia-900 dark:text-fuchsia-200', completed: false, unverified: false },

  { id: '7', day: 3, name: 'Algorithmique & C', type: 'Cours', time: '08h30 - 10h30', room: 'Amphi C', teacher: 'Pr. Bennani', color: 'bg-purple-100 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200', completed: false, unverified: false },
  { id: '8', day: 3, name: 'Algorithmique & C', type: 'TP', time: '10h30 - 12h30', room: 'Labo Info 4', teacher: 'Pr. Bennani', color: 'bg-purple-100 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200', completed: false, unverified: false },
  { id: '9', day: 3, name: 'Culture Digitale', type: 'Cours', time: '14h30 - 16h30', room: 'En Ligne / Amphi A', teacher: 'Pr. Ghazi', color: 'bg-violet-100 dark:bg-violet-950/40 border-violet-300 dark:border-violet-800 text-violet-900 dark:text-violet-200', completed: false, unverified: true },

  { id: '10', day: 4, name: 'Système Linux', type: 'Cours', time: '08h30 - 10h30', room: 'Amphi B', teacher: 'Pr. Chraibi', color: 'bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200', completed: false, unverified: false },
  { id: '11', day: 4, name: 'TEC C/TD', type: 'TD', time: '10h30 - 12h30', room: 'Salle 08', teacher: 'Pr. Hadaoui', color: 'bg-pink-100 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800 text-pink-900 dark:text-pink-200', completed: false, unverified: false },
  { id: '12', day: 4, name: 'Algèbre', type: 'TD', time: '14h30 - 16h30', room: 'Salle 15', teacher: 'Pr. El Fassi', color: 'bg-fuchsia-100 dark:bg-fuchsia-950/40 border-fuchsia-300 dark:border-fuchsia-800 text-fuchsia-900 dark:text-fuchsia-200', completed: false, unverified: false },

  { id: '13', day: 5, name: 'Architecture Ordinateur', type: 'TP', time: '08h30 - 10h30', room: 'Labo Elec 2', teacher: 'Pr. Alami', color: 'bg-pink-100 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800 text-pink-900 dark:text-pink-200', completed: false, unverified: false },
  { id: '14', day: 5, name: 'Projets / Tutorat', type: 'TD', time: '10h30 - 12h30', room: 'Salle GI', teacher: 'À vérifier', color: 'bg-purple-100 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200', completed: false, unverified: true }
];

const INITIAL_SUBJECTS = [
  {
    id: 'algo',
    name: 'Algorithmique et Programmation C',
    code: 'GI-S1-01',
    icon: '💻',
    progress: 75,
    chapters: [
      { id: 'c1', title: 'Introduction & Types de données', done: true },
      { id: 'c2', title: 'Structure Conditionnelle (if, switch)', done: true },
      { id: 'c3', title: 'Boucles (for, while, do while)', done: true },
      { id: 'c4', title: 'Tableaux 1D et 2D (Matrices)', done: true },
      { id: 'c5', title: 'Fonctions et Passage par Adresse', done: false },
      { id: 'c6', title: 'Pointeurs et Allocation Dynamique', done: false }
    ],
    summary: 'Master binary arithmetic, control flow statements, pointer operations, memory management (malloc/free), and structured programming principles in standard C.',
    formulas: ['malloc(n * sizeof(int))', 'int *ptr = &var;', 'printf("%d", *ptr);'],
    resources: ['Cours Pr. Bennani PDF', 'Exercices Corrégés TP1-TP4', 'Visualizer C Tutor']
  },
  {
    id: 'linux',
    name: 'Système Linux',
    code: 'GI-S1-02',
    icon: '🐧',
    progress: 60,
    chapters: [
      { id: 'l1', title: 'Commandes de base & Navigation (cd, ls, mkdir)', done: true },
      { id: 'l2', title: 'Gestion des Fichiers et Permissions (chmod, chown)', done: true },
      { id: 'l3', title: 'Redirections & Pipes (|, >, >>, grep)', done: true },
      { id: 'l4', title: 'Processus et Gestion de la mémoire (ps, top, kill)', done: false },
      { id: 'l5', title: 'Scripting Shell Bash (Variables, Conditions, Loops)', done: false }
    ],
    summary: 'Understand the Unix kernel principles, filesystem tree hierarchy, permission masks, shell input/output streams, and automation scripting.',
    formulas: ['chmod 755 script.sh', 'grep -r "pattern" ./', 'ps aux | grep gcc'],
    resources: ['Guide des Commandes Linux PDF', 'Labo Bash Solutions']
  },
  {
    id: 'db',
    name: 'Base de données',
    code: 'GI-S1-03',
    icon: '🗄️',
    progress: 80,
    chapters: [
      { id: 'b1', title: 'Modèle Entité-Association (MCD)', done: true },
      { id: 'b2', title: 'Passage au Modèle Relationnel (MLD)', done: true },
      { id: 'b3', title: 'Normalisation (1FN, 2FN, 3FN)', done: true },
      { id: 'b4', title: 'Langage SQL: DDL (CREATE, ALTER, DROP)', done: true },
      { id: 'b5', title: 'Langage SQL: DML (SELECT, JOIN, GROUP BY)', done: false }
    ],
    summary: 'Relational database design fundamentals, functional dependencies, primary and foreign key constraints, and declarative querying via SQL.',
    formulas: ['SELECT col FROM t1 JOIN t2 ON t1.id = t2.fk_id;', 'GROUP BY col HAVING count(*) > 1'],
    resources: ['Annales Examens SQL', 'Fiche Formulaire MCD/MLD']
  },
  {
    id: 'arch',
    name: 'Architecture Ordinateur',
    code: 'GI-S1-04',
    icon: '⚡',
    progress: 50,
    chapters: [
      { id: 'a1', title: 'Systèmes de Numération (Binaire, Hexa, BCD)', done: true },
      { id: 'a2', title: 'Algèbre de Boole et Portes Logiques', done: true },
      { id: 'a3', title: 'Circuits Combinatoires (Multiplexeur, Additionneur)', done: false },
      { id: 'a4', title: 'Circuits Séquentiels (Bascule RS, JK, D)', done: false },
      { id: 'a5', title: 'Modèle de Von Neumann & Processeur CPU', done: false }
    ],
    summary: 'Low-level hardware logic design, digital logic gates, Karnaugh maps simplification, CPU registers, and instruction fetch cycles.',
    formulas: ['Complement à 2: ~N + 1', 'F = A.B + A\'.C', 'MUX 2^n à 1'],
    resources: ['Logisim Simulators', 'Série d\'exercices circuits']
  },
  {
    id: 'algebre',
    name: 'Algèbre',
    code: 'GI-S1-05',
    icon: '📐',
    progress: 40,
    chapters: [
      { id: 'g1', title: 'Espaces Vectoriels et Sous-Espaces', done: true },
      { id: 'g2', title: 'Familles libres, génératrices et Bases', done: true },
      { id: 'g3', title: 'Applications Linéaires et Noyau (Ker / Im)', done: false },
      { id: 'g4', title: 'Calcul Matriciel et Determinants', done: false },
      { id: 'g5', title: 'Systèmes d\'Équations Linéaires (Gauss)', done: false }
    ],
    summary: 'Linear algebra foundation for computer science: vector spaces, basis transformations, rank theorem, matrix inversion, and linear system solvers.',
    formulas: ['dim(E) = dim(Ker f) + dim(Im f)', 'Det(AB) = Det(A) * Det(B)'],
    resources: ['Fiche Théorèmes Algèbre', 'Exercices corrigés Gauss']
  },
  {
    id: 'tec',
    name: 'TEC C/TD',
    code: 'GI-S1-06',
    icon: '🗣️',
    progress: 90,
    chapters: [
      { id: 't1', title: 'Techniques d\'expression écrite et synthèse', done: true },
      { id: 't2', title: 'Prise de parole en public et présentation oral', done: true },
      { id: 't3', title: 'Rédaction de rapport technique GI', done: true }
    ],
    summary: 'Techniques d\'expression et de communication professionnelle adaptées aux ingénieurs informaticiens.',
    formulas: ['Structure d\'un rapport: Intro, Dev, Concl, Réf'],
    resources: ['Support de cours TEC PDF']
  },
  {
    id: 'culture',
    name: 'Culture Digitale',
    code: 'GI-S1-07',
    icon: '🌐',
    progress: 85,
    chapters: [
      { id: 'cd1', title: 'Fondamentaux du Web & Sécurité informatique', done: true },
      { id: 'cd2', title: 'Identité Numérique et Éthique de l\'IA', done: true },
      { id: 'cd3', title: 'Outils de travail collaboratif & Cloud', done: true }
    ],
    summary: 'Aperçu global de l\'écosystème numérique, sécurité des données, éthique algorithmique et travail scientifique en ligne.',
    formulas: ['Principes RGPD', 'Cryptographie Asymétrique RSA'],
    resources: ['Modules de cours e-Learning']
  }
];

const INITIAL_TASKS = [
  { id: 't1', title: 'Préparer le TP3 C (Pointeurs & Structures)', subjectId: 'algo', subjectName: 'Algorithmique & C', date: '2026-11-05', priority: 'Urgent', status: 'pending' },
  { id: 't2', title: 'Faire la série N°2 d\'Algèbre (Espaces Vectoriels)', subjectId: 'algebre', subjectName: 'Algèbre', date: '2026-11-06', priority: 'High', status: 'pending' },
  { id: 't3', title: 'Réviser les commandes Bash Redirection (grep, |)', subjectId: 'linux', subjectName: 'Système Linux', date: '2026-11-04', priority: 'Medium', status: 'completed' },
  { id: 't4', title: 'Créer le MCD pour le projet Base de Données', subjectId: 'db', subjectName: 'Base de Données', date: '2026-11-08', priority: 'High', status: 'pending' },
  { id: 't5', title: 'Lire Chapitre 3 Architecture (Circuits Combinatoires)', subjectId: 'arch', subjectName: 'Architecture', date: '2026-11-10', priority: 'Low', status: 'pending' }
];

const INITIAL_NOTES = [
  { id: 'n1', title: 'Résumé Pointeurs en C', subject: 'Algorithmique et C', date: '01 Nov 2026', content: '# Pointeurs en C\n- Un pointeur contient l\'adresse mémoire d\'une variable.\n- Declarer: `int *p;`\n- Assigner: `p = &a;`\n- Dereferencer: `*p = 10;`\n\n> Note: Toujours initialiser un pointeur a NULL si non attribue !' },
  { id: 'n2', title: 'Commandes Linux Utiles pour Examen', subject: 'Système Linux', date: '28 Oct 2026', content: '# Top Commandes Linux\n`chmod 755 file` -> rwxr-xr-x\n`find / -name "*.c"` -> Chercher tous les fichiers .c\n`ps aux | grep gcc` -> Voir si gcc tourne.' }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    subject: 'Algorithmique & C',
    question: 'En C, quelle est la valeur finale de `x` après `int x = 5; int y = x++;` ?',
    options: ['x = 5', 'x = 6', 'x = 4', 'Erreur de compilation'],
    correct: 1,
    explanation: 'L\'opérateur post-incrémentation `x++` utilise d\'abord la valeur actuelle de x (5) pour l\'assignation à y, puis incrémente x à 6.'
  },
  {
    id: 2,
    subject: 'Système Linux',
    question: 'Quelle commande permet de modifier les permissions d\'un fichier en mode symbolique pour ajouter l\'exécution au propriétaire ?',
    options: ['chmod u+x fichier', 'chmod 777 fichier', 'chown u+x fichier', 'grant exec fichier'],
    correct: 0,
    explanation: '`chmod u+x` ajoute (`+`) le droit d\'exécution (`x`) pour l\'utilisateur/propriétaire (`u`).'
  },
  {
    id: 3,
    subject: 'Base de données',
    question: 'Dans une requête SQL, quelle clause filtre les résultats APRES un regroupement (GROUP BY) ?',
    options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
    correct: 1,
    explanation: 'La clause `WHERE` filtre les lignes AVANT l\'agrégation, alors que `HAVING` filtre les groupes APRES `GROUP BY`.'
  },
  {
    id: 4,
    subject: 'Architecture Ordinateur',
    question: 'Quel est l\'équivalent hexadécimal du nombre binaire `1101 1010` ?',
    options: ['DA', 'DB', 'C10', 'E10'],
    correct: 0,
    explanation: '1101 en binaire fait 13 (D en hexa) et 1010 fait 10 (A en hexa). Le résultat est donc DA.'
  },
  {
    id: 5,
    subject: 'Algèbre',
    question: 'Si le déterminant d\'une matrice carrée A est non nul (det(A) ≠ 0), alors :',
    options: ['La matrice A n\'est pas inversible', 'La matrice A est inversible', 'Les lignes sont liées', 'Le noyau de A est infini'],
    correct: 1,
    explanation: 'Une matrice est inversible si et seulement si son déterminant est strictement différent de zéro.'
  }
];

const MOTIVATION_QUOTES = [
  { text: "Le succès c'est la somme de petits efforts répétés jour après jour. Continue de briller, Oumayma ! 🌸", author: "Robert Collier" },
  { text: "La seule façon de faire du bon travail est d'aimer ce que vous faites. Smart work pays off! ✨", author: "Steve Jobs" },
  { text: "N'attends pas que les conditions soient parfaites. Commence là où tu es, utilise ce que tu as. 🎀", author: "Arthur Ashe" },
  { text: "Le futur appartient à ceux qui croient à la beauté de leurs rêves. Future Engineer 💫", author: "Eleanor Roosevelt" }
];

export default function App() {
  // --- STATE PERSISTENCE ---
  const [theme, setTheme] = useState(() => localStorage.getItem('oumayma_theme') || 'light');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem('oumayma_timetable');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('oumayma_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('oumayma_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('oumayma_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [pomoStats, setPomoStats] = useState(() => {
    const saved = localStorage.getItem('oumayma_pomo_stats');
    return saved ? JSON.parse(saved) : { completedToday: 3, totalHours: 12.5, history: [] };
  });

  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('oumayma_quiz_history');
    return saved ? JSON.parse(saved) : [
      { date: '2026-10-28', score: 4, total: 5, subject: 'Algorithmique & C' },
      { date: '2026-10-30', score: 5, total: 5, subject: 'Base de données' }
    ];
  });

  // Time and Date state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('oumayma_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('oumayma_timetable', JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem('oumayma_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('oumayma_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('oumayma_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('oumayma_pomo_stats', JSON.stringify(pomoStats));
  }, [pomoStats]);

  useEffect(() => {
    localStorage.setItem('oumayma_quiz_history', JSON.stringify(quizHistory));
  }, [quizHistory]);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme Toggle Handler
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen relative flex flex-col font-sans transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#17121F] text-[#FFF5FA]' 
        : 'bg-[#FFFAFC] text-[#514456]'
    }`}>
      {/* 🌸 SAKURA PETALS CANVAS BACKGROUND 🌸 */}
      <SakuraCanvas theme={theme} />

      {/* HEADER BAR */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 dark:bg-[#17121F]/80 border-b border-pink-200/50 dark:border-purple-900/40 px-4 py-3 sm:px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl shadow-md transform hover:scale-105 transition">
            🎀
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              OUMAYMA STUDY SPACE
            </h1>
            <p className="text-xs text-pink-700/70 dark:text-pink-300/70 font-medium hidden sm:block">
              1ère Année GI • Semestre 1 • SEC 2 / GR 4 🎓
            </p>
          </div>
        </div>

        {/* Quick Info & Theme Button */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex flex-col items-end text-xs font-medium">
            <span className="text-pink-600 dark:text-pink-300">
              {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="text-purple-600 dark:text-purple-300 font-mono font-bold">
              {currentTime.toLocaleTimeString('fr-FR')}
            </span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            className="p-2.5 rounded-xl bg-pink-100/80 dark:bg-purple-950/60 border border-pink-300/60 dark:border-purple-800 text-pink-700 dark:text-pink-300 hover:scale-105 transition shadow-sm"
          >
            {theme === 'light' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-pink-300" />}
          </button>
        </div>
      </header>

      {/* APP BODY CONTAINER */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10 overflow-hidden max-w-7xl w-full mx-auto p-3 sm:p-5 gap-5">
        
        {/* DESKTOP SIDEBAR NAVIGATION */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white/70 dark:bg-[#251B30]/70 backdrop-blur-md border border-pink-100 dark:border-purple-900/40 rounded-3xl p-4 shadow-xl justify-between">
          <div className="space-y-1.5">
            <NavButton id="dashboard" icon={LayoutDashboard} label="Dashboard" active={activeTab} setActive={setActiveTab} badge="Vue" />
            <NavButton id="timetable" icon={Calendar} label="Emploi du temps" active={activeTab} setActive={setActiveTab} badge="SEC 2" />
            <NavButton id="planner" icon={CheckCircle2} label="Study Planner" active={activeTab} setActive={setActiveTab} count={tasks.filter(t => t.status === 'pending').length} />
            <NavButton id="subjects" icon={BookOpen} label="Mes Matières" active={activeTab} setActive={setActiveTab} />
            <NavButton id="notes" icon={FileText} label="Notes & Résumés" active={activeTab} setActive={setActiveTab} />
            <NavButton id="pomo" icon={Clock} label="Pomodoro Timer" active={activeTab} setActive={setActiveTab} />
            <NavButton id="quiz" icon={HelpCircle} label="Quiz & Exercices" active={activeTab} setActive={setActiveTab} />
            <NavButton id="exam" icon={Award} label="Exam Prep" active={activeTab} setActive={setActiveTab} badge="S1" />
            <NavButton id="stats" icon={BarChart3} label="Statistiques" active={activeTab} setActive={setActiveTab} />
            <NavButton id="ai" icon={BrainCircuit} label="Assistant Smart" active={activeTab} setActive={setActiveTab} spark />
          </div>

          <div className="pt-3 border-t border-pink-100 dark:border-purple-900/40">
            <NavButton id="settings" icon={Settings} label="Paramètres" active={activeTab} setActive={setActiveTab} />
          </div>
        </aside>

        {/* MOBILE NAVIGATION TABS (SCROLLABLE DOCK) */}
        <nav className="md:hidden flex overflow-x-auto gap-2 p-1.5 bg-white/80 dark:bg-[#251B30]/90 backdrop-blur-md border border-pink-200 dark:border-purple-900/50 rounded-2xl shadow-md no-scrollbar">
          <MobileNavBtn id="dashboard" icon={LayoutDashboard} label="Accueil" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="timetable" icon={Calendar} label="Horaire" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="planner" icon={CheckCircle2} label="Planner" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="subjects" icon={BookOpen} label="Matières" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="notes" icon={FileText} label="Notes" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="pomo" icon={Clock} label="Pomo" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="quiz" icon={HelpCircle} label="Quiz" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="exam" icon={Award} label="Examens" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="stats" icon={BarChart3} label="Stats" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="ai" icon={BrainCircuit} label="IA" active={activeTab} setActive={setActiveTab} />
          <MobileNavBtn id="settings" icon={Settings} label="Config" active={activeTab} setActive={setActiveTab} />
        </nav>

        {/* MAIN VIEWPORT AREA */}
        <main className="flex-1 overflow-y-auto rounded-3xl bg-white/60 dark:bg-[#251B30]/60 backdrop-blur-md border border-pink-100 dark:border-purple-900/40 p-4 sm:p-6 shadow-xl relative min-h-[500px]">
          {activeTab === 'dashboard' && <DashboardView timetable={timetable} tasks={tasks} pomoStats={pomoStats} subjects={subjects} setActiveTab={setActiveTab} />}
          {activeTab === 'timetable' && <TimetableView timetable={timetable} setTimetable={setTimetable} />}
          {activeTab === 'planner' && <PlannerView tasks={tasks} setTasks={setTasks} subjects={subjects} />}
          {activeTab === 'subjects' && <SubjectsView subjects={subjects} setSubjects={setSubjects} />}
          {activeTab === 'notes' && <NotesView notes={notes} setNotes={setNotes} subjects={subjects} />}
          {activeTab === 'pomo' && <PomodoroView pomoStats={pomoStats} setPomoStats={setPomoStats} />}
          {activeTab === 'quiz' && <QuizView history={quizHistory} setHistory={setQuizHistory} />}
          {activeTab === 'exam' && <ExamPrepView subjects={subjects} tasks={tasks} />}
          {activeTab === 'stats' && <StatsView subjects={subjects} tasks={tasks} pomoStats={pomoStats} quizHistory={quizHistory} />}
          {activeTab === 'ai' && <AssistantView subjects={subjects} tasks={tasks} timetable={timetable} />}
          {activeTab === 'settings' && (
            <SettingsView 
              theme={theme} 
              toggleTheme={toggleTheme} 
              onResetData={() => {
                localStorage.clear();
                window.location.reload();
              }}
              onExportData={() => {
                const dump = { timetable, subjects, tasks, notes, pomoStats, quizHistory };
                const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Oumayma_StudySpace_Backup_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
            />
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="py-3 text-center text-xs text-pink-700/60 dark:text-pink-300/60 font-medium">
        OUMAYMA STUDY SPACE 🎀 • 1ère Année Génie Informatique (2026/2027) • Study smart, shine bright! 🌸
      </footer>
    </div>
  );
}

// ==========================================
// 🌸 SAKURA PETALS BACKGROUND ANIMATION
// ==========================================
function SakuraCanvas({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic Petal count based on screen size
    const petalCount = width < 768 ? 20 : 45;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.4
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y / 30) * 0.5 + p.speedX;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        // Colors tailored to light/dark themes
        if (theme === 'dark') {
          ctx.fillStyle = '#F08BB8';
          ctx.shadowColor = '#F08BB8';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = '#F8C8DC';
          ctx.shadowColor = '#E6DDF5';
          ctx.shadowBlur = 2;
        }

        // Draw organic petal oval curve
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

// ==========================================
// NAV COMPONENT HELPERS
// ==========================================
function NavButton({ id, icon: Icon, label, active, setActive, badge, count, spark }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => setActive(id)}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-300/30 dark:shadow-purple-900/30 scale-[1.02]'
          : 'text-pink-900/80 dark:text-pink-200/80 hover:bg-pink-100/60 dark:hover:bg-purple-900/30'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-pink-500 dark:text-pink-400'}`} />
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
          isActive ? 'bg-white/30 text-white' : 'bg-pink-100 dark:bg-purple-900/60 text-pink-600 dark:text-pink-300'
        }`}>
          {badge}
        </span>
      )}
      {count !== undefined && count > 0 && (
        <span className="w-5 h-5 flex items-center justify-center rounded-full text-xs bg-rose-500 text-white font-bold">
          {count}
        </span>
      )}
      {spark && (
        <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-200' : 'text-pink-400 animate-pulse'}`} />
      )}
    </button>
  );
}

function MobileNavBtn({ id, icon: Icon, label, active, setActive }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => setActive(id)}
      className={`flex flex-col items-center justify-center min-w-[64px] px-2 py-1.5 rounded-xl text-xs font-medium transition ${
        isActive
          ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-sm'
          : 'text-pink-900/80 dark:text-pink-200/80 hover:bg-pink-100/40'
      }`}
    >
      <Icon className="w-4 h-4 mb-0.5" />
      <span>{label}</span>
    </button>
  );
}

// ==========================================
// 1. DASHBOARD VIEW
// ==========================================
function DashboardView({ timetable, tasks, pomoStats, subjects, setActiveTab }) {
  const quote = useMemo(() => {
    const day = new Date().getDate();
    return MOTIVATION_QUOTES[day % MOTIVATION_QUOTES.length];
  }, []);

  const urgentTasks = tasks.filter(t => t.status === 'pending').slice(0, 3);
  const totalChapters = subjects.reduce((acc, s) => acc + s.chapters.length, 0);
  const doneChapters = subjects.reduce((acc, s) => acc + s.chapters.filter(c => c.done).length, 0);
  const overallProgress = Math.round((doneChapters / (totalChapters || 1)) * 100);

  // Determine current day for timetable summary (1 = Mon ... 5 = Fri)
  const currentDayNum = new Date().getDay();
  const dayKey = currentDayNum === 0 || currentDayNum === 6 ? 1 : currentDayNum;
  const todayClasses = timetable.filter(t => t.day === dayKey);

  return (
    <div className="space-y-6">
      {/* GREETING BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 dark:from-pink-950/80 dark:via-purple-950/80 dark:to-indigo-950/80 rounded-3xl p-6 text-pink-950 dark:text-pink-100 shadow-md">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">Bonjour Oumayma 🎀</span>
            <span className="bg-white/40 dark:bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
              GI S1 • SEC 2 / GR 4
            </span>
          </div>
          <p className="text-sm opacity-90 italic max-w-xl">
            "{quote.text}" — <span className="font-semibold">{quote.author}</span>
          </p>
          
          <div className="pt-2 flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveTab('pomo')}
              className="bg-white dark:bg-purple-900/80 text-pink-700 dark:text-pink-200 text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:scale-105 transition flex items-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Démarrer un Pomodoro</span>
            </button>
            <button 
              onClick={() => setActiveTab('planner')}
              className="bg-pink-500/20 backdrop-blur-md border border-white/40 dark:border-purple-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-pink-500/30 transition flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter une tâche</span>
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/20 dark:bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* QUICK METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={BookOpen} label="Progression Globale S1" value={`${overallProgress}%`} color="text-pink-500" bg="bg-pink-50 dark:bg-pink-950/30" />
        <MetricCard icon={Clock} label="Heures d'étude" value={`${pomoStats.totalHours}h`} color="text-purple-500" bg="bg-purple-50 dark:bg-purple-950/30" />
        <MetricCard icon={Flame} label="Sessions Pomodoro" value={pomoStats.completedToday} color="text-rose-500" bg="bg-rose-50 dark:bg-rose-950/30" />
        <MetricCard icon={CheckCircle2} label="Tâches en attente" value={urgentTasks.length} color="text-indigo-500" bg="bg-indigo-50 dark:bg-indigo-950/30" />
      </div>

      {/* MAIN TWO COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TODAY'S TIMETABLE SUMMARY (2 COLS) */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center space-x-2 text-pink-900 dark:text-pink-200">
              <Calendar className="w-5 h-5 text-pink-500" />
              <span>Cours d'aujourd'hui</span>
            </h3>
            <button 
              onClick={() => setActiveTab('timetable')}
              className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline flex items-center space-x-1"
            >
              <span>Voir tout</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {todayClasses.length === 0 ? (
            <div className="text-center py-8 text-sm text-pink-600/60 dark:text-pink-300/60">
              Aucun cours prévu aujourd'hui ! Profite pour réviser 🌸
            </div>
          ) : (
            <div className="space-y-3">
              {todayClasses.map(item => (
                <div key={item.id} className={`p-4 rounded-2xl border ${item.color} flex items-center justify-between shadow-xs transition hover:translate-x-1`}>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm">{item.name}</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white/60 dark:bg-black/30">
                        {item.type}
                      </span>
                      {item.unverified && (
                        <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-bold">
                          À vérifier
                        </span>
                      )}
                    </div>
                    <p className="text-xs opacity-80 flex items-center space-x-3">
                      <span>⏰ {item.time}</span>
                      <span>📍 {item.room}</span>
                      {item.teacher && <span>👨‍🏫 {item.teacher}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE PANEL: URGENT TASKS */}
        <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center space-x-2 text-pink-900 dark:text-pink-200">
              <Target className="w-5 h-5 text-purple-500" />
              <span>Tâches Urgentes</span>
            </h3>
            <button 
              onClick={() => setActiveTab('planner')}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
            >
              Planner
            </button>
          </div>

          {urgentTasks.length === 0 ? (
            <p className="text-center py-6 text-xs text-pink-600/60 dark:text-pink-300/60">
              Toutes les tâches urgentes sont accomplies ! ✨
            </p>
          ) : (
            <div className="space-y-2.5">
              {urgentTasks.map(task => (
                <div key={task.id} className="p-3 rounded-xl bg-pink-50/60 dark:bg-purple-950/30 border border-pink-100 dark:border-purple-900/40 flex items-start space-x-3">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-semibold text-pink-950 dark:text-pink-100 line-clamp-1">{task.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-pink-700/70 dark:text-pink-300/70">
                      <span>{task.subjectName}</span>
                      <span>📅 {task.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className={`p-4 rounded-3xl border border-pink-100 dark:border-purple-900/40 ${bg} flex items-center space-x-3 shadow-xs`}>
      <div className={`p-3 rounded-2xl bg-white dark:bg-purple-900/50 shadow-sm ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-pink-800/70 dark:text-pink-300/70">{label}</p>
        <p className="text-lg font-bold text-pink-950 dark:text-pink-100">{value}</p>
      </div>
    </div>
  );
}

// ==========================================
// 2. EMPLOI DU TEMPS (TIMETABLE VIEW)
// ==========================================
function TimetableView({ timetable, setTimetable }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const days = [
    { id: 1, name: 'Lundi' },
    { id: 2, name: 'Mardi' },
    { id: 3, name: 'Mercredi' },
    { id: 4, name: 'Jeudi' },
    { id: 5, name: 'Vendredi' }
  ];

  const toggleComplete = (id) => {
    setTimetable(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteSession = (id) => {
    setTimetable(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-pink-500" />
            <span>Emploi du temps S1 (SEC 2 / GR 4)</span>
          </h2>
          <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
            Horaires officiels de cours, TD et TP personnalisés.
          </p>
        </div>

        <button
          onClick={() => { setEditingItem(null); setShowAddModal(true); }}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-md hover:scale-105 transition flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une séance</span>
        </button>
      </div>

      {/* DAY SWITCH TABS */}
      <div className="flex border-b border-pink-200 dark:border-purple-900/50 space-x-2 overflow-x-auto pb-1">
        {days.map(day => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`px-4 py-2 rounded-2xl font-semibold text-xs transition ${
              selectedDay === day.id
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-pink-900/70 dark:text-pink-200/70 hover:bg-pink-100/50 dark:hover:bg-purple-900/30'
            }`}
          >
            {day.name}
          </button>
        ))}
      </div>

      {/* DAY SCHEDULE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timetable
          .filter(t => t.day === selectedDay)
          .map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-3xl border ${item.color} shadow-sm space-y-3 relative group transition ${
                item.completed ? 'opacity-50 grayscale hover:grayscale-0' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base">{item.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-white/70 dark:bg-black/30">
                      {item.type}
                    </span>
                  </div>
                  {item.unverified && (
                    <span className="inline-block text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded font-bold mt-1">
                      ⚠️ Informations à vérifier
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    title="Marquer comme terminé"
                    className={`p-1.5 rounded-xl border ${
                      item.completed ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/80 dark:bg-black/40 border-pink-200'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { setEditingItem(item); setShowAddModal(true); }}
                    className="p-1.5 rounded-xl bg-white/80 dark:bg-black/40 border border-pink-200 text-pink-700 hover:text-pink-900"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteSession(item.id)}
                    className="p-1.5 rounded-xl bg-white/80 dark:bg-black/40 border border-pink-200 text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-xs space-y-1 opacity-90 border-t border-black/5 dark:border-white/10 pt-2 font-medium">
                <p>⏰ Horaires: <span className="font-bold">{item.time}</span></p>
                <p>📍 Salle: <span className="font-bold">{item.room}</span></p>
                <p>👨‍🏫 Enseignant: <span className="font-bold">{item.teacher || 'Non spécifié'}</span></p>
              </div>
            </div>
          ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {showAddModal && (
        <TimetableModal
          initial={editingItem}
          day={selectedDay}
          onClose={() => setShowAddModal(false)}
          onSave={(data) => {
            if (editingItem) {
              setTimetable(prev => prev.map(t => t.id === editingItem.id ? { ...t, ...data } : t));
            } else {
              setTimetable(prev => [...prev, { ...data, id: Date.now().toString(), day: selectedDay, completed: false, color: 'bg-pink-100 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800 text-pink-900 dark:text-pink-200' }]);
            }
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

function TimetableModal({ initial, day, onClose, onSave }) {
  const [name, setName] = useState(initial?.name || 'Algorithmique & C');
  const [type, setType] = useState(initial?.type || 'Cours');
  const [time, setTime] = useState(initial?.time || '08h30 - 10h30');
  const [room, setRoom] = useState(initial?.room || 'Amphi A');
  const [teacher, setTeacher] = useState(initial?.teacher || '');
  const [unverified, setUnverified] = useState(initial?.unverified || false);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#251B30] rounded-3xl border border-pink-200 dark:border-purple-800 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
        <h3 className="font-bold text-lg text-pink-950 dark:text-pink-100">
          {initial ? 'Modifier la séance' : 'Ajouter une séance'}
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold block mb-1">Matière</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/30 focus:outline-pink-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/30"
              >
                <option value="Cours">Cours</option>
                <option value="TD">TD</option>
                <option value="TP">TP</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Horaire</label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold block mb-1">Salle</label>
              <input
                type="text"
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/30"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1">Professeur</label>
              <input
                type="text"
                value={teacher}
                onChange={e => setTeacher(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/30"
              />
            </div>
          </div>

          <label className="flex items-center space-x-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={unverified}
              onChange={e => setUnverified(e.target.checked)}
              className="rounded text-pink-500"
            />
            <span className="font-medium">Marquer comme information à vérifier</span>
          </label>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-pink-200 text-xs font-semibold hover:bg-pink-50 dark:hover:bg-purple-950/40"
          >
            Annuler
          </button>
          <button
            onClick={() => onSave({ name, type, time, room, teacher, unverified })}
            className="px-4 py-2 rounded-xl bg-pink-500 text-white font-bold text-xs shadow-md hover:bg-pink-600"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. STUDY PLANNER VIEW
// ==========================================
function PlannerView({ tasks, setTasks, subjects }) {
  const [filter, setFilter] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(subjects[0]?.name || '');
  const [newPriority, setNewPriority] = useState('High');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTitle,
      subjectName: newSubject,
      priority: newPriority,
      date: newDate,
      status: 'pending'
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
          <CheckCircle2 className="w-6 h-6 text-purple-500" />
          <span>Study Planner & Gestion des Devoirs</span>
        </h2>
        <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
          Organise tes objectifs de révision quotidiens et tes livrables.
        </p>
      </div>

      {/* ADD TASK FORM */}
      <form onSubmit={addTask} className="bg-pink-50/60 dark:bg-purple-950/40 border border-pink-200 dark:border-purple-800/60 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Intitulé de la tâche ou révision..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-pink-200 dark:border-purple-800 bg-white dark:bg-[#17121F] text-xs focus:outline-pink-400"
          />
          <select
            value={newSubject}
            onChange={e => setNewSubject(e.target.value)}
            className="px-3 py-2.5 rounded-2xl border border-pink-200 dark:border-purple-800 bg-white dark:bg-[#17121F] text-xs"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center space-x-3 text-xs w-full sm:w-auto">
            <input
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-white dark:bg-[#17121F]"
            />
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value)}
              className="px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-white dark:bg-[#17121F]"
            >
              <option value="Urgent">🔥 Urgent</option>
              <option value="High">⭐ Élevée</option>
              <option value="Medium">🌸 Moyenne</option>
              <option value="Low">🌱 Basse</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-md hover:scale-105 transition"
          >
            Ajouter la tâche
          </button>
        </div>
      </form>

      {/* FILTER TABS */}
      <div className="flex space-x-2 border-b border-pink-200 dark:border-purple-900/50 pb-2">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`capitalize text-xs font-semibold px-4 py-1.5 rounded-xl transition ${
              filter === f 
                ? 'bg-purple-500 text-white shadow-xs' 
                : 'text-pink-900/70 dark:text-pink-200/70 hover:bg-pink-100/40'
            }`}
          >
            {f === 'all' ? 'Toutes' : f === 'pending' ? 'En cours' : 'Terminées'}
          </button>
        ))}
      </div>

      {/* TASK LIST */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 text-xs text-pink-600/60 dark:text-pink-300/60">
            Aucune tâche trouvée pour ce filtre 🌸
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl bg-white/80 dark:bg-[#251B30]/90 border border-pink-100 dark:border-purple-900/40 flex items-center justify-between shadow-xs transition hover:translate-x-0.5 ${
                task.status === 'completed' ? 'opacity-60 line-through' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                    task.status === 'completed' 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-pink-300 dark:border-purple-700 hover:border-pink-500'
                  }`}
                >
                  {task.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                </button>

                <div>
                  <h4 className="font-bold text-sm text-pink-950 dark:text-pink-100">{task.title}</h4>
                  <div className="flex items-center space-x-2 text-[10px] text-pink-700/70 dark:text-pink-300/70 mt-0.5">
                    <span className="font-semibold bg-pink-100 dark:bg-purple-900/50 px-2 py-0.5 rounded-md">
                      {task.subjectName}
                    </span>
                    <span>📅 {task.date}</span>
                    <span className={`px-1.5 py-0.5 rounded font-bold ${
                      task.priority === 'Urgent' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-pink-400 hover:text-rose-500 p-1.5 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. MES MATIÈRES (SUBJECTS HUB)
// ==========================================
function SubjectsView({ subjects, setSubjects }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || 'algo');
  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  const toggleChapter = (subjectId, chapterId) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      const updatedChapters = s.chapters.map(c => c.id === chapterId ? { ...c, done: !c.done } : c);
      const doneCount = updatedChapters.filter(c => c.done).length;
      const progress = Math.round((doneCount / updatedChapters.length) * 100);
      return { ...s, chapters: updatedChapters, progress };
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-pink-500" />
          <span>Mes Matières S1 GI</span>
        </h2>
        <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
          Suivi des cours, récapitulatifs, formules clés et avancement par module.
        </p>
      </div>

      {/* HORIZONTAL SUBJECT SELECTOR */}
      <div className="flex border-b border-pink-200 dark:border-purple-900/50 space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {subjects.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSubjectId(s.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition shrink-0 flex items-center space-x-2 ${
              selectedSubjectId === s.id
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-sm'
                : 'bg-pink-50/50 dark:bg-purple-950/20 text-pink-900/80 dark:text-pink-200/80 hover:bg-pink-100/60'
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      {/* ACTIVE SUBJECT DETAIL CONTAINER */}
      <div className="space-y-6">
        
        {/* HEADER & PROGRESS BAR */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-pink-100/70 to-purple-100/70 dark:from-pink-950/40 dark:to-purple-950/40 border border-pink-200 dark:border-purple-900/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-pink-500 text-white">
                {activeSubject.code}
              </span>
              <h3 className="text-lg font-bold text-pink-950 dark:text-pink-100 mt-1">
                {activeSubject.name}
              </h3>
            </div>
            <span className="text-2xl font-black text-pink-600 dark:text-pink-300">
              {activeSubject.progress}%
            </span>
          </div>

          <div className="w-full h-3 bg-white/60 dark:bg-black/30 rounded-full overflow-hidden p-0.5 border border-pink-200/50">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${activeSubject.progress}%` }}
            />
          </div>
        </div>

        {/* TWO COLUMN GRID FOR CHAPTERS AND FORMULAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* CHAPTER CHECKLIST */}
          <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-pink-950 dark:text-pink-100 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Chapitres & Progression</span>
            </h4>

            <div className="space-y-2">
              {activeSubject.chapters.map(chap => (
                <button
                  key={chap.id}
                  onClick={() => toggleChapter(activeSubject.id, chap.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between text-xs font-medium ${
                    chap.done
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 text-emerald-900 dark:text-emerald-300'
                      : 'bg-pink-50/30 dark:bg-purple-950/20 border-pink-100 dark:border-purple-900/30 text-pink-950 dark:text-pink-100 hover:bg-pink-50'
                  }`}
                >
                  <span>{chap.title}</span>
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                    chap.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-pink-300 dark:border-purple-700'
                  }`}>
                    {chap.done && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* FORMULAS & SUMMARY */}
          <div className="space-y-4">
            
            {/* SUMMARY */}
            <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-2">
              <h4 className="font-bold text-sm text-pink-950 dark:text-pink-100 flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-pink-500" />
                <span>Résumé du cours</span>
              </h4>
              <p className="text-xs text-pink-900/80 dark:text-pink-200/80 leading-relaxed">
                {activeSubject.summary}
              </p>
            </div>

            {/* KEY FORMULAS / CODE SNIPPETS */}
            <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-2">
              <h4 className="font-bold text-sm text-pink-950 dark:text-pink-100 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Formules & Syntaxe Clés</span>
              </h4>
              <div className="space-y-1.5">
                {activeSubject.formulas.map((form, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200/50 dark:border-purple-800 font-mono text-xs text-purple-900 dark:text-purple-200">
                    {form}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

// ==========================================
// 5. NOTES & SUMMARIES VIEW
// ==========================================
function NotesView({ notes, setNotes, subjects }) {
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState(notes[0] || null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(subjects[0]?.name || '');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.subject.toLowerCase().includes(search.toLowerCase())
  );

  const saveNote = () => {
    if (!title.trim()) return;
    if (selectedNote && isEditing) {
      setNotes(prev => prev.map(n => n.id === selectedNote.id ? { ...n, title, subject, content, date: 'Aujourd\'hui' } : n));
    } else {
      const newN = { id: Date.now().toString(), title, subject, content, date: 'Aujourd\'hui' };
      setNotes(prev => [newN, ...prev]);
      setSelectedNote(newN);
    }
    setIsEditing(false);
  };

  const createNewNote = () => {
    setTitle('Nouvelle Note');
    setSubject(subjects[0]?.name || '');
    setContent('');
    setSelectedNote(null);
    setIsEditing(true);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    setSelectedNote(notes[0] || null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
            <FileText className="w-6 h-6 text-pink-500" />
            <span>Cahier de Notes & Fiches de Révision</span>
          </h2>
          <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
            Rédige tes résumés personnels et fiches synthétiques.
          </p>
        </div>

        <button
          onClick={createNewNote}
          className="bg-pink-500 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-md hover:scale-105 transition flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: NOTES LIST */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-pink-400" />
            <input
              type="text"
              placeholder="Rechercher une note..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-2xl border border-pink-200 dark:border-purple-800 bg-white/80 dark:bg-[#251B30]/80 text-xs"
            />
          </div>

          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
            {filteredNotes.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  setSelectedNote(n);
                  setTitle(n.title);
                  setSubject(n.subject);
                  setContent(n.content);
                  setIsEditing(false);
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  selectedNote?.id === n.id
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white border-transparent shadow-sm'
                    : 'bg-white/80 dark:bg-[#251B30]/80 border-pink-100 dark:border-purple-900/40 text-pink-950 dark:text-pink-100 hover:bg-pink-50'
                }`}
              >
                <h4 className="font-bold text-xs">{n.title}</h4>
                <div className="flex items-center justify-between text-[10px] opacity-80 mt-1">
                  <span>{n.subject}</span>
                  <span>{n.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: NOTE EDITOR / VIEW */}
        <div className="md:col-span-2 bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-4">
          {isEditing || !selectedNote ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Titre de la note"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-base font-bold px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/30"
              />
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/30"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
              <textarea
                rows={10}
                placeholder="Contenu de la note (supporte le Markdown basique)..."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full text-xs font-mono p-3 rounded-xl border border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/30 leading-relaxed"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  onClick={saveNote}
                  className="px-4 py-2 rounded-xl bg-pink-500 text-white font-bold text-xs shadow-md"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-pink-100 dark:border-purple-900/40 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-pink-950 dark:text-pink-100">{selectedNote.title}</h3>
                  <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">{selectedNote.subject} • {selectedNote.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setTitle(selectedNote.title);
                      setSubject(selectedNote.subject);
                      setContent(selectedNote.content);
                      setIsEditing(true);
                    }}
                    className="p-2 rounded-xl bg-pink-100 dark:bg-purple-950 text-pink-700 dark:text-pink-300 text-xs font-semibold hover:scale-105 transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(selectedNote.id)}
                    className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:scale-105 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-pink-900/90 dark:text-pink-100/90 bg-pink-50/30 dark:bg-purple-950/20 p-4 rounded-2xl border border-pink-100 dark:border-purple-900/30">
                {selectedNote.content}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 6. POMODORO TIMER VIEW
// ==========================================
function PomodoroView({ pomoStats, setPomoStats }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const [soundEnabled, setSoundEnabled] = useState(true);

  const modeTimes = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        setPomoStats(prev => ({
          ...prev,
          completedToday: prev.completedToday + 1,
          totalHours: +(prev.totalHours + 0.42).toFixed(1)
        }));
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (m) => {
    setMode(m);
    setTimeLeft(modeTimes[m]);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const totalDuration = modeTimes[mode];
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="space-y-6 flex flex-col items-center justify-center text-center max-w-xl mx-auto py-4">
      <div>
        <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center justify-center space-x-2">
          <Clock className="w-6 h-6 text-pink-500" />
          <span>Chronomètre Pomodoro</span>
        </h2>
        <p className="text-xs text-pink-700/70 dark:text-pink-300/70 mt-1">
          25 minutes de concentration intense, suivies de courtes pauses.
        </p>
      </div>

      {/* MODE SWITCH BUTTONS */}
      <div className="flex bg-pink-100/60 dark:bg-purple-950/50 p-1.5 rounded-2xl border border-pink-200 dark:border-purple-800 space-x-1">
        <button
          onClick={() => switchMode('focus')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            mode === 'focus' ? 'bg-pink-500 text-white shadow-sm' : 'text-pink-900/70 dark:text-pink-200/70'
          }`}
        >
          Focus (25 min)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            mode === 'shortBreak' ? 'bg-purple-500 text-white shadow-sm' : 'text-pink-900/70 dark:text-pink-200/70'
          }`}
        >
          Pause (5 min)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            mode === 'longBreak' ? 'bg-indigo-500 text-white shadow-sm' : 'text-pink-900/70 dark:text-pink-200/70'
          }`}
        >
          Longue Pause (15 min)
        </button>
      </div>

      {/* CIRCULAR ANIMATED PROGRESS TIMER */}
      <div className="relative w-64 h-64 flex items-center justify-center my-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke="currentColor"
            strokeWidth="12"
            className="text-pink-100 dark:text-purple-950"
            fill="transparent"
          />
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke="url(#pomoGlow)"
            strokeWidth="12"
            strokeDasharray={2 * Math.PI * 110}
            strokeDashoffset={2 * Math.PI * 110 * (1 - progressPercent / 100)}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="pomoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-black font-mono tracking-tight bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {formattedTime}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-300 mt-1">
            {mode === 'focus' ? 'Concentration 🧠' : 'Relaxation 🌸'}
          </span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
        </button>

        <button
          onClick={() => { setIsRunning(false); setTimeLeft(modeTimes[mode]); }}
          className="p-3 rounded-2xl bg-pink-100 dark:bg-purple-950 text-pink-700 dark:text-pink-300 hover:scale-105 transition border border-pink-200 dark:border-purple-800"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-3 rounded-2xl bg-pink-100 dark:bg-purple-950 text-pink-700 dark:text-pink-300 hover:scale-105 transition border border-pink-200 dark:border-purple-800"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* STATS FOOTER */}
      <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-pink-100 dark:border-purple-900/40">
        <div className="p-3 rounded-2xl bg-pink-50/50 dark:bg-purple-950/30 border border-pink-100 dark:border-purple-900/30">
          <p className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold">Sessions du jour</p>
          <p className="text-lg font-bold text-pink-950 dark:text-pink-100">{pomoStats.completedToday}</p>
        </div>
        <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30">
          <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">Temps d'étude cumulé</p>
          <p className="text-lg font-bold text-pink-950 dark:text-pink-100">{pomoStats.totalHours}h</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. QUIZ & EXERCICES VIEW
// ==========================================
function QuizView({ history, setHistory }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (showResult) return;
    setSelectedOpt(idx);
    setShowResult(true);

    if (idx === currentQ.correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
      const newScoreLog = {
        date: new Date().toISOString().split('T')[0],
        score: score + (selectedOpt === currentQ.correct ? 1 : 0),
        total: QUIZ_QUESTIONS.length,
        subject: 'Révision Générale S1'
      };
      setHistory(prev => [newScoreLog, ...prev]);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
          <HelpCircle className="w-6 h-6 text-purple-500" />
          <span>Quiz & Auto-Évaluation S1</span>
        </h2>
        <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
          Teste tes connaissances en C, Linux, SQL, Algèbre et Architecture.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-6 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-5">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between text-xs font-semibold text-pink-600 dark:text-pink-400">
            <span className="bg-pink-100 dark:bg-purple-950 px-3 py-1 rounded-full">{currentQ.subject}</span>
            <span>Question {currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
          </div>

          {/* QUESTION TEXT */}
          <h3 className="text-base font-bold text-pink-950 dark:text-pink-100 leading-snug">
            {currentQ.question}
          </h3>

          {/* OPTIONS LIST */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, i) => {
              let btnClass = "border-pink-200 dark:border-purple-800 bg-pink-50/30 dark:bg-purple-950/20 text-pink-950 dark:text-pink-100";
              if (showResult) {
                if (i === currentQ.correct) {
                  btnClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                } else if (i === selectedOpt) {
                  btnClass = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs transition flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {showResult && i === currentQ.correct && <Check className="w-4 h-4 text-emerald-500" />}
                </button>
              );
            })}
          </div>

          {/* EXPLANATION */}
          {showResult && (
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 space-y-1 animate-in fade-in">
              <span className="font-bold block">💡 Explication :</span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* NEXT BUTTON */}
          {showResult && (
            <div className="flex justify-end pt-2">
              <button
                onClick={nextQuestion}
                className="bg-pink-500 text-white font-bold text-xs px-6 py-2.5 rounded-2xl shadow-md hover:bg-pink-600 transition flex items-center space-x-1.5"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Question suivante' : 'Voir les résultats'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* SCORE FINAL DISPLAY */
        <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-8 border border-pink-100 dark:border-purple-900/40 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 text-white flex items-center justify-center mx-auto text-3xl shadow-lg">
            🏆
          </div>
          <h3 className="text-xl font-bold text-pink-950 dark:text-pink-100">Quiz Terminé !</h3>
          <p className="text-sm text-pink-700/80 dark:text-pink-300/80">
            Ton score est de <span className="font-black text-pink-600 dark:text-pink-400 text-lg">{score} / {QUIZ_QUESTIONS.length}</span>
          </p>

          <button
            onClick={resetQuiz}
            className="bg-pink-500 text-white font-bold text-xs px-6 py-2.5 rounded-2xl shadow-md hover:scale-105 transition"
          >
            Recommencer le Quiz
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. EXAM PREPARATION VIEW
// ==========================================
function ExamPrepView({ subjects, tasks }) {
  // Demo target exam date
  const examDate = new Date('2027-01-15T09:00:00');
  const now = new Date();
  const diffDays = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
          <Award className="w-6 h-6 text-pink-500" />
          <span>Préparation aux Examens S1</span>
        </h2>
        <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
          Compte à rebours, maîtrise des chapitres et planning intensif.
        </p>
      </div>

      {/* COUNTDOWN BANNER */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
            Session Principale S1 🎓
          </span>
          <h3 className="text-2xl font-black pt-1">Début des examens dans :</h3>
        </div>

        <div className="flex items-center space-x-3 text-center">
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
            <span className="text-2xl font-black">{diffDays}</span>
            <span className="block text-[10px] uppercase font-bold">Jours</span>
          </div>
        </div>
      </div>

      {/* SUBJECT MASTERY PROGRESS */}
      <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-pink-950 dark:text-pink-100">
          Niveau de Maîtrise par Matière
        </h3>

        <div className="space-y-3">
          {subjects.map(s => (
            <div key={s.id} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>{s.name}</span>
                <span className="text-pink-600 dark:text-pink-400">{s.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-pink-100 dark:bg-purple-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${s.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. STATISTIQUES (ANALYTICS VIEW)
// ==========================================
function StatsView({ subjects, tasks, pomoStats, quizHistory }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-purple-500" />
          <span>Statistiques & Analyse d'Étude</span>
        </h2>
        <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
          Visualisation de tes performances et de ton assiduité.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CHART 1: REVISION PROGRESS PER SUBJECT */}
        <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Progression par Module (%)</h3>
          <div className="space-y-3">
            {subjects.map(s => (
              <div key={s.id} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{s.name}</span>
                  <span className="font-bold">{s.progress}%</span>
                </div>
                <div className="w-full h-3 bg-pink-100 dark:bg-purple-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 2: QUIZ HISTORICAL SCORES */}
        <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-5 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Historique des Quiz</h3>
          <div className="space-y-2">
            {quizHistory.length === 0 ? (
              <p className="text-xs text-pink-600/60 dark:text-pink-300/60">Aucun historique de quiz enregistré.</p>
            ) : (
              quizHistory.map((q, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-pink-50/50 dark:bg-purple-950/30 border border-pink-100 dark:border-purple-900/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block">{q.subject}</span>
                    <span className="text-[10px] text-pink-600 dark:text-pink-400">{q.date}</span>
                  </div>
                  <span className="font-black text-pink-600 dark:text-pink-300 text-sm">{q.score} / {q.total}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 10. ASSISTANT D'ÉTUDE INTELLIGENT
// ==========================================
function AssistantView({ subjects, tasks, timetable }) {
  const recommendations = useMemo(() => {
    const list = [];
    const lowestSubject = [...subjects].sort((a, b) => a.progress - b.progress)[0];
    if (lowestSubject) {
      list.push(`⚠️ **Attentions requises sur ${lowestSubject.name}** : Ta progression est à ${lowestSubject.progress}%. Consacre au moins 2 sessions Pomodoro aujourd'hui à cette matière.`);
    }

    const pendingTasks = tasks.filter(t => t.status === 'pending');
    if (pendingTasks.length > 3) {
      list.push(`📌 **Rappel d'organisation** : Tu as ${pendingTasks.length} tâches en attente. Priorise la tâche "${pendingTasks[0]?.title}".`);
    }

    list.push(`💡 **Conseil GI S1** : La programmation C et Linux demandent de la pratique régulière en TP. Pratique au moins 30 minutes de code par jour sur ton terminal.`);

    return list;
  }, [subjects, tasks]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
          <BrainCircuit className="w-6 h-6 text-pink-500" />
          <span>Assistant Smart Oumayma GI 🎀</span>
        </h2>
        <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
          Système local d'analyse et de recommandation de révisions personnalisées.
        </p>
      </div>

      <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-6 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-pink-100 dark:border-purple-900/40 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 text-white flex items-center justify-center text-xl shadow-sm">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Analyse de ton profil d'études</h3>
            <p className="text-[10px] text-pink-600 dark:text-pink-400">Recommandations recalculées en temps réel</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-pink-50/60 dark:bg-purple-950/40 border border-pink-100 dark:border-purple-900/30 text-xs text-pink-950 dark:text-pink-100 leading-relaxed">
              {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 11. SETTINGS & DATA MANAGER
// ==========================================
function SettingsView({ theme, toggleTheme, onResetData, onExportData }) {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center space-x-2">
          <Settings className="w-6 h-6 text-purple-500" />
          <span>Paramètres & Données</span>
        </h2>
        <p className="text-xs text-pink-700/70 dark:text-pink-300/70">
          Personnalisation et sauvegarde locale.
        </p>
      </div>

      <div className="bg-white/80 dark:bg-[#251B30]/80 rounded-3xl p-6 border border-pink-100 dark:border-purple-900/40 shadow-sm space-y-5">
        {/* THEME SELECTOR */}
        <div className="flex items-center justify-between border-b border-pink-100 dark:border-purple-900/40 pb-4">
          <div>
            <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Thème Visuel</h3>
            <p className="text-xs text-pink-700/70 dark:text-pink-300/70">Basculer entre Light Mode et Dark Mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-pink-100 dark:bg-purple-950 text-pink-700 dark:text-pink-300 font-bold text-xs flex items-center space-x-2"
          >
            {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-pink-300" />}
            <span className="capitalize">{theme} Mode</span>
          </button>
        </div>

        {/* DATA EXPORT */}
        <div className="flex items-center justify-between border-b border-pink-100 dark:border-purple-900/40 pb-4">
          <div>
            <h3 className="font-bold text-sm text-pink-950 dark:text-pink-100">Sauvegarder mes données</h3>
            <p className="text-xs text-pink-700/70 dark:text-pink-300/70">Exporter l'ensemble de tes notes et planner en fichier JSON</p>
          </div>
          <button
            onClick={onExportData}
            className="px-4 py-2 rounded-xl bg-purple-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm hover:bg-purple-600 transition"
          >
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>

        {/* RESET DATA */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h3 className="font-bold text-sm text-rose-600 dark:text-rose-400">Réinitialiser l'application</h3>
            <p className="text-xs text-pink-700/70 dark:text-pink-300/70">Effacer tout le stockage local et revenir aux données par défaut</p>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Es-tu sûre de vouloir réinitialiser toutes tes données Oumayma Study Space ?")) {
                onResetData();
              }
            }}
            className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm hover:bg-rose-600 transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>
    </div>
  );
}