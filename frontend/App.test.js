import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders LearnHub app", () => {
  render(<App />);
  expect(screen.getByText(/LearnHub/i)).toBeInTheDocument();
});
