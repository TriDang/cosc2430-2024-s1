function extract_phones(str) {
  // only the first matched result
  let pattern = /[0-9]{10,11}/;
  console.log(str.match(pattern));

  // all matched results
  pattern = /[0-9]{10,11}/g;
  console.log(str.match(pattern));

  // with optional dashes in numbers
  pattern = /[0-9]{3}-?[0-9]{3}-?[0-9]{3,4}/g;
  console.log(str.match(pattern));

  // with optional dashes and dots in numbers
  pattern = /[0-9]{3}[-\.]?[0-9]{3}[-\.]?[0-9]{3,4}/g;
  console.log(str.match(pattern));
}

let str = "These are my phone numbers: 1234567890 and 11122233344. Is your number 1231231231? Here are more examples: 123-456-7890 and 123.456.7890";
extract_phones(str);
