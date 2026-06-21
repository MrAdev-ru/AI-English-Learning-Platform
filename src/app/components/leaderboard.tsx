import { motion } from "motion/react";
import { ArrowLeft, Trophy, Crown, Medal, Flame, Coins } from "lucide-react";

interface LeaderboardProps {
  xp: number;
  ec: number;
  onBack: () => void;
}

const mockUsers = [
  { rank: 1, name: "Aziz Karimov",    xp: 4820, ec: 195, streak: 31, avatar: "AK" },
  { rank: 2, name: "Nodira Yusupova", xp: 4210, ec: 170, streak: 27, avatar: "NY" },
  { rank: 3, name: "Jasur Toshmatov", xp: 3950, ec: 155, streak: 22, avatar: "JT" },
  { rank: 4, name: "Malika Rahimova", xp: 3400, ec: 130, streak: 18, avatar: "MR" },
  { rank: 5, name: "Bobur Aliyev",    xp: 3100, ec: 120, streak: 15, avatar: "BA" },
  { rank: 6, name: "Sarvinoz Umarova",xp: 2780, ec: 105, streak: 12, avatar: "SU" },
  { rank: 7, name: "Otabek Nazarov",  xp: 2340, ec:  88, streak: 10, avatar: "ON" },
  { rank: 8, name: "Dilnoza Xasanova",xp: 1980, ec:  72, streak:  8, avatar: "DX" },
  { rank: 9, name: "Sherzod Ergashev", xp: 1650, ec: 60, streak:  6, avatar: "SE" },
];

const rankColors = ["from-yellow-400 to-amber-500", "from-gray-300 to-gray-400", "from-orange-400 to-amber-600"];
const rankIcons = [Crown, Medal, Trophy];

export function Leaderboard({ xp, ec, onBack }: LeaderboardProps) {
  const myRank = mockUsers.findIndex(u => u.xp < xp) + 1 || mockUsers.length + 1;
  const myName = "Siz";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-5 pb-32">
      <div className="max-w-lg mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Dashboard
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Ushbu hafta peshqadam o'quvchilar</p>
        </div>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-4 mb-8 px-4">
          {[mockUsers[1], mockUsers[0], mockUsers[2]].map((user, podiumIdx) => {
            const realRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
            const heights = ["h-28", "h-36", "h-24"];
            const bgGrad = rankColors[realRank - 1];
            const RankIcon = rankIcons[realRank - 1];
            return (
              <motion.div key={user.rank} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: podiumIdx * 0.1 }}
                className="flex flex-col items-center flex-1">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${bgGrad} flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg`}>
                  {user.avatar}
                </div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center mb-2 leading-tight">{user.name.split(" ")[0]}</p>
                <div className={`w-full ${heights[podiumIdx]} rounded-t-2xl bg-gradient-to-t ${bgGrad} flex flex-col items-center justify-start pt-3 shadow-lg`}>
                  <RankIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm mt-1">{realRank}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* My rank highlight */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
            #{myRank}
          </div>
          <div className="flex-1">
            <p className="font-bold">{myName}</p>
            <p className="text-white/80 text-sm">{xp} XP · {ec} EC</p>
          </div>
          <div className="flex items-center gap-1 text-white/90 text-sm">
            <Flame className="w-4 h-4" />
            <span>Faol</span>
          </div>
        </motion.div>

        {/* Full list */}
        <div className="space-y-3">
          {mockUsers.map((user, idx) => (
            <motion.div key={user.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                user.rank <= 3
                  ? `bg-gradient-to-br ${rankColors[user.rank - 1]} text-white`
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
                {user.rank}
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-500" />{user.xp} XP</span>
                  <span className="flex items-center gap-1"><Coins className="w-3 h-3 text-purple-500" />{user.ec} EC</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-orange-500 text-xs font-semibold">
                <Flame className="w-3 h-3" />
                {user.streak}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
