document.addEventListener('DOMContentLoaded', () => {
    const balloonColors = ['blue', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'];
    const totalFrames = 6;
    const interval = 100; // milliseconds
    const riseDuration = 5000; // 5 seconds
    let score = 0;
    let missedBalloons = 0;
    const maxMissedBalloons = 10;
    const scoreboard = document.getElementById('scoreboard');
    const missedCount = document.getElementById('missed');
    const gameOverMessage = document.getElementById('game-over');

    function updateMissedCount() {
        missedCount.textContent = `Missed: ${missedBalloons}`;
    }

    function updateScoreboard() {
        scoreboard.textContent = `Score: ${score}`;
    }

    function endGame() {
        gameOverMessage.style.display = 'block';
        document.querySelectorAll('.balloon').forEach(balloon => {
            balloon.remove();
        });
    }

    function createBalloon() {
        if (missedBalloons >= maxMissedBalloons) {
            endGame();
            return;
        }

        const balloonColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const balloon = document.createElement('img');
        balloon.src = `${balloonColor}-balloon/1.png`;
        balloon.className = `balloon ${balloonColor}`;
        balloon.style.left = `${Math.random() * 90}vw`;

        document.querySelector('.game-frame').appendChild(balloon);

        // option for game (1.click) , (2.mouseover)

        balloon.addEventListener('click', () => {
            let currentFrame = 1;

            const balloonAnimation = setInterval(() => {
                if (currentFrame <= totalFrames) {
                    balloon.src = `${balloonColor}-balloon/${currentFrame}.png`;
                    currentFrame++;
                } else {
                    clearInterval(balloonAnimation);
                    balloon.remove();
                }
            }, interval);

            score += 5;
            updateScoreboard();
        });

        setTimeout(() => {
            if (document.querySelector('.game-frame').contains(balloon)) {
                balloon.remove();
                missedBalloons++;
                updateMissedCount();
                if (missedBalloons >= maxMissedBalloons) {
                    endGame();
                }
            }
        }, riseDuration);
    }

    setInterval(createBalloon, 1000); // Create a new balloon every second
});
