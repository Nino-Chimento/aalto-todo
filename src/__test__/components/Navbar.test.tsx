import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { NavBar } from "components/Navbar";

const setup = () => render(<NavBar></NavBar>);

test("Footer renders correctly", () => {
  setup();
  screen.getByRole("img");
});
