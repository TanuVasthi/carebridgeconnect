import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MedicationSchedule from './components/medication-schedule';

export default function MedicationPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Medication Schedule</CardTitle>
          <CardDescription>
            Stay on top of your medication with customizable reminders. View your schedule by day or week.
          </CardDescription>
        </CardHeader>
      </Card>
      <MedicationSchedule />
    </div>
  );
}
