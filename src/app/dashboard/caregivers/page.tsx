import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CaregiverCard from './components/caregiver-card';

const caregivers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    skills: ['CPR Certified', 'Dementia Care', 'First Aid'],
    experience: 8,
    rating: 4.9,
    contact: {
      phone: '555-0101',
      email: 'sarah.j@example.com',
    },
    bio: 'Compassionate and experienced caregiver with 8 years of dedication to providing high-quality in-home care. Specialized in dementia and Alzheimer\'s care.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    skills: ['Medication Management', 'Mobility Assistance'],
    experience: 5,
    rating: 4.8,
    contact: {
      phone: '555-0102',
      email: 'michael.c@example.com',
    },
    bio: 'A friendly and reliable caregiver with 5 years of experience. I focus on creating a positive and supportive environment for my clients.'
  },
  {
    id: '3',
    name: 'Linda Garcia',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman smiling',
    skills: ['Post-operative Care', 'Nutrition Planning'],
    experience: 10,
    rating: 5.0,
    contact: {
      phone: '555-0103',
      email: 'linda.g@example.com',
    },
    bio: 'With over a decade of experience, I provide professional and empathetic care, specializing in post-operative recovery and nutritional support.'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man glasses',
    skills: ['Wound Care', 'Physical Therapy Support'],
    experience: 7,
    rating: 4.7,
    contact: {
      phone: '555-0104',
      email: 'david.r@example.com',
    },
    bio: 'Dedicated caregiver focused on helping clients regain independence. Experienced in supporting physical therapy routines and wound care.'
  },
];


export default function CaregiversPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Caregiver Directory</CardTitle>
          <CardDescription>Find the perfect caregiver to meet your needs. Browse profiles, skills, and ratings.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {caregivers.map((caregiver) => (
          <CaregiverCard key={caregiver.id} caregiver={caregiver} />
        ))}
      </div>
    </div>
  );
}
