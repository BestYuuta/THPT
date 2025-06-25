const wishes = [
    "Thi tốt nhé!",
    "May mắn luôn kề!",
    "Đạt điểm thật cao!",
    "Không bị căng thẳng",
    "Tương lai rạng ngời!",
    "Ước mơ thành hiện thực!",
    "Vui vẻ, tự tin!",
    "Bình an làm bài!",
    "Xuất sắc nhé ebee!",
    "Giỏi giang vô cùng!",
    "Thông minh vô cùng!",
    "Kiên trì vượt khó!",
    "Hạnh phúc đón chờ!",
    "An tâm làm bài!",
    "Yêu đời làm bài!",
    "Chăm chỉ phát huy!",
    "Nỗ lực thành công!",
    "Tỏa sáng nhé ebe!",
    "Chiến thắng bản thân!",
    "Chúc ebe thành công!"
];

const fireworkColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 1000;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

function createFirework(x, y) {
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.background = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
        firework.style.marginLeft = '-100px';
        firework.style.marginTop = '-100px';
        document.body.appendChild(firework);
        setTimeout(() => firework.remove(), 1000);
    }
}

function createHeartGrid() {
    const heartGrid = document.getElementById('heartGrid');
    heartGrid.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';

        const heartText = document.createElement('span');
        heartText.className = 'heart-text';
        heartText.textContent = "💖";
        heart.appendChild(heartText);

        const wish = wishes[i % wishes.length];

        heart.addEventListener('click', function () {
            heartText.textContent = wish;
            heart.style.transform = 'rotate(-45deg) scale(1.3)';
            setTimeout(() => {
                heart.style.transform = 'rotate(-45deg) scale(1)';
            }, 300);

            const rect = heart.getBoundingClientRect();
            createFirework(rect.left + 40, rect.top + 40);
        });

        heartGrid.appendChild(heart);
    }
}

function autoOpenHearts() {
    const hearts = document.querySelectorAll('.heart');
    let index = 0;

    const interval = setInterval(() => {
        if (index >= hearts.length) {
            clearInterval(interval);
            triggerFinalEffect(); 
            return;
        }

        const heart = hearts[index];
        const text = heart.querySelector('.heart-text');
        const wish = wishes[index % wishes.length];

        if (text.textContent === "💖") {
            text.textContent = wish;
            heart.style.transform = 'rotate(-45deg) scale(1.3)';
            setTimeout(() => {
                heart.style.transform = 'rotate(-45deg) scale(1)';
            }, 300);

            const rect = heart.getBoundingClientRect();
            createFirework(rect.left + 40, rect.top + 40);
        }

        index++;
    }, 500);
}

function triggerFinalEffect() {
    // Tạo dòng chữ lớn với nền mờ
    const finalMsg = document.createElement('div');
    finalMsg.textContent = "🎉 Anh chúc em bé thi siêu tốt, anh yêu emmmm 💖";
    finalMsg.style.position = 'absolute';
    finalMsg.style.top = '50%';
    finalMsg.style.left = '50%';
    finalMsg.style.transform = 'translate(-50%, -50%)';
    finalMsg.style.fontSize = '2em';
    finalMsg.style.color = '#fff';
    finalMsg.style.padding = '20px 30px';
    finalMsg.style.borderRadius = '15px';
    finalMsg.style.background = 'rgba(0, 0, 0, 0.5)';
    finalMsg.style.backdropFilter = 'blur(5px)';
    finalMsg.style.textAlign = 'center';
    finalMsg.style.zIndex = 999;
    finalMsg.style.textShadow = '2px 2px 10px rgba(0,0,0,0.7)';
    finalMsg.style.animation = 'fadeIn 4s ease-in-out';

    document.body.appendChild(finalMsg);
}

function tryPlayMusic() {
    const music = document.getElementById('bgMusic');
    if (music) {
        music.volume = 0.5;
        music.play().catch((e) => {
            console.warn("Autoplay bị chặn. Sẽ thử lại sau click.", e);
        });
    }
}

function startCelebration() {
    tryPlayMusic();
    document.getElementById('startPage').classList.add('hidden');
    document.getElementById('congratsPage').classList.add('show');
    createStars();
    createHeartGrid();
    autoOpenHearts();
}
