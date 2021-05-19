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
      if (passnoequal.classList.contains("shown")) {
      toggledisplay(passnoequal);
      }
      if (invalidemail.classList.contains("shown")) {
        toggledisplay(invalidemail);
      }
      if (missingfield.classList.contains("hidden")) {
        toggledisplay(missingfield);
      }
      return;
    }
  }

  if (!validateemail(email)) {
    if (passnoequal.classList.contains("shown")) {
      toggledisplay(passnoequal);
    }
    if (missingfield.classList.contains("shown")) {
      toggledisplay(missingfield);
    }
    if (invalidemail.classList.contains("hidden")) {
      toggledisplay(invalidemail);
    }
    return;
  }

  if (password != confirmpass) {   
    if (invalidemail.classList.contains("shown")) {
      toggledisplay(invalidemail);
    }
    if (missingfield.classList.contains("shown")) {
      toggledisplay(missingfield);
    }
    if (passnoequal.classList.contains("hidden")) {
      toggledisplay(passnoequal);
    }
    return;
  }

  if (passnoequal.classList.contains("shown")) {
    toggledisplay(passnoequal);
  }
  if (invalidemail.classList.contains("shown")) {
    toggledisplay(invalidemail);
  }
  
  createaccount(email, password);
}

function validateemail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/*function createaccount(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    user.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ", " + errorMessage);
    });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ", " + errorMessage);
  });

  
}*/

function createaccount(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {
    console.log("Successfully created account");
  }).catch(function(error) {
    console.log(error);
  });
  
  
}
