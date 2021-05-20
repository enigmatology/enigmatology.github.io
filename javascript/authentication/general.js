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

let auth = firebase.auth();
let user = auth.currentUser;
let headdiv;

while (headdiv == null) {
  headdiv = document.getElementById("auth");
}

if (user && user.emailVerified) {
  headdiv.innerHTML = user.displayName;
}
else {
  headdiv.innerHTML = "Currently logged out";
}
