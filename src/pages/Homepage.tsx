import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Navigation from "@/components/Navigation"
import {
  Search,
  Mic,
  Send,
  Grid3x3,
  CircleAlert,
  CheckCircle2,
  XCircle,
  Info,
  ShoppingCart,
  Palette,
} from "lucide-react"

interface Account {
  type: string
  balance: string
}

interface Claim {
  status: "denied" | "action-required" | "approved"
  count: number
  description: string
  reason?: string
  action?: string
}

interface Transaction {
  date: string
  description: string
  account: string
  amount: string
  isPositive: boolean
}

interface HomepageProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToAdmin: () => void
  onNavigateToShowcase: () => void
  onNavigateToMyProfile: () => void
  onNavigateToMessageCenter: () => void
  onLogout: () => void
}

export default function Homepage({
  currentPage,
  onNavigate,
  onNavigateToAdmin,
  onNavigateToShowcase,
  onNavigateToMyProfile,
  onNavigateToMessageCenter,
  onLogout,
}: HomepageProps) {
  // Mock data
  const hsaAccounts: Account[] = [
    { type: "Cash Account", balance: "$0.00" },
    { type: "Investment Account", balance: "$0.00" },
  ]

  const claims: Claim[] = [
    {
      status: "denied",
      count: 1,
      description: "Your [medical] claim for [CVS Pharmacy] was denied",
      reason: "not eligible",
      action: "View Details",
    },
    {
      status: "action-required",
      count: 1,
      description: "Your [medical] claim for [John Doe] requires a new receipt",
      reason: "receipt missing date of service",
      action: "Upload Receipt",
    },
    {
      status: "approved",
      count: 6,
      description: "6 claims have been recently approved totaling $698.00",
    },
  ]

  const transactions: Transaction[] = [
    { date: "Pending", description: "Payroll Contribution", account: "HSA", amount: "$158.00", isPositive: true },
    { date: "01/16/2025", description: "Walgreens", account: "HSA", amount: "- $26.00", isPositive: false },
    { date: "01/16/2025", description: "Payroll Contribution", account: "HSA", amount: "$158.00", isPositive: true },
    { date: "01/16/2025", description: "Little One's Daycare", account: "Dependent Care FSA", amount: "- $146.00", isPositive: false },
  ]

  const suggestionChips = [
    "Reimburse Myself",
    "Send Payment",
    "Contribute to HSA",
    "Manage Investments",
    "Manage My Expenses",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onNavigate={onNavigate}
        onNavigateToMyProfile={onNavigateToMyProfile}
        onNavigateToAdmin={onNavigateToAdmin}
        onNavigateToMessageCenter={onNavigateToMessageCenter}
        onLogout={onLogout}
      />

      {/* Main Content Container */}
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px] space-y-8">
          {/* AI Chat Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">What can we help you with today?</h2>
            
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <div className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100">
                    <Search className="h-4 w-4 text-blue-600" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Ask the assistant or browse..."
                    className="flex-1 border-0 shadow-none focus-visible:ring-0"
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-3">
                {suggestionChips.map((chip, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {chip}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Accounts Section */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Accounts</h3>
                <div className="flex items-center gap-3">
                  <Button variant="link" className="text-blue-600">
                    View All Accounts →
                  </Button>
                  <Button>Reimburse Myself</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* HSA For Life Card */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="mb-4 text-lg font-semibold">HSA For Life®</h4>
                    <Separator className="mb-4" />
                    <div className="space-y-0">
                      {/* Table Header */}
                      <div className="grid grid-cols-2 gap-4 pb-3 text-sm font-medium text-muted-foreground">
                        <div>Account Type</div>
                        <div className="text-right">Available Balance</div>
                      </div>
                      {/* Table Rows */}
                      {hsaAccounts.map((account, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between py-3">
                            <Button variant="link" className="h-auto p-0 text-blue-600">
                              {account.type}
                            </Button>
                            <span className="font-medium">{account.balance}</span>
                          </div>
                          {index < hsaAccounts.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FSA Card */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="mb-4 text-lg font-semibold">01/01//2025 -12/31/2025</h4>
                    <Separator className="mb-4" />
                    <div className="space-y-0">
                      {/* Table Header */}
                      <div className="grid grid-cols-2 gap-4 pb-3 text-sm font-medium text-muted-foreground">
                        <div>Account Type</div>
                        <div className="text-right">Available Balance</div>
                      </div>
                      {/* Table Row */}
                      <div className="py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="link" className="h-auto p-0 text-blue-600">
                              Health FSA
                            </Button>
                            <Info className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="text-right">
                            <div className="font-medium">$250.00</div>
                            <div className="text-sm text-muted-foreground">49 day(s) left to spend</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Claims Section */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Recent Claims</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Claims within the last 90 days</p>
                </div>
                <Button variant="link" className="text-blue-600">
                  View All Claims →
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {claims.map((claim, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            claim.status === "denied"
                              ? "bg-red-100"
                              : claim.status === "action-required"
                              ? "bg-yellow-100"
                              : "bg-green-100"
                          }`}
                        >
                          {claim.status === "denied" ? (
                            <XCircle className="h-4 w-4 text-red-600" />
                          ) : claim.status === "action-required" ? (
                            <CircleAlert className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <h4 className="font-semibold">
                          {claim.status === "denied"
                            ? "Denied"
                            : claim.status === "action-required"
                            ? "Action Required"
                            : "Approved"}{" "}
                          ({claim.count})
                        </h4>
                      </div>
                      <div className="mb-4 space-y-2">
                        <p className="text-sm text-muted-foreground">{claim.description}</p>
                        {claim.reason && (
                          <p className="text-sm font-medium text-muted-foreground">{claim.reason}</p>
                        )}
                      </div>
                      {claim.action && (
                        <Button variant="link" className="h-auto p-0 text-blue-600">
                          {claim.action} →
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions + DYK Section */}
          <div className="grid grid-cols-[2fr_1fr] gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Recent Transactions</h3>
                  <Button variant="link" className="text-blue-600">
                    View All Transactions →
                  </Button>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">{transaction.date}</div>
                          <div className="font-medium">{transaction.description}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">
                            {transaction.account}
                          </Badge>
                          <div
                            className={`font-medium ${
                              transaction.isPositive ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.amount}
                          </div>
                        </div>
                      </div>
                      {index < transactions.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Did You Know Section */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-blue-50">
                  <div className="text-center text-4xl">🏊</div>
                </div>
                <h4 className="mb-2 text-lg font-semibold">Save time and money with your benefits!</h4>
                <p className="mb-4 text-sm text-muted-foreground">
                  Backup care is available! You can book a spot at a nearby center, camp, or even at home. Fun for
                  them, focus for you!
                </p>
                <Button variant="link" className="h-auto p-0 text-blue-600">
                  See My Options →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Client Banner Placeholder */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-green-50">
                  <div className="text-center text-6xl">🌼</div>
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-600">HSA store</span>
                  </div>
                  <h4 className="mb-2 text-xl font-semibold">Spring into health with your HSA</h4>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Explore 100% HSA eligible products from 600+ top brands to refresh your routine.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    See My Options →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
              Copyright
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
              Disclaimer
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
              Privacy Policy
            </Button>
            <span>•</span>
            <Button variant="link" className="h-auto p-0 text-sm text-muted-foreground">
              Terms of Use
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            WEX Health Inc. 2004-2026. All rights reserved. Powered by WEX Health.
          </p>
        </div>
      </footer>

      {/* Floating Components Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg"
              aria-label="Open components menu"
            >
              <Palette className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end" side="top">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={onNavigateToShowcase}
              >
                <Grid3x3 className="mr-2 h-4 w-4" />
                View Shad Components
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

