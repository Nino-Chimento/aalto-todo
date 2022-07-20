import "@testing-library/jest-dom/extend-expect";
import { Container } from "components/Container";
import { render, screen } from "@testing-library/react";

import React from "react";

const setup = () =>
  render(
    <Container>
      <div>i am a children</div>
    </Container>
  );

test("Footer renders correctly", () => {
  setup();
  screen.getByText(/i am a children/i);
});
