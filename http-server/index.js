const http = require("http");
const PORT = 3000;
const server = http.createServer();
const friends = [
  {
    id: 0,
    name: "Tesla",
  },
  {
    id: 1,
    name: "DaDDy Chill",
  },
  {
    id: 2,
    name: "Newton",
  },
  {
    id: 3,
    name: "Dr.Strange",
  },
  {
    id: 4,
    name: "Iron Man",
  },
];
server.on("request", (req, res) => {
  const items = req.url.split("/");
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Request", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    // res.writeHead(200, {
    //   "Content-type": "application/json",
    // });
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "message") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello World</li>");
    res.write("<li>Welcome to the new world</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");
    res.write("<h1>This is Home page</h1>");
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader("Content-type", "text/plain");
    res.write("This request is wrong");
    res.write("Please request friend and message");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
