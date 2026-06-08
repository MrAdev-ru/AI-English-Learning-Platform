import React, { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ru" | "uz";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    home: "Home",
    tasks: "Tasks",
    library: "Library",
    learn: "Learn",
    profile: "Profile",
    back: "Back",
    start_practice: "Start Practice",
    vocabulary_practice: "Vocabulary Practice",
    welcome: "Welcome",
    add_book: "Add Book",
    save: "Save Changes",
    pdf: "PDF",
  },
  ru: {
    home: "Главная",
    tasks: "Задания",
    library: "Библиотека",
    learn: "Учиться",
    profile: "Профиль",
    back: "Назад",
    start_practice: "Начать",
    vocabulary_practice: "Практика слов",
    welcome: "Добро пожаловать",
    add_book: "Добавить книгу",
    save: "Сохранить",
    pdf: "PDF",
  },
  uz: {
    home: "Bosh sahifa",
    tasks: "Vazifalar",
    library: "Kutubxona",
    learn: "O'rganish",
    profile: "Profil",
    back: "Orqaga",
    start_practice: "Boshlash",
    vocabulary_practice: "So'z boyligi amaliyoti",
    welcome: "Xush kelibsiz",
    add_book: "Kitob qo'shish",
    save: "Saqlash",
    pdf: "PDF",
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const l = localStorage.getItem("appLang") as Lang | null;
      return l || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("appLang", lang);
    } catch {}
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const t = (key: string) => {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
};
