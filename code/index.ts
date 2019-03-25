import * as fs from "fs";
import * as http from "http";
import { readCameras } from "./camera";

async function start() {
  const cameras = await readCameras();

  /*
   * Doing the simplest thing that could possible work here.
   * - `/api` returns the data,
   * - everything else we will try to return a file from the code folder.
   *
   * This means that the sources are also exposed, but this is not about
   * security and keeps things simple.
   *
   * Could have used express or something else to serve the pages and api,
   * but now we have no external dependencies
   */
  const server = http.createServer((req, res) => {
    // Serve the data
    function serveApi() {
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(cameras));
      res.end();
    }

    // Serve files from ./code
    function servePage(url?: string) {
      const filename =
        !url || url === "/" ? "./code/index.html" : `./code${url}`;

      fs.readFile(filename, (err, data) => {
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
    console.debug(req.url);

    if (req.url === "/api") {
      serveApi();
    } else {
      servePage(req.url);
    }
  });

  const port = +(process.env.PORT || 3000);
  server.listen(port);
  console.info(`listening on ${port}`);
}

start();
