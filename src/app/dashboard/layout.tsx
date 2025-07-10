
import Link from "next/link";
import { AppLogo } from "@/components/icons";
import { LanguageProvider } from "@/lib/language-provider";
import MainDashboardLayout from "./components/main-dashboard-layout";
import { ProfileProvider } from "@/lib/profile-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <MainDashboardLayout>
          {children}
        </MainDashboardLayout>
      </ProfileProvider>
    </LanguageProvider>
  );
}
