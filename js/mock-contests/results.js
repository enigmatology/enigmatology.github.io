getUser();

function getUser() {
    let loading_div = document.getElementById("loading-text");
    loading_div.innerHTML = "Retrieving results...";
    firebase.auth().onAuthStateChanged(function(user) {
        let results_div = document.getElementById("results");
        if (user == null) {
            results_div.innerHTML = "You are not logged in. Sign in to view past results."
        }
        else {
            getAMCResults(user, results_div);
            getAIMEResults(user, results_div);
        }
    }) 
}

function getAMCResults(user, results_div) {
    let database = firebase.database();
    let uid = user.uid;
    let amc_results = database.ref('users/' + uid + "/amcs");
    amc_results.on('value', (snapshot) => {
        const data = snapshot.val(); 
        showAMCResults(results_div, data);
    });
}

function showAMCResults(results_div, data) {
    let loading_div = document.getElementById("loading-text");

    amc_div = document.createElement("div");
    amc_div.setAttribute("class", "section-header");
    amc_div.innerHTML = "AMC Results";
    results_div.appendChild(amc_div);

    let table = document.createElement("table");
    table.setAttribute("id", "amc-results-table");
    table.setAttribute("class", "results-table");

    let row = document.createElement("tr");
    let cell1 = document.createElement("th");
    let cell2 = document.createElement("th");
    let cell3 = document.createElement("th");
    let cell4 = document.createElement("th");

    cell1.innerHTML = "Date";
    cell2.innerHTML = "Year";
    cell3.innerHTML = "Test";
    cell4.innerHTML = "Your Score";

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    table.appendChild(row);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            let date = data[key]["date"];
            date = new Date(date);
            
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0');
            var yyyy = date.getFullYear();

            row = document.createElement("tr");
            cell1 = document.createElement("td");
            cell2 = document.createElement("td");
            cell3 = document.createElement("td");
            cell4 = document.createElement("td");

            cell1.innerHTML = mm + "/" + dd + "/" + yyyy;
            cell2.innerHTML = data[key]["year"];
            cell3.innerHTML = "AMC " + data[key]["grade"] + data[key]["version"];
            cell4.innerHTML = data[key]["score"];

            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);

            table.appendChild(row);
        }
    }

    results_div.appendChild(table);
    loading_div.innerHTML = "";
}

function getAIMEResults(user, results_div) {
    let database = firebase.database();
    let uid = user.uid;
    let aime_results = database.ref('users/' + uid + "/aimes");
    aime_results.on('value', (snapshot) => {
        const data = snapshot.val(); 
        showAIMEResults(results_div, data);
    });
}

function showAIMEResults(results_div, data) {
    let loading_div = document.getElementById("loading-text");

    aime_div = document.createElement("div");
    aime_div.setAttribute("class", "section-header");
    aime_div.setAttribute("id", "aime-header");
    aime_div.innerHTML = "AIME Results";
    results_div.appendChild(aime_div);

    let table = document.createElement("table");
    table.setAttribute("id", "aime-results-table");
    table.setAttribute("class", "results-table");

    let row = document.createElement("tr");
    let cell1 = document.createElement("th");
    let cell2 = document.createElement("th");
    let cell3 = document.createElement("th");
    let cell4 = document.createElement("th");

    cell1.innerHTML = "Date";
    cell2.innerHTML = "Year";
    cell3.innerHTML = "Test";
    cell4.innerHTML = "Your Score";

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    table.appendChild(row);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            let date = data[key]["date"];
            date = new Date(date);
            
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0');
            var yyyy = date.getFullYear();

            row = document.createElement("tr");
            cell1 = document.createElement("td");
            cell2 = document.createElement("td");
            cell3 = document.createElement("td");
            cell4 = document.createElement("td");

            cell1.innerHTML = mm + "/" + dd + "/" + yyyy;
            cell2.innerHTML = data[key]["year"];
            cell3.innerHTML = "AIME " + data[key]["version"];
            cell4.innerHTML = data[key]["score"];

            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);

            table.appendChild(row);
        }
    }

    results_div.appendChild(table);
    loading_div.innerHTML = "";
}
