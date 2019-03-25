import { ICamera } from "./camera";

export function parse(line: string): ICamera | null {
  const parts = line.split(";");
  if (!parts || parts.length !== 3) {
    console.error(`Parse error for: ${line}`);
    return null;
  }
  const [name, latitude, longitude] = parts;
  const regex = /^(.*)-(.*)-(\d+)[ -]?(.*)$/;
  const matches = parts[0].match(regex);

  if (!matches) {
    console.error(`Parse error for: ${line}`);
    return null;
  } else {
    const id = matches[3];
    return { id: +id, name, latitude: +latitude, longitude: +longitude };
  }
}
