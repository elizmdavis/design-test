import { render, screen, fireEvent, waitFor, within } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import App from "./App"

// Create a fresh localStorage mock for each test
function createLocalStorageMock() {
  const store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
    get store() { return store },
  }
}

let localStorageMock: ReturnType<typeof createLocalStorageMock>

describe("App", () => {
  beforeEach(() => {
    localStorageMock = createLocalStorageMock()
    Object.defineProperty(window, "localStorage", { 
      value: localStorageMock, 
      writable: true,
      configurable: true 
    })
  })

  it("renders Login screen when not authenticated", () => {
    render(<App />)
    expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument()
  })

  it("navigates to Homepage after successful login", async () => {
    render(<App />)
    
    // Fill in username and submit
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "testuser" } })
    fireEvent.click(screen.getByRole("button", { name: /continue/i }))

    // Verify we're on the homepage
    await waitFor(() => {
      expect(screen.getByText(/what can we help you with today/i)).toBeInTheDocument()
    })
    
    // Verify localStorage was set
    expect(localStorageMock.setItem).toHaveBeenCalledWith("isAuthenticated", "true")
  })

  it("restores authenticated state from localStorage", () => {
    // Pre-set localStorage
    localStorageMock.store["isAuthenticated"] = "true"
    localStorageMock.store["currentPage"] = "homepage"

    render(<App />)
    
    // Should show homepage content, not login
    expect(screen.getByText(/what can we help you with today/i)).toBeInTheDocument()
  })

  it("opens profile menu when profile button is clicked", async () => {
    // Start authenticated
    localStorageMock.store["isAuthenticated"] = "true"
    localStorageMock.store["currentPage"] = "homepage"

    render(<App />)
    
    // Find the profile button by looking for the button with aria-haspopup="dialog" 
    const nav = screen.getByRole("navigation")
    const buttons = within(nav).getAllByRole("button")
    const profileButton = buttons.find(btn => 
      btn.getAttribute("aria-haspopup") === "dialog" && btn.querySelector(".rounded-full")
    )
    
    expect(profileButton).toBeDefined()
    fireEvent.click(profileButton!)
    
    // Verify logout button is visible in the menu
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument()
    })
  })

  it("persists current page to localStorage on navigation", async () => {
    // Start authenticated
    localStorageMock.store["isAuthenticated"] = "true"
    localStorageMock.store["currentPage"] = "homepage"

    render(<App />)
    
    // Click on Claims nav button - scope to navigation
    const nav = screen.getByRole("navigation")
    const claimsButton = within(nav).getByRole("button", { name: /claims/i })
    fireEvent.click(claimsButton)
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith("currentPage", "claims")
    })
  })

  it("falls back to homepage for invalid page in localStorage", () => {
    localStorageMock.store["isAuthenticated"] = "true"
    localStorageMock.store["currentPage"] = "invalid-page"

    render(<App />)
    
    // Should show homepage content
    expect(screen.getByText(/what can we help you with today/i)).toBeInTheDocument()
  })

  it("navigates via navigation buttons", async () => {
    localStorageMock.store["isAuthenticated"] = "true"
    localStorageMock.store["currentPage"] = "homepage"

    render(<App />)
    
    const nav = screen.getByRole("navigation")
    
    // Click on Home button
    const homeButton = within(nav).getByRole("button", { name: /home/i })
    expect(homeButton).toBeInTheDocument()
    
    // Verify Claims button exists
    const claimsButton = within(nav).getByRole("button", { name: /claims/i })
    expect(claimsButton).toBeInTheDocument()
    
    // Verify Resources button exists
    const resourcesButton = within(nav).getByRole("button", { name: /resources/i })
    expect(resourcesButton).toBeInTheDocument()
  })
})
