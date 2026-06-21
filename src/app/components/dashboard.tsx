import { motion } from "motion/react";
import {
  BookOpen, Target, Trophy, Zap, TrendingUp, Calendar,
  Book, Sparkles, Flame, Coins, BookMarked, Newspaper,
  GraduationCap, ChevronRight, Star,
} from "lucide-react";

interface DashboardProps {
  level: string;
  xp: number;
  ec: number;
  streak: number;
  examType: string;
  onNavigate: (screen: string) => void;
}

const motivationalQuotes = [
  "Har kuni 10 ta yangi so'z – yiliga 3650 so'z! 🚀",
  "Bugungi harakat – ertangi muvaffaqiyat 💪",
  "Grammatika mashqi – imtihon ballingizni oshiradi ⭐",
];

export function Dashboard({ level, xp, ec, streak, examType, onNavigate }: DashboardProps) {
  const examUpper = examType.toUpperCase();
  const quote = motivationalQuotes[Math.floor(Date.now() / 86400000) % motivationalQuotes.length];

  const quickActions = [
    { id: "skills",     icon: GraduationCap, label: "Skills",    color: "from-blue-500 to-blue-700",     desc: "4 ko'nikma" },
    { id: "flashcards", icon: BookOpen,       label: "So'zlar",   color: "from-purple-500 to-purple-700", desc: "10 so'z/kun" },
    { id: "library",    icon: Book,           label: "Kutubxona", color: "from-green-500 to-green-700",   desc: "Kitoblar" },
    { id: "blog",       icon: Newspaper,      label: "Blog",      color: "from-orange-500 to-red-500",    desc: "Maqolalar" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-5 pb-32">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="EduPulse" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Xush kelibsiz!</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{examUpper} · {level}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Streak */}
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">{streak}</span>
              </div>
              {/* XP */}
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-yellow-700 dark:text-yellow-400 text-sm">{xp}</span>
              </div>
              {/* EC */}
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <Coins className="w-4 h-4 text-purple-500" />
                <span className="font-bold text-purple-700 dark:text-purple-400 text-sm">{ec}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Challenge Banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.01 }}
          className="p-5 rounded-3xl bg-gradient-to-r from-indigo-600 to-teal-600 cursor-pointer mb-6 shadow-lg shadow-indigo-500/20"
          onClick={() => onNavigate("presentation")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Kunlik Daraja</h3>
                <p className="text-white/80 text-sm">10 ta yangi so'z o'rganing</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
              Boshlash <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
            <p className="text-white/90 text-xs font-medium">{quote}</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Flame,     label: "Streak",   value: `${streak} kun`,  color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
            { icon: BookOpen,  label: "Bugun",    value: "10 so'z",         color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-900/20" },
            { icon: Target,    label: "Aniqlik",  value: "87%",             color: "text-teal-500",   bg: "bg-teal-50 dark:bg-teal-900/20" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
              className={`p-4 rounded-2xl ${stat.bg} border border-white/50 dark:border-gray-700/50`}>
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <div className="font-bold text-gray-900 dark:text-white text-lg">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tezkor kirish</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.button key={action.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onNavigate(action.id)}
                  className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-left hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{action.label}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{action.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Leaderboard teaser */}
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          onClick={() => onNavigate("leaderboard")}
          className="w-full p-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white flex items-center justify-between mb-6 hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-bold">Leaderboard</h3>
              <p className="text-white/80 text-xs">Reytingda o'z o'rningizni ko'ring</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* EduCoin banner */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <Coins className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white">EduCoin (EC)</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sizda <span className="font-bold text-purple-600 dark:text-purple-400">{ec} EC</span> bor – Premium chegirmalarda foydalaning</p>
          </div>
          <button onClick={() => onNavigate("subscription")}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors">
            Sarflash
          </button>
        </motion.div>

      </div>
    </div>
  );
}
