import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import WexLogo from "@/assets/wex-logo.svg"
import { Home, Wallet, FileText, LifeBuoy, ChevronDown, Globe, Bell, User, LogOut, Settings } from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToMyProfileWithSubPage?: (subPage: string) => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter: () => void
  onLogout: () => void
}


// ─────────────────────────────────────────────────────────────────────────────
// Navigation Component
// ─────────────────────────────────────────────────────────────────────────────

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

  // Compute active states
  const isHomeActive = currentPage === "homepage"
  const isAccountsActive = currentPage === "accounts" || currentPage === "hsa" || currentPage === "fsa"
  const isClaimsActive = currentPage === "claims"
  const isResourcesActive = currentPage === "resources"

  // Handler for profile menu navigation
  const handleProfileNavigation = useCallback(
    (subPage: string) => {
      setProfilePopoverOpen(false)
      if (onNavigateToMyProfileWithSubPage) {
        onNavigateToMyProfileWithSubPage(subPage)
      } else {
        onNavigateToMyProfile()
      }
    },
    [onNavigateToMyProfile, onNavigateToMyProfileWithSubPage]
  )

  // Stable navigation handlers
  const navigateHome = useCallback(() => onNavigate("homepage"), [onNavigate])
  const navigateHSA = useCallback(() => onNavigate("hsa"), [onNavigate])
  const navigateFSA = useCallback(() => onNavigate("fsa"), [onNavigate])
  const navigateClaims = useCallback(() => onNavigate("claims"), [onNavigate])
  const navigateResources = useCallback(() => onNavigate("resources"), [onNavigate])

  // Profile sub-page handlers
  const navigateToProfile = useCallback(() => handleProfileNavigation("my-profile"), [handleProfileNavigation])
  const navigateToDependents = useCallback(() => handleProfileNavigation("dependents"), [handleProfileNavigation])
  const navigateToBeneficiaries = useCallback(() => handleProfileNavigation("beneficiaries"), [handleProfileNavigation])
  const navigateToBanking = useCallback(() => handleProfileNavigation("banking"), [handleProfileNavigation])
  const navigateToDebitCard = useCallback(() => handleProfileNavigation("debit-card"), [handleProfileNavigation])
  const navigateToLoginSecurity = useCallback(() => handleProfileNavigation("login-security"), [handleProfileNavigation])
  const navigateToCommunication = useCallback(() => handleProfileNavigation("communication"), [handleProfileNavigation])

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
                onClick={navigateHome}
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
                <PopoverContent
                  className="w-72 p-2 rounded-md border border-wex-menu-content-border bg-wex-menu-content-bg text-wex-menu-item-fg shadow-md"
                  align="start"
                >
                  <div className="space-y-0">
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 text-left whitespace-nowrap"
                      onClick={navigateHSA}
                    >
                      Health Savings Account (HSA)
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 text-left whitespace-nowrap"
                      onClick={navigateFSA}
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
                onClick={navigateClaims}
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
                onClick={navigateResources}
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
                className="relative h-11 w-11 flex items-center justify-center"
                onClick={onNavigateToMessageCenter}
              >
                <Bell className="h-4 w-4 text-[#243746]" />
                <Badge className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#d23f57] p-0 text-[10px] font-bold leading-none text-white border-2 border-white">
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
                <PopoverContent
                  className="w-64 p-2 rounded-md border border-wex-menu-content-border bg-wex-menu-content-bg text-wex-menu-item-fg shadow-md"
                  align="end"
                >
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
                        onClick={navigateToProfile}
                      >
                        My Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={navigateToDependents}
                      >
                        Dependents
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={navigateToBeneficiaries}
                      >
                        Beneficiaries
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={navigateToBanking}
                      >
                        Banking
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={navigateToDebitCard}
                      >
                        Debit Card
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={navigateToLoginSecurity}
                      >
                        Login and Security
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={navigateToCommunication}
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
