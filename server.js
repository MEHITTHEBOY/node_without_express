const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const filetypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/submit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { username } = JSON.parse(body);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`user name is ${username}`);
    });
  } else {
    const filepath = "." + (req.url === "/" ? "/index.html" : req.url);
    const extension = path.extname(filepath);
    const ContentType = filetypes[extension] || "text/plain";

    fs.readFile(filepath, (err, content) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not found");
      } else {
        res.writeHead(200, { "Content-Type": ContentType });
        res.end(content);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
