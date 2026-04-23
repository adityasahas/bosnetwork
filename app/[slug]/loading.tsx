export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <nav className="py-6 border-b border-border">
          <div className="w-24 h-4 rounded bg-surface animate-pulse" />
        </nav>

        <div className="py-10">
          {/* back link */}
          <div className="w-10 h-3.5 rounded bg-surface animate-pulse mb-8" />

          <div className="flex gap-6 items-start">
            {/* avatar */}
            <div className="shrink-0 w-20 h-20 rounded-full bg-surface animate-pulse" />

            <div className="flex-1 space-y-3 pt-1">
              <div className="w-48 h-6 rounded bg-surface animate-pulse" />
              <div className="w-32 h-3.5 rounded bg-surface animate-pulse" />
              <div className="w-40 h-3.5 rounded bg-surface animate-pulse mt-4" />
              <div className="space-y-2 pt-2">
                <div className="w-full h-3 rounded bg-surface animate-pulse" />
                <div className="w-4/5 h-3 rounded bg-surface animate-pulse" />
                <div className="w-3/5 h-3 rounded bg-surface animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
