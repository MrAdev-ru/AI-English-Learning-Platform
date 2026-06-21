import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users, Newspaper, TrendingUp, DollarSign, ShieldCheck, LogOut,
  Check, X, Eye, Trash2, UserPlus, Crown, BarChart2, BookOpen
} from "lucide-react";
import { toast } from "sonner";

interface SuperAdminProps {
  onLogout: () => void;
}

type SuperTab = "analytics" | "admins" | "blog";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  addedDate: string;
  status: "active" | "suspended";
}

interface PendingArticle {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  content: string;
}

const initialAdmins: AdminUser[] = [
  { id: 1, name: "Dilnoza Yusupova", email: "dilnoza@edupulse.uz", addedDate: "01 Jun 2025", status: "active" },
  { id: 2, name: "Sardor Toshmatov", email: "sardor@edupulse.uz", addedDate: "10 Jun 2025", status: "active" },
  { id: 3, name: "Malika Rahimova",  email: "malika@edupulse.uz", addedDate: "15 Jun 2025", status: "suspended" },
];

const initialPending: PendingArticle[] = [
  { id: 1, title: "AI va til o'rganish", author: "Sardor Toshmatov", category: "science",  date: "19 Jun 2025", content: "Sun'iy intellekt til o'rganishda yangi imkoniyatlar yaratmoqda. ChatGPT va boshqa modellar..." },
  { id: 2, title: "IELTS 9.0 olgan o'zbek",     author: "Dilnoza Yusupova", category: "language", date: "20 Jun 2025", content: "Toshkentlik 22 yoshli Akbar Mirzayev IELTS imtihonida 9.0 ball to'plab..." },
];

const monthlyData = [
  { month: "Yan", users: 120, revenue: 4500000 },
  { month: "Feb", users: 210, revenue: 7800000 },
  { month: "Mar", users: 380, revenue: 14200000 },
  { month: "Apr", users: 520, revenue: 19600000 },
  { month: "May", users: 710, revenue: 27300000 },
  { month: "Jun", users: 890, revenue: 34100000 },
];

const planStats = [
  { plan: "Standard", count: 340, color: "from-blue-400 to-blue-600" },
  { plan: "Medium",   count: 280, color: "from-purple-400 to-purple-600" },
  { plan: "Pro",      count: 190, color: "from-orange-400 to-orange-600" },
  { plan: "Unlimited",count:  80, color: "from-yellow-400 to-yellow-600" },
];

export function SuperAdmin({ onLogout }: SuperAdminProps) {
  const [tab, setTab] = useState<SuperTab>("analytics");
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [pending, setPending] = useState<PendingArticle[]>(initialPending);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<PendingArticle | null>(null);
  const [addForm, setAddForm] = useState({ name: "", email: "" });

  const totalUsers = 1240;
  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  const handleAddAdmin = () => {
    if (!addForm.name.trim() || !addForm.email.trim()) {
      toast.error("Ism va emailni kiriting");
      return;
    }
    const newAdmin: AdminUser = {
      id: Date.now(),
      name: addForm.name,
      email: addForm.email,
      addedDate: new Date().toLocaleDateString("uz-UZ", { day: "2-digit", month: "short", year: "numeric" }),
      status: "active",
    };
    setAdmins(prev => [...prev, newAdmin]);
    setAddForm({ name: "", email: "" });
    setShowAddAdmin(false);
    toast.success("Admin muvaffaqiyatli qo'shildi!");
  };

  const handleToggleAdmin = (id: number) => {
    setAdmins(prev => prev.map(a =>
      a.id === id ? { ...a, status: a.status === "active" ? "suspended" : "active" } : a
    ));
    toast.success("Admin holati o'zgartirildi");
  };

  const handleRemoveAdmin = (id: number) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
    toast.success("Admin o'chirildi");
  };

  const handleApprove = (id: number) => {
    setPending(prev => prev.filter(a => a.id !== id));
    setPreviewArticle(null);
    toast.success("Maqola tasdiqlandi va e'lon qilindi!");
  };

  const handleReject = (id: number) => {
    setPending(prev => prev.filter(a => a.id !== id));
    setPreviewArticle(null);
    toast.error("Maqola rad etildi");
  };

  const tabs: { id: SuperTab; label: string; icon: React.ReactNode }[] = [
    { id: "analytics", label: "Analitika", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "admins",    label: "Adminlar",  icon: <Users className="w-4 h-4" /> },
    { id: "blog",      label: "Blog",      icon: <Newspaper className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-gray-900 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Crown className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <p className="font-bold text-base leading-tight">Super Admin Panel</p>
            <p className="text-xs text-white/70">EduPulse CEO</p>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
          <LogOut className="w-4 h-4" /> Chiqish
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t.id
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50"
            }`}
          >
            {t.icon} {t.label}
            {t.id === "blog" && pending.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">{pending.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4 pb-8">
        <AnimatePresence mode="wait">

          {/* ANALYTICS TAB */}
          {tab === "analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Jami foydalanuvchi</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-500 font-semibold mt-1">+12% bu oy</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Jami daromad</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{(totalRevenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">UZS</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bu oy obunalar</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">890</p>
                  <p className="text-xs text-green-500 font-semibold mt-1">+25% o'sish</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Faol adminlar</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{admins.filter(a => a.status === "active").length}</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">/ {admins.length} jami</p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-4">Oylik daromad (UZS)</p>
                <div className="flex items-end gap-2 h-32">
                  {monthlyData.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg"
                        style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan distribution */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-4">Obuna rejalari taqsimoti</p>
                <div className="space-y-3">
                  {planStats.map((p) => {
                    const maxCount = Math.max(...planStats.map(s => s.count));
                    return (
                      <div key={p.plan}>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-gray-700 dark:text-gray-300">{p.plan}</span>
                          <span className="text-gray-500">{p.count} ta</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${p.color} rounded-full`}
                            style={{ width: `${(p.count / maxCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ADMINS TAB */}
          {tab === "admins" && (
            <motion.div key="admins" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <button
                onClick={() => setShowAddAdmin(true)}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl py-3 font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <UserPlus className="w-5 h-5" /> Yangi admin qo'shish
              </button>

              {admins.map(admin => (
                <div key={admin.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {admin.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{admin.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{admin.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{admin.addedDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      admin.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {admin.status === "active" ? "Faol" : "To'xtatilgan"}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleToggleAdmin(admin.id)}
                        className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-yellow-100"
                        title={admin.status === "active" ? "To'xtatish" : "Faollashtirish"}
                      >
                        {admin.status === "active" ? <X className="w-3.5 h-3.5 text-yellow-600" /> : <Check className="w-3.5 h-3.5 text-green-600" />}
                      </button>
                      <button
                        onClick={() => handleRemoveAdmin(admin.id)}
                        className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Admin Modal */}
              <AnimatePresence>
                {showAddAdmin && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-end"
                    onClick={() => setShowAddAdmin(false)}
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      className="bg-white dark:bg-gray-800 rounded-t-3xl p-6 w-full"
                      onClick={e => e.stopPropagation()}
                    >
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Yangi Admin qo'shish</h3>
                      <div className="space-y-3 mb-4">
                        <input
                          type="text"
                          placeholder="To'liq ism"
                          value={addForm.name}
                          onChange={e => setAddForm(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 outline-none text-gray-900 dark:text-white text-sm"
                        />
                        <input
                          type="email"
                          placeholder="Email manzili"
                          value={addForm.email}
                          onChange={e => setAddForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 outline-none text-gray-900 dark:text-white text-sm"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setShowAddAdmin(false)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold text-sm">Bekor</button>
                        <button onClick={handleAddAdmin} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm">Qo'shish</button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* BLOG MODERATION TAB */}
          {tab === "blog" && (
            <motion.div key="blog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {pending.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Tasdiqlanishi kerak maqolalar yo'q</p>
                </div>
              ) : (
                pending.map(article => (
                  <div key={article.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Newspaper className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{article.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{article.author} · {article.date}</p>
                        <span className="inline-block mt-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{article.category}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{article.content}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setPreviewArticle(article)}
                        className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Ko'rish
                      </button>
                      <button
                        onClick={() => handleApprove(article.id)}
                        className="flex-1 py-2 rounded-xl bg-green-500 text-white text-xs font-bold flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Tasdiqlash
                      </button>
                      <button
                        onClick={() => handleReject(article.id)}
                        className="flex-1 py-2 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Rad etish
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Article Preview Modal */}
              <AnimatePresence>
                {previewArticle && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-end"
                    onClick={() => setPreviewArticle(null)}
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      className="bg-white dark:bg-gray-800 rounded-t-3xl p-6 w-full max-h-[80vh] overflow-y-auto"
                      onClick={e => e.stopPropagation()}
                    >
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{previewArticle.title}</h3>
                      <p className="text-xs text-gray-500 mb-4">{previewArticle.author} · {previewArticle.date}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{previewArticle.content}</p>
                      <div className="flex gap-3">
                        <button onClick={() => handleReject(previewArticle.id)} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm">Rad etish</button>
                        <button onClick={() => handleApprove(previewArticle.id)} className="flex-1 py-3 rounded-xl bg-green-500 text-white font-bold text-sm">Tasdiqlash</button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
