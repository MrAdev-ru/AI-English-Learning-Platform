import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Lightbulb,
  FileText,
  Search,
} from "lucide-react";

interface PresentationModeProps {
  onBack: () => void;
  onNavigateToFlashcards: () => void;
}

const slides = [
  {
    title: "Climate Change Overview",
    content:
      "Climate change refers to long-term shifts in global temperatures and weather patterns. While climate change is natural, scientific evidence shows that human activities have been the primary driver since the 1800s.",
    type: "introduction",
  },
  {
    title: "Key Vocabulary",
    content:
      "Essential terms: Carbon footprint, Greenhouse gases, Sustainability, Renewable energy, Global warming, Ecosystem, Biodiversity",
    type: "vocabulary",
  },
  {
    title: "Causes and Effects",
    content:
      "Main causes include burning fossil fuels, deforestation, and industrial processes. Effects include rising sea levels, extreme weather events, and disruption to ecosystems.",
    type: "explanation",
  },
  {
    title: "Practice Your Knowledge",
    content:
      "Now that you've learned about climate change, let's practice these new words with interactive flashcards!",
    type: "practice",
  },
];

export function PresentationMode({
  onBack,
  onNavigateToFlashcards,
}: PresentationModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "introduction":
        return BookOpen;
      case "vocabulary":
        return Lightbulb;
      case "explanation":
        return FileText;
      case "practice":
        return BookOpen;
      default:
        return BookOpen;
    }
  };

  const Icon = getIcon(slides[currentSlide].type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          {/* Smart Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search or generate a topic... (e.g., 'Global warming')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-600"
            />
          </div>
        </motion.div>

        {/* Presentation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 md:p-12 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-2xl mb-6 min-h-[500px] flex flex-col"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-teal-100 dark:from-indigo-900/30 dark:to-teal-900/30 flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>

              {/* Content */}
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-teal-400">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                {slides[currentSlide].content}
              </p>

              {/* Practice Button */}
              {currentSlide === slides.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={onNavigateToFlashcards}
                  className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Start Flashcard Practice
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-gradient-to-r from-indigo-600 to-teal-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
