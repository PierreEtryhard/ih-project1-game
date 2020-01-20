var btnRules = document.getElementById("btn-rules");

function popRules() {
    var rules = document.getElementById("pop-game-rules");
    if (rules.classList.contains("hidden")) {
        rules.classList.replace("hidden", "visible")
    } else {
        rules.classList.replace("visible", "hidden")
    }
}

btnRules.onclick = popRules;