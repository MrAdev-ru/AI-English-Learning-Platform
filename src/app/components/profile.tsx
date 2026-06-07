import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Star, Target, Calendar, Book, TrendingUp, Edit2, X, Bot } from "lucide-react";

interface ProfileProps {
  level: string;
  xp: number;
  onNavigate?: (screen: string) => void;
}

export function Profile({ level, xp, onNavigate }: ProfileProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Preferred exam (cefr | ielts | toefl) persisted in localStorage
  const [selectedExam, setSelectedExam] = useState<string>(() => {
    try { return localStorage.getItem("preferredExam") || "cefr"; } catch { return "cefr"; }
  });

  // AI (Gemini) settings persisted in localStorage
  const [aiEnabled, setAiEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem("aiEnabled") === "true"; } catch { return false; }
  });
  const [aiApiKey, setAiApiKey] = useState<string>(() => {
    try { return localStorage.getItem("geminiApiKey") || ""; } catch { return ""; }
  });

  useEffect(() => {
    try {
      localStorage.setItem("preferredExam", selectedExam);
      localStorage.setItem("aiEnabled", String(aiEnabled));
      localStorage.setItem("geminiApiKey", aiApiKey);
    } catch (e) {}
  }, [selectedExam, aiEnabled, aiApiKey]);

  // Helper to call server-side Gemini proxy. Expects an API route /api/gemini to be implemented
  async function callAi(prompt: string) {
    if (!aiEnabled) throw new Error("AI Coach disabled");
    if (!aiApiKey) throw new Error("Missing API key");
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${aiApiKey}`,
      },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) throw new Error("AI request failed");
    return res.json();
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-gray-900 py-10 px-6 font-sans text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto pb-24">

        {/* Top Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 relative"
        >
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="absolute top-8 right-8 w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Edit2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#4285f4] to-[#0ea5e9] flex items-center justify-center text-white text-4xl font-bold">
              J
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-1">John Doe</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-[15px]">john.doe@example.com</p>
              <div className="flex flex-wrap gap-2">
                {/* Dynamic exam badge based on user's selection */}
                {selectedExam === 'ielts' ? (
                  <span className="px-4 py-1.5 bg-[#f97316] text-white text-sm font-semibold rounded-lg">IELTS Student</span>
                ) : selectedExam === 'toefl' ? (
                  <span className="px-4 py-1.5 bg-[#0ea5e9] text-white text-sm font-semibold rounded-lg">TOEFL Student</span>
                ) : (
                  <span className="px-4 py-1.5 bg-[#00c4b4] text-white text-sm font-semibold rounded-lg">CEFR Student</span>
                )}
                <span className="px-4 py-1.5 bg-[#fef08a] text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400 text-sm font-semibold rounded-lg">{level}</span>
                <span className="px-4 py-1.5 bg-[#f3e8ff] text-[#9333ea] dark:bg-purple-500/20 dark:text-purple-400 text-sm font-semibold rounded-lg">Premium</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-700 dark:text-gray-300">Progress to next level</span>
              <span className="text-[#4285f4]">1250 / 2000 XP</span>
            </div>
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex">
              <div className="h-full bg-gradient-to-r from-[#4285f4] to-[#00c4b4]" style={{ width: '62.5%' }} />
            </div>
          </div>
        </motion.div>

        {/* AI Coach Banner */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => onNavigate?.("ai-supporter")}
          className="w-full mb-8 p-5 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">My Result & AI Coach</h3>
              <p className="text-blue-100 text-sm">Get personalized analysis and tips</p>
            </div>
          </div>
          <div className="text-2xl">→</div>
        </motion.button>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Total XP", value: "1250", icon: Trophy, color: "text-[#f59e0b]" },
            { label: "Days Active", value: "47", icon: Calendar, color: "text-[#3b82f6]" },
            { label: "Words Learned", value: "342", icon: Book, color: "text-[#10b981]" },
            { label: "Tests Completed", value: "12", icon: Target, color: "text-[#8b5cf6]" },
            { label: "Accuracy", value: "87%", icon: TrendingUp, color: "text-[#6366f1]" },
            { label: "Streak", value: "7 days", icon: Star, color: "text-[#f97316]" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section (Achievements & Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-[#f59e0b]" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-[#fffbeb] dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f59e0b] flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-[15px]">First Steps</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Complete first lesson</p>
                </div>
                <Star className="w-6 h-6 text-[#f59e0b] fill-current" />
              </div>

              <div className="bg-[#fffbeb] dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f59e0b] flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-[15px]">Vocabulary Master</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Learn 100 words</p>
                </div>
                <Star className="w-6 h-6 text-[#f59e0b] fill-current" />
              </div>

              <div className="bg-[#fffbeb] dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-2xl p-4 flex items-center gap-4 opacity-70">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-[15px]">Test Champion</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Score 100% in 5 tests</p>
                </div>
                <Star className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 flex items-center justify-between border border-gray-100 dark:border-gray-700/50">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[15px] mb-1">Reading Test 5</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
                <div className="font-bold text-[#4285f4]">8/10</div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 flex items-center justify-between border border-gray-100 dark:border-gray-700/50">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[15px] mb-1">Climate Vocabulary</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday</p>
                </div>
                <div className="font-bold text-[#4285f4]">10/10</div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 flex items-center justify-between border border-gray-100 dark:border-gray-700/50">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[15px] mb-1">AI Speaking Session</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
                </div>
                <div className="font-bold text-[#00c4b4]">Good</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Settings Modal (Functional fix) */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none" />
                </div>
                {/* Preferred exam selection for dynamic badge and AI context */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Exam</label>
                  <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none">
                    <option value="cefr">CEFR</option>
                    <option value="ielts">IELTS</option>
                    <option value="toefl">TOEFL</option>
                  </select>
                </div>

                {/* AI (Gemini) settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">AI Coach (Gemini) API Key</label>
                  <input type="password" value={aiApiKey} onChange={e => setAiApiKey(e.target.value)} placeholder="Paste your Gemini API key" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none" />
                  <div className="mt-2 flex items-center gap-3">
                    <input id="aiEnabled" type="checkbox" checked={aiEnabled} onChange={e => setAiEnabled(e.target.checked)} className="w-4 h-4" />
                    <label htmlFor="aiEnabled" className="text-sm text-gray-600">Enable AI Coach (will be used for question prompts)</label>
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full py-4 mt-4 rounded-xl bg-[#4285f4] text-white font-bold hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
