
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLogo } from '@/components/icons';
import { ArrowLeft } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/lib/language-provider';


function PatientRegistrationForm() {
  const router = useRouter();
  const { translate } = useLanguage();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/dashboard');
  };

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
              <CardTitle className="text-2xl font-headline">{translate('Patient Registration')}</CardTitle>
            </div>
            <CardDescription>{translate('Create your account to get started.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">{translate('Full Name')}</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{translate('Email Address')}</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{translate('Phone Number')}</Label>
                <Input id="phone" type="tel" placeholder="(123) 456-7890" required />
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


export default function PatientRegistrationPage() {
  return (
    <LanguageProvider>
      <PatientRegistrationForm />
    </LanguageProvider>
  )
}
