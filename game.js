const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const lemurImage = new Image();
lemurImage.src = 'lemur.png'; // Asegúrate de tener una imagen de lemur

const lemur = {
    x: 50,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 5
};

let bullets = [];
const bulletSpeed = 7;
const bulletInterval = 1500; // Milisegundos

let lastBulletTime = 0;

function drawLemur() {
    ctx.drawImage(lemurImage, lemur.x, lemur.y, lemur.width, lemur.height);
}

function createBullet() {
    bullets.push({
        x: canvas.width,
        y: Math.random() * canvas.height,
        width: 10,
        height: 10
    });
}

function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function updateBullets() {
    bullets.forEach(bullet => {
        bullet.x -= bulletSpeed;
    });
    bullets = bullets.filter(bullet => bullet.x > 0);
}

function checkCollisions() {
    for (let bullet of bullets) {
        if (bullet.x < lemur.x + lemur.width &&
            bullet.x + bullet.width > lemur.x &&
            bullet.y < lemur.y + lemur.height &&
            bullet.y + bullet.height > lemur.y) {
            alert('¡Te han dado!');
            document.location.reload();
        }
    }
}

function gameLoop(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLemur();
    drawBullets();

    if (timestamp - lastBulletTime > bulletInterval) {
        createBullet();
        lastBulletTime = timestamp;
    }

    updateBullets();
    checkCollisions();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && lemur.y > 0) {
        lemur.y -= lemur.speed;
    }
    if (e.key === 'ArrowDown' && lemur.y < canvas.height - lemur.height) {
        lemur.y += lemur.speed;
    }
});

lemurImage.onload = () => {
    requestAnimationFrame(gameLoop);
};
