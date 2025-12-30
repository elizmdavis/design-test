import { useEffect } from "react"
import Navigation from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

interface ReimburseAnalyzeProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

export default function ReimburseAnalyze({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: ReimburseAnalyzeProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate("reimburse-review")
    }, 3000)
    return () => clearTimeout(timer)
  }, [onNavigate])

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
        <div className="mx-auto max-w-[720px]">
          <Card className="border border-slate-200">
            <CardContent className="space-y-6 p-8">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold text-foreground">Analyzing your documentation</h1>
                <p className="text-sm text-muted-foreground">
                  We&apos;re checking your upload for required details before the review step.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-700" />
                </div>
                <p className="text-sm font-medium text-foreground">This will take just a few seconds...</p>
              </div>

              <Separator />

              <p className="text-xs text-muted-foreground text-center">
                Next: review your details and submit your reimbursement request.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

