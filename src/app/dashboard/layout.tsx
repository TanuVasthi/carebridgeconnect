import Link from "next/link";
import { AppLogo } from "@/components/icons";
import { Bot, HeartHandshake, Home, Pill, Settings, Users } from "lucide-react";
import { LanguageProvider } from "@/lib/language-provider";
import MainDashboardLayout from "./components/main-dashboard-layout";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/caregivers", icon: Users, label: "Caregivers" },
  { href: "/dashboard/medication", icon: Pill, label: "Medication" },
  { href: "/dashboard/health-tips", icon: HeartHandshake, label: "Health Tips" },
  { href: "/dashboard/assistant", icon: Bot, label: "AI Assistant" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <MainDashboardLayout navItems={navItems}>
        {children}
      </MainDashboardLayout>
    </LanguageProvider>
  );
}
