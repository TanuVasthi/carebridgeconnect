
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MedicationSchedule from './components/medication-schedule';
import { useLanguage } from "@/lib/language-provider";

export default function MedicationPage() {
  const { translate } = useLanguage();
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{translate('Medication Schedule')}</CardTitle>
          <CardDescription>
            {translate('Stay on top of your medication with customizable reminders. View your schedule by day or week.')}
          </CardDescription>
        </CardHeader>
      </Card>
      <MedicationSchedule />
    </div>
  );
}
