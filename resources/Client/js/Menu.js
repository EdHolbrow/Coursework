function pageLoad() {
    //this hides all the elements on the page at the beginning
    document.getElementById("selectNumPlayers").style.visibility = "hidden";
    document.getElementById("singlePlayer").style.visibility = "hidden";
    document.getElementById("multiPlayer").style.visibility = "hidden";
    document.getElementById("tutorial").style.visibility = "hidden";
    document.getElementById("selectDifficulty").style.visibility = "hidden";
}

function showRules() {
    console.log("Show rules clicked");
    document.getElementById('tutorial').style.visibility = 'visible';
    document.getElementById("selectNumPlayers").style.visibility = "hidden";
    document.getElementById("singlePlayer").style.visibility = "hidden";
    document.getElementById("multiPlayer").style.visibility = "hidden";
    document.getElementById("selectDifficulty").style.visibility = "hidden";
}


function showPlayOptions() {
    document.getElementById("selectNumPlayers").style.visibility = 'visible';
    document.getElementById("tutorial").style.visibility = "hidden";
    document.getElementById("selectDifficulty").style.visibility = "hidden";

}

function showLeaderboard(){
    openDatabase("CWDatabase1.db");
}
function selectGame() {

    if (document.getElementById('r1').checked) {
        document.getElementById("selectNumPlayers").style.visibility = "hidden";
        var players = document.getElementById("numPlayers");  //your code
        console.log("Players is " + players);
        selectDifficulty();

    } else {
        multiPlayer();
    }
}

function selectDifficulty() {
    document.getElementById("selectDifficulty").style.visibility = "visible";
}

function singlePlayer() {
    alert("User selected single player game");
    document.getElementById("singlePlayer").hidden = false; //unhide this section
    //or open a new page, depends on how complex the page is going to get
}

function multiPlayer() {
    alert("User selected multi player game");  //use console.log in Chrome hit F12 and look at console in developer tools
    //if you keep using alert() for testing you'll have to remove them all later :-(
    document.getElementById("multiPlayer").hidden = false;
}

function sortCards(players) {
    var playerCards1 = [];
    var playerCards2 = [];
    var playerCards3 = [];
    var playerCards4 = [];
    for (i = 0; i < players; i++) {
        for (j = 0; j < 4; j++) {
            if (i == 0) {
                playercards1[j] = getCards()
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getCards() {
    var card;
    var value;
    var usedCards = [];
    var match;
    for (i = 0; i < usedCards.length; i++) {
        while (match = false) {
            card = getRandomInt(52) + 1;
            if (card == usedCards[j]) {
                match = true;
            } else {
                match = false
            }
        }
        if (card == 13 || card == 26 || card == 39 || card == 52) {
            value = "king";
        } else if (card == 12 || card == 25 || card == 38 || card == 51) {
            value = "queen";
        } else if (card == 11 || card == 24 || card == 37 || card == 50) {
            value = "jack";
        }
        usedCards[i] = card;
    }
    return value
}