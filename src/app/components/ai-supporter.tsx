import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, Key, X, TrendingUp, Star, AlertTriangle, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

interface AiSupporterProps {
  level: string;
  xp: number;
  onBack: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const getSimulatedResponse = (level: string, xp: number, msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("result") || lower.includes("natija") || lower.includes("progress")) {
    return `Based on your profile, you are currently at **${level}** level with **${xp} XP**. Your progress is solid! Focus on Grammar tenses and Vocabulary to advance faster. Keep practicing daily! 💪`;
  }
  if (lower.includes("grammar") || lower.includes("grammatika")) {
    return `Great question! For ${level} level grammar, focus on: \n\n1. **Perfect Tenses** (had done, have done)\n2. **Conditionals** (If I were...)\n3. **Passive Voice**\n\nComplete grammar exercises in Tasks to reinforce these patterns!`;
  }
  if (lower.includes("vocabulary") || lower.includes("lug'at")) {
    return `At your stage (${level}), try to learn **10-15 new words per day**. Use them in context:\n\n• Flashcards\n• Word Matching exercises\n• Reading books in Library\n\nYour current XP of ${xp} shows you're actively learning! 🌟`;
  }
  if (lower.includes("ielts")) {
    return "For IELTS preparation:\n\n• **Reading**: Practice skimming & scanning.\n• **Listening**: Use audio books in Library.\n• **Writing**: Do fill-in-the-gaps exercises.\n• **Speaking**: Repeat sentences aloud.\n\nTarget Band 7.0+ by practicing all 4 skills daily!";
  }
  return `Thanks for your message! I'm your AI English coach. I can help you with:\n\n• Analyzing your progress\n• Grammar tips\n• Vocabulary strategies\n• IELTS/CEFR guidance\n\nWhat would you like to focus on today? 😊`;
};

export function AiSupporter({ level, xp, onBack }: AiSupporterProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm your AI English coach 🤖\n\nYou are currently at **${level}** with **${xp} XP**. Ask me anything about your progress, grammar, vocabulary, or IELTS tips!`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [savedApiKey, setSavedApiKey] = useState("AQ.Ab8RN6Ls7npHYOn-4YyluzW7skrr3o2CsWOG-3UYiVb7F3qWNA");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    if (savedApiKey) {
      // Real Gemini API call
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${savedApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are an AI English teacher. The student is at ${level} CEFR/IELTS level with ${xp} XP. Answer their question helpfully and concisely. Student says: ${userMsg}`
                }]
              }]
            })
          }
        );
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response.";
        setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      } catch {
        toast.error("API xatosi. Tokeningizni tekshiring.");
        setMessages(prev => [...prev, { role: "assistant", content: "API connection error. Please check your Gemini API token." }]);
      }
    } else {
      // Simulated response
      await new Promise(r => setTimeout(r, 1000));
      const reply = getSimulatedResponse(level, xp, userMsg);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resultSummary = [
    { label: "Current Level", value: level, icon: Star, color: "text-blue-500" },
    { label: "Total XP", value: xp.toString(), icon: TrendingUp, color: "text-green-500" },
    { label: "Estimated IELTS", value: xp > 1500 ? "6.5+" : "5.5-6.0", icon: AlertTriangle, color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-gray-900 py-8 px-4 font-sans flex flex-col">
      <div className="max-w-4xl mx-auto w-full pb-24 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-semibold transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">AI English Coach</h2>
              <p className="text-xs text-green-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                {savedApiKey ? "Gemini AI Active" : "Simulation Mode"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <Key className="w-4 h-4" /> API Key
          </button>
        </div>

        {/* Result Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {resultSummary.map((item) => (
            <div key={item.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
              <div className="font-bold text-gray-900 dark:text-white text-lg">{item.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden min-h-[400px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#4285f4] text-white rounded-br-md"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md border border-gray-100 dark:border-gray-600"
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
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100 dark:border-gray-600 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about English..."
              className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-400 text-gray-800 dark:text-gray-200 text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 rounded-2xl bg-[#4285f4] text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20"
            >
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
              className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gemini API Token</h3>
                <button onClick={() => setShowApiKeyModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-blue-500 underline">Google AI Studio</a> dan API tokeningizni oling va pastga kiriting.
              </p>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="Gemini API Token..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none text-sm mb-4"
              />
              <button
                onClick={() => {
                  setSavedApiKey(apiKey);
                  setShowApiKeyModal(false);
                  toast.success(apiKey ? "Gemini AI ulandi! Haqiqiy javoblar faol." : "Token o'chirildi. Simulatsiya rejimiga qaytildi.");
                }}
                className="w-full py-3 rounded-xl bg-[#4285f4] text-white font-bold hover:bg-blue-600 transition-colors"
              >
                Saqlash
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
