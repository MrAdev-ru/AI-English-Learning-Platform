import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Mic,
  Check,
  X,
  Trophy,
} from "lucide-react";
import confetti from "canvas-confetti";

interface FlashcardsProps {
  onBack: () => void;
  onComplete: (earnedXP: number) => void;
}

const vocabularyCards = [
  {
    word: "Sustainable",
    phonetic: "/səˈsteɪnəbl/",
    definition:
      "Able to be maintained at a certain rate or level without depleting natural resources",
    synonyms: ["renewable", "viable", "maintainable"],
    examples: [
      "We need to develop sustainable energy sources.",
      "Sustainable farming practices protect the environment.",
    ],
  },
  {
    word: "Emissions",
    phonetic: "/ɪˈmɪʃənz/",
    definition:
      "The production and discharge of gases or radiation into the atmosphere",
    synonyms: ["discharge", "release", "pollution"],
    examples: [
      "Carbon emissions contribute to global warming.",
      "The factory reduced its emissions by 30%.",
    ],
  },
  {
    word: "Biodiversity",
    phonetic: "/ˌbaɪoʊdaɪˈvɜːrsəti/",
    definition: "The variety of plant and animal life in a particular habitat",
    synonyms: ["variety", "diversity", "ecological diversity"],
    examples: [
      "The rainforest has incredible biodiversity.",
      "We must protect biodiversity for future generations.",
    ],
  },
  {
    word: "Renewable",
    phonetic: "/rɪˈnuːəbl/",
    definition:
      "A source of energy that is not depleted when used, such as wind or solar power",
    synonyms: ["sustainable", "inexhaustible", "regenerative"],
    examples: [
      "Solar panels provide renewable energy.",
      "Renewable resources are better for the environment.",
    ],
  },
  {
    word: "Ecosystem",
    phonetic: "/ˈiːkoʊˌsɪstəm/",
    definition:
      "A biological community of interacting organisms and their physical environment",
    synonyms: ["habitat", "environment", "biome"],
    examples: [
      "Coral reefs are delicate ecosystems.",
      "The forest ecosystem supports many species.",
    ],
  },
];

export function Flashcards({ onBack, onComplete }: FlashcardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pronunciation, setPronunciation] = useState<"correct" | "incorrect" | null>(null);
  const [completed, setCompleted] = useState(false);

  const card = vocabularyCards[currentCard];

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(card.word);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handlePronunciation = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setPronunciation(Math.random() > 0.3 ? "correct" : "incorrect");
      setTimeout(() => setPronunciation(null), 2000);
    }, 2000);
  };

  const nextCard = () => {
    if (currentCard < vocabularyCards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
      setPronunciation(null);
    } else {
      setCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        onComplete(50);
      }, 2000);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
      setPronunciation(null);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-teal-400">
            Great Job!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            You've completed all flashcards
          </p>
          <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold">
            +50 XP Earned
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
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
            Back
          </button>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Vocabulary Practice
            </h1>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentCard + 1} / {vocabularyCards.length}
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentCard + 1) / vocabularyCards.length) * 100}%`,
              }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-teal-600"
            />
          </div>
        </motion.div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-8">
          <motion.div
            className="relative h-[500px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-2xl flex flex-col items-center justify-center"
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <div className="text-center">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-teal-400">
                  {card.word}
                </h2>
                <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
                  {card.phonetic}
                </p>

                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio();
                    }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center text-white hover:shadow-lg transition-shadow"
                  >
                    <Volume2 className="w-8 h-8" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePronunciation();
                    }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white hover:shadow-lg transition-all ${
                      isListening
                        ? "bg-red-500 animate-pulse"
                        : pronunciation === "correct"
                        ? "bg-green-500"
                        : pronunciation === "incorrect"
                        ? "bg-red-500"
                        : "bg-gradient-to-br from-teal-500 to-indigo-500"
                    }`}
                  >
                    {pronunciation === "correct" ? (
                      <Check className="w-8 h-8" />
                    ) : pronunciation === "incorrect" ? (
                      <X className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </motion.button>
                </div>

                <p className="mt-8 text-gray-500 dark:text-gray-400">
                  Click to see definition
                </p>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  Definition
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {card.definition}
                </p>

                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                  Synonyms
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {card.synonyms.map((synonym, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                    >
                      {synonym}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                  Examples
                </h3>
                <ul className="space-y-2 flex-1">
                  {card.examples.map((example, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 flex gap-2"
                    >
                      <span className="text-indigo-600 dark:text-indigo-400">
                        •
                      </span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
                  Click to flip back
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevCard}
            disabled={currentCard === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
          >
            <RotateCw className="w-5 h-5" />
            Flip
          </button>

          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            {currentCard === vocabularyCards.length - 1 ? "Finish" : "Next"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
