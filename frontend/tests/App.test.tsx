// Generated with ChatGPT
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import App from "../src/App";

// Mock the imported components to avoid rendering issues
vi.mock("./components/nav/Nav", () => ({
  default: () => <nav>Mock Nav</nav>,
}));
vi.mock("./components/Home", () => ({
  default: () => <div>Mock Home</div>,
}));
vi.mock("./components/Features", () => ({
  default: () => <div>Mock Features</div>,
}));
vi.mock("./components/audio_remove/GetStarted", () => ({
  default: () => <div>Mock Get Started</div>,
}));

describe("App component", () => {
  it("renders the navigation bar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Nav")).toBeInTheDocument();
  });

  it("renders the Home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Home")).toBeInTheDocument();
  });

  it("renders the Features page when navigated to /features", () => {
    render(
      <MemoryRouter initialEntries={["/features"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Features")).toBeInTheDocument();
  });

  it("renders the Get Started page when navigated to /get-started", () => {
    render(
      <MemoryRouter initialEntries={["/get-started"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Get Started")).toBeInTheDocument();
  });
});
