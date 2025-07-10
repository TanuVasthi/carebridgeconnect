
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AppLogo } from '@/components/icons';
import { ArrowLeft } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/lib/language-provider';


function CaregiverRegistrationForm() {
  const { translate } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {translate('Back to Home')}
          </Link>
        </Button>
        <Card>
          <CardHeader className="text-center">
             <div className="flex justify-center items-center gap-2 mb-2">
              <AppLogo className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-headline">{translate('Caregiver Registration')}</CardTitle>
            </div>
            <CardDescription>{translate('Join our network of professional caregivers.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{translate('Full Name')}</Label>
                <Input id="name" placeholder="Jane Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{translate('Email Address')}</Label>
                <Input id="email" type="email" placeholder="jane@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">{translate('Skills & Certifications')}</Label>
                <Input id="skills" placeholder="e.g., CPR Certified, Dementia Care" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="bio">{translate('Short Bio')}</Label>
                <Textarea id="bio" placeholder={translate("Briefly describe your experience and passion for caregiving.")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{translate('Password')}</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full mt-4">
                {translate('Create Account')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CaregiverRegistrationPage() {
  return (
    <LanguageProvider>
      <CaregiverRegistrationForm />
    </LanguageProvider>
  )
}
