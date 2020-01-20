const gamer = document.getElementById("player");
const missiles = document.getElementById("missiles");

const player = {
    top: 750,
    left: 800,
    speed: 50,
};

const playerMissiles = {
    top: -20,
    left: -20,
    speed: 100,
}

const missilesArray = [];

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
// requestAnimationFrame(draw);

function interactWithPlayer(e) {
    if(e.keyCode == 37 && isInTheMap()) {
        console.log("left");
        player.left -= player.speed;
        drawPlayerLat();
    } else if(e.keyCode == 39 && isInTheMap()) {
        console.log("right");
        player.left += player.speed;
        drawPlayerLat();
    } else if (e.keyCode == 38 && isInTheMap()) {
        console.log("up");
        player.top -= player.speed;
        drawPlayerVert();
    } else if (e.keyCode == 40 && isInTheMap()) {
        console.log("down");
        player.top += player.speed;
        drawPlayerVert();
    } else if (e.keyCode == 32 && isInTheMap()) {
        console.log("FIRE !!!!"); 
        missilesArray.push({
            left: player.left - 90,
            top: player.top,
        });
        drawMissiles();
    }
}

function drawMissiles() {
    missiles.innerHTML = "";
    for (let i = 0; i < missilesArray.length; i++) {
        missiles.innerHTML += `<div class="missile" style="left: ${missilesArray[i].left}px; top:${missilesArray[i].top}px;"></div>`
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

// function gameLoop() {
//     setTimeout(gameLoop, 100)
// }

document.onkeydown = interactWithPlayer;