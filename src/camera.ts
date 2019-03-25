import * as fs from "fs";

import { parse } from "./parser";

export interface ICamera {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

// Read all lines from a file
function readLines(fileName: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      if (!data) {
        resolve([]);
        return;
      }

      resolve(data.toString().split("\n"));
    });
  });
}

// Parse an array of strings (input lines)
export function parseLines(lines: string[]) {
  return lines
    .filter((l) => l && l !== "Camera;Latitude;Longitude") // skip empty lines and header line
    .map(parse) // parse individual lines
    .filter((c) => c != null) as ICamera[]; // remove any nulls due to errors
}

// Read all the camera information from the data file
export async function readCameras() {
  return parseLines(await readLines("./data/cameras-defb.csv"));
}

// Search for a camera by name
export function search(cameras: ICamera[], name: string) {
  const searchString = name.toLocaleLowerCase();
  return cameras.filter(
    (camera) => camera.name.toLocaleLowerCase().indexOf(searchString) > -1
  );
}
