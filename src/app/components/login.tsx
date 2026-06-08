import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, ArrowLeft, KeyRound } from "lucide-react";
import { toast } from "sonner";

interface LoginProps {
  onLogin: () => void;
}

type AuthMethod = "email" | "telegram" | null;
type AuthStep = "select_method" | "input_details" | "verify_code";

export function Login({ onLogin }: LoginProps) {
  const [method, setMethod] = useState<AuthMethod>(null);
  const [step, setStep] = useState<AuthStep>("select_method");
  const [inputValue, setInputValue] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);

  const handleMethodSelect = (selectedMethod: AuthMethod) => {
    setMethod(selectedMethod);
    setStep("input_details");
    setInputValue("");
  };

  const handleGoogleLogin = () => {
    toast.success("Muvaffaqiyatli tizimga kirdingiz!");
    onLogin();
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast.error("Iltimos, ma'lumotni kiriting.");
      return;
    }
    setStep("verify_code");
    toast.success("Tasdiqlash kodi yuborildi!");
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      toast.error("Iltimos, 4 xonali kodni kiriting.");
      return;
    }
    // Simulation: Any 4 digit code works
    toast.success("Muvaffaqiyatli tasdiqlandi!");
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fbff] dark:bg-gray-900 font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-400/20 dark:bg-teal-600/10 blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 dark:border-gray-700/50 p-8 sm:p-10 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6 border border-gray-100 dark:border-gray-700 overflow-hidden">
            <img src="/logo.png" alt="AI English Learning Platform" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Xush kelibsiz!</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center font-medium">Platformaga kirish uchun usulni tanlang</p>
        </div>

        <AnimatePresence mode="wait">
          {step === "select_method" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Google orqali davom etish
              </button>

              <div className="flex items-center gap-4 my-6">
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
                <span className="text-sm font-semibold text-gray-400">YOKI</span>
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
              </div>

              <button 
                onClick={() => handleMethodSelect("telegram")}
                className="w-full flex items-center justify-center gap-3 bg-[#0088cc] hover:bg-[#0077b5] text-white py-4 rounded-2xl font-bold transition-all shadow-sm shadow-[#0088cc]/30"
              >
                <Send className="w-5 h-5" />
                Telegram orqali kirish
              </button>

              <button 
                onClick={() => handleMethodSelect("email")}
                className="w-full flex items-center justify-center gap-3 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900 py-4 rounded-2xl font-bold transition-all shadow-sm"
              >
                <Mail className="w-5 h-5" />
                Email orqali kirish
              </button>
            </motion.div>
          )}

          {step === "input_details" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <button 
                onClick={() => setStep("select_method")}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-semibold mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Orqaga
              </button>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {method === "telegram" ? "Telegram ma'lumotingiz" : "Email manzilingiz"}
              </h2>

              <form onSubmit={handleSendCode}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {method === "telegram" ? "Telegram raqamingiz yoki username" : "Email"}
                  </label>
                  <input 
                    type={method === "email" ? "email" : "text"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={method === "telegram" ? "+998 90 123 45 67 yoki @username" : "example@mail.com"}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 outline-none focus:border-[#4285f4] dark:focus:border-[#4285f4] transition-colors text-gray-900 dark:text-white font-medium"
                    autoFocus
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#4285f4] text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
                >
                  Kodni olish
                </button>
              </form>
            </motion.div>
          )}

          {step === "verify_code" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <button 
                onClick={() => setStep("input_details")}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-semibold mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Orqaga
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-8 h-8 text-[#4285f4]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Kodni tasdiqlash</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{inputValue}</span> ga yuborilgan 4 xonali kodni kiriting.
                </p>
              </div>

              <div className="flex justify-between gap-3 mb-8">
                {code.map((digit, idx) => (
                  <input 
                    key={idx}
                    id={`code-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                    className="w-14 h-16 text-center text-2xl font-bold rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 outline-none focus:border-[#4285f4] dark:focus:border-[#4285f4] transition-colors text-gray-900 dark:text-white"
                  />
                ))}
              </div>

              <button 
                onClick={handleVerify}
                className="w-full py-4 rounded-2xl bg-[#00c4b4] text-white font-bold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/30"
              >
                Tasdiqlash va Kirish
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}
