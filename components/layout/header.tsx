import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
      <p className="text-sm text-muted-foreground">Savely</p>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 font-semibold text-neutral-900">
          SV
        </div>
      </div>
    </header>
  );
}
