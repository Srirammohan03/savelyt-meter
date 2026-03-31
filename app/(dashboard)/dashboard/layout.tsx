import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1 pb-20 md:pb-0">
        <Header />
        <div className="p-4 md:p-6">{children}</div>
      </div>
      <MobileNav />
    </div>
  );
}
