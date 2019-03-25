import * as fs from "fs";
import * as http from "http";
import { readCameras } from "./camera";

async function start() {
  const cameras = await readCameras();

  /* 
  Doing the simplest thing that could possible work here.
  On every request we will return the array of cameras in json format.
  */
  const server = http.createServer((req, res) => {
    function serveApi() {
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(cameras));
      res.end();
    }

    function servePage() {
      fs.readFile("./code/index.html", (err, data) => {
        if (err || !data) {
          console.error(err);
          res.writeHead(500);
          res.end();
          return;
        }

        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Length": data.length
        });
        res.write(data);
        res.end();
      });
    }

    function serveError() {
      res.writeHead(404);
      res.end();
    }

    console.debug(req.url);

    if (req.url === "/api") {
      serveApi();
    } else if (req.url === "/") {
      servePage();
    } else {
      serveError();
    }
  });

  const port = +(process.env.PORT || 3000);
  server.listen(port);
  console.info(`listening on ${port}`);
}

start();
