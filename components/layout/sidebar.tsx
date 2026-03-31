"use client";

import { Home, Wallet, CreditCard, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard?tab=expenses", label: "Expenses", icon: CreditCard },
  { href: "/dashboard?tab=income", label: "Income", icon: Wallet }
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn("hidden border-r border-border bg-card/80 p-4 md:block", collapsed ? "w-20" : "w-72")}>
      <button className="mb-6 rounded-xl border border-border p-2" onClick={() => setCollapsed(!collapsed)}>
        <Menu className="h-4 w-4" />
      </button>
      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === "/dashboard" && link.href.startsWith("/dashboard");
          return (
            <Link
              href={link.href}
              key={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm",
                active
                  ? "bg-gradient-to-r from-yellow-400/30 via-amber-400/30 to-orange-400/30 text-foreground"
                  : "text-muted-foreground hover:bg-background"
              )}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
