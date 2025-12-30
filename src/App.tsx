import { useState, useCallback, useMemo, type ComponentType } from "react"
import Login from "@/pages/Login"
import AdminCustomization from "@/pages/AdminCustomization"
import Homepage from "@/pages/Homepage"
import MyProfile from "@/pages/MyProfile"
import Accounts from "@/pages/Accounts"
import Claims from "@/pages/Claims"
import Resources from "@/pages/Resources"
import HSA from "@/pages/HSA"
import FSA from "@/pages/FSA"
import MessageCenter from "@/pages/MessageCenter"
import ReimburseMyself from "@/pages/ReimburseMyself"
import ReimburseDocs from "@/pages/ReimburseDocs"
import ReimburseAnalyze from "@/pages/ReimburseAnalyze"
import ReimburseReview from "@/pages/ReimburseReview"
import ReimburseConfirm from "@/pages/ReimburseConfirm"

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  isAuthenticated: "isAuthenticated",
  currentPage: "currentPage",
} as const

const VALID_PAGES = [
  "admin",
  "homepage",
  "myprofile",
  "accounts",
  "claims",
  "resources",
  "hsa",
  "fsa",
  "messagecenter",
  "reimburse",
  "reimburse-docs",
  "reimburse-analyze",
  "reimburse-review",
  "reimburse-confirm",
] as const

type PageId = (typeof VALID_PAGES)[number]

const DEFAULT_PAGE: PageId = "homepage"

// ─────────────────────────────────────────────────────────────────────────────
// Shared navigation props for page components
// ─────────────────────────────────────────────────────────────────────────────

export interface PageNavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter: () => void
  onLogout: () => void
}

// Extended props for MessageCenter which also needs onBack
interface MessageCenterPageProps extends PageNavigationProps {
  onBack: () => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Page registry
// ─────────────────────────────────────────────────────────────────────────────

type PageComponent = ComponentType<PageNavigationProps>
type MessageCenterComponent = ComponentType<MessageCenterPageProps>

const PAGE_REGISTRY: Record<Exclude<PageId, "messagecenter">, PageComponent> = {
  admin: AdminCustomization,
  homepage: Homepage,
  myprofile: MyProfile,
  accounts: Accounts,
  claims: Claims,
  resources: Resources,
  hsa: HSA,
  fsa: FSA,
  reimburse: ReimburseMyself,
  "reimburse-docs": ReimburseDocs,
  "reimburse-analyze": ReimburseAnalyze,
  "reimburse-review": ReimburseReview,
  "reimburse-confirm": ReimburseConfirm,
}

// MessageCenter needs special handling due to extra prop
const MESSAGE_CENTER_PAGE: MessageCenterComponent = MessageCenter

// ─────────────────────────────────────────────────────────────────────────────
// Storage helpers (safe localStorage access)
// ─────────────────────────────────────────────────────────────────────────────

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error)
  }
}

function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn(`Failed to remove ${key} from localStorage:`, error)
  }
}

function isValidPage(page: string): page is PageId {
  return VALID_PAGES.includes(page as PageId)
}

function getInitialPage(): PageId {
  const stored = safeGetItem(STORAGE_KEYS.currentPage)
  if (stored && isValidPage(stored)) {
    return stored
  }
  return DEFAULT_PAGE
}

function getInitialAuth(): boolean {
  return safeGetItem(STORAGE_KEYS.isAuthenticated) === "true"
}

// ─────────────────────────────────────────────────────────────────────────────
// App Component
// ─────────────────────────────────────────────────────────────────────────────

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuth)
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage)

  // Note: Auth state is initialized from localStorage in useState initializer,
  // so no effect is needed to sync on mount.

  // Navigation callback - updates state and persists to storage
  const handleNavigate = useCallback((page: string) => {
    const validPage = isValidPage(page) ? page : DEFAULT_PAGE
    setCurrentPage(validPage)
    safeSetItem(STORAGE_KEYS.currentPage, validPage)
  }, [])

  const handleNavigateToMyProfile = useCallback(() => {
    handleNavigate("myprofile")
  }, [handleNavigate])

  const handleNavigateToAdmin = useCallback(() => {
    handleNavigate("admin")
  }, [handleNavigate])

  const handleNavigateToMessageCenter = useCallback(() => {
    handleNavigate("messagecenter")
  }, [handleNavigate])

  const handleNavigateToHomepage = useCallback(() => {
    handleNavigate("homepage")
  }, [handleNavigate])

  const handleLogin = useCallback(() => {
    safeSetItem(STORAGE_KEYS.isAuthenticated, "true")
    setIsAuthenticated(true)
    // Restore the last page or default to homepage
    const savedPage = safeGetItem(STORAGE_KEYS.currentPage)
    const pageToSet = savedPage && isValidPage(savedPage) ? savedPage : DEFAULT_PAGE
    setCurrentPage(pageToSet)
  }, [])

  const handleLogout = useCallback(() => {
    safeRemoveItem(STORAGE_KEYS.isAuthenticated)
    setIsAuthenticated(false)
  }, [])

  // Memoize navigation props to avoid unnecessary re-renders
  const navigationProps: PageNavigationProps = useMemo(
    () => ({
      currentPage,
      onNavigate: handleNavigate,
      onNavigateToMyProfile: handleNavigateToMyProfile,
      onNavigateToAdmin: handleNavigateToAdmin,
      onNavigateToMessageCenter: handleNavigateToMessageCenter,
      onLogout: handleLogout,
    }),
    [
      currentPage,
      handleNavigate,
      handleNavigateToMyProfile,
      handleNavigateToAdmin,
      handleNavigateToMessageCenter,
      handleLogout,
    ]
  )

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />
  }

  // Handle MessageCenter separately due to extra onBack prop
  if (currentPage === "messagecenter") {
    return <MESSAGE_CENTER_PAGE {...navigationProps} onBack={handleNavigateToHomepage} />
  }

  // Render page from registry, fallback to Homepage
  const PageComponent = PAGE_REGISTRY[currentPage] ?? PAGE_REGISTRY[DEFAULT_PAGE]
  return <PageComponent {...navigationProps} />
}

export default App
