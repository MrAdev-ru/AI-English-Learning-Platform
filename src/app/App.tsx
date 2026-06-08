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
import { Toaster, toast } from "sonner";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string>(() => {
    try {
      return localStorage.getItem("preferredExam") || "CEFR";
    } catch {
      return "CEFR";
    }
  });
  const [currentScreen, setCurrentScreen] = useState<string>("dashboard");
  // Load xp from localStorage to persist between sessions
  const [xp, setXp] = useState<number>(() => {
    try {
      const val = localStorage.getItem("userXP");
      return val ? Number(parseInt(val)) : 1250;
    } catch {
      return 1250;
    }
  });

  // Persist xp when it changes
  useEffect(() => {
    try { localStorage.setItem("userXP", String(xp)); } catch {}
  }, [xp]);

  const handleAuth = () => {
    setIsAuthenticated(true);
    toast.success("Welcome back! Let's continue learning.");
  };

  const handleExamChange = (exam: string) => {
    setSelectedExam(exam);
    try {
      localStorage.setItem("preferredExam", exam);
    } catch {}
  };

  const handleLevelSelect = (level: string, exam?: string) => {
    const examFromLevel = level.split(" ")[0] || "CEFR";
    handleExamChange(exam || examFromLevel);
    setSelectedLevel(level);
    toast.success(`Level ${level} selected! Let's begin your journey.`);
  };

  const handleFlashcardComplete = (earnedXP: number) => {
    // Use functional update to avoid stale state
    setXp(prev => prev + earnedXP);
    setCurrentScreen("dashboard");
    toast.success(`Amazing! You earned ${earnedXP} XP!`);
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

  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        {currentScreen === "dashboard" && (
          <Dashboard
            level={selectedLevel}
            xp={xp}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === "presentation" && (
          <PresentationMode
            onBack={() => setCurrentScreen("dashboard")}
            onNavigateToFlashcards={() => setCurrentScreen("flashcards")}
          />
        )}

        {currentScreen === "flashcards" && (
          <Flashcards
            onBack={() => setCurrentScreen("presentation")}
            onComplete={handleFlashcardComplete}
          />
        )}

        {currentScreen === "tasks" && (
          <Tasks 
            onBack={() => setCurrentScreen("dashboard")}
            onComplete={handleFlashcardComplete}
          />
        )}

        {currentScreen === "library" && (
          <Library />
        )}

        {currentScreen === "profile" && (
          <Profile
            level={selectedLevel}
            examType={selectedExam}
            xp={xp}
            onExamChange={handleExamChange}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === "ai-supporter" && (
          <AiSupporter
            level={selectedLevel}
            examType={selectedExam}
            xp={xp}
            onBack={() => setCurrentScreen("profile")}
          />
        )}

        <Navigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      </div>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
