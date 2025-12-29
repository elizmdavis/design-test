import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import {
  ArrowLeft,
  Pencil,
  Info,
  Users,
  Heart,
  Building2,
  CreditCard,
  Shield,
  Mail,
  Plus,
} from "lucide-react"

interface MyProfileProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

type SubPage = "my-profile" | "dependents" | "beneficiaries" | "banking" | "debit-card" | "login-security" | "communication"

export default function MyProfile({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: MyProfileProps) {
  const [activeSubPage, setActiveSubPage] = useState<SubPage>(() => {
    try {
      const stored = localStorage.getItem("myProfileSubPage")
      const validSubPages: SubPage[] = ["my-profile", "dependents", "beneficiaries", "banking", "debit-card", "login-security", "communication"]
      if (stored && validSubPages.includes(stored as SubPage)) {
        return stored as SubPage
      }
    } catch {
      // Ignore errors
    }
    return "my-profile"
  })

  // Sync activeSubPage with localStorage whenever it changes
  // This ensures that when navigating from within the same page, the sub-page updates
  useEffect(() => {
    const checkAndUpdateSubPage = () => {
      try {
        const stored = localStorage.getItem("myProfileSubPage")
        const validSubPages: SubPage[] = ["my-profile", "dependents", "beneficiaries", "banking", "debit-card", "login-security", "communication"]
        if (stored && validSubPages.includes(stored as SubPage)) {
          setActiveSubPage(stored as SubPage)
        }
      } catch {
        // Ignore errors
      }
    }

    // Check immediately and whenever currentPage is myprofile
    if (currentPage === "myprofile") {
      checkAndUpdateSubPage()
    }

    // Listen for custom event that we'll dispatch when localStorage changes
    const handleSubPageChange = () => {
      checkAndUpdateSubPage()
    }
    window.addEventListener("myProfileSubPageChange", handleSubPageChange)

    return () => {
      window.removeEventListener("myProfileSubPageChange", handleSubPageChange)
    }
  }, [currentPage]) // Re-check when currentPage changes

  // Clear the stored sub-page when component unmounts or when navigating away
  useEffect(() => {
    return () => {
      try {
        localStorage.removeItem("myProfileSubPage")
      } catch {
        // Ignore errors
      }
    }
  }, [])

  const menuItems: { label: string; key: SubPage }[] = [
    { label: "My Profile", key: "my-profile" },
    { label: "Dependents", key: "dependents" },
    { label: "Beneficiaries", key: "beneficiaries" },
    { label: "Banking", key: "banking" },
    { label: "Debit Card", key: "debit-card" },
    { label: "Login & Security", key: "login-security" },
    { label: "Communication Preferences", key: "communication" },
  ]

  const renderContent = (subPage: SubPage) => {
    switch (subPage) {
      case "my-profile":
        return (
          <>
            {/* Page Header with Avatar */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  <span className="text-base font-medium">EM</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">My profile</h2>
              </div>
            </div>

            {/* Info Banner */}
            <div className="border-b border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 text-blue-600" />
                <p className="flex-1 text-sm text-blue-700">
                  Certain profile information is managed by your organization to keep records
                  consistent and secure. If you notice something incorrect or need an update,{" "}
                  <span className="font-semibold">please contact your administrator.</span>
                </p>
              </div>
            </div>

            <div className="space-y-0">
              {/* Personal Information Section */}
              <div className="border-b border-gray-200 px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Personal Information</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Emily Rose Smith</p>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Date of birth:</span>
                    <span className="text-gray-800">12/13/1989</span>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Gender:</span>
                    <span className="text-gray-800">Female</span>
                  </div>
                  <div className="flex gap-1.5 text-sm">
                    <span className="text-gray-500">Marital Status:</span>
                    <span className="text-gray-800">Single</span>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="border-b border-gray-200 px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Contact Information</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Primary email address:</span>
                    <span className="text-gray-800">emily.grace@email.com</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Secondary email address:</span>
                    <span className="text-gray-800">emily.grace2@email.com</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Mobile Number:</span>
                    <span className="text-gray-800">+1 (859) 123-12345</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Home Number:</span>
                    <span className="text-gray-800">+1 (859) 123-12345</span>
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Address Information</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Home Address:</span>
                    <span className="text-gray-800">123 Main Street</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">City:</span>
                    <span className="text-gray-800">Anytown</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Province/State:</span>
                    <span className="text-gray-800">NY</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Zip Code:</span>
                    <span className="text-gray-800">123456</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Country:</span>
                    <span className="text-gray-800">United States</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-gray-500">Mailing Address:</span>
                    <span className="text-gray-800">The same as my home address</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )

      case "dependents":
        return (
          <>
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-gray-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Dependents</h2>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Dependent
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No dependents added yet</p>
                <p className="text-sm text-gray-500">Add a dependent to get started</p>
              </div>
            </div>
          </>
        )

      case "beneficiaries":
        return (
          <>
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-gray-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Beneficiaries</h2>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Beneficiary
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No beneficiaries added yet</p>
                <p className="text-sm text-gray-500">Add a beneficiary to get started</p>
              </div>
            </div>
          </>
        )

      case "banking":
        return (
          <>
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-gray-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Banking</h2>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Bank Account
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No bank accounts added yet</p>
                <p className="text-sm text-gray-500">Add a bank account to get started</p>
              </div>
            </div>
          </>
        )

      case "debit-card":
        return (
          <>
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-gray-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Debit Card</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">No debit card information available</p>
                <p className="text-sm text-gray-500">Contact support to set up your debit card</p>
              </div>
            </div>
          </>
        )

      case "login-security":
        return (
          <>
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-gray-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Login & Security</h2>
              </div>
            </div>
            <div className="space-y-0">
              <div className="border-b border-gray-200 px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Password</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
                <p className="text-sm text-gray-600">Last updated: 3 months ago</p>
              </div>
              <div className="border-b border-gray-200 px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Two-Factor Authentication</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Manage
                  </Button>
                </div>
                <p className="text-sm text-gray-600">Status: Not enabled</p>
              </div>
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Security Questions</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Update
                  </Button>
                </div>
                <p className="text-sm text-gray-600">3 security questions configured</p>
              </div>
            </div>
          </>
        )

      case "communication":
        return (
          <>
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-gray-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Communication Preferences</h2>
              </div>
            </div>
            <div className="space-y-0">
              <div className="border-b border-gray-200 px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Email Preferences</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Account notifications</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Marketing emails</span>
                    <span className="text-gray-500">Disabled</span>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200 px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">SMS Preferences</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Transaction alerts</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Security alerts</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl font-medium text-gray-800">Push Notifications</h3>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Mobile app notifications</span>
                    <span className="text-gray-500">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      <Navigation
        currentPage={currentPage}
        onNavigate={onNavigate}
        onNavigateToMyProfile={onNavigateToMyProfile}
        onNavigateToMyProfileWithSubPage={(subPage) => {
          try {
            localStorage.setItem("myProfileSubPage", subPage)
            // Dispatch custom event to trigger state update
            window.dispatchEvent(new Event("myProfileSubPageChange"))
            // Also update state directly for immediate update
            setActiveSubPage(subPage as SubPage)
          } catch {
            // Ignore errors
          }
          onNavigateToMyProfile()
        }}
        onNavigateToAdmin={onNavigateToAdmin}
        onNavigateToMessageCenter={onNavigateToMessageCenter}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-8 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("homepage")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">My Account</h1>
          </div>

          <div className="flex gap-0">
            {/* Left Sidebar */}
            <div className="w-[234px] rounded-l-2xl border border-r-0 bg-white p-4">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.key}
                    variant="ghost"
                    onClick={() => setActiveSubPage(item.key)}
                    className={`w-full justify-start rounded px-3 py-2 text-left text-sm ${
                      activeSubPage === item.key
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 rounded-r-2xl border border-l-0 bg-white">
              {renderContent(activeSubPage)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-4">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <Button variant="link" className="h-auto p-0 text-sm text-gray-500">
              Copyright
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-sm text-gray-500">
              Disclaimer
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-sm text-gray-500">
              Privacy Policy
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-sm text-gray-500">
              Terms of Use
            </Button>
          </div>
          <p className="mt-2 text-center text-sm text-gray-500">
            WEX Health Inc. 2004-2026. All rights reserved. Powered by WEX Health.
          </p>
        </div>
      </footer>
    </div>
  )
}

