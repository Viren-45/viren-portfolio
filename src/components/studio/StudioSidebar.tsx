// src/components/studio/StudioSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Menu } from "lucide-react";
import { useSidebar } from "@/lib/utils/studio-sidebar-context";

const navItems = [
  {
    label: "Dashboard",
    href: "/studio",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/studio/projects",
    icon: FolderKanban,
  },
];

export default function StudioSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebar();

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-300 overflow-hidden"
      style={{
        width: isCollapsed ? "64px" : "256px",
        backgroundColor: "#0A121E",
        borderRight: "1px solid rgba(232,232,232,0.08)",
      }}
    >
      {/* Logo + Collapse button */}
      <div className="flex items-center justify-between px-4 py-5">
        {/* VP Logo — hidden when collapsed */}
        <span
          className="text-4xl font-bold text-[#FFFFFF] transition-opacity duration-200 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cormorant)",
            opacity: isCollapsed ? 0 : 1,
            width: isCollapsed ? 0 : "auto",
            overflow: "hidden",
          }}
        >
          VP
        </span>

        {/* Collapse toggle */}
        <button
          onClick={toggle}
          className="flex items-center justify-center w-8 h-8 rounded-md text-[#E8E8E8]/40 hover:text-[#E8E8E8] hover:bg-[#E8E8E8]/05 transition-colors duration-200 shrink-0 cursor-pointer"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-2 py-2 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 group relative"
              style={{
                backgroundColor: isActive
                  ? "rgba(201,168,76,0.1)"
                  : "transparent",
                borderLeft: isActive
                  ? "2px solid #C9A84C"
                  : "2px solid transparent",
              }}
              title={isCollapsed ? label : undefined}
            >
              <Icon
                size={17}
                className="shrink-0 transition-colors duration-200"
                style={{
                  color: isActive ? "#C9A84C" : "rgba(232,232,232,0.4)",
                }}
              />
              {/* Label — hidden when collapsed */}
              <span
                className="text-sm transition-all duration-200 whitespace-nowrap overflow-hidden"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: isActive ? "#E8E8E8" : "rgba(232,232,232,0.4)",
                  maxWidth: isCollapsed ? "0px" : "200px",
                  opacity: isCollapsed ? 0 : 1,
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer — hidden when collapsed */}
      <div
        className="px-4 py-4 transition-opacity duration-200"
        style={{
          borderTop: "1px solid rgba(232,232,232,0.08)",
          opacity: isCollapsed ? 0 : 1,
        }}
      >
        <p
          className="text-[10px] text-[#E8E8E8]/20 tracking-widest uppercase whitespace-nowrap"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          © {new Date().getFullYear()} Virendra Purohit
        </p>
      </div>
    </aside>
  );
}
