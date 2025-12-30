import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Navigation from "@/components/Navigation"
import {
  Star,
  Paperclip,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Settings,
  Inbox,
  Folder,
} from "lucide-react"

interface MessageCenterProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onLogout: () => void
  onBack?: () => void
}

interface Message {
  id: string
  subject: string
  hasAttachment: boolean
  category: string
  categoryKey: "contributions" | "statements" | "distributions" | "security"
  deliveryDate: string
  isStarred: boolean
  isBold: boolean
}

export default function MessageCenter({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onLogout,
  // onBack is available for future use
}: MessageCenterProps) {
  const messages: Message[] = [
    {
      id: "1",
      subject: "HSA Contribution Maximum Warning",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryKey: "contributions",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
    },
    {
      id: "2",
      subject: "HSA Contribution Notification",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryKey: "contributions",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
    },
    {
      id: "3",
      subject: "HSA Account Summary (11/01/2025-11/30/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryKey: "statements",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
    },
    {
      id: "4",
      subject: "Tax Form Available: 1099-SA",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryKey: "statements",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: false,
    },
    {
      id: "5",
      subject: "HSA Withdrawal Notification",
      hasAttachment: false,
      category: "Distributions",
      categoryKey: "distributions",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: false,
    },
    {
      id: "6",
      subject: "HSA Payment Issued",
      hasAttachment: false,
      category: "Distributions",
      categoryKey: "distributions",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
    },
    {
      id: "7",
      subject: "Purchase Alert",
      hasAttachment: true,
      category: "Cards & Security",
      categoryKey: "security",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: false,
    },
    {
      id: "8",
      subject: "HSA Account Summary (10/01/2025-10/31/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryKey: "statements",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: false,
    },
    {
      id: "9",
      subject: "HSA Account Summary (09/01/2025-09/30/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryKey: "statements",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
    },
    {
      id: "10",
      subject: "Password Successfully Changed",
      hasAttachment: false,
      category: "Cards & Security",
      categoryKey: "security",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
    },
  ]

  return (
    <div className="min-h-screen bg-[hsl(var(--wex-palette-blue-50))]">
      {/* Navigation Bar */}
      <Navigation
        currentPage={currentPage}
        onNavigate={onNavigate}
        onNavigateToMyProfile={onNavigateToMyProfile}
        onNavigateToMyProfileWithSubPage={(subPage) => {
          try {
            localStorage.setItem("myProfileSubPage", subPage)
            window.dispatchEvent(new Event("myProfileSubPageChange"))
          } catch {
            // Ignore errors
          }
          onNavigateToMyProfile()
        }}
        onNavigateToAdmin={onNavigateToAdmin}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-[30px] font-bold leading-[40px] tracking-[-0.63px] text-black">
              Message Center
            </h1>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2 border-primary text-primary">
                <FileText className="h-4 w-4" />
                Account Documents
              </Button>
              <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90">
                <Settings className="h-4 w-4" />
                Communication Preferences
              </Button>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex gap-0 rounded-2xl">
            {/* Left Sidebar */}
            <Card className="w-[228px] rounded-l-2xl rounded-r-none border-r-0">
              <div className="p-4">
                <div className="space-y-1">
                  {/* Activity Section */}
                  <div className="mb-4">
                    <div className="mb-2 px-3 py-2 text-xs font-medium uppercase tracking-[0.24px] text-foreground">
                      Activity
                    </div>
                    <div className="space-y-1">
                      <button className="w-full rounded-lg bg-[#e4f5fd] px-3 py-2.5 text-left text-sm font-semibold text-[hsl(var(--wex-palette-blue-900))]">
                        All Messages
                      </button>
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-gray-50">
                        Urgent Items
                      </button>
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-gray-50">
                        Unread (30)
                      </button>
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-gray-50">
                        Starred
                      </button>
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-gray-50">
                        Recently Viewed
                      </button>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  {/* Categories Section */}
                  <div className="mb-4">
                    <div className="mb-2 px-3 py-2 text-xs font-medium uppercase tracking-[0.24px] text-foreground">
                      Categories
                    </div>
                    <div className="space-y-1">
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-gray-50">
                        Cards & Security
                      </button>
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-gray-50">
                        Contributions & Investments
                      </button>
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-gray-50">
                        Distributions
                      </button>
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-gray-50">
                        Statements & Tax Documents
                      </button>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  {/* Manage Section */}
                  <div>
                    <div className="mb-2 px-3 py-2 text-xs font-medium uppercase tracking-[0.24px] text-foreground">
                      Manage
                    </div>
                    <div className="space-y-1">
                      <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-gray-50">
                        Archive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Main Content Area - Table */}
            <Card className="flex-1 rounded-r-2xl rounded-l-none">
              <div className="p-6">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* Table Header */}
                    <thead>
                      <tr className="border-b border-[#e4e6e9]">
                        <th className="w-[47px] px-3.5 py-2.5 text-left">
                          <Checkbox />
                        </th>
                        <th className="w-[47px] px-3.5 py-2.5"></th>
                        <th className="w-[401px] px-3.5 py-2.5 text-left">
                          <span className="text-sm font-semibold text-foreground">Subject</span>
                        </th>
                        <th className="w-[277px] px-3.5 py-2.5 text-left">
                          <span className="text-sm font-semibold text-foreground">Category</span>
                        </th>
                        <th className="w-[170px] px-3.5 py-2.5 text-left">
                          <span className="text-sm font-semibold text-foreground">Delivery Date</span>
                        </th>
                        <th className="w-[129px] px-3.5 py-2.5 text-right">
                          <span className="text-sm font-semibold text-foreground">Action</span>
                        </th>
                      </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                      {messages.map((message) => (
                        <tr key={message.id} className="border-b border-[#e4e6e9]">
                          <td className="px-3.5 py-2.5">
                            <Checkbox />
                          </td>
                          <td className="px-3.5 py-2.5">
                            <Star className="h-4 w-4 text-[#a5aeb4]" />
                          </td>
                          <td className="px-3.5 py-2.5">
                            <div className="flex items-center gap-2">
                              {message.hasAttachment && (
                                <Paperclip className="h-3.5 w-3.5 text-primary" />
                              )}
                              <span
                                className={`text-sm tracking-[-0.084px] ${
                                  message.isBold
                                    ? "font-bold text-foreground"
                                    : "font-normal text-foreground"
                                }`}
                              >
                                {message.subject}
                              </span>
                            </div>
                          </td>
                          <td className="px-3.5 py-2.5">
                            <Badge
                              className={`badge-category badge-category-${message.categoryKey}`}
                            >
                              {message.category}
                            </Badge>
                          </td>
                          <td className="px-3.5 py-2.5">
                            <span
                              className={`text-sm tracking-[-0.084px] ${
                                message.isBold
                                  ? "font-bold text-foreground"
                                  : "font-normal text-foreground"
                              }`}
                            >
                              {message.deliveryDate}
                            </span>
                          </td>
                          <td className="px-3.5 py-2.5 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-4 w-4">
                                  <MoreVertical className="h-4 w-4 text-foreground" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="dropdown-menu-message"
                              >
                                <div className="flex flex-col gap-[2px]">
                                  <DropdownMenuItem className="dropdown-menu-item-message">
                                    <Inbox className="dropdown-menu-item-icon" />
                                    <span>Mark as read</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="dropdown-menu-item-message">
                                    <Folder className="dropdown-menu-item-icon" />
                                    <span>Archive</span>
                                  </DropdownMenuItem>
                                </div>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-center gap-1 border-t border-[#e4e6e9] pt-4">
                  <Button variant="ghost" size="icon" className="h-[35px] w-[35px] rounded-full">
                    <ChevronsLeft className="h-3.5 w-3.5 text-[#515f6b]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-[35px] w-[35px] rounded-full">
                    <ChevronLeft className="h-3.5 w-3.5 text-[#515f6b]" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-[35px] w-[35px] rounded-full bg-[#f1fafe] text-primary"
                  >
                    1
                  </Button>
                  <Button variant="ghost" className="h-[35px] w-[35px] rounded-full text-[#515f6b]">
                    2
                  </Button>
                  <Button variant="ghost" className="h-[35px] w-[35px] rounded-full text-[#515f6b]">
                    3
                  </Button>
                  <Button variant="ghost" className="h-[35px] w-[35px] rounded-full text-[#515f6b]">
                    4
                  </Button>
                  <Button variant="ghost" className="h-[35px] w-[35px] rounded-full text-[#515f6b]">
                    5
                  </Button>
                  <Button variant="ghost" size="icon" className="h-[35px] w-[35px] rounded-full">
                    <ChevronRight className="h-3.5 w-3.5 text-[#515f6b]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-[35px] w-[35px] rounded-full">
                    <ChevronsRight className="h-3.5 w-3.5 text-[#515f6b]" />
                  </Button>
                  <div className="ml-4">
                    <Select defaultValue="10">
                      <SelectTrigger className="h-[35px] w-[60px] border-[#a5aeb4] shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#7c858e]">
            <Button variant="link" className="h-auto p-0 text-sm text-[#7c858e] underline">
              Copyright
            </Button>
            <Button variant="link" className="h-auto p-0 text-sm text-[#7c858e] underline">
              Disclaimer
            </Button>
            <Button variant="link" className="h-auto p-0 text-sm text-[#7c858e] underline">
              Privacy Policy
            </Button>
            <Button variant="link" className="h-auto p-0 text-sm text-[#7c858e] underline">
              Terms of Use
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-[#7c858e]">
            WEX Health Inc. 2004-2026. All rights reserved. Powered by WEX Health.
          </p>
        </div>
      </footer>
    </div>
  )
}

