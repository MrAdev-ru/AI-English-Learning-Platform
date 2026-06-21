import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, Newspaper, Upload, Edit3, Trash2, Plus, Check, X,
  LogOut, ChevronRight, FileText, Music, Eye, Clock, Tag
} from "lucide-react";
import { toast } from "sonner";

interface AdminPanelProps {
  onLogout: () => void;
}

type AdminTab = "library" | "blog";

interface LibraryItem {
  id: number;
  title: string;
  type: "book" | "audio";
  exam: string;
  size: string;
  date: string;
}

interface BlogDraft {
  id: number;
  title: string;
  category: string;
  status: "draft" | "pending";
  date: string;
}

const initialLibrary: LibraryItem[] = [
  { id: 1, title: "Cambridge IELTS 11",      type: "book",  exam: "IELTS", size: "12.4 MB", date: "10 Jun 2025" },
  { id: 2, title: "Cambridge IELTS 12",      type: "book",  exam: "IELTS", size: "14.1 MB", date: "10 Jun 2025" },
  { id: 3, title: "IELTS Listening Test 1",  type: "audio", exam: "IELTS", size: "3.2 MB",  date: "12 Jun 2025" },
  { id: 4, title: "CEFR B2 Grammar Guide",   type: "book",  exam: "CEFR",  size: "8.7 MB",  date: "14 Jun 2025" },
];

const initialDrafts: BlogDraft[] = [
  { id: 1, title: "Top 10 IELTS Writing Tips", category: "language", status: "draft",   date: "18 Jun 2025" },
  { id: 2, title: "AI va til o'rganish",        category: "science",  status: "pending", date: "19 Jun 2025" },
];

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [tab, setTab] = useState<AdminTab>("library");
  const [library, setLibrary] = useState<LibraryItem[]>(initialLibrary);
  const [drafts, setDrafts] = useState<BlogDraft[]>(initialDrafts);
  const [showUpload, setShowUpload] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", type: "book", exam: "IELTS" });
  const [blogForm, setBlogForm] = useState({ title: "", category: "language", content: "" });

  const handleUpload = () => {
    if (!uploadForm.title.trim()) { toast.error("Sarlavha kiriting!"); return; }
    const newItem: LibraryItem = {
      id: Date.now(), title: uploadForm.title,
      type: uploadForm.type as "book" | "audio",
      exam: uploadForm.exam, size: "— MB",
      date: new Date().toLocaleDateString("uz-UZ"),
    };
    setLibrary(prev => [newItem, ...prev]);
    setUploadForm({ title: "", type: "book", exam: "IELTS" });
    setShowUpload(false);
    toast.success("Muvaffaqiyatli yuklandi!");
  };

  const handleDeleteLibrary = (id: number) => {
    setLibrary(prev => prev.filter(i => i.id !== id));
    toast.success("O'chirildi.");
  };

  const handleSaveDraft = () => {
    if (!blogForm.title.trim()) { toast.error("Sarlavha kiriting!"); return; }
    const newDraft: BlogDraft = {
      id: Date.now(), title: blogForm.title,
      category: blogForm.category, status: "pending",
      date: new Date().toLocaleDateString("uz-UZ"),
    };
    setDrafts(prev => [newDraft, ...prev]);
    setBlogForm({ title: "", category: "language", content: "" });
    setShowBlogForm(false);
    toast.success("Maqola Super Admin tasdig'iga yuborildi!");
  };

  const handleDeleteDraft = (id: number) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
    toast.success("O'chirildi.");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-gray-900 font-sans">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white text-lg">Admin Panel</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Moderator huquqlari</p>
            </div>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" /> Chiqish
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "library" as AdminTab, label: "Kutubxona", icon: BookOpen },
            { key: "blog"    as AdminTab, label: "Blog",      icon: Newspaper },
          ].map(t => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  tab === t.key
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                }`}>
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Library Tab */}
        {tab === "library" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Kutubxona materiallari</h2>
              <button onClick={() => setShowUpload(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
                <Upload className="w-4 h-4" /> Yuklash
              </button>
            </div>

            <div className="space-y-3">
              {library.map((item, idx) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.type === "book" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-green-100 dark:bg-green-900/30"
                  }`}>
                    {item.type === "book"
                      ? <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      : <Music className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium">{item.exam}</span>
                      <span>{item.size}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteLibrary(item.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Blog Tab */}
        {tab === "blog" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Blog maqolalari</h2>
              <button onClick={() => setShowBlogForm(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4" /> Yangi maqola
              </button>
            </div>

            <div className="mb-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400 font-medium">
              ⚠️ Maqolalar Super Admin tomonidan tasdiqlangandan so'ng e'lon qilinadi
            </div>

            <div className="space-y-3">
              {drafts.map((draft, idx) => (
                <motion.div key={draft.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{draft.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium capitalize">{draft.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{draft.date}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    draft.status === "pending"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}>
                    {draft.status === "pending" ? "Kutmoqda" : "Qoralama"}
                  </span>
                  <button onClick={() => handleDeleteDraft(draft.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowUpload(false)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Material yuklash</h3>
                <button onClick={() => setShowUpload(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Sarlavha</label>
                  <input value={uploadForm.title} onChange={e => setUploadForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Masalan: Cambridge IELTS 13" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-indigo-500 dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Tur</label>
                    <select value={uploadForm.type} onChange={e => setUploadForm(p => ({ ...p, type: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none dark:text-white">
                      <option value="book">Kitob (PDF)</option>
                      <option value="audio">Audio (MP3)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Imtihon</label>
                    <select value={uploadForm.exam} onChange={e => setUploadForm(p => ({ ...p, exam: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none dark:text-white">
                      <option value="IELTS">IELTS</option>
                      <option value="CEFR">CEFR</option>
                      <option value="TOEFL">TOEFL</option>
                    </select>
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Faylni shu yerga torting yoki</p>
                  <button className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold mt-1">Fayl tanlash</button>
                </div>
                <button onClick={handleUpload}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">
                  Yuklash
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog Form Modal */}
      <AnimatePresence>
        {showBlogForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowBlogForm(false)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Yangi maqola</h3>
                <button onClick={() => setShowBlogForm(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Sarlavha</label>
                  <input value={blogForm.title} onChange={e => setBlogForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Maqola sarlavhasi..." className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-indigo-500 dark:text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Kategoriya</label>
                  <select value={blogForm.category} onChange={e => setBlogForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none dark:text-white">
                    <option value="language">Til</option>
                    <option value="science">Ilm-fan</option>
                    <option value="politics">Siyosat</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Matn</label>
                  <textarea value={blogForm.content} onChange={e => setBlogForm(p => ({ ...p, content: e.target.value }))}
                    rows={5} placeholder="Maqola matni..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-indigo-500 dark:text-white resize-none" />
                </div>
                <button onClick={handleSaveDraft}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">
                  Tasdig'ga yuborish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
