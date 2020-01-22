let deckCard = 0;
let clickCount = 0;
let clickCount2 = 0;
let clickCount3 = 0;
let assignCount1 = 0;
let assignCount2 = 0;
let assignCount3 = 0;
let assignCount4 = 0;
let assignCount5 = 0;
let assignCount6 = 0;
let assignCount7 = 0;
let assignCount8 = 0;
let assignCount9 = 0;
let assignCount10 = 0;
let assignCount11 = 0;
let assignCount12 = 0;
let showFlag1 = false;
let showFlag2 = false;
let showFlag3 = false;
let trueValue1 = 0;
let trueValue2 = 0;
let trueValue3 = 0;
let trueValue4 = 0;
let trueValue5 = 0;
let trueValue6 = 0;
let trueValue7 = 0;
let trueValue8 = 0;
let trueValue9 = 0;
let trueValue10 = 0;
let trueValue11 = 0;
let trueValue12 = 0;
let gameEnd = false;
let cardCount1 = 0;
let cardCount2 = 0;
let cardCount3 = 0;
let cardDrawn = false;
let roundcount = 0;
let discardCount = 0;
let firstPlayerFlag = false;
let secondPlayerFlag = false;
let thirdPlayerFlag = false;
//large usage of global variables is considered bad practice, but global variables are neccessary to keep values
//between functions, otherwise values would be overwritten

//simple function that returns to menu
function gotoMenu() {
    let quitVar = confirm("Are you sure you want to leave?");
    if (quitVar === true) {
        window.location.replace(window.location.href = '/client/Menu.html');
    }
}

//creates alert box with rules
function showHelp() {
    alert("The aim of the game is to get the lowest score in the amount of rounds you have, each card scores its number," +
        " a pair of cards scores 0 and so do kings. Whereas jacks and queens score ten each, so try and get pairs and " +
        "kings to score as low as possible!" + " You can discard cards if you don't want them in your hand.")
}

//setup function performed on load
function gameSetup() {
    //assigns timer based on difficulty chose
    let gamedifficulty = localStorage.getItem("GameDifficulty");
    if (gamedifficulty === "Easy") {
        roundcount = 8;
    } else if (gamedifficulty === "Medium") {
        roundcount = 6;
    } else if (gamedifficulty === "Hard") {
        roundcount = 4;
    }
    document.getElementById("timer").textContent = roundcount + " rounds left!";
    //hides html elements that aren't needed yet
    document.getElementById("hidebutton1").style.visibility = "hidden";
    document.getElementById("hidebutton2").style.visibility = "hidden";
    document.getElementById("hidebutton3").style.visibility = "hidden";
    document.getElementById("labels").style.visibility = "hidden";
    document.getElementById("winnerLabel").style.visibility = "hidden";
}

// performed when play button is clicked - initiates the assignment of card values
function startGame() {
    gameEnd = false;
    showFlag1 = false;
    showFlag2 = false;
    document.getElementById("playbutton").style.visibility = "hidden";
    getCards("hand");
}

//card value generating function
function getCards(handordeck) {
    let card = 0;
    let cardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let usedCards = [];
    let match = false;
    //generates cards for the hand at the beginning of the game
    if (handordeck === "hand") {
        for (j = 1; j < 13; j++) {
            //used to stop the same card being pulled twice
            do {
                match = false;
                card = getRandomInt(51) + 1;
                if (usedCards.length > 1) {
                    for (i = 0; i < usedCards.length; i++) {
                        if (card === usedCards[i]) {
                            match = true;
                        }
                    }
                }
            } while (match === true) ;
            usedCards.push(card);
            cardArray[j - 1] = card;
        }
        assignToCards(cardArray)
    }
    //used to generate the card pulled from the deck
    if (handordeck === "deck") {
        //used to stop the same card being pulled twice
        do {
            match = false;
            card = getRandomInt(51) + 1;
            if (usedCards.length > 1) {
                for (i = 0; i < usedCards.length; i++) {
                    if (card === usedCards[i]) {
                        match = true;
                    }
                }
            }
        } while (match === true) ;
        deckCard = card;
        usedCards.push(card);
        changeCard(card, 13);
    }

}
//random number generator
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//assigns values to cards
function assignToCards(cardArray) {
    for (i = 0; i < 12; i++) {
        switch (i) {
            case 0:
                card1Show(cardArray[i]);
                break;
            case 1:
                card2Show(cardArray[i]);
                break;
            case 2:
                card3Show(cardArray[i]);
                break;
            case 3:
                card4Show(cardArray[i]);
                break;
            case 4:
                card5Show(cardArray[i]);
                break;
            case 5:
                card6Show(cardArray[i]);
                break;
            case 6:
                card7Show(cardArray[i]);
                break;
            case 7:
                card8Show(cardArray[i]);
                break;
            case 8:
                card9Show(cardArray[i]);
                break;
            case 9:
                card10Show(cardArray[i]);
                break;
            case 10:
                card11Show(cardArray[i]);
                break;
            case 11:
                card12Show(cardArray[i]);
                break;
        }
        confirm("Let's play! Click two cards to see their value - make sure to remember the values!");
    }

    //function ran when card 1 is clicked - what happens when clicked depends on the value sent, value is always 0 when
    //the card is clicked - functions for other 11 cards are ommited but are similar to this but with changed variables
    function card1Show(cardValue) {
        if (cardValue !== 0) {
            //assigns card value when function is called by assignToCards()
            assignCount1 = 1;
            trueValue1 = cardValue;
        } else if (cardValue === 0 && assignCount1 === 1 && clickCount < 2) {
            //calls changeCard() if player 1 hasn't yet looked at two cards at the beginning of the game
            clickCount += 1;
            changeCard(trueValue1, 1);
        } else if (cardDrawn === true && firstPlayerFlag === false) {
            //reassigns the card value when clicked whilst a card is available from the deck and player 1 hasn't
            //done anything in the current round
            trueValue1 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            firstPlayerFlag = true;
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
        } else if (cardDrawn === true && firstPlayerFlag === false) {
            trueValue2 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            firstPlayerFlag = true;
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
        } else if (cardDrawn === true && firstPlayerFlag === false) {
            trueValue3 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            firstPlayerFlag = true;
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
        } else if (cardDrawn === true && firstPlayerFlag === false) {
            trueValue4 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            firstPlayerFlag = true;
            changeTimer();
        }
    }

    function card5Show(cardValue) {
        if (cardValue !== 0) {
            assignCount5 = 1;
            trueValue5 = cardValue;
        } else if (cardValue === 0 && assignCount5 === 1 && clickCount2 < 2) {
            clickCount2 += 1;
            changeCard(trueValue5, 5);
        } else if (cardDrawn === true && secondPlayerFlag === false) {
            trueValue5 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            secondPlayerFlag = true;
            changeTimer();
        }
    }

    function card6Show(cardValue) {
        if (cardValue !== 0) {
            assignCount6 = 1;
            trueValue6 = cardValue;
        } else if (cardValue === 0 && assignCount6 === 1 && clickCount2 < 2) {
            clickCount2 += 1;
            changeCard(trueValue6, 6);
        } else if (cardDrawn === true && secondPlayerFlag === false) {
            trueValue6 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            secondPlayerFlag = true;
            changeTimer();
        }
    }

    function card7Show(cardValue) {
        if (cardValue !== 0) {
            assignCount7 = 1;
            trueValue7 = cardValue;
        } else if (cardValue === 0 && assignCount7 === 1 && clickCount2 < 2) {
            clickCount2 += 1;
            changeCard(trueValue7, 7);
        } else if (cardDrawn === true && secondPlayerFlag === false) {
            trueValue7 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            secondPlayerFlag = true;
            changeTimer();
        }
    }

    function card8Show(cardValue) {

        if (cardValue !== 0) {
            assignCount8 = 1;
            trueValue8 = cardValue;
        } else if (cardValue === 0 && assignCount8 === 1 && clickCount2 < 2) {
            clickCount2 += 1;
            changeCard(trueValue8, 8);
        } else if (cardDrawn === true && secondPlayerFlag === false) {
            trueValue8 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            secondPlayerFlag = true;
            changeTimer();
        }
    }

    function card9Show(cardValue) {
        if (cardValue !== 0) {
            assignCount9 = 1;
            trueValue9 = cardValue;
        } else if (cardValue === 0 && assignCount9 === 1 && clickCount3 < 2) {
            clickCount3 += 1;
            changeCard(trueValue9, 9);
        } else if (cardDrawn === true && thirdPlayerFlag === false) {
            trueValue9 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            thirdPlayerFlag = true;
            changeTimer();
        }
    }

    function card10Show(cardValue) {
        if (cardValue !== 0) {
            assignCount10 = 1;
            trueValue10 = cardValue;
        } else if (cardValue === 0 && assignCount10 === 1 && clickCount3 < 2) {
            clickCount3 += 1;
            changeCard(trueValue10, 10);
        } else if (cardDrawn === true && thirdPlayerFlag === false) {
            trueValue10 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            thirdPlayerFlag = true;
            changeTimer();
        }
    }

    function card11Show(cardValue) {
        if (cardValue !== 0) {
            assignCount11 = 1;
            trueValue11 = cardValue;
        } else if (cardValue === 0 && assignCount11 === 1 && clickCount3 < 2) {
            clickCount3 += 1;
            changeCard(trueValue11, 11);
        } else if (cardDrawn === true && thirdPlayerFlag === false) {
            trueValue11 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            thirdPlayerFlag = true;
            changeTimer();
        }
    }

    function card12Show(cardValue) {
        if (cardValue !== 0) {
            assignCount12 = 1;
            trueValue12 = cardValue;
        } else if (cardValue === 0 && assignCount12 === 1 && clickCount3 < 2) {
            clickCount3 += 1;
            changeCard(trueValue12, 12);
        } else if (cardDrawn === true && thirdPlayerFlag === false) {
            trueValue12 = deckCard;
            cardDrawn = false;
            document.getElementById("deck").src = "img/Card%20Back.png";
            thirdPlayerFlag = true;
            changeTimer();
        }
    }

//decreases timer
    function changeTimer() {
        //only happens if all actions have been done in current round
        if (firstPlayerFlag === true && secondPlayerFlag === true && thirdPlayerFlag === true || discardCount === 1 && secondPlayerFlag === true && thirdPlayerFlag === true || discardCount === 1 && firstPlayerFlag === true && thirdPlayerFlag === true || discardCount === 1 && firstPlayerFlag === true && secondPlayerFlag === true || discardCount === 2 && firstPlayerFlag === true || discardCount === 2 && secondPlayerFlag === true || discardCount === 2 && thirdPlayerFlag === true || discardCount === 3) {
            roundcount -= 1;
            discardCount = 0;
            firstPlayerFlag = false;
            secondPlayerFlag = false;
            thirdPlayerFlag = false;
            if (roundcount === 0) {
                //calls end game when timer reaches 0
                document.getElementById("timer").textContent = "Finished!";
                gameEnd = true;
                endgame();
            } else if (roundcount === 1) {
                document.getElementById("timer").textContent = "Last turn!";
            } else {
                document.getElementById("timer").textContent = roundcount + " rounds left!";
            }
        }
    }
//ran when draw pile is clicked
    function drawCard() {
        //flags prevent deck being constantly clicked
        if (cardDrawn === false && gameEnd === false) {
            if (assignCount1 === 1 && assignCount2 === 1 && assignCount3 === 1 && assignCount4 === 1) {
                cardDrawn = true;
                getCards("deck");
            }
        }
    }
//ran when dicard pile is clicked
    function discardCard() {
        //can only be done when a card is pulled from deck
        if (cardDrawn === true) {
            cardDrawn = false;
            changeCard(deckCard, 14);
            document.getElementById("deck").src = "img/Card%20Back.png";
            discardCount += 1;
            changeTimer();
        }
    }


//called when timer = 0 - calculates the score
    function endgame() {
        let scores = [0, 0, 0];
        let cardArray1 = [trueValue1, trueValue2, trueValue3, trueValue4];
        let cardArray2 = [trueValue5, trueValue6, trueValue7, trueValue8];
        let cardArray3 = [trueValue9, trueValue10, trueValue11, trueValue12];
        alert(cardArray1);
        alert(cardArray2);
        alert(cardArray3);

        for (turnCount = 0; turnCount < 3; turnCount++) {
            calcKings(turnCount);

            findPairs(turnCount);

            findJQs(turnCount);

            //adds 10 points for each jack or queen
            if (turnCount === 0) {
                for (x = 0; x < 4; x++) {
                    if (JQArray1[x] === 1) {
                        scores[turnCount] += 10;
                    }
                }
            } else if (turnCount === 1) {
                for (x = 0; x < 4; x++) {
                    if (JQArray2[x] === 1) {
                        scores[turnCount] += 10;

                    }
                }
            } else if (turnCount === 2) {
                for (x = 0; x < 4; x++) {
                    if (JQArray2[x] === 1) {
                        scores[turnCount] += 10;

                    }
                }
            }
            //adds the value of each card % 13 to the get face value - except for kings and pairs
            if (turnCount === 0) {
                for (x = 0; x < 4; x++) {
                    if (kingArray1[x] === 0 && JQArray1[x] === 0 && matchArray1[x] === 0) {
                        scores[0] += (cardArray1[x] % 13);

                    }
                }
            } else if (turnCount === 1) {
                for (x = 0; x < 4; x++) {
                    if (kingArray2[x] === 0 && JQArray2[x] === 0 && matchArray2[x] === 0) {
                        scores[1] += (cardArray2[x] % 13);

                    }
                }
            } else if (turnCount === 2) {
                for (x = 0; x < 4; x++) {
                    if (kingArray3[x] === 0 && JQArray3[x] === 0 && matchArray3[x] === 0) {
                        scores[2] += (cardArray3[x] % 13);

                    }
                }
            }
        }
        showCards(scores);
    }

//function finds any kings in the players hands
    let kingArray1 = [0, 0, 0, 0];
    let kingArray2 = [0, 0, 0, 0];
    let kingArray3 = [0, 0, 0, 0];
    function calcKings(playerSet) {
        let cardArray1 = [trueValue1, trueValue2, trueValue3, trueValue4];
        let cardArray2 = [trueValue5, trueValue6, trueValue7, trueValue8];
        let cardArray3 = [trueValue9, trueValue10, trueValue11, trueValue12];
        let cardArray = [];
        if (playerSet === 0) {
            for (i = 0; i < 4; i++) {
                cardArray[i] = cardArray1[i];
            }
        } else if (playerSet === 1) {
            for (i = 0; i < 4; i++) {
                cardArray[i] = cardArray2[i];
            }
        } else if (playerSet === 2) {
            for (i = 0; i < 4; i++) {
                cardArray[i] = cardArray3[i];
            }
        }
        for (i = 0; i < 4; i++) {
            if (cardArray[i] === 13 || cardArray[i] === 26 || cardArray[i] === 39 || cardArray[i] === 52) {
                if (playerSet === 0) {
                    kingArray1[i] = 1;
                } else if (playerSet === 1) {
                    kingArray2[i] = 1;
                } else if (playerSet === 2) {
                    kingArray3[i] = 1;
                }

            }
        }

    }

    //function finds any pairs in the players hands
    let matchArray1 = [0, 0, 0, 0];
    let matchArray2 = [0, 0, 0, 0];
    let matchArray3 = [0, 0, 0, 0];
    function findPairs(playerSet) {
        let cardArray1 = [trueValue1, trueValue2, trueValue3, trueValue4];
        let cardArray2 = [trueValue5, trueValue6, trueValue7, trueValue8];
        let cardArray3 = [trueValue9, trueValue10, trueValue11, trueValue12];
        if (playerSet === 0) {
            //only runs three times as fourth card has already been checked with the others
            for (i = 0; i < 2; i++) {
                if (matchArray1[i] === 0) {
                    if (cardArray1[i] < 14) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 1; y < 14; y++) {
                                if (cardArray1[i] === y && (cardArray1[x] === (y + 13) || cardArray1[x] === (y + 26) || cardArray1[x] === (y + 39))) {
                                    matchArray1[i] = 1;
                                    matchArray1[x] = 1;
                                }
                            }
                        }
                    } else if (cardArray1[i] < 27) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 14; y < 27; y++) {
                                if (cardArray1[i] === y && (cardArray1[x] === (y + 13) || cardArray1[x] === (y + 26) || cardArray1[x] === (y - 13))) {
                                    matchArray1[i] = 1;
                                    matchArray1[x] = 1;
                                }
                            }
                        }
                    } else if (cardArray1[i] < 40) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 27; y < 40; y++) {
                                if (cardArray1[i] === y && (cardArray1[x] === (y + 13) || cardArray1[x] === (y - 13) || cardArray1[x] === (y - 26))) {
                                    matchArray1[i] = 1;
                                    matchArray1[x] = 1;
                                }
                            }
                        }
                    } else {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 40; y < 53; y++) {
                                if (cardArray1[i] === y && (cardArray1[x] === (y - 13) || cardArray1[x] === (y - 26) || cardArray1[x] === (y - 39))) {
                                    matchArray1[i] = 1;
                                    matchArray1[x] = 1;
                                }
                            }
                        }
                    }

                }
            }
//other if statements have been omitted as they are identical but with changed array names
        } else if (playerSet === 1) {
            for (i = 0; i < 2; i++) {
                if (matchArray2[i] === 0) {
                    if (cardArray2[i] < 14) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 1; y < 14; y++) {
                                if (cardArray2[i] === y && (cardArray2[x] === (y + 13) || cardArray2[x] === (y + 26) || cardArray2[x] === (y + 39))) {
                                    matchArray2[i] = 1;
                                    matchArray2[x] = 1;
                                }
                            }
                        }
                    } else if (cardArray2[i] < 27) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 14; y < 27; y++) {
                                if (cardArray2[i] === y && (cardArray2[x] === (y + 13) || cardArray2[x] === (y + 26) || cardArray2[x] === (y - 13))) {
                                    matchArray2[i] = 1;
                                    matchArray2[x] = 1;
                                }
                            }
                        }
                    } else if (cardArray2[i] < 40) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 27; y < 40; y++) {
                                if (cardArray2[i] === y && (cardArray2[x] === (y + 13) || cardArray2[x] === (y - 13) || cardArray2[x] === (y - 26))) {
                                    matchArray2[i] = 1;
                                    matchArray2[x] = 1;
                                }
                            }
                        }
                    } else {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 40; y < 53; y++) {
                                if (cardArray2[i] === y && (cardArray2[x] === (y - 13) || cardArray2[x] === (y - 26) || cardArray2[x] === (y - 39))) {
                                    matchArray2[i] = 1;
                                    matchArray2[x] = 1;
                                }
                            }
                        }
                    }

                }
            }
        } else if (playerSet === 2) {
            for (i = 0; i < 2; i++) {
                if (matchArray3[i] === 0) {
                    if (cardArray3[i] < 14) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 1; y < 14; y++) {
                                if (cardArray3[i] === y && (cardArray3[x] === (y + 13) || cardArray3[x] === (y + 26) || cardArray3[x] === (y + 39))) {
                                    matchArray3[i] = 1;
                                    matchArray3[x] = 1;
                                }
                            }
                        }
                    } else if (cardArray3[i] < 27) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 14; y < 27; y++) {
                                if (cardArray3[i] === y && (cardArray3[x] === (y + 13) || cardArray3[x] === (y + 26) || cardArray3[x] === (y - 13))) {
                                    matchArray3[i] = 1;
                                    matchArray3[x] = 1;
                                }
                            }
                        }
                    } else if (cardArray3[i] < 40) {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 27; y < 40; y++) {
                                if (cardArray3[i] === y && (cardArray3[x] === (y + 13) || cardArray3[x] === (y - 13) || cardArray3[x] === (y - 26))) {
                                    matchArray3[i] = 1;
                                    matchArray3[x] = 1;
                                }
                            }
                        }
                    } else {
                        for (x = (i + 1); x < 4; x++) {
                            for (y = 40; y < 53; y++) {
                                if (cardArray3[i] === y && (cardArray3[x] === (y - 13) || cardArray3[x] === (y - 26) || cardArray3[x] === (y - 39))) {
                                    matchArray3[i] = 1;
                                    matchArray3[x] = 1;
                                }
                            }
                        }
                    }

                }
            }
        }
    }

    ////function finds any jacks and queens in the players hands
    let JQArray1 = [0, 0, 0, 0];
    let JQArray2 = [0, 0, 0, 0];
    let JQArray3 = [0, 0, 0, 0];
    function findJQs(playerSet) {
        let cardArray1 = [trueValue1, trueValue2, trueValue3, trueValue4];
        let cardArray2 = [trueValue5, trueValue6, trueValue7, trueValue8];
        let cardArray3 = [trueValue9, trueValue10, trueValue11, trueValue12];
        if (playerSet === 0) {
            for (i = 0; i < 4; i++) {
                switch (cardArray1[i]) {
                    case 11:
                    case 24:
                    case 37:
                    case 50:
                        JQArray1[i] = 1;
                        break;
                    case 12:
                    case 25:
                    case 38:
                    case 51:
                        JQArray1[i] = 1;
                        break;
                }
            }
            //other if statements have been omitted as they are identical but with changed array names
        } else if (playerSet === 1) {
            for (i = 0; i < 4; i++) {
                switch (cardArray2[i]) {
                    case 11:
                    case 24:
                    case 37:
                    case 50:
                        JQArray2[i] = 1;
                        break;
                    case 12:
                    case 25:
                    case 38:
                    case 51:
                        JQArray2[i] = 1;
                        break;
                }
            }
        } else if (playerSet === 2) {
            for (i = 0; i < 4; i++) {
                switch (cardArray3[i]) {
                    case 11:
                    case 24:
                    case 37:
                    case 50:
                        JQArray3[i] = 1;
                        break;
                    case 12:
                    case 25:
                    case 38:
                    case 51:
                        JQArray3[i] = 1;
                        break;
                }
            }
        }
    }


// this function calls changeCard for each card for the end of the game and reveals each score and the winner
    function showCards(score) {
        document.getElementById("scoreLabel1").textContent = "Well done! Player 1 scored: " + score[0];
        for (i = 0; i < 4; i++) {
            if (i === 0) {changeCard(trueValue1, 1)}
            if (i === 1) {changeCard(trueValue2, 2)}
            if (i === 2) {changeCard(trueValue3, 3)}
            if (i === 3) {changeCard(trueValue4, 4)}
        }
        document.getElementById("scoreLabel2").textContent = "Well done! Player 2 scored: " + score[1];

        for (i = 0; i < 4; i++) {
            if (i === 0) {changeCard(trueValue5, 5)}
            if (i === 1) {changeCard(trueValue6, 6)}
            if (i === 2) {changeCard(trueValue7, 7)}
            if (i === 3) {changeCard(trueValue8, 8)}
        }
        document.getElementById("scoreLabel3").textContent = "Well done! Player 3 scored: " + score[2];
        for (i = 0; i < 4; i++) {
            if (i === 0) {changeCard(trueValue9, 9)}
            if (i === 1) {changeCard(trueValue10, 10)}
            if (i === 2) {changeCard(trueValue11, 11)}
            if (i === 3) {changeCard(trueValue12, 12)}
        }
        //whoever has the lowest score is the winner
        if (score[0] < score[1] && score[0] < score[2]) {
            document.getElementById("winnerLabel").textContent = "Player 1 is the winner! Congratulations!";
        } else if (score[0] > score[1] && score[1] < score[2]) {
            document.getElementById("winnerLabel").textContent = "Player 2 is the winner! Congratulations!";
        } else {
            document.getElementById("winnerLabel").textContent = "Player 3 is the winner! Congratulations!";
        }
        //shows all the labels to the user
        document.getElementById("scoreLabel1").style.visibility = "visible";
        document.getElementById("scoreLabel2").style.visibility = "visible";
        document.getElementById("scoreLabel3").style.visibility = "visible";
        document.getElementById("winnerLabel").style.visibility = "visible";

    }

//when the continue button is clicked this resets all of the cards' images back to card back - and then hides the
//continue button - hideCards2 and hideCards3 are ommited as they are identical to hideCards1 except for the which
//cards they are resetting
    function hideCards1() {
        document.getElementById("card1").src = "img/Card%20Back.png";
        document.getElementById("card2").src = "img/Card%20Back.png";
        document.getElementById("card3").src = "img/Card%20Back.png";
        document.getElementById("card4").src = "img/Card%20Back.png";
        document.getElementById("hidebutton1").style.visibility = "hidden";
    }

    function hideCards2() {
        document.getElementById("card5").src = "img/Card%20Back.png";
        document.getElementById("card6").src = "img/Card%20Back.png";
        document.getElementById("card7").src = "img/Card%20Back.png";
        document.getElementById("card8").src = "img/Card%20Back.png";
        document.getElementById("hidebutton2").style.visibility = "hidden";
    }

    function hideCards3() {
        document.getElementById("card9").src = "img/Card%20Back.png";
        document.getElementById("card10").src = "img/Card%20Back.png";
        document.getElementById("card11").src = "img/Card%20Back.png";
        document.getElementById("card12").src = "img/Card%20Back.png";
        document.getElementById("hidebutton3").style.visibility = "hidden";
    }


// very large function - all cases except case:1 are ommitted as they are identical except for the images they show
    function changeCard(cardValue, cardNum) {

        //checks to see if the card sent is the second for that player, if so it shows the hidebutton
        if (cardNum < 5) {
            cardCount1 += 1;
        } else if (cardNum < 9) {
            cardCount2 += 1;
        } else if (cardNum < 13) {
            cardCount3 += 1;
        }
        if (cardCount1 === 2 && showFlag1 === false) {
            document.getElementById("hidebutton1").style.visibility = "visible";
            showFlag1 = true;
        }

        if (cardCount2 === 2 && showFlag2 === false) {
            document.getElementById("hidebutton2").style.visibility = "visible";
            showFlag2 = true;
        }
        if (cardCount3 === 2 && showFlag3 === false) {
            document.getElementById("hidebutton3").style.visibility = "visible";
            showFlag3 = true;
        }
// finds the value of the card and then the card number and changes the image of the card to
// the image matched to cardValue
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
                        document.getElementById("card5").src = "img/AH.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/AH.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/AH.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/AH.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/AH.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/AH.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/AH.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/AH.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/AH.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/2H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/2H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/2H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/2H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/2H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/2H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/2H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/2H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/2H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/3H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/3H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/3H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/3H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/3H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/3H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/3H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/3H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/3H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/4H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/4H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/4H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/4H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/4H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/4H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/4H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/4H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/4H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/5H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/5H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/5H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/5H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/5H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/5H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/5H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/5H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/5H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/6H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/6H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/6H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/6H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/6H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/6H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/6H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/6H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/6H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/7H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/7H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/7H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/7H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/7H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/7H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/7H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/7H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/7H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/8H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/8H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/8H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/8H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/8H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/8H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/8H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/8H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/8H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/9H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/9H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/9H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/9H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/9H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/9H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/9H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/9H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/9H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/10H.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/10H.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/10H.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/10H.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/10H.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/10H.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/10H.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/10H.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/10H.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/JH.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/JH.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/JH.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/JH.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/JH.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/JH.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/JH.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/JH.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/JH.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/QH.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/QH.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/QH.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/QH.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/QH.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/QH.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/QH.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/QH.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/QH.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/KH.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/KH.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/KH.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/KH.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/KH.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/KH.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/KH.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/KH.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/KH.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/AC.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/AC.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/AC.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/AC.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/AC.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/AC.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/AC.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/AC.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/AC.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/2C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/2C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/2C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/2C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/2C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/2C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/2C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/2C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/2C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/3C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/3C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/3C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/3C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/3C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/3C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/3C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/3C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/3C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/4C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/4C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/4C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/4C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/4C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/4C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/4C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/4C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/4C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/5C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/5C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/5C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/5C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/5C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/5C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/5C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/5C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/5C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/6C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/6C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/6C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/6C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/6C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/6C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/6C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/6C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/6C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/7C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/7C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/7C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/7C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/7C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/7C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/7C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/7C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/7C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/8C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/8C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/8C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/8C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/8C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/8C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/8C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/8C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/8C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/9C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/9C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/9C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/9C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/9C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/9C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/9C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/9C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/9C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/10C.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/10C.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/10C.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/10C.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/10C.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/10C.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/10C.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/10C.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/10C.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/JC.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/JC.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/JC.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/JC.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/JC.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/JC.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/JC.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/JC.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/JC.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/QC.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/QC.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/QC.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/QC.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/QC.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/QC.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/QC.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/QC.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/QC.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/KC.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/KC.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/KC.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/KC.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/KC.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/KC.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/KC.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/KC.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/KC.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/AD.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/AD.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/AD.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/AD.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/AD.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/AD.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/AD.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/AD.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/AD.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/2D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/2D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/2D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/2D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/2D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/2D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/2D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/2D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/2D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/3D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/3D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/3D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/3D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/3D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/3D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/3D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/3D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/3D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/4D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/4D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/4D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/4D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/4D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/4D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/4D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/4D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/4D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/5D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/5D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/5D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/5D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/5D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/5D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/5D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/5D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/5D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/6D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/6D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/6D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/6D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/6D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/6D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/6D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/6D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/6D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/7D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/7D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/7D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/7D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/7D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/7D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/7D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/7D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/7D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/8D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/8D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/8D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/8D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/8D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/8D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/8D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/8D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/8D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/9D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/9D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/9D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/9D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/9D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/9D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/9D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/9D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/9D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/10D.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/10D.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/10D.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/10D.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/10D.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/10D.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/10D.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/10D.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/10D.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/JD.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/JD.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/JD.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/JD.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/JD.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/JD.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/JD.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/JD.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/JD.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/QD.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/QD.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/QD.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/QD.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/QD.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/QD.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/QD.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/QD.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/QD.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/KD.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/KD.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/KD.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/KD.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/KD.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/KD.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/KD.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/KD.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/KD.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/AS.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/AS.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/AS.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/AS.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/AS.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/AS.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/AS.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/AS.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/AS.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/2S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/2S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/2S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/2S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/2S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/2S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/2S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/2S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/2S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/3S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/3S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/3S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/3S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/3S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/3S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/3S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/3S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/3S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/4S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/4S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/4S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/4S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/4S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/4S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/4S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/4S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/4S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/5S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/5S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/5S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/5S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/5S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/5S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/5S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/5S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/5S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/6S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/6S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/6S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/6S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/6S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/6S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/6S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/6S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/6S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/7S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/7S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/7S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/7S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/7S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/7S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/7S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/7S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/7S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/8S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/8S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/8S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/8S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/8S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/8S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/8S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/8S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/8S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/9S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/9S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/9S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/9S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/9S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/9S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/9S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/9S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/9S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/10S.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/10S.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/10S.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/10S.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/10S.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/10S.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/10S.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/10S.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/10S.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/JS.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/JS.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/JS.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/JS.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/JS.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/JS.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/JS.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/JS.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/JS.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/QS.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/QS.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/QS.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/QS.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/QS.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/QS.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/QS.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/QS.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/QS.png";
                        break;
                    case 14:
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
                        document.getElementById("card5").src = "img/KS.png";
                        break;
                    case 6:
                        document.getElementById("card6").src = "img/KS.png";
                        break;
                    case 7:
                        document.getElementById("card7").src = "img/KS.png";
                        break;
                    case 8:
                        document.getElementById("card8").src = "img/KS.png";
                        break;
                    case 9:
                        document.getElementById("card9").src = "img/KS.png";
                        break;
                    case 10:
                        document.getElementById("card10").src = "img/KS.png";
                        break;
                    case 11:
                        document.getElementById("card11").src = "img/KS.png";
                        break;
                    case 12:
                        document.getElementById("card12").src = "img/KS.png";
                        break;
                    case 13:
                        document.getElementById("deck").src = "img/KS.png";
                        break;
                    case 14:
                        document.getElementById("discard").src = "img/KS.png";
                        break;
                }
                break;


            default:

        }
    }
}