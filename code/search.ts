import { readCameras, search } from "./camera";

async function start(name: string) {
  const cameras = await readCameras();
  const found = await search(cameras, name);

  found.forEach((camera) => {
    console.info(
      `${camera.id} | ${camera.name} | ${camera.latitude} | ${camera.longitude}`
    );
  });
}

// For the time being very primitive commandline parsing
if (process.argv.length !== 4) {
  console.error("Wrong number of arguments.\nUsage: node cli.js --name <name>");
  process.exit(1);
}
if (process.argv[2] !== "--name") {
  console.error("Wrong arguments.\nUsage: node cli.js --name <name>");
  process.exit(1);
}

start(process.argv[3]);
