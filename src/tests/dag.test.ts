import { describe, expect, it } from "vitest";
import { getDirectDependencyIds, getTransitiveDependencyIds } from "../utils/dag";

const edges = [
  { source: "A", target: "B" },
  { source: "B", target: "C" },
  { source: "A", target: "D" },
  { source: "D", target: "C" },
];

describe("dag utils", () => {
  it("gets direct dependencies", () => {
    expect(getDirectDependencyIds("C", edges)).toEqual(["B", "D"]);
  });

  it("gets transitive dependencies", () => {
    expect(getTransitiveDependencyIds("C", edges)).toEqual(["B", "A", "D"]);
  });
});