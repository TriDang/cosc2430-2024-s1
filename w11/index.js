const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";  // localhost doesn't work
const client = new MongoClient(url);

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'shop'
});

connection.connect();

// async function to insert a new document
async function insert_new_product(id, name, price) {
  try {
    await client.connect();
    const db = client.db('shop');
    const collection = db.collection('products');
    await collection.insertOne({
      id: id,
      name: name,
      price: price
    });
    await client.close();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// to get data sent via <form method="post">
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// new product page
app.get("/newproduct", (req, res) => {
  res.send("<form method='post'>id <input type='text' name='id'><br>name <input type='text' name='name'><br>price <input type='text' name='price'><br><input type='submit' value='Add'></form>");
});

// receive and process user input
app.post("/newproduct", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;

  connection.query("INSERT INTO products SET id = ?, name = ?, price = ?", [id, name, price], (error, results, fields) => {
    console.log("Insertion finished");
  });

  // insert a new product document
  insert_new_product(id, name, price);

  res.send("<h2>Product inserted</h2>");
});

// search product page
app.get("/search", (req, res) => {
  let str = '<table><tr><th>ID</th><th>Name</th><th>Price</th></tr>';
  let min_price = 0;
  let max_price = 999999;
  if (req.query.min_price) {
    min_price = parseInt(req.query.min_price);
  }
  if (req.query.max_price) {
    max_price = parseInt(req.query.max_price);
  }

  let sql = "SELECT * FROM products WHERE price >= ? AND price <= ?";
  let params = [min_price, max_price];

  connection.query(sql, params, (error, results, fields) => {
    results.forEach((r) => {
      str += '<tr><td>';
      str += r.id;
      str += '</td><td>';
      str += r.name;
      str += '</td><td>';
      str += r.price;
      str += '</td></tr>';
    });
    str += '</table>';
    res.send("<h2>Search Product</h2><form method='get'>Min price<input type='text' name='min_price'>&nbsp;&nbsp;&nbsp;Max price<input type='text' name='max_price'><input type='submit' value='Search'></form>" + str);
  });
});

app.get('*', (req, res) => {
  res.send('Not found 404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
