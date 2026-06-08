import { motion } from "motion/react";
import { Home, Trophy, Book, BookOpen, User, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "./language-provider";

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const navItems = [
    { id: "dashboard", icon: Home, label: t('home') },
    { id: "tasks", icon: Trophy, label: t('tasks') },
    { id: "library", icon: Book, label: t('library') },
    { id: "presentation", icon: BookOpen, label: t('learn') },
    { id: "profile", icon: User, label: t('profile') },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center justify-between gap-1 sm:gap-2 px-2 py-2 rounded-[2rem] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/40 dark:border-gray-700/50 shadow-2xl overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.id)}
              className={`relative px-4 sm:px-6 py-3 rounded-[1.5rem] transition-all flex items-center justify-center group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
            </motion.button>
          );
        })}

        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-4 sm:px-6 py-3 rounded-[1.5rem] text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all flex items-center justify-center hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
