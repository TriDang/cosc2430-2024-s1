function apply(operator) {
  const n1 = document.querySelector("#number1");
  const n2 = document.querySelector("#number2");
  const f1 = parseFloat(n1.value);
  const f2 = parseFloat(n2.value);
  switch (operator.trim()) {
    case '+':
      document.querySelector("#result").value = f1 + f2;
      break;
    case '-':
      document.querySelector("#result").value = f1 - f2;
      break;
    case '*':
      document.querySelector("#result").value = f1 * f2;
      break;
    case '/':
      document.querySelector("#result").value = f1 / f2;
      break;
  }
}