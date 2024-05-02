import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input components", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<Input data-testid="input" />);
    const inputElement = getByTestId("input");

    expect(inputElement).toBeInTheDocument();
  });

  it("should render with the right style class names", () => {
    const { getByTestId } = render(<Input data-testid="input" />);
    const inputElement = getByTestId("input");

    expect(inputElement).toHaveClass("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50");
  });

  it("should accept user input", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<Input data-testid="input" onChange={handleChange} />);
    const inputElement = getByTestId("input");

    fireEvent.change(inputElement, { target: { value: "Pogs are at an all time high" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((inputElement as HTMLInputElement).value).toBe("Pogs are at an all time high");
  });
});
