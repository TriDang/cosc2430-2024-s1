const { createServer } = require("http");
const { readFile, appendFile } = require("fs");

const port = 3000;
const address = "127.0.0.1";
const fileName = "requests.txt";

const server = createServer((req, res) => {
  if (req.url == '/admin') {
    readFile(fileName, "utf-8", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      let rows = data.split("\n");
      res.end("The number of requests " + (rows.length - 1));
    });
    return;
  }
  const url = req.url;
  const time = new Date();
  const timeString = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  appendFile(fileName, url + " " + timeString + "\n", (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Writing file finished");
  });
  if (url == '/login') {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><form>Username <input type='text' name='username'><br>Password <input type='password' name='password'><br><input type='submit' value='Login'></form></body></html>");
    return;
  }
  if (req.url == '/logout') {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>Goodbye</h1></body></html>");
    return;
  }
  // catch all other routes
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>Not found</h1></body></html>");
});

server.listen(port, address, () => {
  console.log("Server started");
});
