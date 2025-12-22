import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ArrowLeft,
  User,
  Users,
  Heart,
  CreditCard,
  Shield,
  Mail,
  LogOut,
  Grid3x3,
  Bell,
  Menu,
  Globe,
  Pencil,
  Info,
} from "lucide-react"

interface MyProfileProps {
  onBack?: () => void
}

export default function MyProfile({ onBack }: MyProfileProps) {
  const menuItems = [
    { label: "My Profile", active: true },
    { label: "Dependents", active: false },
    { label: "Beneficiaries", active: false },
    { label: "Banking", active: false },
    { label: "Debit Card", active: false },
    { label: "Login & Security", active: false },
    { label: "Communication options", active: false },
  ]

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navigation Bar */}
      <nav className="border-b bg-white">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Menu className="h-4 w-4" />
                <span className="text-base font-semibold">Menu</span>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-red-600">wex</span>
              </div>
            </div>

            {/* Right: Utility Icons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
              <div className="h-12 w-px bg-gray-200" />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              <div className="h-12 w-px bg-gray-200" />
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm font-medium">EM</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-8 flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-2xl font-semibold text-gray-800">My Account</h1>
          </div>

          <div className="flex gap-0">
            {/* Left Sidebar */}
            <div className="w-[234px] rounded-l-2xl border border-r-0 bg-white p-4">
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full rounded px-3 py-2 text-left text-sm ${
                      item.active
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 rounded-r-2xl border border-l-0 bg-white">
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

