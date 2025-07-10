"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SosIcon } from "@/components/icons";
import { ArrowRight, Bell, Bot, HeartHandshake, Pill, Users } from "lucide-react";
import Link from "next/link";
import EmergencyAlertButton from "./components/emergency-alert-button";
import { useLanguage } from "@/lib/language-provider";


export default function DashboardPage() {
  const { translate } = useLanguage();

  const features = [
    {
      title: "Find Caregivers",
      description: "Browse our network of trusted and skilled caregivers.",
      icon: Users,
      href: "/dashboard/caregivers",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Medication Schedule",
      description: "Manage and view upcoming medication reminders.",
      icon: Pill,
      href: "/dashboard/medication",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Health Tips",
      description: "Get simple, actionable health advice for daily well-being.",
      icon: HeartHandshake,
      href: "/dashboard/health-tips",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "Smart Health Assistant",
      description: "Ask our AI assistant for personalized health guidance.",
      icon: Bot,
      href: "/dashboard/assistant",
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="bg-destructive text-destructive-foreground">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{translate('Emergency Alert')}</CardTitle>
          <CardDescription className="text-destructive-foreground/80">
            {translate('In case of an emergency, press the SOS button to immediately notify your contacts with your location.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmergencyAlertButton />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <div>
                <CardTitle className="font-headline">{translate(feature.title)}</CardTitle>
                <CardDescription className="mt-1">{translate(feature.description)}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={feature.href}>
                  {translate('Go to')} {translate(feature.title)} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
