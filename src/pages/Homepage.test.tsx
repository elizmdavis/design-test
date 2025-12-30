import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import Homepage from "./Homepage"

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, "localStorage", { value: localStorageMock })

describe("Homepage", () => {
  const defaultProps = {
    currentPage: "homepage",
    onNavigate: vi.fn(),
    onNavigateToAdmin: vi.fn(),
    onNavigateToMyProfile: vi.fn(),
    onNavigateToMessageCenter: vi.fn(),
    onLogout: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  it("renders the main heading", () => {
    render(<Homepage {...defaultProps} />)
    expect(screen.getByText(/what can we help you with today/i)).toBeInTheDocument()
  })

  it("renders navigation component", () => {
    render(<Homepage {...defaultProps} />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument()
  })

  it("renders accounts section with HSA and FSA cards", () => {
    render(<Homepage {...defaultProps} />)
    // Use getAllByText since "Accounts" appears in nav and section heading
    const accountsElements = screen.getAllByText(/accounts/i)
    expect(accountsElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/HSA For Life®/i)).toBeInTheDocument()
    expect(screen.getByText(/Cash Account/i)).toBeInTheDocument()
    expect(screen.getByText(/Investment Account/i)).toBeInTheDocument()
    expect(screen.getByText(/Health FSA/i)).toBeInTheDocument()
  })

  it("renders recent claims section", () => {
    render(<Homepage {...defaultProps} />)
    expect(screen.getByText(/recent claims/i)).toBeInTheDocument()
    // Use getAllByText since these terms may appear multiple times
    const deniedElements = screen.getAllByText(/denied/i)
    expect(deniedElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/action required/i)).toBeInTheDocument()
    // Check for approved claims count - use getAllByText since "approved" appears multiple times
    const approvedElements = screen.getAllByText(/approved/i)
    expect(approvedElements.length).toBeGreaterThan(0)
  })

  it("renders recent transactions section", () => {
    render(<Homepage {...defaultProps} />)
    expect(screen.getByText(/recent transactions/i)).toBeInTheDocument()
    // Use getAllByText since "Payroll Contribution" appears multiple times
    const payrollElements = screen.getAllByText(/payroll contribution/i)
    expect(payrollElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/walgreens/i)).toBeInTheDocument()
  })

  it("navigates to reimburse page when clicking Reimburse Myself chip", () => {
    render(<Homepage {...defaultProps} />)
    
    // Find the chip button (first one in suggestion chips)
    const reimburseButtons = screen.getAllByRole("button", { name: /reimburse myself/i })
    fireEvent.click(reimburseButtons[0])
    
    expect(defaultProps.onNavigate).toHaveBeenCalledWith("reimburse")
  })

  it("navigates to reimburse page when clicking Reimburse Myself button in accounts section", () => {
    render(<Homepage {...defaultProps} />)
    
    // Get all buttons with "Reimburse Myself" text - the second one is in the accounts section
    const reimburseButtons = screen.getAllByRole("button", { name: /reimburse myself/i })
    fireEvent.click(reimburseButtons[1])
    
    expect(defaultProps.onNavigate).toHaveBeenCalledWith("reimburse")
  })

  it("renders footer with links", () => {
    render(<Homepage {...defaultProps} />)
    // Use getAllByText since these appear in footer
    const copyrightElements = screen.getAllByText(/copyright/i)
    expect(copyrightElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument()
    expect(screen.getByText(/terms of use/i)).toBeInTheDocument()
  })

  it("renders suggestion chips", () => {
    render(<Homepage {...defaultProps} />)
    expect(screen.getByRole("button", { name: /send payment/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /contribute to hsa/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /manage investments/i })).toBeInTheDocument()
  })

  it("displays search input", () => {
    render(<Homepage {...defaultProps} />)
    expect(screen.getByPlaceholderText(/ask the assistant or browse/i)).toBeInTheDocument()
  })
})
