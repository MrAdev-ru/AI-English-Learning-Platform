import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Check, Copy, Zap, Star, Crown, Infinity, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface SubscriptionProps {
  currentPlan: string;
  onBack: () => void;
  onUpgrade: (plan: string) => void;
}

const plans = [
  {
    key: "standard",
    name: "Standard",
    price: "49 000",
    period: "/ oy",
    icon: Zap,
    color: "from-blue-500 to-blue-700",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderActive: "border-blue-500",
    features: [
      "Kuniga 5 ta AI so'rovi",
      "Barcha Skills Practice (3 urinish/kun)",
      "Kutubxona – bepul kitoblar",
      "Flashcards cheksiz",
      "Blog & Yangiliklar",
    ],
    aiLimit: 5,
  },
  {
    key: "medium",
    name: "Medium",
    price: "89 000",
    period: "/ oy",
    icon: Star,
    color: "from-purple-500 to-purple-700",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    borderActive: "border-purple-500",
    features: [
      "Kuniga 15 ta AI so'rovi",
      "Skills Practice cheksiz",
      "Leaderboard yuqori o'rin",
      "Kunlik so'z + audio",
      "Priority support",
    ],
    aiLimit: 15,
    popular: true,
  },
  {
    key: "pro",
    name: "Pro",
    price: "149 000",
    period: "/ oy",
    icon: Crown,
    color: "from-orange-500 to-red-600",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    borderActive: "border-orange-500",
    features: [
      "Kuniga 35 ta AI so'rovi",
      "Barcha Pro funksiyalar",
      "Mock IELTS/TOEFL testlar",
      "Shaxsiy AI tahlil",
      "EduCoin bonus +50 EC/oy",
    ],
    aiLimit: 35,
  },
  {
    key: "unlimited",
    name: "Unlimited",
    price: "249 000",
    period: "/ oy",
    icon: Infinity,
    color: "from-teal-500 to-emerald-600",
    iconBg: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-600 dark:text-teal-400",
    borderActive: "border-teal-500",
    features: [
      "Cheksiz AI so'rovlar",
      "AI media + rasmli kontent",
      "Barcha funksiyalar ochiq",
      "EduCoin bonus +100 EC/oy",
      "Dedicated account manager",
    ],
    aiLimit: -1,
  },
];

const paymentMethods = [
  { name: "Click", card: "8600 4900 1234 5678", holder: "EDUPULSE PAYMENT" },
  { name: "Payme", card: "9860 1234 5678 9012", holder: "EDUPULSE PAYMENT" },
];

export function Subscription({ currentPlan, onBack, onUpgrade }: SubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(0);

  const handleSelectPlan = (planKey: string) => {
    if (planKey === currentPlan) return;
    setSelectedPlan(planKey);
    setShowPayment(true);
  };

  const handleCopyCard = (card: string) => {
    navigator.clipboard.writeText(card.replace(/\s/g, "")).then(() => {
      toast.success("Karta raqami nusxalandi!");
    }).catch(() => {
      toast.error("Nusxalash muvaffaqiyatsiz.");
    });
  };

  const handleConfirmPayment = () => {
    if (!selectedPlan) return;
    onUpgrade(selectedPlan);
    toast.success(`${plans.find(p => p.key === selectedPlan)?.name} tarifi faollashtirildi!`);
    setShowPayment(false);
    setSelectedPlan(null);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 pb-32">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Orqaga
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Obuna rejalari</h1>
          <p className="text-gray-600 dark:text-gray-400">Maqsadingizga mos tarif tanlang</p>
          {currentPlan !== "free" && (
            <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-semibold">
              Hozirgi tarifingiz: {plans.find(p => p.key === currentPlan)?.name || currentPlan}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const isActive = currentPlan === plan.key;
            const isSelected = selectedPlan === plan.key;
            return (
              <motion.div key={plan.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`relative bg-white dark:bg-gray-800 rounded-3xl p-6 border-2 transition-all ${
                  isActive ? "border-indigo-500 shadow-lg shadow-indigo-500/10" : "border-gray-100 dark:border-gray-700"
                }`}>
                {plan.popular && !isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs font-bold">
                      Eng mashhur
                    </span>
                  </div>
                )}
                {isActive && (
                  <div className="absolute -top-3 right-6">
                    <span className="px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold">
                      Hozirgi tarif
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${plan.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400"> so'm{plan.period}</span>
                      </div>
                    </div>
                  </div>
                  {!isActive && (
                    <button onClick={() => handleSelectPlan(plan.key)}
                      className={`px-4 py-2 rounded-xl bg-gradient-to-r ${plan.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity`}>
                      Tanlash
                    </button>
                  )}
                </div>

                <ul className="mt-5 space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Free tier note */}
        <div className="mt-6 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Bepul tarif:</span> Kuniga 3 ta Skills urinish, 5 ta Flashcard, AI cheksiz (simulyatsiya)
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowPayment(false)} />
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl z-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">To'lov</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {plans.find(p => p.key === selectedPlan)?.name} – {plans.find(p => p.key === selectedPlan)?.price} so'm/oy
            </p>

            <div className="flex gap-3 mb-6">
              {paymentMethods.map((m, i) => (
                <button key={i} onClick={() => setSelectedMethod(i)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all ${
                    selectedMethod === i
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                  }`}>
                  {m.name}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 mb-6">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Karta raqami</div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white tracking-widest">
                  {paymentMethods[selectedMethod].card}
                </span>
                <button onClick={() => handleCopyCard(paymentMethods[selectedMethod].card)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                  <Copy className="w-4 h-4" /> Nusxa
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Karta egasi: {paymentMethods[selectedMethod].holder}
              </div>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 text-center">
              To'lovni amalga oshirgach, quyidagi tugmani bosing
            </p>

            <div className="flex gap-3">
              <button onClick={() => setShowPayment(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Bekor
              </button>
              <button onClick={handleConfirmPayment}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-bold hover:opacity-90 transition-opacity">
                Tasdiqlash
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
