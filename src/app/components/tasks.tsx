import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Edit3, Shuffle, Book, Play, ChevronLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface TasksProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

type TaskType = "vocabulary" | "fill-gaps" | "matching" | "grammar" | null;

export function Tasks({ onBack, onComplete }: TasksProps) {
  const [selectedTask, setSelectedTask] = useState<TaskType>(null);
  
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [gapAnswer, setGapAnswer] = useState("");
  const [matchingSelected, setMatchingSelected] = useState<number | null>(null);

  const handleSubmit = (xp: number) => {
    toast.success(`Muvaffaqiyatli! +${xp} XP`);
    onComplete(xp);
    setSelectedTask(null);
    setQuizAnswer(null);
    setGapAnswer("");
    setMatchingSelected(null);
  };

  const renderTaskSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vocabulary Quiz */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-pink-200 dark:shadow-none">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Vocabulary Quiz</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Test your knowledge from previous lessons</p>
          </div>
          <div>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4">
              <span>⏱ 10 questions</span>
              <span className="text-yellow-500 flex items-center gap-1"><span className="text-base">🏆</span> +30 XP</span>
            </div>
            <button 
              onClick={() => setSelectedTask("vocabulary")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Play className="w-4 h-4 fill-current" /> Start Practice
            </button>
          </div>
        </div>

        {/* Fill in the Gaps */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-200 dark:shadow-none">
              <Edit3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Fill in the Gaps</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Complete sentences with the correct words</p>
          </div>
          <div>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4">
              <span>⏱ 8 questions</span>
              <span className="text-yellow-500 flex items-center gap-1"><span className="text-base">🏆</span> +25 XP</span>
            </div>
            <button 
              onClick={() => setSelectedTask("fill-gaps")}
              className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> Start Practice
            </button>
          </div>
        </div>

        {/* Word Matching */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#00bda6] flex items-center justify-center mb-4 shadow-lg shadow-teal-200 dark:shadow-none">
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Word Matching</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Match words with their definitions</p>
          </div>
          <div>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4">
              <span>⏱ 12 questions</span>
              <span className="text-yellow-500 flex items-center gap-1"><span className="text-base">🏆</span> +20 XP</span>
            </div>
            <button 
              onClick={() => setSelectedTask("matching")}
              className="w-full py-4 rounded-2xl bg-[#00bda6] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#00a894] transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> Start Practice
            </button>
          </div>
        </div>

        {/* Grammar Quiz */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-200 dark:shadow-none">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Grammar Quiz</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Practice grammar rules and tenses</p>
          </div>
          <div>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4">
              <span>⏱ 10 questions</span>
              <span className="text-yellow-500 flex items-center gap-1"><span className="text-base">🏆</span> +30 XP</span>
            </div>
            <button 
              onClick={() => setSelectedTask("grammar")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Play className="w-4 h-4 fill-current" /> Start Practice
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );

  const renderActiveTask = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
         <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize flex items-center gap-2">
            {selectedTask?.replace('-', ' ')}
         </h2>
         <button onClick={() => setSelectedTask(null)} className="text-sm font-semibold text-gray-400 hover:text-gray-600">Cancel</button>
      </div>
      
      {/* Dynamic Content based on task type */}
      {selectedTask === 'vocabulary' && (
        <>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 font-medium">Which word is a synonym for "Conundrum"?</p>
          <div className="space-y-3 mb-8">
            {["Solution", "Puzzle", "Advantage", "Clarification"].map((opt, idx) => (
              <div key={idx} onClick={() => setQuizAnswer(idx)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${quizAnswer === idx ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300'}`}>
                {opt}
              </div>
            ))}
          </div>
        </>
      )}

      {selectedTask === 'fill-gaps' && (
        <>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-8 font-medium space-x-2">
            <span>The advanced technology significantly</span>
            <input 
              type="text" 
              value={gapAnswer}
              onChange={(e) => setGapAnswer(e.target.value)}
              placeholder="..."
              className="px-3 py-1 bg-gray-100 dark:bg-gray-900 border-b-2 border-blue-500 outline-none w-32 focus:w-40 transition-all font-semibold text-center text-blue-500" 
            />
            <span>the production process.</span>
          </p>
          <div className="flex gap-4 mb-8">
            {["accelerated", "drove", "impact", "shows"].map((word, i) => (
               <span key={i} onClick={() => setGapAnswer(word)} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 shadow-sm cursor-pointer hover:bg-gray-200">{word}</span>
            ))}
          </div>
        </>
      )}

      {selectedTask === 'matching' && (
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 space-y-3">
             <h3 className="font-semibold text-gray-500 uppercase text-xs mb-4">Words</h3>
             {["Mitigate", "Alleviate"].map((word, i) => (
               <div key={i} onClick={() => setMatchingSelected(i)} className={`p-4 border-2 rounded-xl text-center font-bold cursor-pointer ${matchingSelected === i ? 'border-[#00bda6] text-[#00bda6]' : 'border-gray-200 dark:border-gray-700'}`}>
                 {word}
               </div>
             ))}
          </div>
          <div className="flex-1 space-y-3">
             <h3 className="font-semibold text-gray-500 uppercase text-xs mb-4">Definitions</h3>
             {["To make less severe", "To make suffering less severe"].map((def, i) => (
               <div key={i} className="p-4 border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400">
                 {def}
               </div>
             ))}
          </div>
        </div>
      )}

      {selectedTask === 'grammar' && (
        <>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 font-medium">Choose the correct tense: <br/><br/> "I _____ to the store when it started raining."</p>
          <div className="space-y-3 mb-8">
            {["was walking", "walked", "have walked", "am walking"].map((opt, idx) => (
              <div key={idx} onClick={() => setQuizAnswer(idx)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${quizAnswer === idx ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300'}`}>
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
      
      <div className="flex justify-end pt-4">
        <button 
          onClick={() => handleSubmit(selectedTask === 'matching' ? 20 : selectedTask === 'fill-gaps' ? 25 : 30)}
          className="px-8 py-3 font-bold rounded-2xl bg-[#4285f4] text-white hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30"
        >
          Check Answer <CheckCircle className="w-5 h-5"/>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-gray-900 py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto pb-32">
        <div className="mb-10 text-center">
          <button 
            onClick={onBack}
            className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-semibold mb-6 mx-auto transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300 mb-2">
            Practice Tasks
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Reinforce your learning with interactive exercises</p>
        </div>

        <AnimatePresence mode="wait">
          {selectedTask === null ? renderTaskSelection() : renderActiveTask()}
        </AnimatePresence>
      </div>
    </div>
  );
}
