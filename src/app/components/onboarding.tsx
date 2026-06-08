import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Book, BookOpen, ChevronRight, ArrowLeft } from "lucide-react";

type SystemType = "CEFR" | "IELTS" | "TOEFL" | null;

const cefrLevels = [
  { code: "A1", name: "Beginner", desc: "Just starting with English" },
  { code: "A2", name: "Elementary", desc: "Basic phrases and expressions" },
  { code: "B1", name: "Intermediate", desc: "Daily conversations" },
  { code: "B2", name: "Upper Intermediate", desc: "Complex discussions" },
  { code: "C1", name: "Advanced", desc: "Fluent and spontaneous" },
  { code: "C2", name: "Mastery", desc: "Native-like proficiency" },
];

const ieltsScores = [
  { code: "4.0-5.0", name: "Limited User", desc: "Basic command in familiar situations" },
  { code: "5.5-6.5", name: "Competent User", desc: "Generally effective command" },
  { code: "7.0-8.0", name: "Good User", desc: "Operational command, occasional inaccuracies" },
  { code: "8.5-9.0", name: "Expert User", desc: "Fully operational and accurate" },
];

const toeflScores = [
  { code: "40-59", name: "Developing", desc: "Building academic communication skills" },
  { code: "60-78", name: "Intermediate", desc: "Ready for structured TOEFL practice" },
  { code: "79-94", name: "High Intermediate", desc: "University-entry score preparation" },
  { code: "95-120", name: "Advanced", desc: "Strong academic English performance" },
];

interface OnboardingProps {
  onLevelSelect: (level: string, exam: Exclude<SystemType, null>) => void;
}

export function Onboarding({ onLevelSelect }: OnboardingProps) {
  const [selectedSystem, setSelectedSystem] = useState<SystemType>(null);

  const renderLevels = (levels: typeof cefrLevels, prefix: string) => (
    <motion.div
      key="levels"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <button 
        onClick={() => setSelectedSystem(null)}
        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-6 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Learning Paths
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <motion.button
            key={level.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onLevelSelect(`${prefix} ${level.code}`, prefix as Exclude<SystemType, null>)}
            className="group relative p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-lg dark:border-gray-700 dark:hover:border-indigo-600 transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {level.code}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">
              {level.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {level.desc}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fbff] dark:bg-gray-900 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <img src="/logo.png" alt="AI English Learning Platform" className="w-20 h-20 object-contain mx-auto mb-5" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a73e8] dark:text-[#669df6]">
            Choose Your Learning Path
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select the exam type or learning approach that fits your goals
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedSystem && (
            <motion.div
              key="systems"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* IELTS Card */}
              <button
                onClick={() => setSelectedSystem("IELTS")}
                className="relative p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-left hover:shadow-xl transition-shadow group focus:outline-none"
              >
                <div className="absolute top-8 right-8">
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#4285f4] transition-colors" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#4285f4] flex items-center justify-center mb-6">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">IELTS</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6">
                  International English Language<br/>Testing System
                </p>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg leading-snug mb-6">
                  Prepare for IELTS Academic and General Training exams
                </h3>
                <ul className="space-y-4">
                  {[
                    "Cambridge IELTS Books 1-18",
                    "IELTS Practice Tests",
                    "Band Score 6.0 - 9.0 preparation",
                    "Speaking, Writing, Reading, Listening"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4285f4] mt-1.5 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </button>

              {/* CEFR Card */}
              <button
                onClick={() => setSelectedSystem("CEFR")}
                className="relative p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-left hover:shadow-xl transition-shadow group focus:outline-none"
              >
                <div className="absolute top-8 right-8">
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#0f9d58] transition-colors" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#0f9d58] flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">CEFR / Multi-Level</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6">
                  Common European Framework of<br/>Reference
                </p>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg leading-snug mb-6">
                  Learn English from beginner to advanced levels
                </h3>
                <ul className="space-y-4">
                  {[
                    "Levels A1, A2, B1, B2, C1, C2",
                    "General English skills",
                    "Daily conversations & vocabulary",
                    "Progressive learning path"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0f9d58] mt-1.5 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </button>

              {/* TOEFL Card */}
              <button
                onClick={() => setSelectedSystem("TOEFL")}
                className="relative p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-left hover:shadow-xl transition-shadow group focus:outline-none"
              >
                <div className="absolute top-8 right-8">
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#d93025] transition-colors" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#d93025] flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">TOEFL</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6">
                  Test of English as a Foreign<br/>Language
                </p>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg leading-snug mb-6">
                  Prepare for TOEFL iBT and ITP exams
                </h3>
                <ul className="space-y-4">
                  {[
                    "TOEFL Practice Tests",
                    "Score 60-120 preparation",
                    "Academic English focus",
                    "Reading, Listening, Speaking, Writing"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d93025] mt-1.5 mr-3 flex-shrink-0 opacity-80" />
                      {item}
                    </li>
                  ))}
                </ul>
              </button>

            </motion.div>
          )}

          {selectedSystem === "CEFR" && renderLevels(cefrLevels, "CEFR")}
          {selectedSystem === "IELTS" && renderLevels(ieltsScores, "IELTS")}
          {selectedSystem === "TOEFL" && renderLevels(toeflScores, "TOEFL")}
        </AnimatePresence>
      </div>
    </div>
  );
}
