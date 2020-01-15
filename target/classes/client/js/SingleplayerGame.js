function gameSetup(){
    let gamedifficulty = localStorage.getItem("GameDifficulty");

   let roundcount = 0;
    if(gamedifficulty === "Easy"){
        roundcount = 8;
    } else if(gamedifficulty === "Medium"){
        roundcount = 6;
    }else if(gamedifficulty === "Hard"){
        roundcount = 4;
    }
    document.getElementById("timer").textContent = roundcount + " rounds left!";
}
function startGame() {

    document.getElementById("playbuttondiv").style.visibility = "hidden";
    getCards();
}
function getCards() {
    let card = 0;
    let cardArray = [0,0,0,0];
    let value = 0;
    let usedCards = [];
    let match=false;
    for (j = 1; j<5;j++) {
        do {
            card = getRandomInt(51) + 1;
            if (usedCards.length > 1) {
                for (i = 0; i < usedCards.length -1 ; i++) {
                    if (card === usedCards[i]) {
                        match = true;
                    } else {
                        match = false;
                    }
                }
            }
        } while (match === true) ;


        if (card === 13 || card === 26 || card === 39 || card === 52) {
            value = "king";
        } else if (card === 12 || card === 25 || card === 38 || card === 51) {
            value = "queen";
        } else if (card === 11 || card === 24 || card === 37 || card === 50) {
            value = "jack";
        } else {
            value = card;
        }

        usedCards.push(card);
        cardArray[j - 1] = value;

        alert(j + "turn");
    }
    assignToCards(cardArray)
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function assignToCards(cardArray){
    for(i=0; i <4;i++)
    {
        alert(cardArray[i]);
    }
}