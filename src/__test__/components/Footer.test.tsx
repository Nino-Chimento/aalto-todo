import "@testing-library/jest-dom/extend-expect";
import { Footer } from "components/Footer";
import { render, screen } from "@testing-library/react";

import React from "react";

const setup = () => render(<Footer />);

test("Footer renders correctly", () => {
  setup();
  screen.getByText(/lorem ipsum/i);
});
