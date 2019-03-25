import { ICamera } from "./camera";

// Parse an individual line into a camera.
// Parse errors are logged and a null is returned for such a line
export function parse(line: string): ICamera | null {
  // Split a csv line by the separator (;)
  const parts = line.split(";");

  // check for parse errors
  if (!parts || parts.length !== 3) {
    console.error(`Parse error for: ${line}`);
    return null;
  }

  // this yields the name, latitude and longitude
  const [name, latitude, longitude] = parts;

  // extract the id from the name with a regex
  const regex = /^.*-.*-(\d+)[ -]?.*$/;
  const matches = name.match(regex);

  // check for parse errors
  if (!matches) {
    console.error(`Parse error for: ${line}`);
    return null;
  }

  // this yields the id
  const id = matches[1];

  // do so type conversions before we return the result
  return {
    id: +id,
    name,
    latitude: +latitude,
    longitude: +longitude
  };
}
