"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppLogo } from "@/components/icons";
import { useLanguage } from "@/lib/language-provider";
import { usePathname } from 'next/navigation';
import { Bot, HeartHandshake, Home, Pill, Settings, Users } from "lucide-react";

type NavItem = {
    href: string;
    icon: React.ElementType;
    label: string;
}

const navItems: NavItem[] = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/caregivers", icon: Users, label: "Caregivers" },
  { href: "/dashboard/medication", icon: Pill, label: "Medication" },
  { href: "/dashboard/health-tips", icon: HeartHandshake, label: "Health Tips" },
  { href: "/dashboard/assistant", icon: Bot, label: "AI Assistant" },
];

export default function MainDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { translate } = useLanguage();
  const pathname = usePathname();

  const getPageTitle = () => {
    const currentNavItem = navItems.find(item => pathname === item.href);
    if (currentNavItem) {
        return currentNavItem.label;
    }
    if (pathname === '/dashboard/settings') {
        return 'Settings';
    }
    return 'Dashboard';
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <AppLogo className="h-8 w-8 text-primary" />
            <span className="text-lg font-semibold font-headline">{translate('CareBridge')}</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{translate(item.label)}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard/settings">
                <SidebarMenuButton>
                  <Settings />
                  <span>{translate('Settings')}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{translate('User Name')}</span>
                    <span className="text-xs text-muted-foreground">user@email.com</span>
                  </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold font-headline">{translate(getPageTitle())}</h1>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
