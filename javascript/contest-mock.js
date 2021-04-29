let problems = [];
function starttest() {
  let testelement = document.getElementById("tests");
  let chosentest = testelement.options[testelement.selectedIndex].text;
  
  let yearelement = document.getElementById("year");
  let chosenyear = yearelement.value;  
  let year = chosenyear;
  
  let hourselement = document.getElementById("hours");
  let minuteselement = document.getElementById("minutes");
  
  let chosenhours = hourselement.value;
  let chosenminutes = minuteselement.value;
  
  let totalseconds = 3600*chosenhours + 60*chosenminutes;
  
  let test = "AMC";
  let grade;
  let version;
  if (chosentest === "AMC 10A") {
    grade = 10;
    version = "A";
  }
  else if (chosentest === "AMC 10B") {
    grade = 10;
    version = "B";
  }
  else if (chosentest === "AMC 12A") {
    grade = 12;
    version = "A";
  }
  else if (chosentest === "AMC 12B") {
    grade = 12;
    version = "B";
  }
  else {
    grade = 10;
    version = "A";
  }
  
  let numproblems = 0;
  if (test === "AMC") {
    numproblems = 25;
  }
  else if (test === "AIME") { // AIME is not supported yet
    numproblems = 15;
  }
  
  for (let i = 0; i < numproblems; i++) {
    problems.push(0);
  }
  

  addcontest(year, test, grade, version, numproblems, totalseconds);
  let loading = document.getElementById("loading-questions");
  loading.classList.remove("hidden");
  loading.classList.add("shown");
  let choosetest = document.getElementById("test-choice");
  choosetest.classList.remove("shown");
  choosetest.classList.add("hidden");
}

function addcontest(year, test, grade, version, numproblems, totalseconds) {
  for (let i = 1; i <= numproblems; i++) { 
    (async () => {
      problems[i-1] = await addproblem(year + "_" + test + "_" + grade + version + "_Problems/Problem_" + i, i);
      addcontent(problems, year, test, grade, version, numproblems, totalseconds);
    })()
  }
}

async function addproblem(page, problemnumber) {
  let endpoint = "https://artofproblemsolving.com/wiki/api.php";
  let params = `action=parse&page=${page}&format=json`;

  let response = await fetch(`${endpoint}?${params}&origin=*`);
  
  let responsejson = await response.json();

  let pagehtml = responsejson.parse.text["*"];
  if (pagehtml.includes("redirectMsg")) {
    let redirectuncutstartloc = pagehtml.indexOf("<a href=\"/wiki/index.php/") + 25;
    let redirectcut = pagehtml.substring(redirectuncutstartloc);
    let redirectcutendloc = redirectcut.indexOf("\"");
    let redirect = redirectcut.substring(0, redirectcutendloc);
    params = `action=parse&page=${redirect}&format=json`;
    response = await fetch(`${endpoint}?${params}&origin=*`);
    responsejson = await response.json();
    pagehtml = responsejson.parse.text["*"];
  }
  
  let searchstart = pagehtml.indexOf("id=\"Problem\">");
  let problemstartlocoriginal = pagehtml.indexOf("<p>", searchstart);
  let pagehtmlcut = pagehtml.substring(problemstartlocoriginal);
  let problemendloc = pagehtmlcut.indexOf("<h2><span");
  let problemtext = pagehtmlcut.substring(0, problemendloc);
  
  return problemtext;
}

function addcontent(problems, year, test, grade, version, numproblems, totalseconds) {
  var readytoappend = true;
  for (let i = 0; i < problems.length; i++) {
    if (problems[i] === 0) {
      readytoappend = false;
    }
  }
  if (readytoappend) {
    for (let i = 0; i < problems.length; i++) {
      $("#questions").append("<div class=\"problem\"><div class=\"bubbles\"><button onclick=\"togglecolor(this.id)\" type=\"button\" class=\"deselected\" id=\"A-button-" + i + "\">A</button><button onclick=\"togglecolor(this.id)\" type=\"button\" class=\"deselected\" id=\"B-button-" + i + "\">B</button><button onclick=\"togglecolor(this.id)\" type=\"button\" class=\"deselected\" id=\"C-button-" + i + "\">C</button><button onclick=\"togglecolor(this.id)\" type=\"button\" class=\"deselected\" id=\"D-button-" + i + "\">D</button><button onclick=\"togglecolor(this.id)\" type=\"button\" class=\"deselected\" id=\"E-button-" + i + "\">E</button></div><div class=\"problem-number\">Problem " + (i+1) + "</div><div class=\"problem-body\">" + problems[i] + "</div></div>");
    }
    document.getElementById("loading-questions").classList.remove("shown");
    document.getElementById("loading-questions").classList.add("hidden");
    starttimer(year, test, grade, version, numproblems, totalseconds);
  }
}

function togglecolor(id) {
  let currentproblem = id.substring(1);
  let choices = ["A", "B", "C", "D", "E"];
  let runend = true;
  for (let i = 0; i < choices.length; i++) {
    let letter = choices[i];
    let currentbtn = document.getElementById(letter + currentproblem);
    if (currentbtn.classList.contains("selected") && id === (letter + currentproblem))     {
      currentbtn.classList.remove("selected");
      currentbtn.classList.add("deselected");
      runend = false;
    }
    else if (currentbtn.classList.contains("selected")) {
      currentbtn.classList.remove("selected");
      currentbtn.classList.add("deselected");
    }
  }
  if (runend) {
    let nowbtn = document.getElementById(id);
    if (nowbtn.classList.contains("deselected")) {
      nowbtn.classList.remove("deselected");
      nowbtn.classList.add("selected");
    }
  }
}

function starttimer(year, test, grade, version, numproblems, totalseconds) {
  let starttime = new Date().getTime();
  /*if (test === "AMC") {
    length = 75;
  }
  if (test === "AIME") {
    length = 180;
  }*/
  let endtime = addSeconds(starttime, totalseconds);
  let contesthead = document.getElementById("contest-heading");
  contesthead.innerHTML = year + " " + test + " " + grade + version + " Mock Contest";
  let contesttext = document.createElement("div");
  
  let timer = document.getElementById("timer");
  timer.classList.remove("hidden");
  timer.classList.add("shown");
  
  
  let interval = setInterval(function() {
    let currenttime = new Date().getTime();
    let timetoend = endtime - currenttime;
    
    let hours = Math.floor((timetoend % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timetoend % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timetoend % (1000 * 60)) / 1000);
    
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    
    timer.innerHTML = "Time Remaining: " + hours + ":" + minutes + ":" + seconds;
    
    if (timetoend <= 0) {
      clearInterval(interval);
      timer.classList.add("hidden");
      timer.classList.remove("shown");
      let questions = document.getElementById("questions");
      questions.classList.add("hidden");
      questions.classList.remove("shown");
      timer.innerHTML = "CONTEST OVER";
      showresults(year, test, grade, version, numproblems);
      
    }
    
  }, 1000);
}

function addSeconds(date, seconds) {
  return new Date(date + seconds*1000);
}

function showresults(year, test, grade, version, numproblems) {
  let selectedanswers = getSelectedAnswers(year, test, grade, version, numproblems);
  (async () => {
    let correctanswers = await getcorrectanswers(year, test, grade, version, numproblems);
    let score = checkanswers(selectedanswers, correctanswers);
    let scoreelement = document.getElementById("score");
    scoreelement.classList.remove("hidden");
    scoreelement.classList.add("shown");
    
    let answersdiv = document.getElementById("answers");
    let testdiv = document.getElementById("contest-heading");
    testdiv.innerHTML = year + " " + test + " " + grade + version + " Mock Results";
    
    scoreelement.innerHTML = "Final Score: " + score;
    let viewscores = document.createElement("button");
    viewscores.setAttribute("id", "view-scores");
    viewscores.innerHTML = "View Results";
    document.getElementById("results").appendChild(viewscores);
    viewscores.onclick = function() {displayresults(numproblems, selectedanswers, correctanswers, score, year, test, grade, version)};
  })()
}

function displayresults(numproblems, selectedanswers, correctanswers, score, year, test, grade, version) {
  let viewscores = document.getElementById("view-scores");
  let results = document.getElementById("results");
  results.classList.remove("shown");
  results.classList.add("hidden");
  
  let letters = ["A", "B", "C", "D", "E"];
  for (let i = 0; i < numproblems; i++) {
    for (let j = 0; j < letters.length; j++) {
      let buttonid = letters[j] + "-button-" + i;
      let buttonelement = document.getElementById(buttonid);
      buttonelement.disabled = true;
      if (selectedanswers[i] != 0 && buttonelement.classList.contains("selected")) {
        if (selectedanswers[i] === correctanswers[i]) {
          buttonelement.style.backgroundColor = "#b1e6bc";
        }
        else {
          buttonelement.style.backgroundColor = "#f5958e";
        }
      }      
    }
  }
  
  let questions = document.getElementById("questions");
  questions.classList.remove("hidden");
  questions.classList.add("shown");
  
  let answersdiv = document.getElementById("answers");
  
  let scorediv = document.createElement("div");
  scorediv.setAttribute("id", "score");
  scorediv.innerHTML = "Final Score: " + score;
  answersdiv.appendChild(scorediv);
  
  let answerstable = document.createElement("table");
  answerstable.classList.add("hidden");
  answerstable.setAttribute("id", "answers-table");
  let tablerow = document.createElement("tr");
  let tablecell1 = document.createElement("th");
  let tablecell2 = document.createElement("th");
  let tablecell3 = document.createElement("th");
  
  tablecell1.innerHTML = "Problem Number";
  tablecell2.innerHTML = "Your Answer";
  tablecell3.innerHTML = "Correct Answer";
  tablerow.appendChild(tablecell1);
  tablerow.appendChild(tablecell2);
  tablerow.appendChild(tablecell3);
  
  answerstable.appendChild(tablerow);
  for (let i = 0; i < numproblems; i++) {
    tablerow = document.createElement("tr");
    tablecell1 = document.createElement("td");
    tablecell2 = document.createElement("td");
    tablecell3 = document.createElement("td");
    
    tablecell1.innerHTML = (i+1) + ".";
    if (selectedanswers[i] === 0) {
      tablecell2.innerHTML = "Skipped";
    }
    else {
      tablecell2.innerHTML = selectedanswers[i];
    }
    tablecell3.innerHTML = correctanswers[i];
    
    tablerow.appendChild(tablecell1);
    tablerow.appendChild(tablecell2);
    tablerow.appendChild(tablecell3);

    answerstable.appendChild(tablerow);
  }
  
  let showtablebtn = document.createElement("button");
  showtablebtn.setAttribute("id", "show-table");
  showtablebtn.onclick = function() {toggleTableVisibility()};
  showtablebtn.innerHTML = "Show Score Report";
  answersdiv.appendChild(showtablebtn);
  
  answersdiv.appendChild(answerstable);
  
 
}

function toggleTableVisibility() {
  let table = document.getElementById("answers-table");
  // had to get rid of adding shown class because display: block caused weird alignment behavior
  if (table.classList.contains("hidden")) {
    table.classList.remove("hidden");
  }
  else if (!table.classList.contains("hidden")) {
    table.classList.add("hidden");
  }
  
  let showtablebtn = document.getElementById("show-table");
  if (showtablebtn.innerHTML === "Show Score Report") {
    showtablebtn.innerHTML = "Hide Score Report";
  }
  else if (showtablebtn.innerHTML === "Hide Score Report") {
    showtablebtn.innerHTML = "Show Score Report";
  }
}

function getSelectedAnswers(year, test, grade, version, numproblems) {
  let selectedanswers = [];
  for (let i = 0; i < numproblems; i++) {
    selectedanswers.push(0);
  }
  
  let letters = ["A", "B", "C", "D", "E"];
  let buttonid;
  let currentbutton;
  for (let i = 0; i < numproblems; i++) {
    
    for (let j = 0; j < letters.length; j++) {
      buttonid = letters[j] + "-button-" + i;
      
      currentbutton = document.getElementById(buttonid);
      if (currentbutton.classList.contains("selected") && !currentbutton.classList.contains("deselected")) {
        selectedanswers[i] = letters[j];
        
        break;
      }
    }
  }
  return selectedanswers;
}

async function getcorrectanswers(year, test, grade, version, numproblems) {
  let endpoint = "https://artofproblemsolving.com/wiki/api.php";
  let page = year + "_" + test + "_" + grade + version + "_Answer_Key";
  let params = `action=parse&page=${page}&format=json`;

  let response = await fetch(`${endpoint}?${params}&origin=*`);
  
  let responsejson = await response.json();

  let pagehtml = responsejson.parse.text["*"];
  if (pagehtml.includes("redirectMsg")) {
    let redirectuncutstartloc = pagehtml.indexOf("<a href=\"/wiki/index.php/") + 25;
    let redirectcut = pagehtml.substring(redirectuncutstartloc);
    let redirectcutendloc = redirectcut.indexOf("\"");
    let redirect = redirectcut.substring(0, redirectcutendloc);
    params = `action=parse&page=${redirect}&format=json`;
    response = await fetch(`${endpoint}?${params}&origin=*`);
    responsejson = await response.json();
    pagehtml = responsejson.parse.text["*"];
  }
  
  let correctanswers = [];  
  let cutloc;
  for (let i = 0; i < numproblems; i++) {
    cutloc = pagehtml.indexOf("<li>") + 4;
    pagehtml = pagehtml.substring(cutloc);
    correctanswers.push(pagehtml.substring(0, 1));
  }
  
  return correctanswers;
}

function checkanswers(selectedanswers, correctanswers) {
  let correctnum = 0;
  let skippednum = 0;
  let wrongnum = 0;
  for (let i = 0; i < selectedanswers.length; i++) {
    if (selectedanswers[i] === 0) {
      skippednum++;
    }
    else if (selectedanswers[i] === correctanswers[i]) {
      correctnum++;
    }
    else if (selectedanswers[i] != correctanswers[i]) {
      wrongnum++;
    }
  }
  let score = 6*correctnum + 1.5*skippednum;
  return score;
}
