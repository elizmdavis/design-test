import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import WexLogo from "@/assets/wex-logo.svg"
import { Home, Wallet, FileText, LifeBuoy, ChevronDown, Globe, Bell, User, LogOut, Settings } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToMyProfileWithSubPage?: (subPage: string) => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

export default function Navigation({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToMyProfileWithSubPage,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: NavigationProps) {
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false)
  const isHomeActive = currentPage === "homepage"
  const isAccountsActive = currentPage === "accounts" || currentPage === "hsa" || currentPage === "fsa"
  const isClaimsActive = currentPage === "claims"
  const isResourcesActive = currentPage === "resources"

  const handleProfileNavigation = (subPage: string) => {
    setProfilePopoverOpen(false)
    if (onNavigateToMyProfileWithSubPage) {
      onNavigateToMyProfileWithSubPage(subPage)
    } else {
      onNavigateToMyProfile()
    }
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={WexLogo} alt="WEX" className="h-8 w-auto" />
            </div>
          </div>

          {/* Right: Navigation Menu + Utility Icons */}
          <div className="flex items-center gap-4">
            {/* Navigation Menu */}
            <div className="flex items-center gap-4">
              <Button
                variant={isHomeActive ? "default" : "ghost"}
                className={`flex items-center gap-1.5 px-3 py-1 ${
                  isHomeActive
                    ? "bg-[#0058a3] text-white hover:bg-[#0058a3]/90"
                    : "text-[#1d2c38]"
                }`}
                onClick={() => onNavigate("homepage")}
              >
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">Home</span>
              </Button>

              {/* Accounts with Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={isAccountsActive ? "default" : "ghost"}
                    className={`flex items-center gap-1.5 px-3 py-1 ${
                      isAccountsActive
                        ? "bg-[#0058a3] text-white hover:bg-[#0058a3]/90"
                        : "text-[#1d2c38]"
                    }`}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm font-medium">Accounts</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-2" align="start">
                  <div className="space-y-0">
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 text-left whitespace-nowrap"
                      onClick={() => onNavigate("hsa")}
                    >
                      Health Savings Account (HSA)
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 text-left whitespace-nowrap"
                      onClick={() => onNavigate("fsa")}
                    >
                      Flexible Spending Account (FSA)
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant={isClaimsActive ? "default" : "ghost"}
                className={`flex items-center gap-1.5 px-3 py-1 ${
                  isClaimsActive
                    ? "bg-[#0058a3] text-white hover:bg-[#0058a3]/90"
                    : "text-[#1d2c38]"
                }`}
                onClick={() => onNavigate("claims")}
              >
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Claims</span>
              </Button>

              <Button
                variant={isResourcesActive ? "default" : "ghost"}
                className={`flex items-center gap-1.5 px-3 py-1 ${
                  isResourcesActive
                    ? "bg-[#0058a3] text-white hover:bg-[#0058a3]/90"
                    : "text-[#1d2c38]"
                }`}
                onClick={() => onNavigate("resources")}
              >
                <LifeBuoy className="h-4 w-4" />
                <span className="text-sm font-medium">Resources</span>
              </Button>
            </div>

            {/* Utility Icons */}
            <div className="flex items-center gap-0">
            <Button variant="ghost" size="icon" className="h-11 w-11">
              <Globe className="h-4 w-4 text-[#243746]" />
            </Button>
            <Separator orientation="vertical" className="h-11" />
            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11"
              onClick={() => {
                if (onNavigateToMessageCenter) {
                  onNavigateToMessageCenter()
                }
              }}
            >
              <Bell className="h-4 w-4 text-[#243746]" />
              <Badge className="absolute right-2 top-2 h-4 w-4 rounded-full bg-[#d23f57] p-0 text-[10px] font-bold leading-4 text-white">
                0
              </Badge>
            </Button>
            <Separator orientation="vertical" className="h-11" />
            <Popover open={profilePopoverOpen} onOpenChange={setProfilePopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11">
                  <div className="relative h-6 w-6">
                    <div className="absolute inset-0 rounded-full bg-[#a5aeb4]" />
                    <User className="absolute left-1 top-1 h-4 w-4 text-white" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end">
                <div className="space-y-0">
                  {/* Header Section */}
                  <div className="flex items-center gap-2 px-3 py-2">
                    <div className="flex h-4 w-4 items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">WEX, Inc.</p>
                      <p className="text-xs text-muted-foreground">Switch Account</p>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  {/* Menu Items */}
                  <div className="space-y-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100"
                    onClick={() => handleProfileNavigation("my-profile")}
                  >
                    My Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleProfileNavigation("dependents")}
                  >
                    Dependents
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleProfileNavigation("beneficiaries")}
                  >
                    Beneficiaries
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleProfileNavigation("banking")}
                  >
                    Banking
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleProfileNavigation("debit-card")}
                  >
                    Debit Card
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleProfileNavigation("login-security")}
                  >
                    Login and Security
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleProfileNavigation("communication")}
                  >
                    Communication Preferences
                  </Button>
                  </div>

                  <Separator className="my-2" />

                  {/* Admin Customization */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={onNavigateToAdmin}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Customization
                  </Button>

                  {/* Log Out */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={onLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

