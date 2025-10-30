// --- PHẦN 1: LOGIC LẬT TRANG (Giữ nguyên) ---

const quoteTextElement = document.getElementById('quote-text');
const newQuoteButton = document.getElementById('new-quote-btn');
let isAnimating = false;

const quotes = [
    "Every mistake we make is like data, and we need that data to learn and improve. So don't be afraid of making mistakes, dare to try and learn from your failures.",
    "When we have passed through a difficult time, we have two choices: one is to forget, the other is to hold onto those experiences, and from that, compassion is born.",
    "I wish you were loved for your existence and for who you are, not just for your achievements.",
    "Trust me, you have the most beautiful smile. I know you might not see it or feel it, but when you do, you just radiate such warmth and loveliness.",
    "If you're tired, say you're tired. If you're sad, let yourself cry. If you're happy, smile your brightest smile. I hope you will never deny your own feelings just because of someone's harsh judgments.",
    "Have a nice day, little sunshine ☀︎",
    "Think of it this way: When it goes well, it's an accomplishment. When it doesn't, it's just practice. Since there's truly nothing to lose, what's stopping you from daring?",
    "Our lives are measured in memories, not in metrics. The deep, lasting joy we find in cherishing a moment is a feeling that no number of likes or shares will ever be able to replicate.",
    "I hope you never forget the priceless gift you hold within, which is your imagination. As a child, it was your magic, painting the world with impossible colors. As an adult, it is your shelter—a place to rest your heart on heavy days, and a place to find color on the dull ones.",
    "The words you speak, you might forget them instantly. But the listener won't. They will remember—often very clearly, and for a very, very long time. So, let's hope we always choose to give each other kind words.",
    "The happiest person in the world is the one who sees life through eyes that have learned to find wonder in the most ordinary moments.",
    "How could we truly explore if we let go of our curiosity? This world is overflowing with wonders to find. But don't you think... perhaps the beauty lies in not knowing everything? Wouldn't the world lose its magic if there were no mysteries left to uncover?"
];

function generateNewQuote() {
    if (isAnimating) return;
    isAnimating = true;

    quoteTextElement.classList.add('turning-out');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteTextElement.textContent = quotes[randomIndex];
        
        quoteTextElement.classList.remove('turning-out');
        quoteTextElement.classList.add('turning-in');

        setTimeout(() => {
            quoteTextElement.classList.remove('turning-in');
        }, 10);

        setTimeout(() => {
            isAnimating = false;
        }, 310);

    }, 300);
}

newQuoteButton.addEventListener('click', generateNewQuote);


// --- PHẦN 2: LOGIC DARK MODE (Code mới) ---

// 2.1: Lấy các phần tử cần thiết
const themeToggle = document.getElementById('checkbox');
const bodyElement = document.body;

// 2.2: Hàm để bật/tắt Dark Mode
function setDarkMode(isDark) {
    if (isDark) {
        bodyElement.classList.add('dark-mode'); // Thêm class
        themeToggle.checked = true; // Cập nhật trạng thái nút
        localStorage.setItem('theme', 'dark'); // Lưu vào bộ nhớ
    } else {
        bodyElement.classList.remove('dark-mode'); // Xóa class
        themeToggle.checked = false; // Cập nhật trạng thái nút
        localStorage.setItem('theme', 'light'); // Lưu vào bộ nhớ
    }
}

// 2.3: Gắn sự kiện "thay đổi" cho nút gạt
themeToggle.addEventListener('change', () => {
    setDarkMode(themeToggle.checked);
});

// 2.4: Kiểm tra xem người dùng đã chọn gì từ lần trước
// Ngay khi tải trang, kiểm tra localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    // Nếu đã lưu là 'dark', hoặc chưa lưu gì VÀ hệ thống của user
    // đang ở chế độ dark (window.matchMedia) -> thì bật Dark Mode
    if (savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
});