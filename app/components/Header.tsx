"use client";

interface HeaderProps {
  founderCount: number;
}

export default function Header({ founderCount }: HeaderProps) {
  return (
    <header className="px-6 py-5 md:px-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-left">
            <h1 className="text-base md:text-lg font-bold tracking-tight text-foreground">
              bos.network
            </h1>
          </div>
          <p className="text-muted text-[11px] tracking-wide">
            {founderCount} founders
          </p>
        </div>

        <nav className="flex items-center gap-4">
          <a
            href="/form"
            className="text-[11px] tracking-wide text-secondary hover:text-accent transition-colors"
          >
            Request access
          </a>
        </nav>
      </div>
    </header>
  );
}
