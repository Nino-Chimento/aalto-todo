import "@testing-library/jest-dom/extend-expect";
import { getByRole, render, screen } from "@testing-library/react";
import { Switch } from "components/Switch";

const mockHandleClick = jest.fn((ev) => ev.preventDefault());
const setup = () =>
  render(<Switch handleChange={mockHandleClick} completed={false} />);

test("Footer renders correctly", () => {
  setup();
  const input = screen.getByRole("checkbox");
  input.click();
  expect(mockHandleClick).toHaveBeenCalledTimes(1);
});
