import { motion } from "motion/react";
import {
  BookOpen,
  Target,
  Trophy,
  Zap,
  TrendingUp,
  Calendar,
  Book,
  Sparkles,
} from "lucide-react";

interface DashboardProps {
  level: string;
  xp: number;
  onNavigate: (screen: string) => void;
}

const topics = [
  {
    id: 1,
    title: "Basic Grammar Rules",
    progress: 75,
    lessons: 12,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "English Tenses",
    progress: 45,
    lessons: 8,
    icon: Calendar,
  },
  {
    id: 3,
    title: "Sentence Structures",
    progress: 10,
    lessons: 15,
    icon: Zap,
  },
  {
    id: 4,
    title: "Vocabulary & Daily Phrasal Verbs",
    progress: 5,
    lessons: 10,
    icon: Book,
  },
];

export function Dashboard({ level, xp, onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                Welcome back!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Continue your learning journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Level
                </span>
                <div className="font-bold text-indigo-600 dark:text-indigo-400">
                  {level}
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    XP
                  </div>
                  <div className="font-bold text-gray-800 dark:text-gray-100">
                    {xp}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Challenge */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 to-teal-600 cursor-pointer"
            onClick={() => onNavigate("presentation")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Daily Challenge
                  </h3>
                  <p className="text-white/80">
                    Learn 10 new words about Climate Change
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-lg text-white font-semibold hover:bg-white/30 transition-colors">
                Start Now
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-600 dark:text-gray-400">
                This Week
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              7/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Days active
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Vocabulary
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              342
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Words learned
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Accuracy
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              87%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Average score
            </div>
          </motion.div>
        </div>

        {/* Topics */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Continue Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
                onClick={() => onNavigate("presentation")}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-teal-100 dark:from-indigo-900/30 dark:to-teal-900/30 flex items-center justify-center">
                    <topic.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-100">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {topic.lessons} lessons
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-teal-600"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {topic.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
