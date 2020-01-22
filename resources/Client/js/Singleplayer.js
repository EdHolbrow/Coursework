//having a guest allows the user to play without having their data stored
function setGuest() {
    document.getElementById("playername").value = "Guest";
    document.getElementById("passwrd").value = "password1";
    document.getElementById("userid").value = 0;
}

function checkNull() {
    let difficulty = "";
    let nullflag = false;
    if (document.getElementById("playername").value === "") {
        nullflag = true;
    }
    if (document.getElementById("passwrd").value === "") {
        nullflag = true;
    }
    if (document.getElementById("userid").value === "") {
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
        //puts values in local storage so they can be accessed by other pages
        localStorage.setItem("currentPlayer", document.getElementById("playername").value);
        localStorage.setItem("currentID", document.getElementById("userid").value);
        window.location.replace(window.location.href = '/client/SingleplayerGame.html');
    }
}