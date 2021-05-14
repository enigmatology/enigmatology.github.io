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
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirmpass = document.getElementById("confirm-pass");

  if (!validateemail(email.value)) {
    let passnoequal = document.getElementById("passwords-not-equal");
    if (passnoequal.classList.contains("shown")) {
      toggledisplay(passnoequal);
    }

    let invalidemail = document.getElementById("invalid-email");
    if (invalidemail.classList.contains("hidden")) {
      toggledisplay(invalidemail);
    }
    return;
  }

  if (password.value != confirmpass.value) {   
    let invalidemail = document.getElementById("invalid-email");
    if (invalidemail.classList.contains("shown")) {
      toggledisplay(invalidemail);
    }

    let passnoequal = document.getElementById("passwords-not-equal");
    if (passnoequal.classList.contains("hidden")) {
      toggledisplay(passnoequal);
    }

    return;
  }        
}

function validateemail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
