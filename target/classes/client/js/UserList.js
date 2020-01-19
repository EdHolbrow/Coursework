function pageLoad() {

    let UsersHTML = '<table>' +
        '<tr>' +
        '<th>UserID</th>' +
        '<th>Name</th>' +
        '<th class="last">BestScore</th>' +
        '</tr>';


    fetch('/Users/selectAllUsers', {method: 'get'}
    ).then(response => response.json()
    ).then(Users => {

        for (let User of Users) {
            UsersHTML += `<tr>` +
                `<td>${User.UserID}</td>` +
                `<td>${User.PlayerName}</td>` +
                `<td>${User.BestScore}</td>` +
                `<td class="last">` +
                `</td>` +
                `</tr>`;

        }
        UsersHTML += '</table>';

        document.getElementById("ListUsers").innerHTML = UsersHTML;
    });
}