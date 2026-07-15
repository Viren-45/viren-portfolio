// src/components/studio/StudioShell.tsx
"use client";

import { useSidebar } from "@/lib/utils/studio-sidebar-context";
import StudioHeader from "./StudioHeader";
import type { ReactNode } from "react";

export default function StudioShell({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className="flex flex-1 flex-col transition-all duration-300"
      style={{ marginLeft: isCollapsed ? "64px" : "256px" }}
    >
      <StudioHeader />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}