import { describe, it, expect } from "vitest";
import { haversineKm } from "./haversineKm";

describe("haversineKm", () => {
  it("returns 0 when both points are identical", () => {
    expect(haversineKm(30, -100, 30, -100)).toBeCloseTo(0, 5);
  });

  it("returns a positive number for valid points", () => {
    const dist = haversineKm(40, -100, 30, -90);
    expect(dist).toBeGreaterThan(1300); // 1400-1500 km apart
    expect(dist).toBeLessThan(1600);
  });

  it("is roughly symmetric (A→B = B→A)", () => {
    const d1 = haversineKm(40, -100, 30, -90);
    const d2 = haversineKm(30, -90, 40, -100);
    // The difference between both directions should be almost zero
    expect(Math.abs(d1 - d2)).toBeLessThan(1);
  });
});