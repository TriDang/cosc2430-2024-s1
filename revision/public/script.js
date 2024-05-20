// validate data
function validate() {
  const id = parseInt(document.querySelector("#id").value);
  const name = document.querySelector("#name").value;
  const price = parseFloat(document.querySelector("#price").value);
  const description = document.querySelector("#description").value;

  let valid = true;

  // validate ID
  if (isNaN(id) || id <= 0) {
    document.querySelector("#id").classList.remove("valid");
    document.querySelector("#id").classList.add("error");
    valid = false;    
  } else {
    document.querySelector("#id").classList.remove("error");
    document.querySelector("#id").classList.add("valid");
  }

  // validate Name
  if (name.length == 0) {
    document.querySelector("#name").classList.remove("valid");
    document.querySelector("#name").classList.add("error");
    valid = false;    
  } else {
    document.querySelector("#name").classList.remove("error");
    document.querySelector("#name").classList.add("valid");
  }

  // validate Description
  if (description.length == 0) {
    document.querySelector("#description").classList.remove("valid");
    document.querySelector("#description").classList.add("error");
    valid = false;
  } else {
    document.querySelector("#description").classList.remove("error");
    document.querySelector("#description").classList.add("valid");    
  }

  // validate Price
  if (isNaN(price) || price <= 0) {
    document.querySelector("#price").classList.remove("valid");
    document.querySelector("#price").classList.add("error");
    valid = false;
  } else {
    document.querySelector("#price").classList.remove("error");
    document.querySelector("#price").classList.add("valid");    
  }

  return valid;
}
