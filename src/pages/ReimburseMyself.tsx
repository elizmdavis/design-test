import type { FormEvent } from "react"
import { useMemo, useState } from "react"
import Navigation from "@/components/Navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FloatLabel } from "@/components/ui/float-label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Upload, CheckCircle2, ShieldCheck, FileText, CalendarRange, Wallet, Sparkles, Info, Loader2, X } from "lucide-react"

interface ReimburseMyselfProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

export default function ReimburseMyself({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: ReimburseMyselfProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    account: "",
    category: "",
    provider: "Little One's Daycare",
    serviceDate: "2025-01-16",
    amount: "146.00",
    paymentMethod: "direct-deposit",
  })
  const [variant, setVariant] = useState<"mvp" | "vision">("mvp")
  
  // Vision workflow specific state
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; preview?: string } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [autoFillComplete, setAutoFillComplete] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [manualEntryMode, setManualEntryMode] = useState(false)
  const [autoFilledFields, setAutoFilledFields] = useState<Set<string>>(new Set())

  const formattedAmount = useMemo(() => {
    const numeric = Number.parseFloat(formData.amount || "0")
    return numeric.toLocaleString("en-US", { style: "currency", currency: "USD" })
  }, [formData.amount])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    // Remove from auto-filled set if user manually edits
    setAutoFilledFields((prev) => {
      if (prev.has(key)) {
        const next = new Set(prev)
        next.delete(key)
        return next
      }
      return prev
    })
  }

  const handleFileUpload = (file: File) => {
    const fileData = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
    }
    setUploadedFile(fileData)
    setIsAnalyzing(true)
    setAutoFillComplete(false)
    setManualEntryMode(false)

    // Simulate AI analysis (2-3 seconds)
    setTimeout(() => {
      // Auto-fill form with "extracted" data
      setFormData((prev) => ({
        ...prev,
        provider: "Dr. Jorge Doe",
        serviceDate: "2025-06-20",
        amount: "150.00",
        category: "medical",
        account: "healthcare-fsa",
      }))
      // Track which fields were auto-filled
      setAutoFilledFields(new Set(["provider", "serviceDate", "amount", "category", "account"]))
      setIsAnalyzing(false)
      setAutoFillComplete(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setAutoFillComplete(false), 3000)
    }, 2500)
  }

  const handleManualEntry = () => {
    setManualEntryMode(true)
    setAutoFilledFields(new Set())
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setAutoFillComplete(false)
    setAutoFilledFields(new Set())
    setManualEntryMode(false)
  }

  const getAccountLabel = (value: string) => {
    if (value === "dependent-care-fsa") return "Dependent Care FSA"
    if (value === "healthcare-fsa") return "Healthcare FSA"
    if (value === "medical-fsa") return "Medical FSA"
    if (value === "hsa") return "HSA"
    return "—"
  }

  const renderMvp = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1d2c38]">Reimburse Myself</h1>
      </div>

      <Card className="border border-slate-200">
        <CardContent className="space-y-8 p-6 md:p-8">
          <div>
            <p className="text-sm font-semibold text-[#1d2c38]">Available Balance</p>
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2 text-sm text-[#1d2c38]">
                Medical FSA
                <Info className="h-4 w-4 text-slate-500" />
              </div>
              <p className="text-xl font-semibold text-[#1d2c38]">$2,734.76</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#1d2c38]">Select Accounts</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-[#1d2c38]">Pay from</Label>
                <Select
                  value={formData.account || undefined}
                  onValueChange={(value) => handleChange("account", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical-fsa">Medical FSA</SelectItem>
                    <SelectItem value="dependent-care-fsa">Dependent Care FSA</SelectItem>
                    <SelectItem value="hsa">HSA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-[#1d2c38]">Pay to</Label>
                <Select
                  value={formData.category || undefined}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Me</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="dependent">Dependent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground">
                Based on your selection, you will be requesting a Claim Reimbursement.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={() => onNavigate("homepage")}>
                Cancel
              </Button>
              <Button onClick={() => onNavigate("reimburse-docs")}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderVision = () => {
    const isFSA = formData.account.includes("fsa")
    const receiptRequired = isFSA && !manualEntryMode
    const showFormFields = uploadedFile || manualEntryMode || isAnalyzing

    const isAutoFilled = (field: string) => autoFilledFields.has(field)

    return (
      <>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#1d2c38]">Reimburse Myself</h1>
        </div>

        {submitted && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Reimbursement submitted</AlertTitle>
            <AlertDescription>
              We&apos;ve queued your reimbursement. You can track it from Claims or return home to continue browsing.
            </AlertDescription>
          </Alert>
        )}

        {autoFillComplete && (
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-700">Form auto-filled</AlertTitle>
            <AlertDescription className="text-blue-600">
              We extracted details from your receipt. Review and adjust as needed.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 p-6">
                {/* Receipt Upload - Primary Focus */}
                {!showFormFields && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-lg font-semibold text-[#1d2c38]">Upload receipt</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">Upload itemized receipt or EOB. We'll extract details automatically.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div
                      className="relative rounded-xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-slate-50 p-16 transition-all hover:border-blue-400 hover:shadow-md cursor-pointer"
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        const file = e.dataTransfer.files[0]
                        if (file) handleFileUpload(file)
                      }}
                      onClick={() => {
                        const input = document.createElement("input")
                        input.type = "file"
                        input.accept = "image/*,.pdf"
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0]
                          if (file) handleFileUpload(file)
                        }
                        input.click()
                      }}
                    >
                      <div className="flex flex-col items-center justify-center gap-5 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 shadow-sm">
                          <Upload className="h-10 w-10 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-[#1d2c38]">Click or drag to upload</p>
                          <p className="text-sm text-muted-foreground mt-2">PDF, JPG, or PNG up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Skip Option */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <span className="text-sm text-muted-foreground">Don't have a receipt?</span>
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-sm text-blue-700"
                        onClick={handleManualEntry}
                      >
                        Enter manually
                      </Button>
                      {receiptRequired && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3.5 w-3.5 text-amber-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Receipt required for FSA accounts</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                )}

                {/* Upload Status */}
                {uploadedFile && (
                  <div className="space-y-3">
                    {isAnalyzing ? (
                      <div className="flex items-center gap-3 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-[#1d2c38]">Analyzing receipt...</p>
                          <p className="text-xs text-muted-foreground">Extracting details from your document</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg border-2 border-green-200 bg-green-50/50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#1d2c38]">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground">{uploadedFile.size}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Form Fields - Progressive Disclosure */}
                {showFormFields && (
                  <>
                    <Separator className="transition-opacity" />
                    
                    <div className="rounded-lg border bg-slate-50/50 p-6 space-y-6 transition-all">
                      {manualEntryMode && (
                        <div className="flex items-center gap-2 pb-2 border-b">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <Label className="text-sm font-medium text-[#1d2c38]">Manual entry</Label>
                        </div>
                      )}

                      {uploadedFile && !isAnalyzing && (
                        <div className="flex items-center gap-2 pb-2 border-b">
                          <CheckCircle2 className="h-4 w-4 text-blue-600" />
                          <Label className="text-sm font-medium text-[#1d2c38]">Review and adjust</Label>
                        </div>
                      )}

                      {/* All fields in vertical order */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="vision-account" className="text-sm font-medium">
                              Account
                              {isAutoFilled("account") && (
                                <Badge variant="outline" className="ml-2 text-xs border-blue-200 text-blue-700 bg-blue-50">
                                  AI-filled
                                </Badge>
                              )}
                            </Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm">Select the account to reimburse from</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Select value={formData.account} onValueChange={(value) => handleChange("account", value)}>
                            <SelectTrigger id="vision-account">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hsa">Health Savings Account (HSA)</SelectItem>
                              <SelectItem value="healthcare-fsa">Healthcare FSA</SelectItem>
                              <SelectItem value="dependent-care-fsa">Dependent Care FSA</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="vision-category" className="text-sm font-medium">
                              Expense type
                              {isAutoFilled("category") && (
                                <Badge variant="outline" className="ml-2 text-xs border-blue-200 text-blue-700 bg-blue-50">
                                  AI-filled
                                </Badge>
                              )}
                            </Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm">Category of the expense</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                            <SelectTrigger id="vision-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="vision">Vision</SelectItem>
                              <SelectItem value="dental">Dental</SelectItem>
                              <SelectItem value="dependent-care">Dependent Care</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          {isAutoFilled("provider") && (
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50 mb-1">
                              AI-filled
                            </Badge>
                          )}
                          <FloatLabel
                            label="Provider / Merchant"
                            type="text"
                            value={formData.provider}
                            onChange={(e) => handleChange("provider", e.target.value)}
                            leftIcon={<FileText className="h-4 w-4" />}
                          />
                        </div>

                        <div className="space-y-2">
                          {isAutoFilled("serviceDate") && (
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50 mb-1">
                              AI-filled
                            </Badge>
                          )}
                          <FloatLabel
                            label="Date of service"
                            type="date"
                            value={formData.serviceDate}
                            onChange={(e) => handleChange("serviceDate", e.target.value)}
                            leftIcon={<CalendarRange className="h-4 w-4" />}
                          />
                        </div>

                        <div className="space-y-2">
                          {isAutoFilled("amount") && (
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50 mb-1">
                              AI-filled
                            </Badge>
                          )}
                          <FloatLabel
                            label="Amount"
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => handleChange("amount", e.target.value)}
                            leftIcon={<Wallet className="h-4 w-4" />}
                          />
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="vision-payment" className="text-sm font-medium">Reimburse to</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">Direct deposit is fastest (2-3 days)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Select value={formData.paymentMethod} onValueChange={(value) => handleChange("paymentMethod", value)}>
                          <SelectTrigger id="vision-payment">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="direct-deposit">Direct deposit</SelectItem>
                            <SelectItem value="check">Mailed check</SelectItem>
                            <SelectItem value="hsa-card-reversal">HSA card reversal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <Button type="button" variant="ghost" onClick={() => setShowHelp(!showHelp)}>
                        {showHelp ? "Hide help" : "Need help?"}
                      </Button>
                      <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => onNavigate("homepage")}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                    </div>

                    {showHelp && (
                      <Card className="border-blue-100 bg-blue-50/30">
                        <CardContent className="p-4 space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">What documents are required?</p>
                            <p className="text-xs text-muted-foreground">
                              Itemized receipt or EOB with provider, patient, date, and amount.
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">When will I get reimbursed?</p>
                            <p className="text-xs text-muted-foreground">
                              Direct deposit: 2-3 business days. Check: 7-10 business days.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </CardContent>
            </form>
          </Card>

          {/* Real-time Summary Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Account</span>
                <span className="text-sm font-medium">
                  {showFormFields && formData.account ? getAccountLabel(formData.account) : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="text-sm font-medium">
                  {showFormFields && formData.serviceDate
                    ? (() => {
                        const [year, month, day] = formData.serviceDate.split("-")
                        return `${month}/${day}/${year}`
                      })()
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-base font-semibold text-[#1d2c38]">
                  {showFormFields && formData.amount ? formattedAmount : "$0.00"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium">
                  {showFormFields && formData.paymentMethod
                    ? formData.paymentMethod === "direct-deposit"
                      ? "Direct deposit"
                      : formData.paymentMethod === "check"
                        ? "Check"
                        : formData.paymentMethod === "hsa-card-reversal"
                          ? "HSA reversal"
                          : "—"
                    : "—"}
                </span>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                <span>Smart checks enabled</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-[#F1FAFE]">
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

        <div className="mx-auto max-w-[1440px] px-8 py-8">
          <div className="mx-auto max-w-[1376px] space-y-8">
            {variant === "mvp" ? renderMvp() : renderVision()}
          </div>
        </div>
      </div>

      {/* Floating variant switcher */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-40">
        <div className="pointer-events-auto overflow-hidden rounded-full border bg-white shadow-lg shadow-slate-900/10">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Mode
            </div>
            <Select value={variant} onValueChange={(value) => setVariant(value as "mvp" | "vision")}>
              <SelectTrigger className="h-8 w-32 border-none px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="mvp">MVP</SelectItem>
                <SelectItem value="vision">Vision</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  )
}