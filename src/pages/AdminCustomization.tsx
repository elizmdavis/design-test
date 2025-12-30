import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navigation from "@/components/Navigation"
import { Pencil, Upload, ArrowLeft } from "lucide-react"

interface BrandColor {
  id: number
  name: string
  hex: string
}

interface ColorMapping {
  [key: string]: string
}

interface AdminCustomizationProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

export default function AdminCustomization({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: AdminCustomizationProps) {
  const [brandColors, setBrandColors] = useState<BrandColor[]>([
    { id: 1, name: "Color 1", hex: "#0073cf" },
    { id: 2, name: "Color 2", hex: "#E4F5FD" },
    { id: 3, name: "Color 3", hex: "#0058A3" },
    { id: 4, name: "Color 4", hex: "#E4F5FD" },
    { id: 5, name: "Color 5", hex: "#253746" },
    { id: 6, name: "Color 6", hex: "#C8102E" },
    { id: 7, name: "Color 7", hex: "#0058A3" },
    { id: 8, name: "Color 8", hex: "#00C7B1" },
  ])

  const [colorMappings, setColorMappings] = useState<ColorMapping>({
    primaryButton: "#0073cf",
    primaryHover: "#0058A3",
    secondaryButton: "#E4F5FD",
    secondaryHover: "#C8102E",
    neutralButton: "#253746",
    links: "#0073cf",
    navHover: "#0073cf",
    navSelected: "#0058A3",
    stepper: "#00C7B1",
    portalBackground: "#E4F5FD",
    assistIQ: "#00C7B1",
    barChartColor: "#0073cf",
  })

  const [previewTab, setPreviewTab] = useState("homepage")

  const handleColorChange = (id: number, newHex: string) => {
    setBrandColors(
      brandColors.map((color) =>
        color.id === id ? { ...color, hex: newHex } : color
      )
    )
  }

  const handleMappingChange = (key: string, value: string) => {
    setColorMappings({ ...colorMappings, [key]: value })
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--wex-palette-blue-50))]">
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
        onNavigateToMessageCenter={onNavigateToMessageCenter}
        onLogout={onLogout}
      />
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-8 py-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate("homepage")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">Appearance</h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Brand Guide
              </Button>
              <Button variant="outline">Preview</Button>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Brand Colors & Applied Colors */}
          <div className="lg:col-span-6 space-y-8">
            {/* Brand Colors Section */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Customize the application appearance
                </p>
              </div>

              <Tabs defaultValue="brand-colors" className="w-full">
                <TabsList>
                  <TabsTrigger value="brand-colors">Brand Colors</TabsTrigger>
                
                  <TabsTrigger value="spacing">Styles</TabsTrigger>
                </TabsList>
              </Tabs>

              <p className="text-sm text-muted-foreground">
                Define your core brand colors. These will be available for
                mapping to various system elements. You can also upload your
                brand guide to see predefined extracted colors.
              </p>

              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Brand Guide
              </Button>

              {/* Color Cards Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {brandColors.map((color) => (
                  <Card key={color.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="color-swatch-lg"
                          style={{ '--swatch-color': color.hex } as React.CSSProperties}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">
                              {color.name}
                            </span>
                            <button
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => {
                                const input = document.createElement("input")
                                input.type = "color"
                                input.value = color.hex
                                input.onchange = (e) =>
                                  handleColorChange(
                                    color.id,
                                    (e.target as HTMLInputElement).value
                                  )
                                input.click()
                              }}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {color.hex}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Applied Colors Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Applied to:</h2>
              </div>

              {/* Buttons/Links Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Buttons/Links</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the colors to be applied to the buttons and links
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "primaryButton", label: "Primary Button" },
                    { key: "primaryHover", label: "Primary hover" },
                    { key: "secondaryButton", label: "Secondary Button" },
                    { key: "secondaryHover", label: "Secondary hover" },
                    { key: "neutralButton", label: "Neutral button" },
                    { key: "links", label: "Links" },
                  ].map(({ key, label }) => (
                    <Card key={key}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <Label className="min-w-[140px]">{label}</Label>
                          <Select
                            value={colorMappings[key]}
                            onValueChange={(value) =>
                              handleMappingChange(key, value)
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="color-swatch"
                                    style={{ '--swatch-color': colorMappings[key] } as React.CSSProperties}
                                  />
                                  <span>{colorMappings[key]}</span>
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {brandColors.map((color) => (
                                <SelectItem key={color.id} value={color.hex}>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="color-swatch"
                                      style={{ '--swatch-color': color.hex } as React.CSSProperties}
                                    />
                                    <span>
                                      {color.name} ({color.hex})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Navigation Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Navigation</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the colors to be applied to the nav and stepper
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "navHover", label: "Nav hover" },
                    { key: "navSelected", label: "Nav selected" },
                    { key: "stepper", label: "Stepper" },
                  ].map(({ key, label }) => (
                    <Card key={key}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <Label className="min-w-[140px]">{label}</Label>
                          <Select
                            value={colorMappings[key]}
                            onValueChange={(value) =>
                              handleMappingChange(key, value)
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="color-swatch"
                                    style={{ '--swatch-color': colorMappings[key] } as React.CSSProperties}
                                  />
                                  <span>{colorMappings[key]}</span>
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {brandColors.map((color) => (
                                <SelectItem key={color.id} value={color.hex}>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="color-swatch"
                                      style={{ '--swatch-color': color.hex } as React.CSSProperties}
                                    />
                                    <span>
                                      {color.name} ({color.hex})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* General Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">General</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the colors to be applied to the portal
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "portalBackground", label: "Portal background" },
                    { key: "assistIQ", label: "Assist IQ" },
                    { key: "barChartColor", label: "Bar chart color" },
                  ].map(({ key, label }) => (
                    <Card key={key}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <Label className="min-w-[140px]">{label}</Label>
                          <Select
                            value={colorMappings[key]}
                            onValueChange={(value) =>
                              handleMappingChange(key, value)
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="color-swatch"
                                    style={{ '--swatch-color': colorMappings[key] } as React.CSSProperties}
                                  />
                                  <span>{colorMappings[key]}</span>
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {brandColors.map((color) => (
                                <SelectItem key={color.id} value={color.hex}>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="color-swatch"
                                      style={{ '--swatch-color': color.hex } as React.CSSProperties}
                                    />
                                    <span>
                                      {color.name} ({color.hex})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview Panel */}
          <div className="lg:col-span-6">
            <Card className="sticky top-6">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Preview</h3>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Zoom out</span>
                      −
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Reset</span>
                      ⟲
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Zoom in</span>
                      +
                    </Button>
                  </div>
                </div>

                <Tabs
                  value={previewTab}
                  onValueChange={setPreviewTab}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="homepage">Homepage</TabsTrigger>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                  </TabsList>

                  <TabsContent value="homepage" className="mt-4">
                    <div 
                      className="bg-muted rounded-lg p-2 overflow-auto max-h-[600px]"
                      style={{
                        '--preview-portal-bg': colorMappings.portalBackground || '#f1fafe',
                        '--preview-primary-btn': colorMappings.primaryButton || '#0073cf',
                        '--preview-secondary-btn': colorMappings.secondaryButton || '#E4F5FD',
                        '--preview-link-color': colorMappings.links || '#0073cf',
                        '--preview-accent': colorMappings.assistIQ || '#00c7b1',
                      } as React.CSSProperties}
                    >
                      {/* Detailed Preview matching Figma design */}
                      <div className="bg-background rounded shadow-sm overflow-hidden text-[6px] leading-tight">
                        {/* Navigation */}
                        <div className="flex items-center justify-between border-b px-2 py-1.5 bg-white">
                          <div className="flex items-center gap-1.5 text-[5px]">
                            <span>☰ Menu</span>
                            <span className="text-gray-300">|</span>
                            <span className="font-semibold">LOGO</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-20 border rounded px-1.5 py-0.5 text-[5px]">
                              Ask assistant...
                            </div>
                            <span className="text-[8px]">🔔</span>
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                          </div>
                        </div>

                        {/* Hero */}
                        <div className="px-2 py-1.5 preview-portal-bg">
                          <p className="font-semibold text-[7px]">
                            Welcome back, Crystal
                          </p>
                        </div>

                        {/* Content */}
                        <div className="p-2 space-y-1.5 preview-portal-bg">
                          {/* Next Action */}
                          <Card className="p-1.5">
                            <div className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 flex-1">
                                <div className="w-3 h-3 bg-red-100 rounded" />
                                <div>
                                  <p className="font-medium text-[6px]">
                                    Your recent claim was denied.
                                  </p>
                                  <p className="text-[5px] text-muted-foreground">
                                    Due to insufficient documentation.
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="h-3 px-1.5 text-[5px] preview-secondary-btn"
                              >
                                Upload →
                              </Button>
                            </div>
                            <Separator className="my-1" />
                            <div className="text-center">
                              <Button
                                variant="link"
                                size="sm"
                                className="h-3 text-[5px] preview-link"
                              >
                                View All Notifications →
                              </Button>
                            </div>
                          </Card>

                          {/* 3 Column Container */}
                          <div className="grid grid-cols-3 gap-1.5">
                            {/* Accounts */}
                            <Card className="p-1.5 space-y-1">
                              <p className="font-semibold text-[6px]">Accounts</p>
                              <div className="space-y-0.5">
                                <p className="text-[5px] text-muted-foreground">
                                  HSA Cash
                                </p>
                                <p className="font-semibold text-[7px]">
                                  $1,500.00
                                </p>
                                <div className="space-y-0.5">
                                  <div className="flex h-0.5 rounded-full overflow-hidden">
                                    <div className="w-1/2 preview-accent" />
                                    <div className="w-1/2 bg-gray-200" />
                                  </div>
                                  <div className="flex justify-between text-[4px] text-muted-foreground">
                                    <span>$2,075 Contributed</span>
                                    <span>$4,150 Max</span>
                                  </div>
                                </div>
                                <div className="p-1 rounded space-y-0.5 preview-portal-bg">
                                  <div className="flex items-start gap-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-300" />
                                    <p className="text-[4px] flex-1">
                                      Your HSA may not cover expected costs by April.
                                    </p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="link"
                                    className="h-2 px-0 text-[4px] preview-link"
                                  >
                                    See Options →
                                  </Button>
                                </div>
                              </div>
                              <Separator />
                              <div className="space-y-0.5 text-[5px]">
                                <div>
                                  <p className="text-muted-foreground">Dependent Care FSA</p>
                                  <p className="font-semibold">$440.00</p>
                                </div>
                                <Separator />
                                <div>
                                  <p className="text-muted-foreground">Lifestyle FSA</p>
                                  <p className="font-semibold">$250.00</p>
                                </div>
                                <Separator />
                                <div>
                                  <p className="text-muted-foreground">Transit FSA</p>
                                  <p className="font-semibold">$90.00</p>
                                </div>
                              </div>
                              <Separator />
                              <Button
                                size="sm"
                                className="w-full h-3 text-[5px] preview-primary-btn"
                              >
                                Reimburse Myself
                              </Button>
                            </Card>

                            {/* Investments */}
                            <Card className="p-1.5 space-y-1">
                              <p className="font-semibold text-[6px]">
                                Investments
                              </p>
                              <div>
                                <p className="text-[5px] text-muted-foreground">
                                  HSA Investment Balance
                                </p>
                                <div className="flex items-center gap-1">
                                  <p className="font-semibold text-[6px]">
                                    $5,550.00
                                  </p>
                                  <Badge className="text-[4px] h-2 px-0.5 bg-green-200 text-green-800">
                                    +$4.00
                                  </Badge>
                                </div>
                              </div>
                              <div className="h-5 bg-gradient-to-r from-blue-200 to-blue-400 rounded" />
                              <div className="flex border rounded-sm overflow-hidden">
                                {["1W", "1M", "3M", "1Y", "3Y", "All"].map(
                                  (period, i) => (
                                    <button
                                      key={period}
                                      className={`flex-1 py-0.5 text-[4px] border-r last:border-r-0 ${
                                        i === 0 ? "preview-primary-btn text-white" : "bg-white text-black"
                                      }`}
                                    >
                                      {period}
                                    </button>
                                  )
                                )}
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-0.5">
                                  <p className="text-[5px] font-semibold">Holdings</p>
                                  <Badge className="text-[4px] h-2 px-0.5 bg-green-200 text-green-800">
                                    Auto Invest: ON
                                  </Badge>
                                </div>
                                <div className="space-y-0.5">
                                  {[
                                    {
                                      name: "Umbrella Corp",
                                      amount: "$86.22",
                                      change: "+1.70%",
                                    },
                                    {
                                      name: "Dunder Mifflin",
                                      amount: "$45.18",
                                      change: "+0.88%",
                                    },
                                    {
                                      name: "Stark Industries",
                                      amount: "$313.71",
                                      change: "+0.65%",
                                    },
                                  ].map((holding, i) => (
                                    <div key={i}>
                                      <div className="flex items-center gap-1 text-[5px]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        <div className="flex-1 flex justify-between">
                                          <span className="font-medium">
                                            {holding.name}
                                          </span>
                                          <span>{holding.amount}</span>
                                        </div>
                                      </div>
                                      <div className="flex justify-between text-[4px] text-muted-foreground ml-2.5">
                                        <span>1.01 shares</span>
                                        <span className="text-green-600">
                                          {holding.change}
                                        </span>
                                      </div>
                                      {i < 2 && <Separator className="my-0.5" />}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <Separator />
                              <Button
                                variant="link"
                                size="sm"
                                className="h-2 text-[5px] w-full preview-link"
                              >
                                View All Investments →
                              </Button>
                            </Card>

                            {/* Transactions */}
                            <div className="space-y-1.5">
                              <Card className="p-1.5">
                                <p className="font-semibold text-[5px] mb-1">
                                  Did you know?
                                </p>
                                <p className="text-[4px] text-muted-foreground">
                                  B-up care is available! Book a spot at a nearby
                                  center.
                                </p>
                              </Card>
                              <Card className="p-1.5 space-y-1">
                                <p className="font-semibold text-[6px]">
                                  Recent Transactions
                                </p>
                                <div className="space-y-0.5 text-[5px]">
                                  {[
                                    {
                                      label: "Pending",
                                      desc: "Payroll Contribution",
                                      amount: "$158.00",
                                      positive: true,
                                    },
                                    {
                                      label: "01/16/2025",
                                      desc: "Walgreens",
                                      amount: "- $26.00",
                                      positive: false,
                                    },
                                    {
                                      label: "01/16/2025",
                                      desc: "Payroll Contribution",
                                      amount: "$158.00",
                                      positive: true,
                                    },
                                  ].map((tx, i) => (
                                    <div key={i}>
                                      <div className="flex justify-between">
                                        <div>
                                          <p className="text-[4px] text-muted-foreground">
                                            {tx.label}
                                          </p>
                                          <p>{tx.desc}</p>
                                        </div>
                                        <p
                                          className={
                                            tx.positive
                                              ? "text-green-600"
                                              : "text-black"
                                          }
                                        >
                                          {tx.amount}
                                        </p>
                                      </div>
                                      {i < 2 && <Separator className="my-0.5" />}
                                    </div>
                                  ))}
                                </div>
                                <Separator />
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-2 text-[5px] w-full preview-link"
                                >
                                  View All Transactions →
                                </Button>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="dashboard" className="mt-4">
                    <div className="bg-muted rounded-lg aspect-[3/4] flex items-center justify-center text-sm text-muted-foreground">
                      Dashboard preview
                    </div>
                  </TabsContent>

                  <TabsContent value="forms" className="mt-4">
                    <div className="bg-muted rounded-lg aspect-[3/4] flex items-center justify-center text-sm text-muted-foreground">
                      Forms preview
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

