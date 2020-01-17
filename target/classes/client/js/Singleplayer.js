function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function setGuest(){
    document.getElementById("playername").value = "Guest";
    document.getElementById("passwrd").value = "password1";
    document.getElementById("userID").value = 0;


}
function checkNull(){
    let difficulty = "";
    let nullflag = false;
    let playerName = "";
    let userID = 0;
    let password = "";

    if(document.getElementById("playername").value === ""){
        nullflag = true;

    } else{

       playerName = document.getElementById("playername").value;
        localStorage.setItem("playerName", playerName);
    }

    if(document.getElementById("passwrd").value === ""){
        nullflag = true;
    } else{
        password = document.getElementById("passwrd").value;
        localStorage.setItem("password", password);
    }

    if(document.getElementById("userID").value === null){

        nullflag = true;
    }else{

        userID = document.getElementById("userID").value;
        localStorage.setItem("UserID", userID);
    }

    if(document.getElementById("difficultyEasy").checked === false && document.getElementById("difficultyMedium").checked === false && document.getElementById("difficultyHard").checked === false){
        nullflag = true;

    }
    if(document.getElementById("difficultyEasy").checked === true ){
        difficulty = "Easy";
        localStorage.setItem("GameDifficulty", difficulty);
    } else if(document.getElementById("difficultyMedium").checked === true ){
        difficulty = "Medium";
        localStorage.setItem("GameDifficulty", difficulty);
    }else if(document.getElementById("difficultyHard").checked === true){
        difficulty = "Hard";
        localStorage.setItem("GameDifficulty", difficulty);
    }
    if(nullflag === true){
        alert("an input had been left blank - to play without signing in, select play as guest and choose a difficulty.");
    } else {
        window.location.replace(window.location.href='/client/SingleplayerGame.html');
    }

}