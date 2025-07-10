
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, PlusCircle, Pill, AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/language-provider";

type Medication = {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
};

const initialMedications: Medication[] = [
  { id: 'med1', name: 'Lisinopril', dosage: '10mg', time: '08:00', taken: true },
  { id: 'med2', name: 'Metformin', dosage: '500mg', time: '08:00', taken: true },
  { id: 'med3', name: 'Atorvastatin', dosage: '40mg', time: '20:00', taken: false },
  { id: 'med4', name: 'Aspirin', dosage: '81mg', time: '20:00', taken: false },
];

function MedicationItem({ medication, onToggle }: { medication: Medication, onToggle: (id: string) => void }) {
  const [isPast, setIsPast] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { translate } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkTime = () => {
        const now = new Date();
        const [hours, minutes] = medication.time.split(':');
        const medTime = new Date();
        medTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        setIsPast(now > medTime);
      };

      checkTime();
      const interval = setInterval(checkTime, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [medication.time]);

  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }

  return (
    <Card className={`transition-all ${medication.taken ? 'bg-green-50' : 'bg-white'}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Pill className={`h-5 w-5 ${medication.taken ? 'text-green-600' : 'text-primary'}`} />
          {medication.name}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatTime(medication.time)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{translate('Dosage')}: {medication.dosage}</p>
        {isClient && !medication.taken && isPast && (
          <div className="mt-2 flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span>{translate('Missed dose')}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2 w-full">
          <Checkbox id={`taken-${medication.id}`} checked={medication.taken} onCheckedChange={() => onToggle(medication.id)} />
          <Label htmlFor={`taken-${medication.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {translate('Mark as Taken')}
          </Label>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function MedicationSchedule() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [open, setOpen] = useState(false);
  const { translate } = useLanguage();

  const handleToggleTaken = (id: string) => {
    setMedications(meds => 
      meds.map(med => med.id === id ? { ...med, taken: !med.taken } : med)
    );
  };
  
  const handleAddMedication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMed: Medication = {
      id: `med${Date.now()}`,
      name: formData.get('name') as string,
      dosage: formData.get('dosage') as string,
      time: formData.get('time') as string,
      taken: false,
    };
    setMedications(meds => [...meds, newMed].sort((a, b) => a.time.localeCompare(b.time)));
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> {translate('Add Medication')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{translate('Add New Medication')}</DialogTitle>
              <DialogDescription>{translate('Fill in the details for the new medication reminder.')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddMedication}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">{translate('Name')}</Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dosage" className="text-right">{translate('Dosage')}</Label>
                  <Input id="dosage" name="dosage" placeholder="e.g., 10mg, 1 pill" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">{translate('Time')}</Label>
                  <Input id="time" name="time" type="time" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{translate('Save Reminder')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {medications.length > 0 ? (
          medications.map((med) => (
            <MedicationItem key={med.id} medication={med} onToggle={handleToggleTaken} />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center py-8">{translate('No medications scheduled for today.')}</p>
        )}
      </div>
    </div>
  );
}
