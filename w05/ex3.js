const cart = [];

function add_to_cart() {
  const name = document.querySelector("#name").value;
  const price = parseFloat(document.querySelector("#price").value);
  const prod = {name: name, price: price };
  cart.push(prod);
  let total = 0;
  for (let p of cart) {
    total += p.price;
  }
  const display = "Total cart value: $" + total;
  document.querySelector("#cart_total").innerHTML = display;
}
