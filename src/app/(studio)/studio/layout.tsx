// src/app/(studio)/studio/layout.tsx
import StudioSidebar from "@/components/studio/StudioSidebar";
import { SidebarProvider } from "@/lib/utils/studio-sidebar-context";
import StudioShell from "@/components/studio/StudioShell";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen" style={{ backgroundColor: "#08121D" }}>
        <StudioSidebar />
        <StudioShell>{children}</StudioShell>
      </div>
    </SidebarProvider>
  );
}
