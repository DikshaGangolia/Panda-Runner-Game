let score = 0;
let cross = true;
let isJumping = false;
let logSpeed = 5;
let nextMilestone = 10;

const giftVideo = document.getElementById('giftVideo');
const panda = document.getElementById('panda');
const log = document.getElementById('log');
const scoreCont = document.getElementById('scoreCont');
const gameOverText = document.querySelector('.gameOver');
const startBtn = document.getElementById('startBtn');

const bgMusic = new Audio('Gaintpanda-theme.mp3');
const gameOverSound = new Audio('gameover.mp3');
bgMusic.loop = true;

// Hide start button and start game
startBtn.addEventListener('click', () => {
    bgMusic.play().catch(err => console.log("Autoplay blocked:", err));
    startBtn.style.display = 'none';
    startLogAnimation();
});

// Keyboard controls
document.addEventListener('keydown', e => {
    const pandaLeft = parseInt(window.getComputedStyle(panda).left);

    // Jump
    if (e.key === 'ArrowUp' && !isJumping) {
        panda.classList.add('jump');
        isJumping = true;
        setTimeout(() => {
            panda.classList.remove('jump');
            isJumping = false;
        }, 600);
    }

    // Move Left
    if (e.key === 'ArrowLeft') {
        if (pandaLeft > 10) {
            panda.style.left = pandaLeft - 20 + 'px';
        }
    }

    // Move Right
    if (e.key === 'ArrowRight') {
        if (pandaLeft < window.innerWidth - 220) {
            panda.style.left = pandaLeft + 20 + 'px';
        }
    }
});

// log animation control
function startLogAnimation() {
    log.style.animation = `moveLog ${logSpeed}s linear infinite`;
}

function stopLogAnimation() {
    log.style.animation = 'none';
}

// Collision and scoring logic
setInterval(() => {
    let bx = parseInt(window.getComputedStyle(panda).left);
    let by = parseInt(window.getComputedStyle(panda).bottom);
    let px = parseInt(window.getComputedStyle(log).left);
    let py = parseInt(window.getComputedStyle(log).bottom);
    let offsetX = Math.abs(bx - px);
    let offsetY = Math.abs(by - py);

    if (offsetX < 50 && offsetY < 50) {
        gameOverText.innerHTML = 'Game Over - Reload to Play Again';
        stopLogAnimation();
        bgMusic.pause();
        gameOverSound.play();
    } else if (offsetX < 120 && cross) {
        score++;
        updateScore(score);
        cross = false;

        if (score === nextMilestone) {
            logSpeed = Math.max(2, logSpeed - 0.5);
            startLogAnimation();
            showGiftVideo();
            nextMilestone += 10;
        }

        setTimeout(() => { cross = true; }, 1000);
    }
}, 100);

function updateScore(score) {
    scoreCont.innerHTML = 'Your Score: ' + score;
}

function showGiftVideo() {
    giftVideo.style.display = 'block';
    giftVideo.currentTime = 0;
    giftVideo.play();

    setTimeout(() => {
        giftVideo.pause();
        giftVideo.style.display = 'none';
    }, 3000);
}
