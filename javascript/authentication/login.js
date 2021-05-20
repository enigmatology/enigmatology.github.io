// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDRtckGECYdhgZAGTKUpO60NT5NQAsnFd0",
  authDomain: "enigmatology-95018.firebaseapp.com",
  projectId: "enigmatology-95018",
  storageBucket: "enigmatology-95018.appspot.com",
  messagingSenderId: "563230550022",
  appId: "1:563230550022:web:109ff2a5bb073f5f237b87",
  measurementId: "G-8PKK0H9346"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

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
  
  login(email, password);
}

function validateemail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function loginserver(email, password) {
  let auth = firebase.auth();
  let infodiv = document.getElementById("info");
  let actiondiv = document.getElementById("info-action");
  let logindiv = document.getElementById("login-form");
  
  toggledisplay(logindiv);
  infodiv.innerHTML = "Logging in... please wait.";
  
  auth.signInUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // signed in
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
  });
  
  
} 
