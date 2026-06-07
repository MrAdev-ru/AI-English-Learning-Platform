import { motion } from "motion/react";
import { Mail, Send, Chrome } from "lucide-react";

interface AuthScreenProps {
  onAuth: () => void;
}

export function AuthScreen({ onAuth }: AuthScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-teal-400">
              Sign In
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Continue your learning journey
            </p>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAuth}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
            >
              <Chrome className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Continue with Google
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAuth}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
            >
              <Send className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Continue with Telegram
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAuth}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 transition-all shadow-lg"
            >
              <Mail className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">
                Continue with Email
              </span>
            </motion.button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            By signing in, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
}
