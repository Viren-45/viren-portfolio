// src/components/studio/StudioHeader.tsx
import { usePathname } from "next/navigation";
import UserDropdown from "./UserDropdown";
import { studioPageMeta } from "@/lib/utils/studio-page-meta";

export default function StudioHeader() {
  const pathname = usePathname();

  const meta =
    studioPageMeta[pathname] ??
    (pathname.includes("/studio/projects/") && pathname.endsWith("/edit")
      ? { title: "Edit Project", subtitle: "Update your project details." }
      : { title: "Studio", subtitle: "Manage your portfolio." });

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-8 py-4"
      style={{
        backgroundColor: "#08121D",
        borderBottom: "1px solid rgba(232,232,232,0.08)",
      }}
    >
      {/* Page title */}
      <div className="flex flex-col">
        <h1
          className="text-3xl text-[#E8E8E8] font-semibold"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {meta.title}
        </h1>
        <p
          className="text-sm text-[#E8E8E8]/70 mt-3"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {meta.subtitle}
        </p>
      </div>

      {/* User dropdown */}
      <UserDropdown />
    </header>
  );
}
