function pageLoad() {
   // createAll();
    createEasy();

}
function createAll(){

    let ScoresHTML = '<table>' +
        '<tr>' +
        '<th>PlayerName</th>' +
        '<th>Difficulty</th>' +
        '<th>PositionOnBoard</th>' +
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

        document.getElementById("ListScores").innerHTML = ScoresHTML;
    });

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

    const form = "Easy";
    const formData = new FormData(form);


    fetch('/Highscores/selectDifficulty', {method: 'post', body: formData}
    ).then(response => response.json()
    ).then(Scores => {

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

        document.getElementById("ListEasy").innerHTML = EasyScoresHTML;

    });
}
visible = 1; //var that keeps track of which table is visible (1 or 2)
function listEasy() {
    t1 = document.getElementById("listScores");
    t2 = document.getElementById("listEasy");
    if(visible == 1) {
        visible = 2;
        t1.style.display = 'none';
        t2.style.display = 'block';
    } else {
        visible = 1;
        t1.style.display = 'block';
        t2.style.display = 'none';
    }
}