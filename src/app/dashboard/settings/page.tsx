
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Languages, Contact, Trash2, PlusCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-provider';
import { useProfile } from '@/lib/profile-provider';

export default function SettingsPage() {
  const { toast } = useToast();
  const { language, setLanguage, translate, isTranslating } = useLanguage();
  const { emergencyContacts, addEmergencyContact, removeEmergencyContact } = useProfile();
  
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: translate("Profile Updated"),
      description: translate("Your profile information has been saved successfully."),
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  }

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContactName.trim() && newContactPhone.trim()) {
      addEmergencyContact({ id: Date.now().toString(), name: newContactName, phone: newContactPhone });
      setNewContactName('');
      setNewContactPhone('');
      toast({
        title: translate("Contact Added"),
        description: translate("The new emergency contact has been saved."),
      });
    }
  };

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
        <Card>
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

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Contact className="h-5 w-5 text-primary" />
              <CardTitle>{translate('Emergency Contacts')}</CardTitle>
            </div>
            <CardDescription>{translate('Add or remove emergency contacts.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeEmergencyContact(contact.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {emergencyContacts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-2">{translate("No contacts added yet.")}</p>
              )}
            </div>
            <form className="space-y-4 mt-4 pt-4 border-t" onSubmit={handleAddContact}>
              <div className="space-y-2">
                <Label htmlFor="new-contact-name">{translate('Contact Name')}</Label>
                <Input id="new-contact-name" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} placeholder={translate("e.g., Jane Doe")} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-contact-phone">{translate('Contact Phone')}</Label>
                <Input id="new-contact-phone" type="tel" value={newContactPhone} onChange={(e) => setNewContactPhone(e.target.value)} placeholder="e.g., (555) 123-4567" required />
              </div>
              <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                {translate('Add Contact')}
              </Button>
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
