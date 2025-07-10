import Link from "next/link";
import { AppLogo } from "@/components/icons";
import { LanguageProvider } from "@/lib/language-provider";
import MainDashboardLayout from "./components/main-dashboard-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <MainDashboardLayout>
        {children}
      </MainDashboardLayout>
    </LanguageProvider>
  );
}
