import Navigation from "@/components/Navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Info, Upload, ExternalLink, X, FileText, Check } from "lucide-react"
import { useState } from "react"

interface ReimburseDocsProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

export default function ReimburseDocs({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: ReimburseDocsProps) {
  const [autoAnalyze, setAutoAnalyze] = useState(true)
  const [uploads, setUploads] = useState<Array<{ name: string; size: string; status: "uploaded"; date: string }>>([])

  const hasUploads = uploads.length > 0

  const handleRemove = (name: string) => {
    setUploads((prev) => prev.filter((file) => file.name !== name))
  }

  const handleMockUpload = () => {
    // Mock upload - add a file when button is clicked
    setUploads([{ name: "Receipt.pdf", size: "184 KB", status: "uploaded" as const, date: "Jan 16" }])
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

      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px] space-y-6">
          <h1 className="text-2xl font-semibold text-foreground">Reimburse Myself</h1>

          <Card className="border border-slate-200">
            <CardContent className="space-y-8 p-6 md:p-8">
              <div>
                <p className="text-sm font-semibold text-foreground">Available Balance</p>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    Medical FSA
                    <Info className="h-4 w-4 text-slate-500" />
                  </div>
                  <p className="text-xl font-semibold text-foreground">$2,734.76</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">Receipt or Documentation</h2>
                  <Info className="h-4 w-4 text-slate-500" />
                </div>

                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-blue-700"
                >
                  What information is required? <ExternalLink className="h-3.5 w-3.5" />
                </button>

                <div className="rounded-lg border border-dashed bg-white p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" className="min-w-[200px]" onClick={handleMockUpload}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Valid Documentation
                      </Button>
                    </div>
                  </div>
                  {!hasUploads ? (
                    <p className="mt-3 text-sm text-muted-foreground">Drag and drop files here to upload.</p>
                  ) : (
                    <div className="mt-4 space-y-2">
                      {uploads.map((file) => (
                        <div
                          key={file.name}
                          className="flex items-center justify-between rounded-lg border bg-slate-50 px-3 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                              <FileText className="h-4 w-4 text-blue-700" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-sm font-medium text-foreground">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.size} • Added {file.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                              <Check className="h-3.5 w-3.5" />
                              Uploaded
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemove(file.name)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="auto-analyze"
                      checked={autoAnalyze}
                      onCheckedChange={(checked) => setAutoAnalyze(Boolean(checked))}
                    />
                    <label htmlFor="auto-analyze" className="flex items-center gap-1 text-sm text-foreground">
                      Auto-analyze my claims info <Info className="h-3.5 w-3.5 text-slate-500" />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We are unable to auto-analyze multiple documents.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" onClick={() => onNavigate("homepage")}>
                    Cancel
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => onNavigate("reimburse")}>
                      Previous
                    </Button>
                    <Button onClick={() => onNavigate("reimburse-analyze")}>Next</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert variant="default" className="bg-transparent p-0 text-xs text-muted-foreground">
            <AlertDescription>
              We collect information about the use of this portal (for example, how long you are on the
              portal, the pages you visit, etc.) so that we can understand and improve user experience.
              For more information about our privacy practices, click here.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}

