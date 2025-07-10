
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Languages } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';

export default function SettingsPage() {
  const { toast } = useToast();
  const { language, setLanguage, translate, isTranslating } = useLanguage();

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: translate("Profile Updated"),
      description: translate("Your profile information has been saved successfully."),
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language Changed",
      description: `App language has been set to ${value}.`,
    });
  }

  return (
    <div className={`space-y-8 ${isTranslating ? 'opacity-50 pointer-events-none' : ''}`}>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{translate('Settings')}</CardTitle>
          <CardDescription>{translate('Manage your account settings, profile, and preferences.')}</CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>{translate('Profile')}</CardTitle>
            </div>
            <CardDescription>{translate('Update your personal information.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleProfileSave}>
              <div className="space-y-2">
                <Label htmlFor="name">{translate('Full Name')}</Label>
                <Input id="name" defaultValue={translate("User Name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{translate('Email Address')}</Label>
                <Input id="email" type="email" defaultValue="user@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{translate('Phone Number')}</Label>
                <Input id="phone" type="tel" defaultValue="(123) 456-7890" />
              </div>
              <Button type="submit">{translate('Save Changes')}</Button>
            </form>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              <CardTitle>{translate('Language')}</CardTitle>
            </div>
            <CardDescription>{translate('Choose your preferred language for the app.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="language-select">{translate('Select Language')}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language-select">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                  <SelectItem value="kn">Kannada</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                  <SelectItem value="ml">Malayalam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
