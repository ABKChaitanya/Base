const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = process.env.PORT || 3000;

// Only these files are public, so server.js, package.json and .git/ are never served.
const types = {
  "/index.html": "text/html; charset=utf-8",
  "/style.css": "text/css; charset=utf-8",
  "/app.js": "application/javascript; charset=utf-8",
};

http
  .createServer((req, res) => {
    const urlPath = new URL(req.url, "http://localhost").pathname;
    const route = urlPath === "/" ? "/index.html" : urlPath;

    if (!types[route]) {
      res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
      return;
    }

    fs.readFile(path.join(root, route), (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": types[route] });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Serving ${root} at http://localhost:${port}`);
  });
