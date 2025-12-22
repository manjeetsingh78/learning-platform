import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard";

describe("Dashboard", () => {
  test("renders All Courses heading", () => {
    render(<Dashboard />);
    expect(screen.getByText(/All Courses/i)).toBeInTheDocument();
  });

  test("renders at least one course card", () => {
    render(<Dashboard />);
    expect(
      screen.getByText(/Web Development Bootcamp/i)
    ).toBeInTheDocument();
  });
});
