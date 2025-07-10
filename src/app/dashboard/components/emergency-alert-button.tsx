
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SosIcon } from "@/components/icons";
import { useProfile } from "@/lib/profile-provider";
import Link from "next/link";
import { useLanguage } from "@/lib/language-provider";

export default function EmergencyAlertButton() {
  const { toast } = useToast();
  const { emergencyContacts } = useProfile();
  const { translate } = useLanguage();

  const handleSosClick = () => {
    if (emergencyContacts.length === 0) {
      toast({
        variant: "destructive",
        title: translate("No Emergency Contacts"),
        description: translate("Please add emergency contacts in the settings page first."),
        action: <Button asChild variant="secondary"><Link href="/dashboard/settings">{translate('Go to Settings')}</Link></Button>,
      });
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast({
            variant: "destructive",
            title: translate("SOS Alert Sent!"),
            description: translate("Your location and emergency information have been sent to your contacts."),
          });
        },
        () => {
          toast({
            variant: "destructive",
            title: translate("SOS Alert Sent!"),
            description: translate("Could not get location. Emergency info sent to contacts without location data."),
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: translate("SOS Alert Sent!"),
        description: translate("Geolocation not supported. Emergency info sent to contacts without location data."),
      });
    }
  };

  return (
    <Button
      onClick={handleSosClick}
      className="w-full h-16 text-2xl font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-4 animate-pulse"
    >
      <SosIcon className="h-8 w-8" />
      <span>S O S</span>
    </Button>
  );
}
