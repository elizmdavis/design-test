import Navigation from "@/components/Navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, Pencil, ShoppingCart, CheckCircle2, X, ChevronDown, ChevronRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ReimburseConfirmProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

export default function ReimburseConfirm({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: ReimburseConfirmProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const handleSubmit = () => {
    if (acceptedTerms) {
      setShowSuccessBanner(true)
    }
  }

  const toggleRow = (rowId: string) => {
    setExpandedRow(expandedRow === rowId ? null : rowId)
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#1d2c38]">Reimburse Myself</h1>
          </div>

          {showSuccessBanner && (
            <div className="w-full rounded-lg border border-teal-200 bg-emerald-50/80 px-4 py-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-teal-600 font-semibold text-sm mb-1">Claim Approved!</div>
                    <div className="text-slate-600 text-sm">
                      Great news! Your claim has been approved. You will be paid out according to account setup.
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-teal-600 hover:text-teal-700 hover:bg-teal-100/50 shrink-0"
                  onClick={() => setShowSuccessBanner(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <Card className="border border-slate-200">
            <CardContent className="space-y-8 p-6 md:p-8">
              <div>
                <p className="text-sm font-semibold text-[#1d2c38]">Available Balance</p>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-[#1d2c38]">
                    Medical FSA <Info className="h-4 w-4 text-slate-500" />
                  </div>
                  <p className="text-xl font-semibold text-[#1d2c38]">$2,734.76</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#1d2c38]">Transaction Summary</h2>
                <div className="overflow-hidden rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#0058a3] hover:bg-[#0058a3]">
                        <TableHead className="text-xs font-medium text-white">From</TableHead>
                        <TableHead className="text-xs font-medium text-white">To</TableHead>
                        <TableHead className="text-xs font-medium text-white">Expense</TableHead>
                        <TableHead className="text-right text-xs font-medium text-white">Amount</TableHead>
                        <TableHead className="text-right text-xs font-medium text-white">Approved Amount</TableHead>
                        {!showSuccessBanner && (
                          <TableHead className="text-right text-xs font-medium text-white">Actions</TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <>
                        <TableRow>
                          <TableCell>
                            <button
                              onClick={() => toggleRow("claim-1")}
                              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                            >
                              {expandedRow === "claim-1" ? (
                                <ChevronDown className="h-4 w-4 text-slate-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-slate-500" />
                              )}
                              <span>Medical FSA</span>
                            </button>
                          </TableCell>
                          <TableCell>Me</TableCell>
                          <TableCell>Office Visit</TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                          {!showSuccessBanner && (
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-3">
                                <button className="text-xs text-rose-600 hover:underline">Remove</button>
                                <Button variant="secondary" size="sm" className="h-7 px-3">
                                  <Pencil className="h-3.5 w-3.5" />
                                  Edit
                                </Button>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                        {expandedRow === "claim-1" && (
                          <TableRow>
                            <TableCell colSpan={showSuccessBanner ? 5 : 6} className="bg-slate-50">
                              <div className="px-4 py-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground mb-1">Provider</p>
                                    <p className="font-medium text-[#1d2c38]">Dr. Jorge Doe</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground mb-1">Date of Service</p>
                                    <p className="font-medium text-[#1d2c38]">06/20/2026</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground mb-1">Category</p>
                                    <p className="font-medium text-[#1d2c38]">Medical</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground mb-1">Type</p>
                                    <p className="font-medium text-[#1d2c38]">Office Visit</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-muted-foreground mb-1">Description</p>
                                    <p className="font-medium text-[#1d2c38]">Office visit for routine checkup</p>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    </TableBody>
                  </Table>
                </div>
                {!showSuccessBanner && (
                  <Button variant="outline" className="w-fit">
                    + Add Another
                  </Button>
                )}
              </div>

              {!showSuccessBanner && (
                <>
                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-[#1d2c38]">Claims Terms and Conditions</h3>
                    <div className="rounded-md border bg-white px-4 py-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={acceptedTerms}
                          onCheckedChange={(checked) => setAcceptedTerms(Boolean(checked))}
                        />
                        <label htmlFor="terms" className="text-sm text-[#1d2c38] leading-relaxed">
                          I have read, understand, and agree to the{" "}
                          <button className="text-blue-700 underline underline-offset-2">Terms and Conditions</button>.
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button variant="secondary" onClick={() => onNavigate("reimburse-review")}>
                      Previous
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="ghost">
                        <ShoppingCart className="h-4 w-4" />
                        Save for Later
                      </Button>
                      <Button variant="outline" onClick={() => onNavigate("homepage")}>
                        Cancel
                      </Button>
                      <Button disabled={!acceptedTerms} onClick={handleSubmit}>Submit</Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

