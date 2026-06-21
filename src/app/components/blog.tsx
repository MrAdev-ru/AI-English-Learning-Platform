import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Play, Download, Clock, Tag, ChevronRight, X } from "lucide-react";

interface BlogProps {
  onBack: () => void;
}

type ArticleCategory = "science" | "language" | "politics" | "video";

interface Article {
  id: number;
  title: string;
  summary: string;
  category: ArticleCategory;
  readTime: string;
  date: string;
  hasVideo: boolean;
  hasPdf: boolean;
  content: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "How AI is Transforming Language Learning in 2025",
    summary: "Artificial intelligence is reshaping the way millions of people learn new languages around the world.",
    category: "science",
    readTime: "5 min",
    date: "18 Jun 2025",
    hasVideo: false,
    hasPdf: true,
    content: `Artificial intelligence has fundamentally changed the landscape of language learning. Modern AI systems can now analyze a learner's speech patterns, identify weaknesses, and provide personalized feedback in real-time.

Studies show that AI-assisted language learning improves retention rates by up to 40% compared to traditional methods. Platforms using adaptive algorithms can tailor content to each learner's pace and style.

Key innovations include:
• Real-time pronunciation correction using phoneme analysis
• Personalized vocabulary recommendations based on learning history
• AI-generated conversation partners that simulate native speakers
• Automated essay scoring for written practice

The future of language learning is deeply intertwined with AI technology, making high-quality education more accessible to learners worldwide.`,
  },
  {
    id: 2,
    title: "10 Most Common IELTS Vocabulary Mistakes",
    summary: "Avoid these frequent errors that cost students precious band points in their IELTS exam.",
    category: "language",
    readTime: "7 min",
    date: "15 Jun 2025",
    hasVideo: true,
    hasPdf: true,
    content: `Many IELTS candidates lose valuable marks due to vocabulary mistakes that could easily be avoided with proper preparation.

The most common errors include:

1. Overusing simple words like "big", "good", "bad" instead of more precise alternatives
2. Incorrect collocations (e.g., "make a mistake" not "do a mistake")
3. Using informal language in Academic Writing Task 2
4. Confusing similar words (effect/affect, principal/principle)
5. Inappropriate use of idioms in formal contexts

To improve your vocabulary:
• Read academic texts and note collocations
• Practice paraphrasing using synonyms
• Learn words in context rather than in isolation
• Review your writing for word repetition`,
  },
  {
    id: 3,
    title: "The Science Behind Effective Vocabulary Retention",
    summary: "Neuroscience reveals why spaced repetition and active recall are the most effective memory techniques.",
    category: "science",
    readTime: "8 min",
    date: "12 Jun 2025",
    hasVideo: false,
    hasPdf: false,
    content: `Memory research has consistently shown that certain learning techniques dramatically outperform others when it comes to vocabulary acquisition.

Spaced Repetition Systems (SRS) work by showing you information at increasing intervals, exploiting the psychological spacing effect to maximize long-term retention. Studies show this can improve memory retention by up to 200%.

Active recall — testing yourself rather than passively reading — engages deeper cognitive processing. When you retrieve information from memory, you strengthen the neural pathways associated with that knowledge.

For language learners, combining these two techniques creates a powerful learning system:
• Review new words after 1 day, then 3 days, then 1 week, then 1 month
• Always test yourself before reviewing the answer
• Create meaningful sentences using new vocabulary
• Associate new words with images or personal memories`,
  },
  {
    id: 4,
    title: "IELTS vs TOEFL: Which Exam Should You Choose?",
    summary: "A comprehensive comparison of the two most recognized English proficiency tests to help you decide.",
    category: "language",
    readTime: "10 min",
    date: "10 Jun 2025",
    hasVideo: true,
    hasPdf: true,
    content: `Choosing between IELTS and TOEFL is a critical decision that depends on your goals, destination country, and learning style.

IELTS (International English Language Testing System):
• Accepted by most universities in UK, Australia, Canada, and New Zealand
• Has two modules: Academic and General Training
• Speaking test is face-to-face with a human examiner
• Writing involves handwriting (not typing)
• Scored on a 1-9 band scale

TOEFL iBT (Test of English as a Foreign Language):
• Preferred by US and Canadian universities
• Entirely computer-based, including speaking responses
• Integrated tasks combine multiple skills
• Scored on a 0-120 scale

Which to choose:
• Choose IELTS if applying to UK/Australian universities or for immigration
• Choose TOEFL if applying primarily to US universities
• Research your target institution's requirements before deciding`,
  },
  {
    id: 5,
    title: "English in International Politics: Key Vocabulary",
    summary: "Master the political vocabulary used in international relations, diplomacy, and global news.",
    category: "politics",
    readTime: "6 min",
    date: "8 Jun 2025",
    hasVideo: false,
    hasPdf: false,
    content: `Understanding political English is essential for IELTS and TOEFL candidates who encounter politics-related reading and listening passages.

Essential political vocabulary:

Diplomacy & Relations:
• Bilateral — involving two parties/countries
• Multilateral — involving multiple parties
• Sanctions — penalties imposed on a country
• Ratify — to formally approve a treaty or agreement

Economic Terms:
• Trade deficit/surplus — difference between imports and exports
• GDP (Gross Domestic Product) — total economic output
• Inflation — increase in general price levels

International Organizations:
• UN (United Nations) — global peacekeeping organization
• NATO — North Atlantic Treaty Organization
• IMF — International Monetary Fund

Practice reading international news in English to naturally absorb these terms in context.`,
  },
];

const categoryColors: Record<ArticleCategory, { bg: string; text: string; label: string }> = {
  science:  { bg: "bg-blue-100 dark:bg-blue-900/30",   text: "text-blue-700 dark:text-blue-400",   label: "Ilm-fan" },
  language: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", label: "Til" },
  politics: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", label: "Siyosat" },
  video:    { bg: "bg-red-100 dark:bg-red-900/30",     text: "text-red-700 dark:text-red-400",     label: "Video" },
};

const filters: { key: ArticleCategory | "all"; label: string }[] = [
  { key: "all", label: "Barchasi" },
  { key: "language", label: "Til" },
  { key: "science", label: "Ilm-fan" },
  { key: "politics", label: "Siyosat" },
  { key: "video", label: "Video" },
];

export function Blog({ onBack }: BlogProps) {
  const [activeFilter, setActiveFilter] = useState<ArticleCategory | "all">("all");
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  const filtered = activeFilter === "all"
    ? articles
    : articles.filter(a => a.category === activeFilter || (activeFilter === "video" && a.hasVideo));

  if (openArticle) {
    const cat = categoryColors[openArticle.category];
    return (
      <div className="min-h-screen bg-[#f8fbff] dark:bg-gray-900 p-6 pb-32">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setOpenArticle(null)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Orqaga
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>
                {cat.label}
              </span>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                {openArticle.readTime}
              </div>
              <span className="text-gray-400 text-sm">{openArticle.date}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{openArticle.title}</h1>
            {openArticle.hasVideo && (
              <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6">
                <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
            )}
            <div className="prose dark:prose-invert max-w-none">
              {openArticle.content.split('\n').map((line, i) => (
                <p key={i} className={`text-gray-700 dark:text-gray-300 leading-relaxed ${line === '' ? 'h-3' : 'mb-2'} ${line.startsWith('•') ? 'ml-4' : ''}`}>
                  {line}
                </p>
              ))}
            </div>
            {openArticle.hasPdf && (
              <button className="mt-8 flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors border border-indigo-200 dark:border-indigo-800">
                <Download className="w-5 h-5" />
                PDF yuklab olish
              </button>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] dark:bg-gray-900 p-6 pb-32">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog & Yangiliklar</h1>
          <p className="text-gray-600 dark:text-gray-400">Ilm-fan, siyosat va til o'rganish haqida foydali maqolalar</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {filters.map(f => (
            <button key={f.key} onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeFilter === f.key
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-indigo-300"
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((article, idx) => {
            const cat = categoryColors[article.category];
            return (
              <motion.button key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                onClick={() => setOpenArticle(article)}
                className="w-full text-left bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>
                        {cat.label}
                      </span>
                      {article.hasVideo && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                          <Play className="w-3 h-3" /> Video
                        </span>
                      )}
                      {article.hasPdf && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                          <Download className="w-3 h-3" /> PDF
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{article.summary}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </div>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-2 group-hover:text-indigo-500 transition-colors" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
