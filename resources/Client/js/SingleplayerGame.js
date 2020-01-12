function gameSetup(){
    var gamedifficulty = localStorage.getItem("GameDifficulty");
alert(gamedifficulty);
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
    alert("test");
    document.getElementById("playbuttondiv").style.visibility = "hidden";
    getCards();
}
function getCards() {
    alert("test2");
    let card;
    let cardArray = [0,0,0,0];
    let value;
    let usedCards = [];
    let match;
    for (i = 1; i < 5; i++) {
        while (match === true) {
            card = getRandomInt(51) + 1;

            if (card === usedCards[j]) {
                match = true;
            } else {
                match = false
            }
        }
        if (card === 13 || card === 26 || card === 39 || card === 52) {
            value = "king";
        } else if (card === 12 || card === 25 || card === 38 || card === 51) {
            value = "queen";
        } else if (card === 11 || card === 24 || card === 37 || card === 50) {
            value = "jack";
        }else{
            value = card;
        }


        usedCards.push(card);
        cardArray[i-1] = value;
        alert(cardArray[i-1]);
    }
assignToCards.apply(null,cardArray);
}
function getRandomInt(max) {
    val = Math.floor(Math.random() * Math.floor(max));
    alert(val);
    return val;
}
function assignToCards(cardArray){
alert(cardArray[1]);
}