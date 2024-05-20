const express = require("express");
const app = express();
const port = 3000;

const { writeFileSync, readFileSync } = require("fs");

// to get data sent via <form method="post">
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// view related settings
const path = require("path");
app.engine(".html", require("ejs").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "public")));

// file name
const data_file = "data.json";

// new product page
app.get("/newproduct", (req, res) => {
  res.render("newproduct");
});

// add a new product into the required file
app.post("/newproduct", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  // read all data
  let data = [];
  try {
    data = JSON.parse(readFileSync(data_file, "utf-8"));
  } catch (e) {
    console.log(e);
  }
  
  // if the ID is unique, add this new product
  let findProduct = data.find( (p) => { return p.id == id });
  if (findProduct == undefined) {
    data.push({
      id: id,
      name: name,
      price: price,
      description: description,
    });

    // save file
    writeFileSync(data_file, JSON.stringify(data), "utf-8");
  }

  res.send("<h2>New Product Added</h2><p><a href='/newproduct'>Add More Product</a></p>")
});

// display all products
app.get("/allproducts", (req, res) => {
  // read all data
  let data = [];
  try {
    data = JSON.parse(readFileSync(data_file, "utf-8"));
  } catch (e) {
    console.log(e);
  }
  
  res.render("allproducts", {
    products: data
  });
});

// delete a product
app.get("/delete/:productID", (req, res) => {
  const id = req.params.productID;
  // read all data
  let data = [];
  try {
    data = JSON.parse(readFileSync(data_file, "utf-8"));
  } catch (e) {
    console.log(e);
  }

  // remove product
  console.log(data);
  console.log(id);
  data = data.filter( (product) => { return product.id != id });
  console.log(data);

  // save file
  writeFileSync(data_file, JSON.stringify(data), "utf-8");
  
  res.send("<h2>Product Deleted</h2><p><a href='/allproducts'>View All Products</a></p>");
});

// handle all other requests
app.get('*', (req, res) => {
  res.send('Not found 404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
