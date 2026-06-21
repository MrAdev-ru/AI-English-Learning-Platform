import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap, Book, BookOpen, ChevronRight, ArrowLeft,
  HelpCircle, Baby, Target, Trophy, Sparkles, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

type SystemType = "CEFR" | "IELTS" | "TOEFL" | null;
type OnboardingStep = "exam" | "level" | "diagnostic" | "goal";

const cefrLevels = [
  { code: "A1", name: "Beginner",           desc: "Ingliz tilini endigina boshlayotganlar" },
  { code: "A2", name: "Elementary",         desc: "Oddiy gaplar va iboralar" },
  { code: "B1", name: "Intermediate",       desc: "Kundalik suhbatlar" },
  { code: "B2", name: "Upper Intermediate", desc: "Murakkab muhokamalar" },
  { code: "C1", name: "Advanced",           desc: "Ravon va spontan nutq" },
  { code: "C2", name: "Mastery",            desc: "Ona tili darajasida" },
];

const ieltsScores = [
  { code: "4.0-5.0", name: "Limited User",    desc: "Tanish vaziyatlarda asosiy muloqot" },
  { code: "5.5-6.5", name: "Competent User",  desc: "Umumiy samarali muloqot" },
  { code: "7.0-8.0", name: "Good User",       desc: "Professional foydalanish" },
  { code: "8.5-9.0", name: "Expert User",     desc: "To'liq va aniq foydalanish" },
];

const toeflScores = [
  { code: "40-59",   name: "Developing",     desc: "Akademik muloqot ko'nikmalarini rivojlantirish" },
  { code: "60-78",   name: "Intermediate",   desc: "TOEFL mashqlari uchun tayyor" },
  { code: "79-94",   name: "High Intermediate", desc: "Universitet ballini tayyorlash" },
  { code: "95-120",  name: "Advanced",       desc: "Kuchli akademik ingliz tili" },
];

const diagnosticQuestions = [
  {
    q: "Choose the correct sentence:",
    options: [
      "She go to school every day.",
      "She goes to school every day.",
      "She going to school every day.",
      "She goed to school every day.",
    ],
    correct: 1,
  },
  {
    q: "What is the past tense of 'write'?",
    options: ["writed", "writing", "wrote", "written"],
    correct: 2,
  },
  {
    q: "Choose the correct word: 'The weather ___ very hot today.'",
    options: ["are", "is", "be", "am"],
    correct: 1,
  },
  {
    q: "Which sentence is in Present Perfect?",
    options: [
      "I eat breakfast.",
      "I ate breakfast.",
      "I have eaten breakfast.",
      "I was eating breakfast.",
    ],
    correct: 2,
  },
  {
    q: "What does 'sustainable' mean?",
    options: [
      "Very expensive",
      "Easy to break",
      "Able to be maintained long-term",
      "Related to nature only",
    ],
    correct: 2,
  },
];

const ieltsGoals = ["5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];
const cefrGoals  = ["A2", "B1", "B2", "C1", "C2"];
const toeflGoals = ["60", "70", "80", "90", "100", "110", "120"];

const motivationQuotes = [
  "Muvaffaqiyat – bu har kuni birozdan yaxshilanishdir! 🌟",
  "Har bir so'z – kelajagingizga bir qadam! 💪",
  "Bugun qiyinchilik sezayotgan narsa ertaga kuchingiz bo'ladi! 🚀",
  "Maqsadingiz katta – harakat ham katta bo'lsin! 🎯",
];

interface OnboardingProps {
  onLevelSelect: (level: string, exam: "CEFR" | "IELTS" | "TOEFL") => void;
}

export function Onboarding({ onLevelSelect }: OnboardingProps) {
  const [step, setStep] = useState<OnboardingStep>("exam");
  const [selectedSystem, setSelectedSystem] = useState<SystemType>(null);
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showDiagResult, setShowDiagResult] = useState(false);
  const [diagLevel, setDiagLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [pendingLevel, setPendingLevel] = useState("");

  const handleExamSelect = (exam: SystemType) => {
    setSelectedSystem(exam);
    setStep("level");
  };

  const handleLevelChosen = (level: string) => {
    setPendingLevel(level);
    setStep("goal");
  };

  const handleBeginnerSelect = () => {
    if (!selectedSystem) return;
    setPendingLevel(`${selectedSystem} Beginner`);
    setStep("goal");
  };

  const handleDiagnosticStart = () => {
    setStep("diagnostic");
    setDiagnosticStep(0);
    setDiagnosticAnswers([]);
    setSelectedAnswer(null);
    setShowDiagResult(false);
  };

  const handleDiagAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
  };

  const handleDiagNext = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...diagnosticAnswers, selectedAnswer];
    setDiagnosticAnswers(newAnswers);
    if (diagnosticStep + 1 < diagnosticQuestions.length) {
      setDiagnosticStep(diagnosticStep + 1);
      setSelectedAnswer(null);
    } else {
      const correct = newAnswers.filter((a, i) => a === diagnosticQuestions[i].correct).length;
      const score = (correct / diagnosticQuestions.length) * 100;
      let lvl = "";
      if (!selectedSystem || selectedSystem === "CEFR") {
        lvl = score >= 80 ? "CEFR C1" : score >= 60 ? "CEFR B2" : score >= 40 ? "CEFR B1" : score >= 20 ? "CEFR A2" : "CEFR A1";
      } else if (selectedSystem === "IELTS") {
        lvl = score >= 80 ? "IELTS 7.0-8.0" : score >= 60 ? "IELTS 5.5-6.5" : "IELTS 4.0-5.0";
      } else {
        lvl = score >= 80 ? "TOEFL 79-94" : score >= 60 ? "TOEFL 60-78" : "TOEFL 40-59";
      }
      setDiagLevel(lvl);
      setShowDiagResult(true);
    }
  };

  const handleDiagAccept = () => {
    setPendingLevel(diagLevel);
    setStep("goal");
  };

  const handleGoalDone = () => {
    if (!selectedSystem || !pendingLevel) return;
    toast.success(motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]);
    setTimeout(() => onLevelSelect(pendingLevel, selectedSystem), 300);
  };

  const goalsForExam = selectedSystem === "IELTS" ? ieltsGoals : selectedSystem === "TOEFL" ? toeflGoals : cefrGoals;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fbff] dark:bg-gray-900 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">

          {/* Step 1: Exam Selection */}
          {step === "exam" && (
            <motion.div key="exam" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-12">
                <img src="/logo.png" alt="EduPulse" className="w-20 h-20 object-contain mx-auto mb-5" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a73e8] dark:text-[#669df6]">
                  O'rganish yo'lingizni tanlang
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Maqsadingizga mos imtihon turini belgilang
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    key: "IELTS" as SystemType, color: "#4285f4", Icon: Book,
                    title: "IELTS", sub: "International English Language Testing System",
                    desc: "IELTS Academic va General Training imtihonlariga tayyorlaning",
                    items: ["Cambridge IELTS kitoblari 1-18", "Band 6.0-9.0 tayyorgarlik", "Reading, Writing, Listening, Speaking"],
                  },
                  {
                    key: "CEFR" as SystemType, color: "#0f9d58", Icon: GraduationCap,
                    title: "CEFR / Ko'p darajali", sub: "Common European Framework of Reference",
                    desc: "Ingliz tilini boshlang'ichdan yuqori darajagacha o'rganing",
                    items: ["A1, A2, B1, B2, C1, C2 darajalari", "Umumiy ingliz tili ko'nikmalari", "Bosqichma-bosqich o'rganish yo'li"],
                  },
                  {
                    key: "TOEFL" as SystemType, color: "#d93025", Icon: BookOpen,
                    title: "TOEFL", sub: "Test of English as a Foreign Language",
                    desc: "TOEFL iBT va ITP imtihonlariga tayyorlaning",
                    items: ["TOEFL amaliy testlar", "60-120 ball tayyorgarlik", "Reading, Listening, Speaking, Writing"],
                  },
                ].map(({ key, color, Icon, title, sub, desc, items }) => (
                  <button key={key!} onClick={() => handleExamSelect(key)}
                    className="relative p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-left hover:shadow-xl transition-shadow group focus:outline-none">
                    <ChevronRight className="absolute top-8 right-8 w-5 h-5 text-gray-300 group-hover:text-current transition-colors" style={{ color: `${color}80` }} />
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: color }}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6">{sub}</p>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg leading-snug mb-6">{desc}</h3>
                    <ul className="space-y-3">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-600 dark:text-gray-400 text-sm gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Level Selection */}
          {step === "level" && selectedSystem && (
            <motion.div key="level" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep("exam")} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-8 hover:underline">
                <ArrowLeft className="w-5 h-5" /> Orqaga
              </button>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Darajangizni tanlang</h2>
                <p className="text-gray-600 dark:text-gray-400">{selectedSystem} imtihoni uchun</p>
              </div>

              {/* Beginner & I don't know */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  onClick={handleBeginnerSelect}
                  className="p-6 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 text-left hover:border-green-400 hover:shadow-lg transition-all group">
                  <Baby className="w-10 h-10 text-green-600 dark:text-green-400 mb-3" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Beginner</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ingliz tilini 0 dan boshlash</p>
                </motion.button>

                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                  onClick={handleDiagnosticStart}
                  className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-800 text-left hover:border-purple-400 hover:shadow-lg transition-all group">
                  <HelpCircle className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Bilmayman</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mini-test orqali darajani aniqlash</p>
                </motion.button>
              </div>

              <div className="mb-4">
                <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Yoki darajani o'zingiz tanlang</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(selectedSystem === "CEFR" ? cefrLevels : selectedSystem === "IELTS" ? ieltsScores : toeflScores).map((level, index) => (
                  <motion.button key={level.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}
                    onClick={() => handleLevelChosen(`${selectedSystem} ${level.code}`)}
                    className="group relative p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-lg dark:border-gray-700 dark:hover:border-indigo-600 transition-all text-left">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{level.code}</div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h3 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">{level.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{level.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Diagnostic Test */}
          {step === "diagnostic" && (
            <motion.div key="diagnostic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto">
              <button onClick={() => setStep("level")} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-8 hover:underline">
                <ArrowLeft className="w-5 h-5" /> Orqaga
              </button>

              {!showDiagResult ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Darajani aniqlash testi</h2>
                    <p className="text-gray-600 dark:text-gray-400">{diagnosticStep + 1}/{diagnosticQuestions.length} savol</p>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full transition-all"
                        style={{ width: `${((diagnosticStep + 1) / diagnosticQuestions.length) * 100}%` }} />
                    </div>
                  </div>

                  <motion.div key={diagnosticStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      {diagnosticQuestions[diagnosticStep].q}
                    </p>
                    <div className="space-y-3">
                      {diagnosticQuestions[diagnosticStep].options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleDiagAnswer(idx)}
                          className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all ${
                            selectedAnswer === idx
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
                              : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300"
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <button onClick={handleDiagNext} disabled={selectedAnswer === null}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
                    {diagnosticStep + 1 < diagnosticQuestions.length ? "Keyingi →" : "Natijani ko'rish →"}
                  </button>
                </>
              ) : (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Test natijasi</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">AI tahlil asosida sizning darajangiz:</p>
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">{diagLevel}</div>
                  <button onClick={handleDiagAccept}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-bold text-lg hover:opacity-90 transition-opacity">
                    Bu darajadan boshlash →
                  </button>
                  <button onClick={() => setStep("level")} className="mt-3 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    O'zim tanlaman
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 4: Goal Setting */}
          {step === "goal" && (
            <motion.div key="goal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="max-w-lg mx-auto text-center">
              <button onClick={() => setStep("level")} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-8 hover:underline">
                <ArrowLeft className="w-5 h-5" /> Orqaga
              </button>

              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Maqsadingizni belgilang</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Hozirgi darajangiz: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{pendingLevel}</span>
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                Yakuniy maqsad ballingizni tanlang
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {goalsForExam.map(g => (
                  <button key={g} onClick={() => setGoal(g)}
                    className={`py-3 px-4 rounded-2xl font-bold text-lg border-2 transition-all ${
                      goal === g
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300"
                    }`}>
                    {selectedSystem === "IELTS" ? `Band ${g}` : selectedSystem === "TOEFL" ? g : g}
                  </button>
                ))}
              </div>

              <button onClick={handleGoalDone}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/30">
                <Sparkles className="inline w-5 h-5 mr-2" />
                Boshlash!
              </button>

              {!goal && (
                <button onClick={handleGoalDone} className="mt-3 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  Hozircha o'tkazib yuborish
                </button>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
