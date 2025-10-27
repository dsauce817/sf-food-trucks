import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TruckList } from "./TruckList";
import type { FoodTruck } from "../types";

const mockTrucks: FoodTruck[] = [
  { applicant: "Tasty Tacos", address: "123 Main St", status: "APPROVED", fooditems: "Tacos" },
  { applicant: "Pho Real", address: "456 Elm St", status: "EXPIRED", fooditems: "Pho" },
];

describe("TruckList", () => {
  it("renders a list of trucks", () => {
    render(<TruckList trucks={mockTrucks} />);
    expect(screen.getByText("Tasty Tacos")).toBeInTheDocument();
    expect(screen.getByText("Pho Real")).toBeInTheDocument();
  });

  it("shows 'No results found' when list is empty", () => {
    render(<TruckList trucks={[]} />);
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });
});