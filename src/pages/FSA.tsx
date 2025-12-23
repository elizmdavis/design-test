import Navigation from "@/components/Navigation"

interface FSAProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onLogout: () => void
}

export default function FSA({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onLogout,
}: FSAProps) {
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
          <h1 className="text-3xl font-bold mb-4">Flexible Spending Account (FSA)</h1>
          <p className="text-muted-foreground">FSA account details page content will go here.</p>
        </div>
      </div>
    </div>
  )
}

