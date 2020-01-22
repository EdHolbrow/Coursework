function pageLoad() {
   createAll();
    createTopThree();
    document.getElementById("listTopThree").style.display = "none";

}
function createAll(){

    let ScoresHTML = '<table>' +
        '<tr>' +
        '<th>Player Name</th>' +
        '<th>Difficulty</th>' +
        '<th>Position on Board</th>' +
        '<th>Score</th>' +
        '<th class="last">UserID</th>' +
        '</tr>';


    fetch('/Highscores/selectAll', {method: 'get'}
    ).then(response => response.json()
    ).then(Scores => {
        for (let Score of Scores) {
            ScoresHTML += `<tr>` +
                `<td>${Score.PlayerName}</td>` +
                `<td>${Score.Difficulty}</td>` +
                `<td>${Score.PositionOnBoard}</td>` +
                `<td>${Score.Score}</td>` +
                `<td>${Score.UserID}</td>` +
                `<td class="last">` +
                `</td>` +
                `</tr>`;

        }
        ScoresHTML += '</table>';

        document.getElementById("listScores").innerHTML = ScoresHTML;
    });

}
function createTopThree(){

    //creates the table headings

    let ScoresHTML = '<table>' +
        '<tr>' +
        '<th>Player Name</th>' +
        '<th>Difficulty</th>' +
        '<th>Position on Board</th>' +
        '<th>Score</th>' +
        '<th class="last">UserID</th>' +
        '</tr>';

// fetch statement to call the API

    fetch('/Highscores/selectTopThree', {method: 'get'}
    ).then(response => response.json()
    ).then(Scores => {
        //assigns the data in the table to the columns
        for (let Score of Scores) {
            ScoresHTML += `<tr>` +
                `<td>${Score.PlayerName}</td>` +
                `<td>${Score.Difficulty}</td>` +
                `<td>${Score.PositionOnBoard}</td>` +
                `<td>${Score.Score}</td>` +
                `<td>${Score.UserID}</td>` +
                `<td class="last">` +
                `</td>` +
                `</tr>`;

        }
        ScoresHTML += '</table>';
//assigns the table to the HTML element
        document.getElementById("listTopThree").innerHTML = ScoresHTML;
    });

}
function listTopThree() {
// Hides all tables other than ListTopThree and shows that
document.getElementById("listScores").style.display = "none";
  //  document.getElementById("listEasy").style.display = "none";
   // document.getElementById("listMedium").style.display = "none";
   // document.getElementById("listHard").style.display = "none";
    document.getElementById("listTopThree").style.display = "block";
}
function createEasy() {

    let EasyScoresHTML = '<table>' +
        '<tr>' +
        '<th>PlayerName</th>' +
        '<th>Difficulty</th>' +
        '<th>PositionOnBoard</th>' +
        '<th>Score</th>' +
        '<th class="last">UserID</th>' +
        '</tr>';


    let formData = new FormData();
    formData.append("DifficultySelected   ", "Easy");

    console.log(formData);


    fetch('/Highscores/selectDifficulty', {method: 'post', body:formData}
    ).then(response => response.json()
    ).then(Scores => {

        console.log(formData);

        for (let Score of Scores) {
            EasyScoresHTML += `<tr>` +
                `<td>${Score.PlayerName}</td>` +
                `<td>${Score.Difficulty}</td>` +
                `<td>${Score.PositionOnBoard}</td>` +
                `<td>${Score.Score}</td>` +
                `<td>${Score.UserID}</td>` +
                `<td class="last">` +
                `</td>` +
                `</tr>`;

        }
        EasyScoresHTML += '</table>';

        document.getElementById("listEasy").innerHTML = EasyScoresHTML;

    });
}
function listEasy() {
    alert("test");
    document.getElementById("listScores").style.display = "none";
    document.getElementById("listEasy").style.display = "block";
}


function getFormDataEasy(json) {
    let formData = new FormData();
    for (let key in json) {
        formData.append(key, json[key]);
    }
    return formData;
}