'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, Phone, Mail, Award } from 'lucide-react';

type Caregiver = {
  id: string;
  name: string;
  avatarUrl: string;
  dataAiHint: string;
  skills: string[];
  experience: number;
  rating: number;
  contact: {
    phone: string;
    email: string;
  };
  bio: string;
};

export default function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
  return (
    <Dialog>
      <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={caregiver.avatarUrl} alt={caregiver.name} data-ai-hint={caregiver.dataAiHint} />
            <AvatarFallback>{caregiver.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 font-headline">{caregiver.name}</CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span>{caregiver.rating.toFixed(1)}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>{caregiver.experience} yrs exp.</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground text-center mb-4">{caregiver.bio.substring(0, 80)}...</p>
          <div className="flex flex-wrap justify-center gap-2">
            {caregiver.skills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <DialogTrigger asChild>
            <Button className="w-full">View Profile</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={caregiver.avatarUrl} alt={caregiver.name} data-ai-hint={caregiver.dataAiHint} />
              <AvatarFallback>{caregiver.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl font-headline">{caregiver.name}</DialogTitle>
              <div className="flex items-center gap-2 text-amber-500 mt-1">
                  <Star className="h-4 w-4 fill-current" />
                  <DialogDescription>
                    {caregiver.rating.toFixed(1)} Rating
                  </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-foreground">{caregiver.bio}</p>
          <div>
            <h4 className="font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {caregiver.skills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${caregiver.contact.phone}`} className="text-sm text-primary hover:underline">{caregiver.contact.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${caregiver.contact.email}`} className="text-sm text-primary hover:underline">{caregiver.contact.email}</a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
