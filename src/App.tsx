import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from "lucide-react"
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPage] = useState<
    "showcase" | "admin" | "homepage" | "myprofile" | "accounts" | "claims" | "resources" | "hsa" | "fsa" | "messagecenter"
  >("homepage")
  const [progress, setProgress] = useState(33)
  const [sliderValue, setSliderValue] = useState([50])

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentPage("homepage")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page as typeof currentPage)
  }

  const handleNavigateToMyProfile = () => {
    setCurrentPage("myprofile")
  }

  const handleNavigateToAdmin = () => {
    setCurrentPage("admin")
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />
  }

  if (currentPage === "admin") {
    return (
      <AdminCustomization
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />
    )
  }

  if (currentPage === "myprofile") {
    return (
      <MyProfile
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />
    )
  }

  if (currentPage === "messagecenter") {
    return (
      <MessageCenter
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
        onBack={() => setCurrentPage("homepage")}
      />
    )
  }

  if (currentPage === "homepage") {
    return (
      <Homepage
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToAdmin={handleNavigateToAdmin}
        onNavigateToShowcase={() => setCurrentPage("showcase")}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToMessageCenter={() => setCurrentPage("messagecenter")}
        onLogout={handleLogout}
      />
    )
  }

  if (currentPage === "accounts") {
    return (
      <Accounts
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />
    )
  }

  if (currentPage === "claims") {
    return (
      <Claims
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />
    )
  }

  if (currentPage === "resources") {
    return (
      <Resources
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />
    )
  }

  if (currentPage === "hsa") {
    return (
      <HSA
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />
    )
  }

  if (currentPage === "fsa") {
    return (
      <FSA
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onNavigateToMyProfile={handleNavigateToMyProfile}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-8 py-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentPage("homepage")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">shadcn/ui Components</h1>
                <p className="text-muted-foreground mt-2">
                  Vite + React + TypeScript + Tailwind CSS - Component Showcase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Buttons & Actions */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Buttons & Actions</h2>
            <p className="text-muted-foreground">Various button styles and states</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-3">Button Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">→</Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Button States</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Form Elements</h2>
            <p className="text-muted-foreground">Input fields and form controls</p>
          </div>
          <Separator />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input-1">Input</Label>
                <Input id="input-1" placeholder="Type something..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input-2">Email</Label>
                <Input id="input-2" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input-3">Password</Label>
                <Input id="input-3" type="password" placeholder="Password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input-4">Disabled</Label>
                <Input id="input-4" disabled placeholder="Disabled input" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="textarea">Textarea</Label>
                <Textarea id="textarea" placeholder="Type your message here..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="select">Select</Label>
                <Select>
                  <SelectTrigger id="select">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Checkboxes, Switches & Radio */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Selection Controls</h2>
            <p className="text-muted-foreground">Checkboxes, switches, and radio buttons</p>
          </div>
          <Separator />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Checkbox</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="check1" />
                <Label htmlFor="check1">Accept terms</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check2" defaultChecked />
                <Label htmlFor="check2">Checked by default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check3" disabled />
                <Label htmlFor="check3">Disabled</Label>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Switch</h3>
              <div className="flex items-center space-x-2">
                <Switch id="switch1" />
                <Label htmlFor="switch1">Airplane mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch2" defaultChecked />
                <Label htmlFor="switch2">Enabled</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch3" disabled />
                <Label htmlFor="switch3">Disabled</Label>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Radio Group</h3>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="radio1" />
                  <Label htmlFor="radio1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="radio2" />
                  <Label htmlFor="radio2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="radio3" />
                  <Label htmlFor="radio3">Option 3</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* Layout Components */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Layout</h2>
            <p className="text-muted-foreground">Cards and separators for organizing content</p>
          </div>
          <Separator />
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card content area.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Action</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cards help organize related content.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With multiple sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Content section 1</p>
                  <Separator />
                  <p>Content section 2</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Badges</h2>
            <p className="text-muted-foreground">Small status indicators and labels</p>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Feedback Components */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Feedback & Dialogs</h2>
            <p className="text-muted-foreground">Alerts, dialogs, and notifications</p>
          </div>
          <Separator />
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Alerts</h3>
              <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  This is a default alert with important information.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again.
                </AlertDescription>
              </Alert>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Dialogs</h3>
              <div className="flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        This is a dialog description. Dialogs are used for important information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>Dialog content goes here.</p>
                    </div>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Open Alert Dialog</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">Popover</h4>
                      <p className="text-sm text-muted-foreground">
                        This is a popover with some content.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover for Tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Components */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Navigation</h2>
            <p className="text-muted-foreground">Tabs and accordions for content organization</p>
          </div>
          <Separator />
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Tabs</h3>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="space-y-2">
                  <h4 className="font-medium">Tab 1 Content</h4>
                  <p className="text-sm text-muted-foreground">
                    This is the content for the first tab.
                  </p>
                </TabsContent>
                <TabsContent value="tab2" className="space-y-2">
                  <h4 className="font-medium">Tab 2 Content</h4>
                  <p className="text-sm text-muted-foreground">
                    This is the content for the second tab.
                  </p>
                </TabsContent>
                <TabsContent value="tab3" className="space-y-2">
                  <h4 className="font-medium">Tab 3 Content</h4>
                  <p className="text-sm text-muted-foreground">
                    This is the content for the third tab.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Accordion</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that you can customize.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default with smooth transitions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Data Display */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Data Display</h2>
            <p className="text-muted-foreground">Loading states and progress indicators</p>
          </div>
          <Separator />
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Skeleton</h3>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Progress</h3>
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                    Decrease
                  </Button>
                  <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                    Increase
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Slider</h3>
              <div className="space-y-2">
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full max-w-md"
                />
                <p className="text-sm text-muted-foreground">Value: {sliderValue[0]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Separator />
        <div className="text-center text-sm text-muted-foreground pb-8">
          <p>Built with shadcn/ui, Vite, React, TypeScript, and Tailwind CSS</p>
          <p className="mt-1">
            Visit{" "}
            <a
              href="https://ui.shadcn.com/docs/components"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              shadcn/ui documentation
            </a>{" "}
            for more information
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
