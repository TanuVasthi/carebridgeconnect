"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SosIcon } from "@/components/icons";

export default function EmergencyAlertButton() {
  const { toast } = useToast();

  const handleSosClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast({
            variant: "destructive",
            title: "SOS Alert Sent!",
            description: `Your location (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) and emergency information have been sent to your contacts.`,
          });
        },
        () => {
          toast({
            variant: "destructive",
            title: "SOS Alert Sent!",
            description: "Could not get location. Emergency info sent without location data.",
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "SOS Alert Sent!",
        description: "Geolocation is not supported by this browser. Emergency info sent without location data.",
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
