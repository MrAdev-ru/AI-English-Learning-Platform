import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Book, X, FileText, Volume2, Download, Play, Pause, ChevronLeft, Headphones } from "lucide-react";
import { toast } from "sonner";

interface BookData {
  id: string;
  title: string;
  author: string;
  difficulty: string;
  exam: string;
  fileUrl?: string;
  fileName?: string;
  audioTracks?: AudioTrack[];
}

interface AudioTrack {
  id: string;
  title: string;
  url: string;
  duration: string;
}

interface LibraryProps {
  readOnly?: boolean;
}

// Sample audio using publicly available test audio files
const sampleAudioTracks: AudioTrack[] = [
  { id: "a1", title: "IELTS Listening Test 1 - Section 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "8:32" },
  { id: "a2", title: "IELTS Listening Test 1 - Section 2", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "6:14" },
  { id: "a3", title: "IELTS Listening Test 2 - Section 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "7:45" },
];

const initialBooks: BookData[] = [
  {
    id: "1",
    title: "English Grammar in Use",
    author: "Raymond Murphy",
    difficulty: "Intermediate",
    exam: "CEFR",
  },
  {
    id: "2",
    title: "Advanced Vocabulary Builder",
    author: "Cambridge",
    difficulty: "Advanced",
    exam: "IELTS",
  },
  {
    id: "3",
    title: "Cambridge IELTS 11",
    author: "Cambridge University Press",
    difficulty: "Advanced",
    exam: "IELTS",
    audioTracks: sampleAudioTracks,
  },
  {
    id: "4",
    title: "Official TOEFL iBT Tests Vol. 1",
    author: "ETS",
    difficulty: "Advanced",
    exam: "TOEFL",
  },
  {
    id: "5",
    title: "IELTS Academic Writing Guide",
    author: "Cambridge",
    difficulty: "Intermediate",
    exam: "IELTS",
  },
];

const examColors: Record<string, string> = {
  IELTS: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  CEFR:  "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  TOEFL: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

const diffColors: Record<string, string> = {
  Beginner:     "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced:     "bg-red-100 text-red-700",
};

function AudioPlayer({ tracks }: { tracks: AudioTrack[] }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  const handlePlay = (track: AudioTrack) => {
    if (audioEl) {
      audioEl.pause();
    }
    if (playing === track.id) {
      setPlaying(null);
      setAudioEl(null);
      return;
    }
    const el = new Audio(track.url);
    el.play().catch(() => toast.error("Audio yuklanmadi"));
    el.onended = () => { setPlaying(null); setAudioEl(null); };
    setAudioEl(el);
    setPlaying(track.id);
  };

  return (
    <div className="space-y-2 mt-3">
      <div className="flex items-center gap-2 mb-2">
        <Headphones className="w-4 h-4 text-teal-500" />
        <span className="text-xs font-bold text-teal-600 dark:text-teal-400">Listening Audiolar</span>
      </div>
      {tracks.map(track => (
        <div
          key={track.id}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
            playing === track.id
              ? "bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700"
              : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => handlePlay(track)}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            playing === track.id ? "bg-teal-500" : "bg-gray-200 dark:bg-gray-600"
          }`}>
            {playing === track.id
              ? <Pause className="w-3.5 h-3.5 text-white" />
              : <Play className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 ml-0.5" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">{track.title}</p>
            <p className="text-xs text-gray-400">{track.duration}</p>
          </div>
          {playing === track.id && (
            <div className="flex gap-0.5">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-0.5 bg-teal-500 rounded-full animate-bounce"
                  style={{ height: `${8 + i * 3}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Library({ readOnly = true }: LibraryProps) {
  const [books] = useState<BookData[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [filter, setFilter] = useState("Barchasi");

  const filters = ["Barchasi", "IELTS", "CEFR", "TOEFL"];
  const filtered = filter === "Barchasi" ? books : books.filter(b => b.exam === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto pb-24">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4285f4] to-[#0ea5e9] bg-clip-text text-transparent">
            Kutubxona
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">O'quv materiallari, PDF kitoblar va audio fayllar</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                filter === f
                  ? "bg-[#4285f4] text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Books List */}
        <div className="space-y-4">
          {filtered.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Book className="w-6 h-6 text-[#4285f4]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">{book.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{book.author}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${examColors[book.exam] ?? "bg-gray-100 text-gray-600"}`}>
                        {book.exam}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${diffColors[book.difficulty] ?? "bg-gray-100 text-gray-600"}`}>
                        {book.difficulty}
                      </span>
                      {book.audioTracks && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 flex items-center gap-1">
                          <Volume2 className="w-3 h-3" /> Audio
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Audio player */}
                {book.audioTracks && book.audioTracks.length > 0 && (
                  <AudioPlayer tracks={book.audioTracks} />
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  {book.fileUrl ? (
                    <>
                      <button
                        onClick={() => setSelectedBook(book)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#4285f4] font-semibold text-sm hover:bg-blue-100 transition-colors"
                      >
                        <FileText className="w-4 h-4" /> Ko'rish
                      </button>
                      <a
                        href={book.fileUrl}
                        download={book.fileName}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-4 h-4" /> Yuklab olish
                      </a>
                    </>
                  ) : (
                    <div className="flex-1 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-400 font-medium text-sm text-center">
                      PDF tez kunda qo'shiladi
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Admin note - only for admin */}
        {!readOnly && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium text-center">
              Material qo'shish uchun Admin Panelidan foydalaning
            </p>
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {selectedBook?.fileUrl && (
          <div className="fixed inset-0 z-50 flex flex-col bg-gray-900">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <button onClick={() => setSelectedBook(null)} className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <p className="text-white font-semibold text-sm truncate">{selectedBook.title}</p>
                <a href={selectedBook.fileUrl} download={selectedBook.fileName} className="ml-auto p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <Download className="w-5 h-5 text-gray-300" />
                </a>
                <button onClick={() => setSelectedBook(null)} className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </div>
              <iframe
                src={selectedBook.fileUrl}
                className="flex-1 w-full border-none"
                title={selectedBook.title}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
