import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, Key, X, TrendingUp, Star, AlertTriangle, ChevronLeft, Lock, Zap } from "lucide-react";
import { toast } from "sonner";

interface AiSupporterProps {
  level: string;
  examType: string;
  xp: number;
  plan: string;
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PLAN_LIMITS: Record<string, number> = {
  free: 5,
  standard: 5,
  medium: 15,
  pro: 35,
  unlimited: -1,
};

const PLAN_LABELS: Record<string, string> = {
  free: "Bepul (5/kun)",
  standard: "Standard (5/kun)",
  medium: "Medium (15/kun)",
  pro: "Pro (35/kun)",
  unlimited: "Unlimited (∞)",
};

const OFF_TOPIC_KEYWORDS = [
  "python", "javascript", "code", "kod", "dastur", "programming", "java", "sql", "html", "css",
  "recipe", "food", "ovqat", "taom", "sport", "football", "music", "musiqa", "film",
  "hacking", "hack", "politics", "siyosat", "game", "o'yin",
];

const isOffTopic = (msg: string): boolean => {
  const lower = msg.toLowerCase();
  return OFF_TOPIC_KEYWORDS.some(kw => lower.includes(kw));
};

const OFF_TOPIC_REPLY = `Kechirasiz, men faqat ingliz tili ta'limi, fan va platforma doirasidagi savollarga javob beraman. 📚

Quyidagi mavzularda yordam bera olaman:
• Grammar (grammatika qoidalari)
• Vocabulary (lug'at, so'z yasalishi)
• IELTS / TOEFL / CEFR tayyorgarlik
• Reading, Writing, Speaking, Listening mashqlari
• Sizning progress va ballaringiz tahlili

Boshqa mavzu bo'yicha savol berish imkoni yo'q.`;

const getSimulatedResponse = (level: string, xp: number, examType: string, msg: string): string => {
  const lower = msg.toLowerCase();
  const exam = examType.toUpperCase();

  if (lower.includes("result") || lower.includes("natija") || lower.includes("progress") || lower.includes("ball")) {
    const estimated = xp > 2000 ? (exam === "IELTS" ? "7.0+" : exam === "TOEFL" ? "90+" : "B2+")
      : xp > 1000 ? (exam === "IELTS" ? "6.0-6.5" : exam === "TOEFL" ? "75-85" : "B1-B2")
      : (exam === "IELTS" ? "5.0-5.5" : exam === "TOEFL" ? "60-70" : "A2-B1");
    return `Sizning hozirgi holatiz:\n\n📊 **Daraja:** ${level}\n⭐ **XP:** ${xp}\n🎯 **Taxminiy ${exam} bali:** ${estimated}\n\nMuvaffaqiyat uchun kunlik mashq qilishda davom eting! 💪`;
  }
  if (lower.includes("grammar") || lower.includes("grammatika") || lower.includes("tense") || lower.includes("zamon")) {
    return `${level} darajasi uchun grammatika maslahati:\n\n1. **Perfect Tenses** – Had done / Have done farqi\n2. **Conditionals** – If I were / If I had been\n3. **Passive Voice** – is made / was built\n4. **Articles** – a, an, the ni to'g'ri ishlatish\n\nSkills Practice bo'limida grammatika testlarini bajaring! 📝`;
  }
  if (lower.includes("vocabulary") || lower.includes("lug'at") || lower.includes("word") || lower.includes("so'z")) {
    return `Lug'at kengaytirish bo'yicha maslahat:\n\n• Kuniga **10-15 ta yangi so'z** yodlang\n• So'zlarni kontekstda o'rganing\n• Flashcards'dan muntazam foydalaning\n• Sinonimlari bilan birga yodlang\n\nSizning ${xp} XP ko'rsatkichi yaxshi! 🌟`;
  }
  if (lower.includes("ielts") || lower.includes("toefl") || lower.includes("cefr") || lower.includes("imtihon") || lower.includes("exam")) {
    if (exam === "IELTS") return `IELTS tayyorgarlik bo'yicha maslahat:\n\n📖 **Reading** – Skimming va scanning texnikalarini mashq qiling\n🎧 **Listening** – Kutubxonadagi audiolarni eshiting\n✍️ **Writing** – Task 1 va Task 2 strukturasini o'rganing\n🗣️ **Speaking** – Extended answers bilan javob bering\n\nMaqsad Band 7.0+ bo'lsa, har kuni kamida 2 soat mashq kerak!`;
    if (exam === "TOEFL") return `TOEFL tayyorgarlik:\n\n• Reading: 3-4 akademik matn/kun\n• Listening: Podcast va lecture recording'lar\n• Speaking: 45-60 soniyali javoblar\n• Writing: Integrated va Independent essaylar\n\nMaqsadli ball: 90+ uchun 3 oy intensiv tayyorgarlik kerak!`;
    return `CEFR darajalarini o'rganish:\n\n${level} dan yuqoriga chiqish uchun:\n• Kundalik reading va vocabulary\n• Grammar mashqlari\n• Speaking amaliyoti\n• Listening comprehension\n\nFlashcards va Skills Practice'dan kunlik foydalaning!`;
  }
  if (lower.includes("speaking") || lower.includes("nutq") || lower.includes("gapir")) {
    return `Speaking maslahati:\n\n🗣️ **IELTS Speaking uchun:**\n• Part 1: Kengaytirilgan javoblar bering (2-3 gap)\n• Part 2: 1-2 daqiqa gaping\n• Part 3: Fikringizni asoslang\n\n📌 Foydali iboralar:\n• "In my opinion..."\n• "As far as I'm concerned..."\n• "From my perspective..."\n\nKuniga 10 daqiqa voi talaffuz mashqi qiling! 🎙️`;
  }
  if (lower.includes("writing") || lower.includes("yozish") || lower.includes("essay")) {
    return `Writing maslahati:\n\n✍️ **Esse tuzilishi:**\n1. Introduction (2-3 gap)\n2. Body paragraph 1 (5-7 gap)\n3. Body paragraph 2 (5-7 gap)\n4. Conclusion (2-3 gap)\n\n💡 **Muhim:** Topic sentence, supporting ideas, example\n\nHar body paragrafda transition words ishlating:\n• Furthermore, However, Moreover, In contrast`;
  }
  return `Salom! Men sizning AI ingliz tili murabbiyingizman 🤖\n\nSavol berishingiz mumkin:\n• Grammar va lug'at bo'yicha\n• ${exam} imtihoniga tayyorgarlik\n• O'z progressingiz haqida\n• Speaking, Writing, Reading, Listening\n\nBugun qanday mavzuda yordam kerak? 😊`;
};

export function AiSupporter({ level, examType, xp, plan, onBack, onNavigate }: AiSupporterProps) {
  const dailyLimit = PLAN_LIMITS[plan] ?? 5;
  const todayKey = `ai_queries_${new Date().toDateString()}`;

  const [queriesUsed, setQueriesUsed] = useState<number>(() => {
    try { return parseInt(localStorage.getItem(todayKey) || "0"); } catch { return 0; }
  });

  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: `Salom! Men sizning AI Coach'ingizman 🤖\n\nDarajangiz: **${level}** | XP: **${xp}** | Imtihon: **${examType.toUpperCase()}**\n\nFaqat ingliz tili, fan va o'quv mavzularda yordam bera olaman. Savolingizni yozing! 😊`
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiProvider, setApiProvider] = useState<"openai" | "gemini">("gemini");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [savedApiKey, setSavedApiKey] = useState("");
  const [savedProvider, setSavedProvider] = useState<"openai" | "gemini" | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    try {
      const key = localStorage.getItem("aiApiKey") || "";
      const prov = (localStorage.getItem("aiProvider") as "openai" | "gemini" | null) || null;
      if (key) setSavedApiKey(key);
      if (prov) setSavedProvider(prov);
    } catch {}
  }, []);

  const canSend = dailyLimit === -1 || queriesUsed < dailyLimit;

  const incrementQueries = () => {
    const next = queriesUsed + 1;
    setQueriesUsed(next);
    try { localStorage.setItem(todayKey, String(next)); } catch {}
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!canSend) {
      toast.error("Kunlik so'rov limitiga yetdingiz! Tarifni yangilang.");
      return;
    }

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);
    incrementQueries();

    // Check off-topic
    if (isOffTopic(userMsg)) {
      await new Promise(r => setTimeout(r, 600));
      setMessages(prev => [...prev, { role: "assistant", content: OFF_TOPIC_REPLY }]);
      setIsLoading(false);
      return;
    }

    if (savedApiKey && savedProvider === "gemini") {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${savedApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `You are an AI English language teacher for the EduPulse platform. The student is at ${level} level with ${xp} XP, preparing for ${examType}. Answer ONLY about English learning, science, and the platform's topics. Refuse politely if asked about anything else (coding, food, entertainment, etc). Respond in Uzbek or English based on the user's language. User: ${userMsg}` }]
              }]
            })
          }
        );
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Javob olinmadi.";
        setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      } catch {
        toast.error("Gemini API xatosi.");
        setMessages(prev => [...prev, { role: "assistant", content: "API xatosi yuz berdi. Tokeningizni tekshiring." }]);
      }
    } else if (savedApiKey && savedProvider === "openai") {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${savedApiKey}` },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: `You are an AI English teacher on EduPulse. Student: ${level}, ${xp} XP, exam: ${examType}. Only answer about English learning, science, and the platform. Politely refuse off-topic questions (coding, food, entertainment, etc).` },
              { role: "user", content: userMsg }
            ],
            max_tokens: 500,
          })
        });
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content || "Javob olinmadi.";
        setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      } catch {
        toast.error("OpenAI API xatosi.");
        setMessages(prev => [...prev, { role: "assistant", content: "OpenAI ulanish xatosi." }]);
      }
    } else {
      await new Promise(r => setTimeout(r, 900));
      const reply = getSimulatedResponse(level, xp, examType, userMsg);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const estimatedScore = xp > 2000
    ? (examType.toUpperCase() === "IELTS" ? "7.0+" : examType.toUpperCase() === "TOEFL" ? "90+" : "B2+")
    : xp > 1000 ? (examType.toUpperCase() === "IELTS" ? "6.0-6.5" : examType.toUpperCase() === "TOEFL" ? "75-85" : "B1-B2")
    : (examType.toUpperCase() === "IELTS" ? "5.0-5.5" : examType.toUpperCase() === "TOEFL" ? "60-70" : "A2-B1");

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-gray-900 py-6 px-4 font-sans flex flex-col">
      <div className="max-w-2xl mx-auto w-full pb-24 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-semibold transition-colors">
            <ChevronLeft className="w-4 h-4" /> Orqaga
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">AI English Coach</h2>
              <p className="text-xs text-green-500 font-semibold">
                {savedApiKey ? (savedProvider === "openai" ? "OpenAI Active" : "Gemini AI Active") : "Simulatsiya rejimi"}
              </p>
            </div>
          </div>
          <button onClick={() => setShowApiKeyModal(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <Key className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Daraja", value: level, icon: Star, color: "text-blue-500" },
            { label: "Umumiy XP", value: xp.toString(), icon: TrendingUp, color: "text-green-500" },
            { label: `Taxminiy ${examType.toUpperCase()}`, value: estimatedScore, icon: AlertTriangle, color: "text-yellow-500" },
          ].map(item => (
            <div key={item.label} className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <item.icon className={`w-4 h-4 ${item.color} mx-auto mb-1`} />
              <div className="font-bold text-gray-900 dark:text-white text-sm">{item.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Daily limit indicator */}
        <div className={`mb-4 px-4 py-3 rounded-2xl flex items-center justify-between text-sm ${
          !canSend
            ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        }`}>
          <div className="flex items-center gap-2">
            {!canSend ? <Lock className="w-4 h-4 text-red-500" /> : <Zap className="w-4 h-4 text-blue-500" />}
            <span className={`font-semibold ${!canSend ? "text-red-700 dark:text-red-400" : "text-blue-700 dark:text-blue-400"}`}>
              {dailyLimit === -1
                ? "Cheksiz so'rovlar"
                : !canSend
                  ? "Kunlik limit tugadi!"
                  : `${queriesUsed}/${dailyLimit} so'rov ishlatildi`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-xs">{PLAN_LABELS[plan] || "Free"}</span>
            {!canSend && (
              <button onClick={() => onNavigate?.("subscription")}
                className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors">
                Upgrade
              </button>
            )}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden min-h-[350px]">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#4285f4] text-white rounded-br-sm"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm border border-gray-100 dark:border-gray-600"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-gray-600 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
              disabled={!canSend}
              placeholder={canSend ? "Ingliz tili haqida so'rang..." : "Kunlik limit tugadi..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-400 text-gray-800 dark:text-gray-200 text-sm disabled:opacity-50" />
            <motion.button whileTap={{ scale: 0.95 }} onClick={sendMessage}
              disabled={isLoading || !input.trim() || !canSend}
              className="px-4 py-3 rounded-2xl bg-[#4285f4] text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20">
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      <AnimatePresence>
        {showApiKeyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowApiKeyModal(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">API Token</h3>
                <button onClick={() => setShowApiKeyModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Provayder</label>
                <div className="flex gap-3">
                  {(["openai", "gemini"] as const).map(p => (
                    <label key={p} className={`flex-1 py-2 text-center rounded-xl cursor-pointer font-semibold text-sm transition-colors ${
                      apiProvider === p ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}>
                      <input type="radio" name="provider" value={p} checked={apiProvider === p} onChange={() => setApiProvider(p)} className="hidden" />
                      {p === "openai" ? "OpenAI" : "Gemini"}
                    </label>
                  ))}
                </div>
              </div>
              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
                placeholder={apiProvider === "openai" ? "sk-..." : "AIza..."}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none text-sm mb-5 dark:text-white" />
              <button onClick={() => {
                setSavedApiKey(apiKey); setSavedProvider(apiProvider);
                try { localStorage.setItem("aiApiKey", apiKey); localStorage.setItem("aiProvider", apiProvider); } catch {}
                setShowApiKeyModal(false);
                toast.success(apiKey ? `${apiProvider === "openai" ? "OpenAI" : "Gemini"} ulandi!` : "Simulatsiya rejimine qaytildi.");
              }} className="w-full py-3 rounded-xl bg-[#4285f4] text-white font-bold hover:bg-blue-600 transition-colors">
                Saqlash
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
