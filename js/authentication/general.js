// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRtckGECYdhgZAGTKUpO60NT5NQAsnFd0",
  authDomain: "enigmatology-95018.firebaseapp.com",
  databaseURL: "https://enigmatology-95018-default-rtdb.firebaseio.com",
  projectId: "enigmatology-95018",
  storageBucket: "enigmatology-95018.appspot.com",
  messagingSenderId: "563230550022",
  appId: "1:563230550022:web:109ff2a5bb073f5f237b87",
  measurementId: "G-8PKK0H9346"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function showusername() {
  let auth = firebase.auth();
  let headdiv = document.getElementById("auth");
  auth.onAuthStateChanged(function(user) {
    if (user) {
      headdiv.innerHTML = "<div id=\"user-wrapper\"><div id=\"user-compress-wrapper\"><div id=\"logged-in\">" + user.displayName + "</div><div id=\"logout-dropdown\"><button id=\"logout-btn\" onclick=\"logout()\">Sign out</button></div></div></div>";
      // ▼
    }
    else {
      headdiv.innerHTML = "<div id=\"logged-in\">" + "<a id=\"login-register\" href=\"https://enigmatology.github.io/account/login\">Login/Register</a>" + "</div>";
    }
    headdiv.innerHTML += "<div id=\"vertical-separator\"></div>";
  });
}

function logout() {
  let auth = firebase.auth();
  auth.signOut()
  .then(() => {
    window.location = "https://enigmatology.github.io";
  })
  .catch((error) => {
    console.log(error);
  });
}
