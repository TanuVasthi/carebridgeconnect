
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Footprints, Home, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/language-provider";

const healthTipsData = [
  {
    id: "tip1",
    icon: Home,
    title: "Make Your Home Safer",
    content: [
      "Remove clutter, small furniture, pet bowls, and electrical cords from walkways.",
      "Use non-slip mats in the bathtub and on shower floors. Consider installing grab bars inside and outside the tub or shower and next to the toilet.",
      "Ensure your home has lots of light by adding more or brighter light bulbs. Turn on lights before you enter a room.",
      "Keep items you use often within easy reach to avoid using a step stool."
    ]
  },
  {
    id: "tip2",
    icon: Footprints,
    title: "Stay Active and Strong",
    content: [
      "Engage in regular physical activity. Activities that improve balance and leg strength, such as Tai Chi, are particularly good.",
      "Talk to your doctor or a physical therapist about the best type of exercise program for you.",
      "Wear sturdy, well-fitting shoes with non-slip soles. Avoid walking in socks or slippers with smooth soles."
    ]
  },
  {
    id: "tip3",
    icon: ShieldCheck,
    title: "Review Your Health",
    content: [
      "Have your doctor or pharmacist review all your medicines—both prescription and over-the-counter—to identify any that may cause side effects like dizziness or drowsiness.",
      "Get your eyes checked at least once a year and update your eyeglasses as needed.",
      "Talk to your doctor about any health conditions that could increase your risk of falling, such as vision problems, heart disease, or issues with balance."
    ]
  },
];

export default function HealthTipsPage() {
  const { translate } = useLanguage();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{translate('Health & Wellness Tips')}</CardTitle>
          <CardDescription>
            {translate('Simple and effective tips for a healthier, safer life. This section focuses on fall prevention for seniors.')}
          </CardDescription>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="w-full" defaultValue="tip1">
        {healthTipsData.map((tip) => (
          <AccordionItem key={tip.id} value={tip.id}>
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <div className="flex items-center gap-3">
                <tip.icon className="h-6 w-6 text-primary" />
                <span>{translate(tip.title)}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-2 pl-6 text-base text-muted-foreground">
                {tip.content.map((point, index) => (
                  <li key={index}>{translate(point)}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
