import * as fs from "fs";

import { parse } from "./parser";

export interface ICamera {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function readLines(fileName: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      }
      if (!data) {
        resolve([]);
        return;
      }

      resolve(data.toString().split("\n"));
    });
  });
}

export function parseLines(lines: string[]) {
  return lines
    .filter((l) => l && l !== "Camera;Latitude;Longitude")
    .map(parse)
    .filter((c) => c != null) as ICamera[];
}

export async function readCameras() {
  return parseLines(await readLines("./data/cameras-defb.csv"));
}

export function search(cameras: ICamera[], name: string) {
  return cameras.filter(
    (value) =>
      value.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) > -1
  );
}
