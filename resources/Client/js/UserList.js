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
    document.getElementById("listUser").style.display = "none";
    document.getElementById("bruh").style.visibility = "hidden";
    document.getElementById("bruh2").style.display = "none";
    alert("test");
}

function findUser(){
    findID = document.getElementById("IDSearch").value;
    let formData = new FormData();
    formData.append("UserID   ", findID);

    fetch('/Users/selectUser', {method: 'post', body: formData}
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

        document.getElementById("ListUser").innerHTML = UsersHTML;
    });

    document.getElementById("listUsers").style.display = "none";
    document.getElementById("listUser").style.display = "block";
}
function editUser(){


    let formData = new FormData();
    formData.append("PlayerName   ", JSON.stringify(PlayerEdit));

    fetch('/Users/selectUser', {method: 'post', body: formData}
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

        document.getElementById("ListUser").innerHTML = UsersHTML;
    });

    document.getElementById("listUsers").style.display = "none";
    document.getElementById("listUser").style.display = "block";
}
function deleteUser(){
    IDDelete = document.getElementById("deleteID").value;
    PlayerDelete = document.getElementById("deleteName").value;
    PwrdDelete = document.getElementById("deletePwrd").value;

    let formData = new FormData();
    formData.append("UserID ", id);
    formData.append("Name ", id);
    formData.append("Password ", id);

    fetch('/fruit/delete', {method: 'post', body: formData}
    ).then(response => response.json()
    ).then(responseData => {

            if (responseData.hasOwnProperty('error')) {
                alert(responseData.error);
            } else {
                pageLoad();
            }
        }
    );
}