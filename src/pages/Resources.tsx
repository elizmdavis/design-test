import Navigation from "@/components/Navigation"

interface ResourcesProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNavigateToMyProfile: () => void
  onNavigateToAdmin: () => void
  onLogout: () => void
}

export default function Resources({
  currentPage,
  onNavigate,
  onNavigateToMyProfile,
  onNavigateToAdmin,
  onLogout,
}: ResourcesProps) {
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
          <h1 className="text-3xl font-bold mb-4">Resources</h1>
          <p className="text-muted-foreground">Resources page content will go here.</p>
        </div>
      </div>
    </div>
  )
}

