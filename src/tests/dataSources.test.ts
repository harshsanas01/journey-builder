import { describe, expect, it } from "vitest";
import { GlobalSourceProvider } from "../dataSources/globalSourceProvider";

describe("global source provider", () => {
  it("returns global sources", () => {
    const sources = GlobalSourceProvider.getSources({} as any);

    expect(sources.length).toBeGreaterThan(0);
    expect(sources[0].sourceType).toBe("global");
  });
});