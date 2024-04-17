function create_row(values) {
  const tr = document.createElement("tr");
  for (let v of values) {
    let td = document.createElement("td");
    td.innerText = v;
    tr.appendChild(td);
  }
  return tr;
}

let order_entries = [];

order_entries = JSON.parse(localStorage.getItem("order_entries"));
if (order_entries != null) {
  for (let entry of order_entries) {
    let row = create_row([entry.name, entry.price, entry.quantity, entry.amount]);
    document.querySelector("#order_table").appendChild(row);
  }
} else {
  order_entries = [];
}

document.querySelector("#add").addEventListener("click", () => {
  const name = document.querySelector("#product_name").value;
  const price = document.querySelector("#price").value;
  const quantity = document.querySelector("#quantity").value;
  const amount = price * quantity;

  order_entries.push({name: name, price: price, quantity: quantity, amount: amount});

  const tr = create_row([name, price, quantity, amount]);
  document.querySelector("#order_table").appendChild(tr);
  document.querySelector("#notification").style.display = "inline";
  setTimeout(() => {
    document.querySelector("#notification").style.display = "none";
  }, 2000);
  localStorage.setItem("order_entries", JSON.stringify(order_entries));
});
