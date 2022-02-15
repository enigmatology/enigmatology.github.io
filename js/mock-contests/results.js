getUser();

function getUser() {
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
    amc_h1 = document.createElement("h2");
    amc_h1.setAttribute("class", "section-header");
    amc_h1.innerHTML = "AMC Results";
    results_div.appendChild(amc_h1);

    let table = document.createElement("table");
    table.setAttribute("id", "amc-results-table");
    table.setAttribute("class", "results-table");

    let row = document.createElement("tr");
    let cell1 = document.createElement("th");
    let cell2 = document.createElement("th");
    let cell3 = document.createElement("th");

    cell1.innerHTML = "Year";
    cell2.innerHTML = "Test";
    cell3.innerHTML = "Your Score";

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    table.appendChild(row);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            row = document.createElement("tr");
            cell1 = document.createElement("td");
            cell2 = document.createElement("td");
            cell3 = document.createElement("td");

            cell1.innerHTML = data[key]["year"];
            cell2.innerHTML = "AMC " + data[key]["grade"] + data[key]["version"];
            cell3.innerHTML = data[key]["score"];

            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            table.appendChild(row);
        }
    }

    results_div.appendChild(table);
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
    aime_h1 = document.createElement("h2");
    aime_h1.setAttribute("class", "section-header");
    aime_h1.innerHTML = "AIME Results";
    results_div.appendChild(aime_h1);

    let table = document.createElement("table");
    table.setAttribute("id", "aime-results-table");
    table.setAttribute("class", "results-table");

    let row = document.createElement("tr");
    let cell1 = document.createElement("th");
    let cell2 = document.createElement("th");
    let cell3 = document.createElement("th");

    cell1.innerHTML = "Year";
    cell2.innerHTML = "Test";
    cell3.innerHTML = "Your Score";

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    table.appendChild(row);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            row = document.createElement("tr");
            cell1 = document.createElement("td");
            cell2 = document.createElement("td");
            cell3 = document.createElement("td");

            cell1.innerHTML = data[key]["year"];
            cell2.innerHTML = "AIME " + data[key]["version"];
            cell3.innerHTML = data[key]["score"];

            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);

            table.appendChild(row);
        }
    }

    results_div.appendChild(table);
}
