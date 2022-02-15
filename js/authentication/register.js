function toggledisplay(element) {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    element.classList.add("shown");
  }
  else {
    element.classList.remove("shown");
    element.classList.add("hidden");
  }
}

function register() {
  let errorele = document.getElementById("error");
  
  let emailele = document.getElementById("email");
  let usernameele = document.getElementById("username");
  let passwordele = document.getElementById("password");
  let confirmpassele = document.getElementById("confirm-pass");

  let email = emailele.value;
  let username = usernameele.value;
  let password = passwordele.value;
  let confirmpass = confirmpassele.value;

  let elements = [email, username, password, confirmpass];
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] === "") {
      errorele.innerHTML = "One or more fields are empty. Please fill out all fields and try again.";
      return;
    }
  }

  if (!validateemail(email)) {
    errorele.innerHTML = "Invalid email. Please enter a different one."
    return;
  }

  if (password != confirmpass) {   
    errorele.innerHTML = "Your passwords do not match. Please try again."
    return;
  }
  
  errorele.innerHTML = "";
  
  createaccount(email, password, username);
}

function validateemail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function createaccount(email, password, username) {
  let auth = firebase.auth();
  let database = firebase.database();
  
  let infodiv = document.getElementById("info");
  let actiondiv = document.getElementById("info-action");
  let logindiv = document.getElementById("login-form");
  
  toggledisplay(logindiv);
  infodiv.innerHTML = "Creating account... please wait.";
  
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    let user = auth.currentUser;
    user.updateProfile({
      displayName: username
    }).then(function() {
      infodiv.innerHTML = "Sending email verification... please wait.";
      user.sendEmailVerification().then(function() {
        infodiv.innerHTML = "Verification email successfully sent.";
        actiondiv.innerHTML = "Please check your email to activate your account.";

        database.ref('users/' + user.uid).set({
          amcs: {},
          aimes: {},
        });
      }).catch(function(error) {
        console.log(error);
        let code = error.code;
        console.log("here");
        infodiv.innerHTML = "There was an error when sending the verification email.";
        actiondiv.innerHTML = "Please private message CoolCarsOnTheRun on AoPS with the following error message:<br>" + code;
      });
    }).catch(function(error) {
      let code = error.code;
      infodiv.innerHTML = "There was an error when creating the account.";
      actiondiv.innerHTML = "Please private message CoolCarsOnTheRun on AoPS with the following error message:<br>" + code;
    })
  }).catch(function(error) {
    let code = error.code;
    if (code === "auth/email-already-in-use") {
      infodiv.innerHTML = "The email you tried already has an account associated with it.";
      actiondiv.innerHTML = "Please try again with a different email.";
    }
    else if (code === "auth/weak-password") {
      infodiv.innerHTML = "The password you tried was too weak.";
      actiondiv.innerHTML = "Please try again with a different password.";
    }
    else if (code === "auth/invalid-email") {
      infodiv.innerHTML = "The email you tried does not exist.";
      actiondiv.innerHTML = "Please try again with a different email.";
    }
    else {
      infodiv.innerHTML = "There was an error when creating the account.";
      actiondiv.innerHTML = "Please private message CoolCarsOnTheRun on AoPS with the following error message:<br>" + code;
    }
  });
}
