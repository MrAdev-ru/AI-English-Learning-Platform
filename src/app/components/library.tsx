import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Book, Plus, Upload, X, FileText, Eye, Music, Volume2, Download } from "lucide-react";
import { toast } from "sonner";

interface BookData {
  id: string;
  title: string;
  author: string;
  difficulty: string;
  fileUrl?: string;
  fileName?: string;
  audioUrl?: string;
  audioName?: string;
}

export function Library() {
  const [books, setBooks] = useState<BookData[]>([
    {
      id: "1",
      title: "English Grammar in Use",
      author: "Raymond Murphy",
      difficulty: "Intermediate",
    },
    {
      id: "2",
      title: "Advanced Vocabulary Builder",
      author: "Cambridge",
      difficulty: "Advanced",
    },
    {
      id: "3",
      title: "Cambridge IELTS 11",
      author: "Cambridge",
      difficulty: "Advanced",
      fileName: "Cambridge IELTS 11 [@cambridgematerials].pdf",
      fileUrl: "/library/Cambridge%20IELTS%2011%20%5B%40cambridgematerials%5D.pdf",
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState<Partial<BookData>>({});
  
  // State for previewing a book
  const [previewBook, setPreviewBook] = useState<BookData | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Faqat PDF fayllar yuklash mumkin.");
        return;
      }
      setNewBook(prev => ({ ...prev, fileName: file.name, fileUrl: URL.createObjectURL(file) }));
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("audio/")) {
        toast.error("Faqat audio fayllar yuklash mumkin (mp3, wav...).");
        return;
      }
      setNewBook(prev => ({ ...prev, audioName: file.name, audioUrl: URL.createObjectURL(file) }));
    }
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.fileName) {
      toast.error("Barcha maydonlarni to'ldiring va PDF yuklang!");
      return;
    }
    const bookToAdd: BookData = {
      id: Date.now().toString(),
      title: newBook.title!,
      author: newBook.author!,
      difficulty: newBook.difficulty || "Beginner",
      fileName: newBook.fileName,
      fileUrl: newBook.fileUrl,
    };
    setBooks(prev => [bookToAdd, ...prev]);
    setIsModalOpen(false);
    setNewBook({});
    toast.success("Kitob muvaffaqiyatli qo'shildi!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto pb-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4285f4] to-[#0ea5e9] bg-clip-text text-transparent dark:from-[#669df6] dark:to-[#38bdf8]">
              Library
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Barcha o'quv materiallari va PDF kitoblar</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#4285f4] to-[#0ea5e9] text-white font-semibold shadow-lg shadow-blue-200 dark:shadow-none hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" /> Kitob Qo'shish
          </motion.button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                if(book.fileUrl) {
                  setPreviewBook(book);
                } else {
                  toast.info("Bu kitob uchun PDF mavjud emas.");
                }
              }}
              className="p-6 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-[#4285f4] transition-all hover:scale-[1.02] hover:shadow-xl flex flex-col cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Book className="w-7 h-7 text-[#4285f4]" />
                </div>
                {book.fileUrl && (
                  <div className="bg-blue-50 dark:bg-blue-900/40 p-2 rounded-xl text-[#4285f4] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{book.author}</p>
              
              {/* Audio player inline */}
              {book.audioUrl && (
                <div className="mb-3" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center gap-2 text-xs text-[#00c4b4] font-semibold mb-1">
                    <Volume2 className="w-3 h-3" /> {book.audioName}
                  </div>
                  <audio controls src={book.audioUrl} className="w-full h-8" />
                </div>
              )}

              <div className="mt-auto flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {book.difficulty}
                </span>
                <div className="flex items-center gap-2">
                  {book.fileUrl && (
                    <a href={book.fileUrl} download={book.fileName}
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-[#4285f4] text-xs font-semibold hover:underline"
                    >
                      <Download className="w-3 h-3" /> PDF
                    </a>
                  )}
                  {book.fileName && <div className="flex items-center gap-1 text-[#00c4b4] text-sm font-medium"><FileText className="w-4 h-4" /></div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 overflow-y-auto max-h-[90vh]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Yangi Kitob Qo'shish</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleAddBook} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kitob Nomi</label>
                    <input 
                      type="text" 
                      value={newBook.title || ""}
                      onChange={e => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#4285f4] outline-none text-gray-800 dark:text-gray-100"
                      placeholder="Masalan: Essential Grammar in Use"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Muallif</label>
                    <input 
                      type="text" 
                      value={newBook.author || ""}
                      onChange={e => setNewBook(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#4285f4] outline-none text-gray-800 dark:text-gray-100"
                      placeholder="Muallif ismi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daraja (Qiyinchilik)</label>
                    <select 
                      value={newBook.difficulty || "Beginner"}
                      onChange={e => setNewBook(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#4285f4] outline-none text-gray-800 dark:text-gray-100"
                    >
                      <option value="Beginner">Beginner (A1-A2)</option>
                      <option value="Intermediate">Intermediate (B1-B2)</option>
                      <option value="Advanced">Advanced (C1-C2)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PDF Fayl yuklash</label>
                    <div className="relative w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                      <input type="file" accept="application/pdf" onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium text-center">
                        {newBook.fileName ? newBook.fileName : "PDF faylni shu yerga tashlang"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Audio Fayl yuklash (ixtiyoriy)</label>
                    <div className="relative w-full border-2 border-dashed border-teal-300 dark:border-teal-700 rounded-xl p-6 flex flex-col items-center justify-center bg-teal-50/50 dark:bg-teal-900/10 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors cursor-pointer">
                      <input type="file" accept="audio/*" onChange={handleAudioUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Music className="w-8 h-8 text-teal-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium text-center">
                        {newBook.audioName ? newBook.audioName : "Audio (mp3, wav...) tashlang"}
                      </p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-[#4285f4] to-[#0ea5e9] text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:shadow-xl transition-all"
                  >
                    Saqlash va Qo'shish
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* PDF Preview Modal */}
        <AnimatePresence>
          {previewBook && previewBook.fileUrl && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewBook(null)}
                className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="relative w-full max-w-5xl h-full flex flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                     <FileText className="w-5 h-5 text-[#4285f4]" /> {previewBook.title}
                  </h2>
                  <button onClick={() => setPreviewBook(null)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-900">
                  <iframe 
                    src={previewBook.fileUrl} 
                    className="w-full h-full border-none"
                    title={`Preview of ${previewBook.title}`}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
