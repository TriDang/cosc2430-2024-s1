const express = require("express");
const app = express();
const port = 3000;

// to get data sent via <form method="post">
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// session related settings - working with session
const session = require("express-session");
const FileStore = require("session-file-store")(session);

app.use(session({
  store: new FileStore,
  secret: "keyboard hero",
  resave: true,
  saveUninitialized: true
}));

// view related settings
const path = require("path");
app.engine(".html", require("ejs").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "public")));

// data
const products = require("./products").products;

// home page
app.get("/", (req, res) => {
  res.render("home");
});

// search page
app.get("/search", (req, res) => {
  let displayProducts = products;
  if (req.query.q) {
    const name = req.query.q;
    displayProducts = products.filter((p) => {
      return p.name.startsWith(name);
    });
  }
  res.render('search', {
    products: displayProducts
  });
});

// single product page
app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((p) => p.id == id);
  res.render("product", {
    product: product
  });
});

// protected page - only allow access if logged in
app.get("/account", (req, res) => {
  if (req.session.username) {
    res.render("account", {
      username: req.session.username
    });
  } else {
    res.redirect("/login");
  }
});

// login page
app.get("/login", (req, res) => {
  if (req.session.username) {
    return res.redirect("/account");
  }
  res.render("login");
});

// login logic
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (password == "COSC2430") {
    req.session.username = username;
    req.session.save(err => {
      res.redirect("/account");
    });
  } else {
    res.redirect("/login");
  }
});

app.get('*', (req, res) => {
  res.send('Not found 404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
