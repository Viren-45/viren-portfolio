// src/app/(site)/layout.tsx:
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MobileNav />
      {children}
    </>
  );
}
