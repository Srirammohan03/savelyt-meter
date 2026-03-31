"use client";

import { CreditCard, Home, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard?tab=expenses", icon: CreditCard, label: "Expenses" },
  { href: "/dashboard?tab=income", icon: Wallet, label: "Income" }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-2 md:hidden">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === "/dashboard" && item.href.startsWith("/dashboard");
          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center rounded-xl text-xs",
                active ? "bg-gradient-to-r from-yellow-400/25 via-amber-400/25 to-orange-400/25" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
