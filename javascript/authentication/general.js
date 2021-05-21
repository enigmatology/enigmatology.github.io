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

function showusername() {
  let auth = firebase.auth();
  let headdiv = document.getElementById("auth");
  auth.onAuthStateChanged(function(user) {
    headdiv.innerHTML = "<div id=\"vertical-separator\"></div>";
    if (user) {
      headdiv.innerHTML += user.displayName;
    }
    else {
      headdiv.innerHTML += "Currently logged out";
    }
  });
}
