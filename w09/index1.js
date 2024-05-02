const { createServer } = require("http");
const port = 3000;
const address = "127.0.0.1";

const server = createServer((req, res) => {
  const  url = req.url;
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
