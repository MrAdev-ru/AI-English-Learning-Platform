import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Login } from "./components/login";
import { Onboarding } from "./components/onboarding";
import { Dashboard } from "./components/dashboard";
import { PresentationMode } from "./components/presentation-mode";
import { Flashcards } from "./components/flashcards";
import { Profile } from "./components/profile";
import { Library } from "./components/library";
import { Tasks } from "./components/tasks";
import { AiSupporter } from "./components/ai-supporter";
import { Navigation } from "./components/navigation";
import { Skills } from "./components/skills";
import { Blog } from "./components/blog";
import { Subscription } from "./components/subscription";
import { Leaderboard } from "./components/leaderboard";
import { Toaster, toast } from "sonner";

const getLocal = <T,>(key: string, fallback: T): T => {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const setLocal = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated]     = useState(false);
  const [selectedLevel, setSelectedLevel]         = useState<string | null>(null);
  const [selectedExam, setSelectedExam]           = useState<string>(() => getLocal("preferredExam", "CEFR"));
  const [currentScreen, setCurrentScreen]         = useState("dashboard");
  const [xp, setXp]     = useState<number>(() => getLocal("userXP", 1250));
  const [ec, setEc]     = useState<number>(() => getLocal("userEC", 50));
  const [streak, setStreak] = useState<number>(() => getLocal("userStreak", 7));
  const [plan, setPlan] = useState<string>(() => getLocal("userPlan", "free"));

  // Skills daily tries
  const todayKey = `skillsTries_${new Date().toDateString()}`;
  const [skillsTriesUsed, setSkillsTriesUsed] = useState<number>(() => getLocal(todayKey, 0));

  useEffect(() => { setLocal("userXP", xp); }, [xp]);
  useEffect(() => { setLocal("userEC", ec); }, [ec]);
  useEffect(() => { setLocal("userStreak", streak); }, [streak]);
  useEffect(() => { setLocal("userPlan", plan); }, [plan]);
  useEffect(() => { setLocal(todayKey, skillsTriesUsed); }, [skillsTriesUsed]);

  const handleAuth = () => {
    setIsAuthenticated(true);
    toast.success("Xush kelibsiz! O'rganishda davom eting.");
  };

  const handleExamChange = (exam: string) => {
    setSelectedExam(exam);
    setLocal("preferredExam", exam);
  };

  const handleLevelSelect = (level: string, exam?: string) => {
    handleExamChange(exam || level.split(" ")[0] || "CEFR");
    setSelectedLevel(level);
    toast.success(`${level} darajasidan boshlanmoqda! 🚀`);
  };

  const handleFlashcardComplete = (earnedXP: number) => {
    setXp(prev => prev + earnedXP);
    setEc(prev => prev + Math.floor(earnedXP / 10));
    setCurrentScreen("dashboard");
    toast.success(`Zo'r! +${earnedXP} XP va +${Math.floor(earnedXP / 10)} EC topingiz!`);
  };

  const handleSkillComplete = (earnedXP: number, earnedEC: number) => {
    setXp(prev => prev + earnedXP);
    setEc(prev => prev + earnedEC);
  };

  const handleSkillUseTry = () => {
    setSkillsTriesUsed(prev => prev + 1);
  };

  const handleUpgradePlan = (newPlan: string) => {
    setPlan(newPlan);
    // Reset skills tries on upgrade
    setSkillsTriesUsed(0);
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <Login onLogin={handleAuth} />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    );
  }

  if (!selectedLevel) {
    return (
      <ThemeProvider>
        <Onboarding onLevelSelect={handleLevelSelect} />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return (
          <Dashboard
            level={selectedLevel}
            xp={xp}
            ec={ec}
            streak={streak}
            examType={selectedExam}
            onNavigate={setCurrentScreen}
          />
        );
      case "presentation":
        return (
          <PresentationMode
            onBack={() => setCurrentScreen("dashboard")}
            onNavigateToFlashcards={() => setCurrentScreen("flashcards")}
          />
        );
      case "flashcards":
        return (
          <Flashcards
            onBack={() => setCurrentScreen("presentation")}
            onComplete={handleFlashcardComplete}
          />
        );
      case "skills":
      case "tasks":
        return (
          <Skills
            examType={selectedExam}
            plan={plan}
            triesUsed={skillsTriesUsed}
            onBack={() => setCurrentScreen("dashboard")}
            onComplete={handleSkillComplete}
            onUseTry={handleSkillUseTry}
            onNavigate={setCurrentScreen}
          />
        );
      case "library":
        return <Library />;
      case "blog":
        return <Blog onBack={() => setCurrentScreen("dashboard")} />;
      case "subscription":
        return (
          <Subscription
            currentPlan={plan}
            onBack={() => setCurrentScreen("profile")}
            onUpgrade={handleUpgradePlan}
          />
        );
      case "leaderboard":
        return (
          <Leaderboard
            xp={xp}
            ec={ec}
            onBack={() => setCurrentScreen("dashboard")}
          />
        );
      case "profile":
        return (
          <Profile
            level={selectedLevel}
            examType={selectedExam}
            xp={xp}
            ec={ec}
            streak={streak}
            plan={plan}
            onExamChange={handleExamChange}
            onNavigate={setCurrentScreen}
          />
        );
      case "ai-supporter":
        return (
          <AiSupporter
            level={selectedLevel}
            examType={selectedExam}
            xp={xp}
            plan={plan}
            onBack={() => setCurrentScreen("profile")}
            onNavigate={setCurrentScreen}
          />
        );
      default:
        return (
          <Dashboard
            level={selectedLevel}
            xp={xp}
            ec={ec}
            streak={streak}
            examType={selectedExam}
            onNavigate={setCurrentScreen}
          />
        );
    }
  };

  const showNav = !["presentation", "flashcards"].includes(currentScreen);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        {renderScreen()}
        {showNav && (
          <Navigation
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        )}
      </div>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
