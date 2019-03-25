import { parseLines, search } from "./camera";

describe("parseLines", () => {
  it("should skip the header line", () => {
    const lines = ["Camera;Latitude;Longitude"];
    const actual = parseLines(lines);
    expect(actual).toHaveLength(0);
  });

  it("should skip empty lines", () => {
    const lines = ["Camera;Latitude;Longitude", ""];
    const actual = parseLines(lines);
    expect(actual).toHaveLength(0);
  });

  it("should skip error lines", () => {
    const lines = ["Camera;Latitude;Longitude", "Some arbitrary error", ""];
    const actual = parseLines(lines);
    expect(actual).toHaveLength(0);
  });

  it("should parse correct lines", () => {
    const lines = [
      "Camera;Latitude;Longitude",
      "NMGN-CAM-123 Somewhere over the rainbow;52.093421;5.118278",
      ""
    ];
    const actual = parseLines(lines);
    expect(actual).toHaveLength(1);
  });
});

describe("search", () => {
  it("should return name matches", () => {
    const expected = { id: 1, name: "test", latitude: 0, longitude: 0 };
    const actual = search([expected], "test");
    expect(actual).toEqual([expected]);
  });

  it("should return empty list when no matches", () => {
    const expected = { id: 1, name: "test", latitude: 0, longitude: 0 };
    const actual = search([expected], "other");
    expect(actual).toEqual([]);
  });
});
