const gamer = document.getElementById("player");
const missiles = document.getElementById("missiles");
const enemiesDom = document.getElementById("enemies");

const player = {
    top: 750,
    left: 800,
    speed: 50,
    score: 0
};

const enemies = {
    speed: 1,
    number: 3,
    isKilled: false
}

let timer = 0;
let cptMissiles = 0;
let cptMissEnemies = 0;
let cptEnemyKilled = 0;
const enemiesArray = [];
const enemiesMissilesArray = [];
const missilesArray = [];

// Section PLAYER

function interactWithPlayer(e) {
    if(e.keyCode == 37 && isInTheMap()) {
        player.left -= player.speed;
        drawPlayerLat();
    } else if(e.keyCode == 39 && isInTheMap()) {
        player.left += player.speed;
        drawPlayerLat();
    } else if (e.keyCode == 38 && isInTheMap()) {
        player.top -= player.speed;
        drawPlayerVert();
    } else if (e.keyCode == 40 && isInTheMap()) {
        player.top += player.speed;
        drawPlayerVert();
    } else if (e.keyCode == 32) {
        missilesArray.push({
            left: player.left + 65,
            top: player.top,
        });
        playLaser();
        cptMissiles += 1;
    }
}

function isInTheMap() {
    if (player.top < 0 ) {
        console.log("can't move")
        player.top = 0;
    } else if (player.left < 120) {
        console.log("can't move")
        player.left = 120;
    } else if (player.top > 750) {
        console.log("can't move")
        player.top = 750;
    } else if (player.left > 1420) {
        console.log("can't move");
        player.left = 1420;
    } else {
        console.log("in the map")
        return true;
    }
}

function drawPlayerLat() {
    gamer.style.left = player.left + "px";
    console.log("player one's x = " + player.left);
}

function drawPlayerVert() {
    gamer.style.top = player.top + "px";
    console.log("player one's x = " + player.top);
} 


// Section MISSILES
function movePlayerMissiles() {
    for (let i = 0; i < missilesArray.length; i++) {
        missilesArray[i].top = missilesArray[i].top - 5;
    }
    removeMissiles();
    requestAnimationFrame(movePlayerMissiles);
}

function drawPlayerMissiles() {
    missiles.innerHTML = "";
    for (let i = 0; i < missilesArray.length; i++) {
        missiles.innerHTML += `<div class="missile" style="left: ${missilesArray[i].left}px; top:${missilesArray[i].top}px;"></div>`
    }
    requestAnimationFrame(drawPlayerMissiles);
}

function removeMissiles() {
    let mis = document.querySelector(".missile");
    for (let i = 0; i<missilesArray.length; i++) {
        if (missilesArray[i].top < 0) {
            mis.remove();
            missilesArray.splice(missilesArray[i], 1);
        }
    }
    return missilesArray;
}


// Section ENEMIES
function drawEnemies() {
    enemiesDom.innerHTML = "";
    for (let i = 0; i < enemiesArray.length; i++) {
        enemiesDom.innerHTML += `<div class="enemy" style="left: ${enemiesArray[i].left}px; top:${enemiesArray[i].top}px;"></div>`
    }  
    requestAnimationFrame(drawEnemies);
}

function moveEnemies() {
    for (let i = 0; i < enemiesArray.length; i++) {
        enemiesArray[i].top = enemiesArray[i].top + enemies.speed;
    }
    requestAnimationFrame(moveEnemies);
    removeEnemies();
}

function removeEnemies() {
    var enemy = document.querySelector(".enemy");
    for (let i = 0; i<enemiesArray.length; i++) {
        if (enemiesArray[i].top > 850) {
            enemy.remove();
            enemiesArray.splice(enemiesArray[i], 1);
            cptMissEnemies += 1;
            if (cptMissEnemies === 5) {
                displayGo();
                displayMissiles();
            }
        }
    }
}

function createEnemies(nbr) {
    for(let i=0; i<nbr; i++) {
        enemiesArray.push({
            left: Math.floor(Math.random() * 1300 + 50),
            top: Math.floor(Math.random() * (-400) + (-10))
        })
    } 
}

createEnemies(enemies.number);

// function modifySpec() {
//     if (timer %  20 === 0) {
//         enemies.number += 2;
//         enemies.speed += 1;
//         player.speed += 2;
//     }
//     if(timer % 40 === 0){
//         enemies.number += 4;
//         enemies.speed +=2;
//         player.speed += 3;
//     }
//     if (timer % 60 === 0) {
//         enemies.number += 6;
//         enemies.speed += 3;
//         player.speed += 4;
//     }
//     if (timer % 90 === 0) {
//         enemies.number += 8;
//         enemies.speed += 4;
//         player.speed += 5;
//     }
// }

let enemyInterval = window.setInterval(() => createEnemies(enemies.number), 3000);

// Collision 

function detectCollision() {
    const enm = document.querySelectorAll(".enemy");
    for (let i=0; i<enemiesArray.length; i++) {
        for (let j=0; j<missilesArray.length; j++) {
            if ((missilesArray[j].top <= enemiesArray[i].top + 70) && 
                (missilesArray[j].top > enemiesArray[i].top) &&
                (missilesArray[j].left >= enemiesArray[i].left) &&
                (missilesArray[j].left <= enemiesArray[i].left + 70)
            ){
                enemiesArray.splice(i,1);
                missilesArray.splice(j,1);
                playExplo();
                cptEnemyKilled += 1;
                player.score += 5;
            }
        }
    }
}

// Section GAME 

function draw() {
    drawPlayerMissiles();
    movePlayerMissiles();
    drawPlayerVert();
    drawPlayerLat();
    drawEnemies();
    moveEnemies();
}

// function runTimer() {
//     const startTimer = () => {
//         timer += 1;
//     };
//     intervalId = setInterval(startTimer, 1000);
// }

function startGame() {
    // runTimer();
    gameLoop();
}

// function gameOver() {
//     // stopGame();
//     alert("you fucking loser !");
// }
let gameInterval = window.setInterval(gameLoop, 70);
function gameLoop() {
    detectCollision();
    displayScore();
    // modifySpec();
}

const startBtn = document.getElementById("start");
const restartGame = document.getElementById("play-again");

//Anim button
function removePopUp() {
    const box = document.getElementById("box-start");
    box.style.display = "none";
}

function displayGo() {
    const goBox = document.getElementById("box-go");
    goBox.style.display = "flex";
}

function disapGo() {
    const goBox = document.getElementById("box-go");
    goBox.style.display = "flex";
}

startBtn.onclick = function() {
    removePopUp()
    gameLoop();
    requestAnimationFrame(draw);
};
restartGame.onclick = function () {
    location.reload();
}

//display score
function displayScore() {
    let score = document.getElementById("score");
    score.textContent = player.score;
}

function displayMissiles() {
    const missi = document.getElementById("missthrew");
    missi.textContent = "Missiles threw : " + cptMissiles;
    const killed = document.getElementById("enmkilled");
    killed.textContent = "Enemnies killed : " + cptEnemyKilled;
}  

document.onkeydown = interactWithPlayer



//music 

function playLaser() {
    var audio = new Audio('./assets/music/laser.mp3');
        audio.volume = 0.2;
       audio.play();
       return false;
}

function playExplo() {
    var audio = new Audio('./assets/music/explosion.mp3');
    audio.volume = 0.2;
    audio.play();
    return false;
}