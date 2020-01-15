let deckCard = 0;
let clickCount = 0;
let assignCount1 = 0;
let assignCount2 = 0;
let assignCount3 = 0;
let assignCount4 = 0;
let trueValue1 = 0;
let trueValue2 = 0;
let trueValue3 = 0;
let trueValue4 = 0;
let cardCount = 0;
let cardDrawn = false;
let roundcount = 0;
function gameSetup() {
    let gamedifficulty = localStorage.getItem("GameDifficulty");


    if (gamedifficulty === "Easy") {
        roundcount = 8;
    } else if (gamedifficulty === "Medium") {
        roundcount = 6;
    } else if (gamedifficulty === "Hard") {
        roundcount = 4;
    }
    document.getElementById("timer").textContent = roundcount + " rounds left!";
    document.getElementById("hidebutton").style.visibility = "hidden";
}

function startGame() {

    document.getElementById("playbuttondiv").style.visibility = "hidden";
    getCards("hand");
}

function getCards(handordeck) {
    let card = 0;
    let cardArray = [0, 0, 0, 0];
    let usedCards = [];
    let match = false;

    if (handordeck === "hand") {
        for (j = 1; j < 5; j++) {
            do {
                card = getRandomInt(51) + 1;

                if (usedCards.length > 1) {
                    for (i = 0; i < usedCards.length - 1; i++) {
                        if (card === usedCards[i]) {
                            match = true;
                        } else {
                            match = false;
                        }
                    }
                }
            } while (match === true) ;
            cardArray[j - 1] = card;
        }
        assignToCards(cardArray)
    }
    if (handordeck === "deck") {
        do {
            card = getRandomInt(51) + 1;

            if (usedCards.length > 1) {
                for (i = 0; i < usedCards.length - 1; i++) {
                    if (card === usedCards[i]) {
                        match = true;
                    } else {
                        match = false;
                    }
                }
            }
        } while (match === true) ;
        deckCard = card;
        usedCards.push(card);
        changeCard(card, 5);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function assignToCards(cardArray) {
    for (i = 0; i < 4; i++) {
        if (i === 0) {
            card1Show(cardArray[i])
        }
        if (i === 1) {
            card2Show(cardArray[i])
        }
        if (i === 2) {
            card3Show(cardArray[i])
        }
        if (i === 3) {
            card4Show(cardArray[i])
        }
    }
    confirm("Let's play! Click two cards to see their value - make sure to remember the values!");
}



function card1Show(cardValue) {
    if (cardValue !== 0) {
        assignCount1 = 1;
        trueValue1 = cardValue;
    } else if (cardValue === 0 && assignCount1 === 1 && clickCount < 2) {
        clickCount += 1;
        changeCard(trueValue1, 1);
    } else if (cardDrawn === true) {
        trueValue1 = deckCard;
        cardDrawn = false;
        document.getElementById("deck").src = "img/Card%20Back.png";
        roundcount -=1;
        changeTimer();
    }
}

function card2Show(cardValue) {
    if (cardValue !== 0) {
        assignCount2 = 1;
        trueValue2 = cardValue;
    } else if (cardValue === 0 && assignCount2 === 1 && clickCount < 2) {
        clickCount += 1;
        changeCard(trueValue2, 2);
    } else if (cardDrawn === true) {
        trueValue2 = deckCard;
        cardDrawn = false;
        document.getElementById("deck").src = "img/Card%20Back.png";
        roundcount -=1;
        changeTimer();
    }
}

function card3Show(cardValue) {
    if (cardValue !== 0) {
        assignCount3 = 1;
        trueValue3 = cardValue;
    } else if (cardValue === 0 && assignCount3 === 1 && clickCount < 2) {
        clickCount += 1;
        changeCard(trueValue3, 3);
    } else if (cardDrawn === true) {
        trueValue3 = deckCard;
        cardDrawn = false;
        document.getElementById("deck").src = "img/Card%20Back.png";
        roundcount -=1;
        changeTimer();

    }
}

function card4Show(cardValue) {
    if (cardValue !== 0) {
        assignCount4 = 1;
        trueValue4 = cardValue;
    } else if (cardValue === 0 && assignCount4 === 1 && clickCount < 2) {
        clickCount += 1;
        changeCard(trueValue4, 4);
    } else if (cardDrawn === true) {
        trueValue4 = deckCard;
        cardDrawn = false;
        document.getElementById("deck").src = "img/Card%20Back.png";
        roundcount -=1;
        changeTimer();
    }
}

function hideCards() {
    document.getElementById("card1").src = "img/Card%20Back.png";
    document.getElementById("card2").src = "img/Card%20Back.png";
    document.getElementById("card3").src = "img/Card%20Back.png";
    document.getElementById("card4").src = "img/Card%20Back.png";
}



function drawCard() {
    if (cardDrawn === false) {
        if (assignCount1 === 1 && assignCount2 === 1 && assignCount3 === 1 && assignCount4 === 1) {
            cardDrawn = true;
            getCards("deck");
        }
    }
}

function discardCard() {
    if (cardDrawn === true) {
        cardDrawn = false;
        changeCard(deckCard, 6);
        document.getElementById("deck").src = "img/Card%20Back.png";
        roundcount -=1;
        changeTimer();
    }
}

function changeTimer(){
    if(roundcount === 0){
        document.getElementById("timer").textContent = "Finished!";
        endgame();
    } else if(roundcount === 1){
        document.getElementById("timer").textContent = "Last turn!";
    }else{
        document.getElementById("timer").textContent = roundcount + " rounds left!";
    }
}

function endgame(){
    let score = 0;

}

function changeCard(cardValue, cardNum) {
    cardCount += 1;
    if (cardCount === 2) {
        document.getElementById("hidebutton").style.visibility = "visible";
    }
    switch (cardValue) {
        case 1:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/AH.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/AH.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/AH.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/AH.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/AH.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/AH.png";
                    break;
            }
            break;
        case 2:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/2H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/2H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/2H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/2H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/2H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/2H.png";
                    break;
            }
            break;
        case 3:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/3H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/3H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/3H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/3H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/3H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/3H.png";
                    break;
            }
            break;
        case 4:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/4H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/4H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/4H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/4H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/4H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/4H.png";
                    break;
            }
            break;
        case 5:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/5H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/5H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/5H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/5H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/5H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/5H.png";
                    break;
            }
            break;
        case 6:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/6H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/6H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/6H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/6H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/6H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/6H.png";
                    break;
            }
            break;
        case 7:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/7H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/7H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/7H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/7H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/7H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/7H.png";
                    break;
            }
            break;
        case 8:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/8H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/8H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/8H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/8H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/8H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/8H.png";
                    break;
            }
            break;
        case 9:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/9H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/9H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/9H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/9H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/9H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/9H.png";
                    break;
            }
            break;
        case 10:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/10H.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/10H.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/10H.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/10H.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/10H.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/10H.png";
                    break;
            }
            break;
        case 11:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/JH.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/JH.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/JH.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/JH.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/JH.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/JH.png";
                    break;
            }
            break;
        case 12:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/QH.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/QH.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/QH.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/QH.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/QH.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/QH.png";
                    break;
            }
            break;
        case 13:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/KH.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/KH.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/KH.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/KH.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/KH.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/KH.png";
                    break;
            }
            break;
        case 14:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/AC.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/AC.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/AC.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/AC.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/AC.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/AC.png";
                    break;
            }
            break;
        case 15:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/2C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/2C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/2C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/2C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/2C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/2C.png";
                    break;
            }
            break;
        case 16:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/3C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/3C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/3C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/3C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/3C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/3C.png";
                    break;
            }
            break;
        case 17:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/4C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/4C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/4C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/4C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/4C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/4C.png";
                    break;
            }
            break;
        case 18:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/5C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/5C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/5C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/5C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/5C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/5C.png";
                    break;
            }
            break;
        case 19:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/6C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/6C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/6C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/6C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/6C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/6C.png";
                    break;
            }
            break;
        case 20:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/7C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/7C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/7C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/7C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/7C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/7C.png";
                    break;
            }
            break;
        case 21:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/8C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/8C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/8C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/8C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/8C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/8C.png";
                    break;
            }
            break;
        case 22:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/9C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/9C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/9C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/9C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/9C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/9C.png";
                    break;
            }
            break;
        case 23:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/10C.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/10C.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/10C.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/10C.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/10C.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/10C.png";
                    break;
            }
            break;
        case 24:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/JC.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/JC.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/JC.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/JC.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/JC.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/JC.png";
                    break;
            }
            break;
        case 25:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/QC.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/QC.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/QC.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/QC.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/QC.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/QC.png";
                    break;
            }
            break;
        case 26:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/KC.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/KC.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/KC.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/KC.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/KC.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/KC.png";
                    break;
            }
            break;
        case 27:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/AD.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/AD.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/AD.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/AD.png";
                    break;

                case 5:
                    document.getElementById("deck").src = "img/AD.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/AD.png";
                    break;
            }
            break;
        case 28:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/2D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/2D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/2D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/2D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/2D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/2D.png";
                    break;
            }
            break;
        case 29:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/3D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/3D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/3D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/3D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/3D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/3D.png";
                    break;
            }
            break;
        case 30:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/4D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/4D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/4D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/4D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/4D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/4D.png";
                    break;
            }
            break;
        case 31:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/5D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/5D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/5D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/5D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/5D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/5D.png";
                    break;
            }
            break;
        case 32:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/6D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/6D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/6D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/6D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/6D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/6D.png";
                    break;
            }
            break;
        case 33:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/7D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/7D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/7D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/7D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/7D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/7D.png";
                    break;
            }
            break;
        case 34:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/8D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/8D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/8D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/8D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/8D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/8D.png";
                    break;
            }
            break;
        case 35:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/9D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/9D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/9D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/9D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/9D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/9D.png";
                    break;
            }
            break;
        case 36:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/10D.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/10D.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/10D.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/10D.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/10D.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/10D.png";
                    break;
            }
            break;
        case 37:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/JD.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/JD.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/JD.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/JD.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/JD.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/JD.png";
                    break;
            }
            break;
        case 38:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/QD.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/QD.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/QD.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/QD.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/QD.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/QD.png";
                    break;
            }
            break;
        case 39:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/KD.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/KD.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/KD.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/KD.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/KD.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/KD.png";
                    break;
            }
            break;
        case 40:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/AS.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/AS.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/AS.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/AS.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/AS.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/AS.png";
                    break;
            }
            break;
        case 41:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/2S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/2S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/2S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/2S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/2S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/2S.png";
                    break;
            }
            break;
        case 42:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/3S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/3S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/3S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/3S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/3S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/3S.png";
                    break;
            }
            break;
        case 43:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/4S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/4S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/4S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/4S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/4S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/4S.png";
                    break;
            }
            break;
        case 44:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/5S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/5S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/5S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/5S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/5S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/5S.png";
                    break;
            }
            break;
        case 45:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/6S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/6S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/6S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/6S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/6S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/6S.png";
                    break;
            }
            break;
        case 46:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/7S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/7S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/7S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/7S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/7S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/7S.png";
                    break;
            }
            break;
        case 47:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/8S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/8S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/8S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/8S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/8S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/8S.png";
                    break;
            }
            break;
        case 48:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/9S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/9S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/9S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/9S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/9S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/9S.png";
                    break;
            }
            break;
        case 49:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/10S.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/10S.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/10S.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/10S.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/10S.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/10S.png";
                    break;
            }
            break;
        case 50:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/JS.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/JS.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/JS.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/JS.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/JS.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/JS.png";
                    break;
            }
            break;
        case 51:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/QS.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/QS.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/QS.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/QS.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/QS.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/QS.png";
                    break;
            }
            break;
        case 52:
            switch (cardNum) {
                case 1:
                    document.getElementById("card1").src = "img/KS.png";
                    break;
                case 2:
                    document.getElementById("card2").src = "img/KS.png";
                    break;
                case 3:
                    document.getElementById("card3").src = "img/KS.png";
                    break;
                case 4:
                    document.getElementById("card4").src = "img/KS.png";
                    break;
                case 5:
                    document.getElementById("deck").src = "img/KS.png";
                    break;
                case 6:
                    document.getElementById("discard").src = "img/KS.png";
                    break;
            }
            break;


        default:

    }
}

