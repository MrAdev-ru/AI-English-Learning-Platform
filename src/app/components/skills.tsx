import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, Headphones, PenLine, Mic2, ArrowLeft, Lock, CheckCircle2,
  Clock, Trophy, ChevronRight, Star, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface SkillsProps {
  examType: string;
  plan: string;
  triesUsed: number;
  onBack: () => void;
  onComplete: (xp: number, ec: number) => void;
  onUseTry: () => void;
  onNavigate: (screen: string) => void;
}

type SkillKey = "reading" | "listening" | "writing" | "speaking";

interface Question {
  text: string;
  options: string[];
  correct: number;
}

const MAX_FREE_TRIES = 3;

const skillsConfig: Record<string, { icon: typeof BookOpen; color: string; bg: string; desc: string; time: string }> = {
  reading:   { icon: BookOpen,   color: "text-blue-600",   bg: "from-blue-500 to-blue-700",   desc: "Matn o'qish va savollarga javob berish",       time: "~15 daqiqa" },
  listening: { icon: Headphones, color: "text-purple-600", bg: "from-purple-500 to-purple-700", desc: "Audio tinglash va savollarni yechish",          time: "~20 daqiqa" },
  writing:   { icon: PenLine,    color: "text-green-600",  bg: "from-green-500 to-green-700",  desc: "Esse va paragraph yozish ko'nikmalari",        time: "~30 daqiqa" },
  speaking:  { icon: Mic2,       color: "text-orange-600", bg: "from-orange-500 to-orange-700", desc: "Og'zaki nutq va talaffuz mashqlari",           time: "~10 daqiqa" },
};

const ieltsSkills: SkillKey[] = ["reading", "listening", "writing", "speaking"];
const cefrSkills: SkillKey[] = ["reading", "listening", "writing", "speaking"];
const toeflSkills: SkillKey[] = ["reading", "listening", "writing", "speaking"];

const readingQuestions: Question[] = [
  {
    text: "What does 'sustainable' mean in the context of energy?",
    options: ["Expensive to produce", "Able to be maintained without depleting resources", "Only solar energy", "Temporary energy source"],
    correct: 1,
  },
  {
    text: "Which word is a synonym for 'biodiversity'?",
    options: ["Uniformity", "Ecological variety", "Single species", "Climate change"],
    correct: 1,
  },
  {
    text: "What is an 'ecosystem'?",
    options: ["A type of weather", "A biological community of organisms and environment", "A government policy", "A renewable energy source"],
    correct: 1,
  },
  {
    text: "Which sentence uses 'emissions' correctly?",
    options: [
      "The emissions was very tasty.",
      "Carbon emissions contribute to global warming.",
      "She had a beautiful emissions.",
      "They emissions the building last year.",
    ],
    correct: 1,
  },
];

const listeningQuestions: Question[] = [
  {
    text: "In the audio, the speaker talks about...",
    options: ["Food recipes", "Environmental protection", "Sports events", "Music history"],
    correct: 1,
  },
  {
    text: "According to the passage, renewable energy is...",
    options: ["Harmful to nature", "Not available globally", "Better for the environment", "More expensive than coal"],
    correct: 2,
  },
  {
    text: "The speaker's main point is...",
    options: ["Technology is bad", "We must protect biodiversity", "Cities are growing too fast", "Education needs reform"],
    correct: 1,
  },
];

const writingQuestions: Question[] = [
  {
    text: "Which is the correct structure for an IELTS Task 2 essay?",
    options: [
      "Introduction only",
      "Introduction, Body paragraphs, Conclusion",
      "Just body paragraphs",
      "Conclusion first, then introduction",
    ],
    correct: 1,
  },
  {
    text: "Which transition word best starts a contrasting sentence?",
    options: ["Furthermore", "However", "Therefore", "Similarly"],
    correct: 1,
  },
  {
    text: "What should a topic sentence do?",
    options: [
      "End the paragraph",
      "Introduce the main idea of the paragraph",
      "Provide examples only",
      "Summarize the whole essay",
    ],
    correct: 1,
  },
];

const speakingQuestions: Question[] = [
  {
    text: "In IELTS Speaking Part 1, how should you answer?",
    options: [
      "One word answers",
      "Extended answers with reasons and examples",
      "Only yes or no",
      "Reading from a script",
    ],
    correct: 1,
  },
  {
    text: "Which phrase best expresses an opinion?",
    options: ["I going to think...", "In my opinion, ...", "Me believe...", "Think I that..."],
    correct: 1,
  },
];

const questionsMap: Record<SkillKey, Question[]> = {
  reading:   readingQuestions,
  listening: listeningQuestions,
  writing:   writingQuestions,
  speaking:  speakingQuestions,
};

export function Skills({ examType, plan, triesUsed, onBack, onComplete, onUseTry, onNavigate }: SkillsProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillKey | null>(null);
  const [step, setStep] = useState<"list" | "quiz" | "result">("list");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const isFree = plan === "free";
  const triesLeft = MAX_FREE_TRIES - triesUsed;
  const canTry = !isFree || triesLeft > 0;

  const examUpper = examType.toUpperCase();
  const skills = examUpper.includes("TOEFL") ? toeflSkills : examUpper.includes("CEFR") ? cefrSkills : ieltsSkills;

  const startSkill = (skill: SkillKey) => {
    if (!canTry) {
      toast.error("Kunlik urinishlar tugadi! Premium obunaga o'ting.");
      return;
    }
    setSelectedSkill(skill);
    setStep("quiz");
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setShowAnswer(false);
    onUseTry();
  };

  const questions = selectedSkill ? questionsMap[selectedSkill] : [];
  const question = questions[currentQ];

  const handleAnswer = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      const correct = newAnswers.filter((a, i) => a === questions[i].correct).length;
      const score = Math.round((correct / questions.length) * 100);
      const earnedXP = score >= 80 ? 50 : score >= 60 ? 30 : 15;
      const earnedEC = score >= 80 ? 10 : score >= 60 ? 5 : 2;
      onComplete(earnedXP, earnedEC);
      setStep("result");
    }
  };

  const correctCount = answers.filter((a, i) => a === questions[i]?.correct).length;

  if (step === "result") {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Test tugadi!</h2>
          <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 my-6">{score}%</div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{correctCount}/{questions.length} to'g'ri javob</p>
          <div className="flex gap-4 justify-center my-6">
            <div className="px-4 py-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 font-bold">
              +{score >= 80 ? 50 : score >= 60 ? 30 : 15} XP
            </div>
            <div className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-bold">
              +{score >= 80 ? 10 : score >= 60 ? 5 : 2} EC
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => { setStep("list"); setSelectedSkill(null); }}
              className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Orqaga
            </button>
            <button onClick={onBack}
              className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
              Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === "quiz" && selectedSkill && question) {
    const cfg = skillsConfig[selectedSkill];
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStep("list")} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Orqaga
          </button>

          <div className="mb-6">
            <div className="flex justify-between text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              <span>{currentQ + 1}/{questions.length} savol</span>
              <span className="capitalize">{selectedSkill}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
            </div>
          </div>

          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{question.text}</p>
            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                let cls = "w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all ";
                if (!showAnswer) {
                  cls += selected === idx
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10";
                } else {
                  if (idx === question.correct) cls += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                  else if (idx === selected) cls += "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400";
                  else cls += "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500 opacity-60";
                }
                return (
                  <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {showAnswer && (
            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-opacity">
              {currentQ + 1 < questions.length ? "Keyingi savol →" : "Natijani ko'rish →"}
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 pb-32">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Skills Practice</h1>
          <p className="text-gray-600 dark:text-gray-400">{examUpper} imtihon simulyatsiyasi</p>
        </div>

        {isFree && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${triesLeft > 0
              ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"}`}>
            {triesLeft > 0 ? (
              <>
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Bepul tarif: {triesLeft} urinish qoldi</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs">Cheksiz foydalanish uchun Premium oling</p>
                </div>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-red-800 dark:text-red-300 text-sm">Kunlik urinishlar tugadi!</p>
                  <p className="text-red-600 dark:text-red-400 text-xs">Ertaga qayta yoki Premium oling</p>
                </div>
                <button onClick={() => onNavigate("subscription")}
                  className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
                  Premium
                </button>
              </>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, idx) => {
            const cfg = skillsConfig[skill];
            const Icon = cfg.icon;
            const locked = !canTry;
            return (
              <motion.button key={skill} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => startSkill(skill)}
                disabled={locked}
                className={`relative p-6 rounded-3xl text-left transition-all ${locked
                  ? "bg-gray-100 dark:bg-gray-800/50 opacity-60 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700"
                }`}>
                {locked && <Lock className="absolute top-5 right-5 w-4 h-4 text-gray-400" />}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cfg.bg} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white capitalize mb-1 text-lg">{skill}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{cfg.desc}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{cfg.time}</span>
                  <span className="mx-1">•</span>
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span>+50 XP</span>
                </div>
                {!locked && (
                  <ChevronRight className="absolute top-1/2 right-5 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-600" />
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white">
          <h3 className="font-bold text-lg mb-1">Barcha ko'nikmalarni mashq qiling</h3>
          <p className="text-white/80 text-sm">Har bir ko'nikmani bajarib, XP va EduCoin to'plang</p>
        </motion.div>
      </div>
    </div>
  );
}
