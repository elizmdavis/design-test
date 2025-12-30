import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ReimburseReviewProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

export default function ReimburseReview({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: ReimburseReviewProps) {
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

      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px] space-y-8">
          <h1 className="text-2xl font-semibold text-foreground">Reimburse Myself</h1>

          <Card className="border border-slate-200">
            <CardContent className="space-y-8 p-6 md:p-8">
              <div>
                <p className="text-sm font-semibold text-foreground">Available Balance</p>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    Medical FSA <Info className="h-4 w-4 text-slate-500" />
                  </div>
                  <p className="text-xl font-semibold text-foreground">$2,734.76</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">Uploaded document</h2>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs text-foreground">
                  <AlertCircle className="h-4 w-4 text-blue-700" />
                  The form has been pre-filled for your convenience. Please review and correct any errors to ensure accuracy.
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <div className="grid gap-4">
                      <div className="space-y-1">
                        <Label className="text-sm text-foreground">Start Date of Service</Label>
                        <Input value="06/20/2026" readOnly />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm text-foreground">End Date of Service</Label>
                        <Input value="06/20/2026" readOnly />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm text-foreground">Amount</Label>
                        <Input value="$150.00" readOnly />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm text-foreground">Provider</Label>
                        <Input value="Dr. Jorge Doe" readOnly />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm text-foreground">Category</Label>
                        <Input value="Medical" readOnly />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm text-foreground">Type</Label>
                        <Input value="Office Visit" readOnly />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm text-foreground">Description</Label>
                        <Textarea rows={3} value="" readOnly />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Recipient</p>
                        <RadioGroup value="adam" className="space-y-2">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="adam" id="recipient-adam" />
                            <Label htmlFor="recipient-adam" className="text-sm font-medium text-foreground">
                              Adam Smith
                            </Label>
                          </div>
                          <Button variant="link" className="px-0 text-blue-700 justify-start">
                            + Add a dependent
                          </Button>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Did you drive to receive this product or service?</p>
                        <RadioGroup value="no" className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="yes" id="drive-yes" />
                            <Label htmlFor="drive-yes" className="text-sm text-foreground">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="no" id="drive-no" />
                            <Label htmlFor="drive-no" className="text-sm text-foreground">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-center lg:justify-end">
                    <div className="flex h-full w-full max-w-[360px] items-center justify-center rounded-md border bg-slate-100 p-4">
                      <div className="h-[360px] w-[260px] rounded-sm bg-white shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Extracted information</h3>
                <div className="rounded-lg border bg-white">
                  <div className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">Eligible Items</span>
                    <span className="text-foreground">$150.00</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">Office Visit</span>
                    <span className="text-foreground">$150.00</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground">
                    <span>Total</span>
                    <span>$150.00</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" onClick={() => onNavigate("homepage")}>
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => onNavigate("reimburse-docs")}>
                    Previous
                  </Button>
                  <Button onClick={() => onNavigate("reimburse-confirm")}>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

