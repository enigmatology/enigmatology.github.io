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

function register() {
  let errorele = document.getElementById("error");
  
  let emailele = document.getElementById("email");
  let passwordele = document.getElementById("password");
  let confirmpassele = document.getElementById("confirm-pass");

  let passnoequal = document.getElementById("passwords-not-equal");
  let invalidemail = document.getElementById("invalid-email");
  let missingfield = document.getElementById("missing-field");

  let email = emailele.value;
  let password = passwordele.value;
  let confirmpass = confirmpassele.value;

  let elements = [email, password, confirmpass];
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] === "") {
      /*if (passnoequal.classList.contains("shown")) {
      toggledisplay(passnoequal);
      }
      if (invalidemail.classList.contains("shown")) {
        toggledisplay(invalidemail);
      }
      if (missingfield.classList.contains("hidden")) {
        toggledisplay(missingfield);
      }*/
      errorele.innerHTML = "One or more fields are empty. Please fill out all fields and try again.";
      return;
    }
  }

  if (!validateemail(email)) {
    /*if (passnoequal.classList.contains("shown")) {
      toggledisplay(passnoequal);
    }
    if (missingfield.classList.contains("shown")) {
      toggledisplay(missingfield);
    }
    if (invalidemail.classList.contains("hidden")) {
      toggledisplay(invalidemail);
    }*/
    errorele.innerHTML = "Invalid email. Please enter a different one."
    return;
  }

  if (password != confirmpass) {   
    /*if (invalidemail.classList.contains("shown")) {
      toggledisplay(invalidemail);
    }
    if (missingfield.classList.contains("shown")) {
      toggledisplay(missingfield);
    }
    if (passnoequal.classList.contains("hidden")) {
      toggledisplay(passnoequal);
    }*/
    errorele.innerHTML = "Your passwords do not match. Please try again."
    return;
  }

  /*if (passnoequal.classList.contains("shown")) {
    toggledisplay(passnoequal);
  }
  if (invalidemail.classList.contains("shown")) {
    toggledisplay(invalidemail);
  }*/
  
  errorele.innerHTML = "";
  
  createaccount(email, password);
}

function validateemail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function createaccount(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      console.log("Verification email successfully sent.");
    }).catch(function(error) {
      console.log("There was an error when sending the verification email.");
    });
  }).catch(function(error) {
    console.log(error);
  });
  
  
}
