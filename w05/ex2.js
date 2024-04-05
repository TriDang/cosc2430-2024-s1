function validate() {
  const pass = document.querySelector("#password");
  const pass2 = document.querySelector("#retype_password");
  const result = document.querySelector("#verification_status");

  result.classList.remove("failed");
  result.classList.remove("success");

  // validation here
  // pass and retype pass are the same
  if (pass.value != pass2.value) {
    result.innerText = 'Password and Retype password do not match';
    result.classList.add("failed");
    return;
  }

  // pass length is between 8 and 20
  if (pass.value.length < 8) {
    result.innerText = 'Password is too short';
    result.classList.add("failed");
    return;
  }
  if (pass.value.length > 20) {
    result.innerText = 'Password is too long';
    result.classList.add("failed");
    return;
  }

  // contain at least one lower case letter
  if (!contains(pass.value, 'abcdefghijklmnopqrstuvwxyz')) {
    result.innerText = 'Password must contain at least one lowercase letter';
    result.classList.add("failed");
    return;
  }

  // contain at least one upper case letter
  if (!contains(pass.value, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')) {
    result.innerText = 'Password must contain at least one uppercase letter';
    result.classList.add("failed");
    return;
  }

  // contain at least one digit
  if (!contains(pass.value, '0123456789')) {
    result.innerText = 'Password must contain at least one digit';
    result.classList.add("failed");
    return;
  }

  // contain at least one special character
  if (!contains(pass.value, '!@#$%^&*')) {
    result.innerText = 'Password must contain at least one special character in !@#$%^&*';
    result.classList.add("failed");
    return;
  }

  // contain no space
  if (pass.value.indexOf(" ") >= 0) {
    result.innerText = 'Password must not contain space';
    result.classList.add("failed");
    return;
  }

  result.classList.add("success");
  result.classList.remove("failed");
  result.innerText = 'Password is valid';
}

// check if the string str
// contains at least one letter in the
// provided collection
function contains(str, collection) {
  for (let i = 0; i < collection.length; i++) {
    let c = collection.charAt(i);
    if (str.indexOf(c) >= 0) {
      return true;
    }
  }
  return false;
}