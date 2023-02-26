var tube = document.getElementById("tube");
var hole = document.getElementById("hole");
var bird = document.getElementById("bird");
var scoreText = document.getElementById("score");
var scoreBlock = document.getElementById("scoreboard");
var jumping = 0;
var score = 0;

var startScreen = document.getElementById("start-screen");
var gameScreen = document.getElementById("game");
var gameOverScreen = document.getElementById("game-over-screen");
var finalScoreText = document.getElementById("final-score");
var restartBtn = document.getElementById("restart-btn");

function startGame() {
  startScreen.style.display = "none";
  gameScreen.classList.remove("game-over");
  gameScreen.style.display = "block";
  gameOverScreen.style.display = "none";
  scoreBlock.style.display = "block";
  score = 0;
  scoreText.innerHTML = score;
  tube.style.animation = "block 2s infinite linear";
  hole.style.animation = "block 2s infinite linear";

  var gameLoop = setInterval(function () {
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    var birdImg = document.querySelector("#bird img");

    if (jumping == 0) {
        bird.style.top = birdTop + 3 + "px";
        birdImg.style.transform = "rotate(25deg)";
    }

    var tubeLeft = parseInt(window.getComputedStyle(tube).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - birdTop);

    if (
        birdTop > 480 ||
        (tubeLeft < 20 &&
        tubeLeft > -50 &&
        (cTop < holeTop || cTop > holeTop + 130))) {
            clearInterval(gameLoop);
            endGame();
        }

    if (birdTop <= 0) {
        bird.style.top = 0;
        birdImg.style.transform = "rotate(-25deg)";
    }
}, 10);
}

function endGame() {
  gameScreen.style.display = "none";
  gameOverScreen.style.display = "block";
  scoreBlock.style.display = "none";
  document.getElementById("final-score").innerHTML = score;
  clearInterval(gameInterval);
}

function jump() {
  if (!gameScreen.classList.contains("game-over")) {
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
      var birdTop = parseInt(
        window.getComputedStyle(bird).getPropertyValue("top")
      );
      var birdImg = document.querySelector("#bird img");

      if (birdTop > 6 && jumpCount < 15) {
        bird.style.top = birdTop - 5 + "px";
        birdImg.style.transform = "rotate(-25deg)";
      }
      if (jumpCount > 20) {
        clearInterval(jumpInterval);
        jumping = 0;
        jumpCount = 0;
      }
      jumpCount++;
    }, 10);
  }
}

hole.addEventListener("animationiteration", () => {
var random = -((Math.random() * 300) + 150);
hole.style.top = random + "px";
score++;
scoreText.innerHTML = score;
});

restartBtn.addEventListener("click", function() {
  location.reload();
});

