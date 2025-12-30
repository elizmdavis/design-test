import Navigation from "@/components/Navigation"

interface AccountsProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onNavigateToMessageCenter?: () => void
  onLogout: () => void
}

export default function Accounts({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onNavigateToMessageCenter,
  onLogout,
}: AccountsProps) {
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
        <div className="mx-auto max-w-[1376px]">
          <h1 className="text-3xl font-bold mb-4">Accounts</h1>
          <p className="text-muted-foreground">Accounts overview page content will go here.</p>
        </div>
      </div>
    </div>
  )
}

