import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, HeartHandshake, UserPlus } from 'lucide-react';
import { AppLogo } from '@/components/icons';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AppLogo className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline">CareBridge Connect</h1>
        </div>
        <nav>
          <Button asChild>
            <Link href="/dashboard">Enter App</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-foreground">
              Compassionate Care, Connected.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              CareBridge Connect is your reliable partner in coordinating and managing senior care, ensuring peace of mind for families and dignified support for loved ones.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <UserPlus className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="font-headline">Register as Patient</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join our community to find trusted caregivers and manage your health with ease.
                </CardDescription>
                <Button asChild className="mt-4 w-full">
                  <Link href="/register/patient">
                    Get Started <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <HeartHandshake className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="font-headline">Become a Caregiver</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Offer your skills and compassion to those in need. Join our network of professional caregivers.
                </CardDescription>
                <Button asChild className="mt-4 w-full">
                  <Link href="/register/caregiver">
                    Join Now <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <div className="md:col-span-2 lg:col-span-1">
              <Card className="bg-primary text-primary-foreground h-full flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <CardHeader>
                  <CardTitle className="font-headline">Explore the App</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    Already a member? Jump right back in to manage schedules, find resources, and connect.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" className="w-full text-primary-foreground bg-primary-foreground/20 hover:bg-primary-foreground/30">
                    <Link href="/dashboard">
                      Enter Dashboard <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CareBridge Connect. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
