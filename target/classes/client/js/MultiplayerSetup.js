function checkNull() {
    let difficulty = "";
    let nullflag = false;

    if (document.getElementById("2player").checked === false && document.getElementById("3player").checked === false && document.getElementById("4player").checked === false) {
        nullflag = true;
    }
    if (document.getElementById("difficultyEasy").checked === false && document.getElementById("difficultyMedium").checked === false && document.getElementById("difficultyHard").checked === false) {
        nullflag = true;
    }
    if (document.getElementById("difficultyEasy").checked === true) {
        difficulty = "Easy";
        localStorage.setItem("GameDifficulty", difficulty);
    } else if (document.getElementById("difficultyMedium").checked === true) {
        difficulty = "Medium";
        localStorage.setItem("GameDifficulty", difficulty);
    } else if (document.getElementById("difficultyHard").checked === true) {
        difficulty = "Hard";
        localStorage.setItem("GameDifficulty", difficulty);
    }
    if (nullflag === true) {
        alert("an input had been left blank - to play without signing in, select play as guest and choose a difficulty.");
    } else {
        if (document.getElementById("2player").checked === true) {

            window.location.replace(window.location.href = '/client/Multiplayer2PlayerGame.html');

        } else if (document.getElementById("3player").checked === true) {
            window.location.replace(window.location.href = '/client/Multiplayer3PlayerGame.html');

        } else if (document.getElementById("4player").checked === true) {
            window.location.replace(window.location.href = '/client/Multiplayer4PlayerGame.html');

        }
    }
}