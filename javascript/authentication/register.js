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
}

function validateemail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
