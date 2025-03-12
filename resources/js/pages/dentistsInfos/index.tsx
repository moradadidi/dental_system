import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Calendar,
  CheckCircle2,
  XCircle,
  Award,
  Languages,
  MapPin,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem as BreadcrumbItemType } from "@/types";

type Dentist = {
  id: number;

    user_id: number;
    name: string;
    email: string;
    phone_number: string;
    profile_picture: string | null;
  specialization: string | null;
  credentials: string | null;
  bio: string | null;
  office_address: string | null;
  availableToday?: boolean;
  imageUrl?: string;
  experience?: number;
  languages?: string[];
};

const breadcrumbs: BreadcrumbItemType[] = [
  { title: "Dentists", href: "/dentists" },
];

export default function DentistsPage() {
  const { dentists = [] } = usePage().props as { dentists: Dentist[] };

  const specializations = [
    "General Dentist",
    "Orthodontist",
    "Periodontist",
    "Endodontist",
    "Oral Surgeon",
    "Pediatric Dentist",
    "Prosthodontist",
];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Our Dentists" />
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-6">
          {/* <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Our Dentists</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb> */}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Our Dental Specialists</h1>
          <p className="text-muted-foreground mt-2">
            Choose a dentist to book your appointment with
          </p>
        </div>

        <Tabs defaultValue="All Specialists" className="mb-8">
          <TabsList className="mb-4 flex flex-wrap h-auto">
            {specializations.map((spec) => (
              <TabsTrigger key={spec} value={spec} className="mb-1">
                {spec}
              </TabsTrigger>
            ))}
          </TabsList>

          {specializations.map((spec) => (
            <TabsContent key={spec} value={spec} className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dentists
                  .filter(
                    (dentist) =>
                      spec === "All Specialists" ||
                      dentist.specialization === spec
                  )
                  .map((dentist) => (
                    <DentistCard key={dentist.id} dentist={dentist} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}

function DentistCard({ dentist }: { dentist: Dentist }) {
  const isAvailableToday = dentist.availableToday !== false;
  console.log(dentist);
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={
            dentist.profile_picture ? `/storage/${dentist.profile_picture}` :
            `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
              dentist.name || "Dentist"
            )}`
          }
          alt={dentist.name || "Dentist"}
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant={isAvailableToday ? "default" : "outline"}
            className={cn(
              "font-medium",
              isAvailableToday ? "bg-green-500 hover:bg-green-600" : "text-muted-foreground"
            )}
          >
            {isAvailableToday ? (
              <>
                <CheckCircle2 className="h-3 w-3 mr-1" /> Available Today
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" /> No Availability Today
              </>
            )}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">
            {dentist.name || "Unnamed Dentist"}
          </CardTitle>
          <Badge variant="secondary">
            {dentist.specialization || "General"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm mb-4">
          {dentist.bio || "No bio available"}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {/* <div className="flex items-center">
            <Award className="h-4 w-4 text-primary mr-2" />
            <div>
              <p className="font-medium">Experience</p>
              <p className="text-muted-foreground">
                {dentist.experience || 0} years
              </p>
            </div>
          </div> */}
          {/* <div className="flex items-center">
            <Languages className="h-4 w-4 text-primary mr-2" />
            <div>
              <p className="font-medium">Languages</p>
              <p className="text-muted-foreground line-clamp-1">
                {dentist.languages?.join(", ") || "English"}
              </p>
            </div>
          </div> */}
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <div>
              <p className="font-medium">Office</p>
              <p className="text-muted-foreground">
                {dentist.office_address || "Not available"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 text-primary mr-2" />
            <div>
              <p className="font-medium">Credentials</p>
              <p className="text-muted-foreground">
                {dentist.credentials || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
          <Link href={`/appointments/book?dentistId=${dentist.id}`}>
            <Calendar className="mr-2 h-4 w-4" />
            Book Appointment
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
