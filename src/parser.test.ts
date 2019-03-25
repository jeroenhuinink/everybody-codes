import { parse } from "./parser";

describe("parse", () => {
  it("should parse a correct line", () => {
    const line = "NMGN-CAM-123 Somewhere over the rainbow;52.093421;5.118278";
    const actual = parse(line);
    expect(actual).not.toBeNull();
  });

  it("should extract the correct id when followed by space", () => {
    const expected = 456;
    const line = `NMGN-CAM-${expected} Somewhere under the rainbow;52.093421;5.118278`;
    const actual = parse(line);
    expect(actual).not.toBeNull();
    expect(actual).toHaveProperty("id", expected);
  });

  it("should extract the correct id when followed by dash", () => {
    const expected = 456;
    const line = `NMGN-CAM-${expected}-andmore Somewhere under the rainbow;52.093421;5.118278`;
    const actual = parse(line);
    expect(actual).not.toBeNull();
    expect(actual).toHaveProperty("id", expected);
  });

  it("should extract the correct name", () => {
    const expected = "NMGN-CAM-123 Somewhere in the rainbow";
    const line = `${expected};52.093421;5.118278`;
    const actual = parse(line);
    expect(actual).not.toBeNull();
    expect(actual).toHaveProperty("name", expected);
  });

  it("should extract the correct latitude", () => {
    const expected = 52.123;
    const line = `AMS-CAMERA-1;${expected};5.118278`;
    const actual = parse(line);
    expect(actual).not.toBeNull();
    expect(actual).toHaveProperty("latitude", expected);
  });

  it("should extract the correct longitude", () => {
    const expected = 5.123;
    const line = `DENHAAG-CAMERA-2;52.093421;${expected}`;
    const actual = parse(line);
    expect(actual).not.toBeNull();
    expect(actual).toHaveProperty("longitude", expected);
  });

  it("should return null on too many elements", () => {
    const actual = parse(
      "NMGN-CAM-123 Somewhere over the rainbow;52.093421;5.118278;and something"
    );
    expect(actual).toBeNull();
  });

  it("should return null on too few elements", () => {
    const actual = parse("NMGN-CAM-123 Somewhere over the rainbow;52.093421");
    expect(actual).toBeNull();
  });

  it("should return null on incorrect camera name", () => {
    const actual = parse(
      "NMGN-123 Somewhere over the rainbow;52.093421;5.118278"
    );
    expect(actual).toBeNull();
  });
});
