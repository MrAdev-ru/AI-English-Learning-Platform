require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// BOT_TOKEN yozishingiz kerak. Yoki bu fayl yonida .env fayl ochip BOT_TOKEN=sizning_token deb yozing.
const token = process.env.BOT_TOKEN || '8949996972:AAHub42KjCsfu1B8wVBjrqxfiiTNv6GyFCQ';

if (token === '8949996972:AAHub42KjCsfu1B8wVBjrqxfiiTNv6GyFCQ') {
  console.warn("DIQQAT: Bot tokenini kiritmadingiz! Iltimos, kod ichidagi token o'zgaruvchisiga botfather'dan olgan tokenni yozing.");
}

const bot = new TelegramBot(token, { polling: true });

// Tasodifiy 6 xonali kod yaratish
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
Assalomu alaykum, Xush kelibsiz! \uD83D\uDC4B

Platformaga kirish uchun kodingizni olish uchu /getcode buyrug'ini yuboring.
  `;
  bot.sendMessage(chatId, welcomeMessage);
});

bot.onText(/\/getcode/, (msg) => {
  const chatId = msg.chat.id;
  const verificationCode = generateCode();
  
  const codeMessage = `
\uD83D\uDD12 Sizning tasdiqlash kodingiz:
*${verificationCode}*

Ushbu kodni web dasturga kiritib tizimga kirishingiz mumkin. Omad! \uD83D\uDE80
  `;
  
  bot.sendMessage(chatId, codeMessage, { parse_mode: 'Markdown' });
  console.log(`[LOG] Kod ${msg.chat.first_name || 'Foydalanuvchi'} ga yuborildi: ${verificationCode}`);
});

bot.on('message', (msg) => {
    // start va getcode dan tashqari yozuvlarga javob
    if(msg.text !== '/start' && msg.text !== '/getcode') {
        bot.sendMessage(msg.chat.id, "Kodni olish uchun /getcode buyrug'ini bosing.");
    }
});

console.log("Telegram Bot ishga tushirildi! Kod qabul qilish ochiq...");
