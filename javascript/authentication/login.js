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

function login() {
  let errorele = document.getElementById("error");
  
  let emailele = document.getElementById("email");
  let passwordele = document.getElementById("password");

  let email = emailele.value;
  let password = passwordele.value;

  let elements = [email, password];
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
  
  errorele.innerHTML = "";
  
  loginserver(email, password);
}

function validateemail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function loginserver(email, password) {
  let auth = firebase.auth();
  let infodiv = document.getElementById("info");
  let actiondiv = document.getElementById("info-action");
  let errordiv = document.getElementById("error");
  let logindiv = document.getElementById("login-form");
  
  toggledisplay(logindiv);
  infodiv.innerHTML = "Logging in... please wait.";
  
  auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    let user = auth.currentUser;    
    if (user != null) {
      if (!user.emailVerified) {
        infodiv.innerHTML = "The email address associated with your account has not been verified.";
        actiondiv.innerHTML = "Please check your email to verify your email and activate your account.";
      }
      else {
        window.location = "https://enigmatology.github.io";
      }
    }
  })
  .catch((error) => {
    let code = error.code;
    if (code === "auth/user-disabled") {
      infodiv.innerHTML = "The account you tried has been disabled.";
      actiondiv.innerHTML = "If you believe that this was an error, private message CoolCarsOnTheRun on AoPS with your email.";
    }
    else if (code === "auth/user-not-found") {
      infodiv.innerHTML = "The account you tried does not exist.";
      actiondiv.innerHTML = "Please try again, or if you do not have an account, create one."; // TODO: add link to create account here
    }
    else if (code === "auth/wrong-password") {
      errordiv.innerHTML = "Incorrect password. Please try again.";
      document.getElementById("password").value = "";
      infodiv.innerHTML = "";
      toggledisplay(logindiv);
    }
    else {
      infodiv.innerHTML = "There was an error when logging you in.";
      actiondiv.innerHTML = "Please private message CoolCarsOnTheRun on AoPS with the following error message:<br>" + code;
    }
  });
  
  
} 
