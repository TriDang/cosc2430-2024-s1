const { createServer } = require("http");
const bcrypt = require("bcrypt");

const port = 3000;
const address = "127.0.0.1";

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  let msg = "";
  bcrypt.hash("abc", 10, function(err, hash) {
    msg += "The hash value of 'abc' is " + hash + "\n";
    bcrypt.compare("xyz", hash, function(err, result) {
      msg += "The comparison with 'xyz' is " + result + "\n";
      bcrypt.compare("abc", hash, function(err, result) {
        msg += "The comparison with 'abc' is " + result + "\n";
        res.end(msg);
      });
    });
  });
});

server.listen(port, address, () => {
  console.log("Server started");
});
