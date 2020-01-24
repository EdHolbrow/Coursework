function hideLabel() {
}
function gotoMenu() {
    //creates a confirm popup box that if confirms - returns to the main menu
    let quitVar = confirm("Are you sure you want to leave?");
    if (quitVar === true) {
        window.location.replace(window.location.href = '/client/Menu.html');
    }
}
function addUser(){
    //gets the highest ID and then increases it by 1, to make the next ID
let newID =  localStorage.getItem("topID") + 1;
    //stores the new value back in local storage
    localStorage.setItem("topID", newID);

   newPlayer = document.getElementById("playername").value;
   newPassword = document.getElementById("passwrd").value;

   //creates the formData - the data for the new user
    let formData = new FormData();
    formData.append("UserID   ", newID);
    formData.append("PlayerName   ", JSON.stringify(currentPlayer));
    formData.append("Best Score   ", 0);
    formData.append("Password   ", JSON.stringify(newPassword));

    //fetch statement - sends the post request and brings back confirmation or error
    fetch('/Users/insertUser', {method: 'post', body: formData}
    ).then(response => response.json()
    ).then(insertFetch => {
        if (insertFetch.hasOwnProperty('error')) {
            alert(insertFetch.error);
        } else {
            //notifies the user of the success of the creation of a new user
            console.log(newID + " user added");
            document.getElementById("newUserLabel").style.visibility = "visible";
        }
    });

}
function clearDetails(){
    //clears the input boxes in the form
    document.getElementById("playername").textContent = "";
    document.getElementById("passwrd").textContent = "";
}
