function pageLoad() {

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