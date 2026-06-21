import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy, Star, Target, Calendar, Book, TrendingUp, Edit2, X, Bot,
  Coins, Flame, Share2, Copy, Crown, Zap, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface ProfileProps {
  level: string;
  examType: string;
  xp: number;
  ec: number;
  streak: number;
  plan: string;
  onExamChange?: (exam: string) => void;
  onNavigate?: (screen: string) => void;
}

const planLabels: Record<string, { label: string; color: string; icon: typeof Zap }> = {
  free:      { label: "Free",      color: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400", icon: Zap },
  standard:  { label: "Standard",  color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Zap },
  medium:    { label: "Medium",    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", icon: Star },
  pro:       { label: "Pro",       color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", icon: Crown },
  unlimited: { label: "Unlimited", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400", icon: Crown },
};

const REFERRAL_CODE = "EDUPULSE-A3K9";

export function Profile({ level, examType, xp, ec, streak, plan, onExamChange, onNavigate }: ProfileProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(examType || "CEFR");

  useEffect(() => { setSelectedExam(examType || "CEFR"); }, [examType]);

  const handleExamSelect = (exam: string) => {
    setSelectedExam(exam);
    onExamChange?.(exam);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(REFERRAL_CODE).then(() => {
      toast.success("Referal kod nusxalandi! +20 EC topasiz.");
    }).catch(() => toast.error("Nusxalash muvaffaqiyatsiz."));
  };

  const normalizedExam = selectedExam.toUpperCase();
  const planInfo = planLabels[plan] || planLabels.free;
  const PlanIcon = planInfo.icon;

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-gray-900 py-8 px-5 font-sans text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto pb-28">

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-sm border border-gray-100 dark:border-gray-700 mb-6 relative">
          <button onClick={() => setIsSettingsOpen(true)}
            className="absolute top-7 right-7 w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Edit2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden shadow-sm">
              <img src="/logo.png" alt="EduPulse" className="w-16 h-16 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">John Doe</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">john.doe@example.com</p>
              <div className="flex flex-wrap gap-2">
                {normalizedExam === "IELTS" ? (
                  <span className="px-3 py-1 bg-[#f97316] text-white text-xs font-semibold rounded-lg">IELTS</span>
                ) : normalizedExam === "TOEFL" ? (
                  <span className="px-3 py-1 bg-[#0ea5e9] text-white text-xs font-semibold rounded-lg">TOEFL</span>
                ) : (
                  <span className="px-3 py-1 bg-[#00c4b4] text-white text-xs font-semibold rounded-lg">CEFR</span>
                )}
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400 text-xs font-semibold rounded-lg">{level}</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 ${planInfo.color}`}>
                  <PlanIcon className="w-3 h-3" /> {planInfo.label}
                </span>
              </div>
            </div>
          </div>

          {/* XP progress */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-700 dark:text-gray-300">Keyingi darajaga</span>
              <span className="text-[#4285f4]">{xp} / {Math.ceil(xp / 2000) * 2000} XP</span>
            </div>
            <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4285f4] to-[#00c4b4] rounded-full transition-all"
                style={{ width: `${Math.min((xp % 2000) / 2000 * 100, 100)}%` }} />
            </div>
          </div>
        </motion.div>

        {/* AI Coach Banner */}
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onClick={() => onNavigate?.("ai-supporter")}
          className="w-full mb-6 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-bold">AI Coach</h3>
              <p className="text-blue-100 text-xs">Shaxsiy tahlil va maslahat</p>
            </div>
          </div>
          <span className="text-white text-lg">→</span>
        </motion.button>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Umumiy XP", value: xp.toLocaleString(), icon: Trophy,    color: "text-yellow-500" },
            { label: "Faol kunlar", value: "47",               icon: Calendar,  color: "text-blue-500" },
            { label: "Streak",      value: `${streak} kun`,    icon: Flame,     color: "text-orange-500" },
            { label: "So'zlar",     value: "342",              icon: Book,      color: "text-green-500" },
            { label: "Aniqlik",     value: "87%",              icon: TrendingUp, color: "text-indigo-500" },
            { label: "EduCoin",     value: ec,                 icon: Coins,     color: "text-purple-500" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Referral Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Share2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">Referal tizimi</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Do'stingizni taklif qiling – har bir kishi uchun <strong>+20 EC</strong> oling!
          </p>
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-purple-200 dark:border-purple-700">
            <span className="flex-1 font-mono font-bold text-gray-900 dark:text-white tracking-widest text-sm">{REFERRAL_CODE}</span>
            <button onClick={handleCopyReferral}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors">
              <Copy className="w-3.5 h-3.5" /> Nusxa
            </button>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          onClick={() => onNavigate?.("subscription")}
          className="w-full bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 flex items-center justify-between mb-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
              <Crown className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 dark:text-white">Obuna rejasi</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hozirgi: <span className={`font-semibold ${planInfo.color.split(' ')[1]}`}>{planInfo.label}</span>
                {plan === "free" && " · Upgrade qiling"}
              </p>
            </div>
          </div>
          <span className="text-gray-400 dark:text-gray-600">→</span>
        </motion.button>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Yutuqlar</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: "Birinchi qadam", desc: "Birinchi darsni bajardim", done: true },
              { title: "So'z ustasi",    desc: "100 ta so'z yodladim",       done: true },
              { title: "Test chempioni", desc: "5 ta testda 100% oldim",     done: false },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${
                a.done
                  ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30"
                  : "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 opacity-60"
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  a.done ? "bg-yellow-400" : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  <Trophy className={`w-5 h-5 ${a.done ? "text-white" : "text-gray-400"}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{a.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{a.desc}</p>
                </div>
                {a.done && <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sozlamalar</h2>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ism-familiya</label>
                  <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-indigo-500 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-indigo-500 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Imtihon turi</label>
                  <select value={selectedExam} onChange={e => handleExamSelect(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none dark:text-white">
                    <option value="CEFR">CEFR</option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                  </select>
                </div>
                <button onClick={() => { setIsSettingsOpen(false); toast.success("Saqlandi!"); }}
                  className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-bold hover:opacity-90 transition-opacity">
                  Saqlash
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
