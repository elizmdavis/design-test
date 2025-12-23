import Navigation from "@/components/Navigation"

interface ClaimsProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onLogout: () => void
}

export default function Claims({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onLogout,
}: ClaimsProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onNavigate={onNavigate}
        onNavigateToMyProfile={onNavigateToMyProfile}
        onNavigateToAdmin={onNavigateToAdmin}
        onLogout={onLogout}
      />
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px]">
          <h1 className="text-3xl font-bold mb-4">Claims</h1>
          <p className="text-muted-foreground">Claims page content will go here.</p>
        </div>
      </div>
    </div>
  )
}

