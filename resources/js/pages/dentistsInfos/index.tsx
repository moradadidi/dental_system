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
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  MapPin,
  FileText,
  User,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
  available_today?: boolean;
};

const breadcrumbs: BreadcrumbItemType[] = [
  { title: "Dentists", href: "/dentists" },
];

export default function DentistsPage() {
  const { dentists = [] } = usePage().props as { dentists: Dentist[] };
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("All Specialists");

  console.log(dentists)
  const specializations = [
    "All Specialists",
    "General Dentist",
    "Orthodontist",
    "Periodontist",
    "Endodontist",
    "Oral Surgeon",
    "Pediatric Dentist",
    "Prosthodontist",
  ];

  const filteredDentists = dentists.filter((dentist) => {
    const matchesSpecialization =
      activeTab === "All Specialists" || dentist.specialization === activeTab;
    const matchesSearch = dentist.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSpecialization && matchesSearch;
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Our Dentists" />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Dental Team</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search dentists..."
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Select
              defaultValue="All Specialists"
              onValueChange={(value) => setActiveTab(value)}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredDentists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <User className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">
              No dentists found matching your criteria
            </p>
            <Button variant="link" asChild className="mt-4">
              <Link href="/dentists">Clear Filters</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDentists.map((dentist) => (
              <DentistCard key={dentist.id} dentist={dentist} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function DentistCard({ dentist }: { dentist: Dentist }) {
  const isAvailableToday = dentist.available_today !== false;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <Avatar className="w-full h-full object-cover">
            <AvatarImage
              src={
                dentist.profile_picture
                  ? `/storage/${dentist.profile_picture}`
                  : `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
                      dentist.name || "Dentist"
                    )}`
              }
              alt={dentist.name || "Dentist"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <AvatarFallback className="bg-muted">
              <User className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>
        <Badge
          variant={isAvailableToday ? "success" : "destructive"}
          className={cn(
            "absolute top-4 right-4 px-3 py-1 font-medium",
            isAvailableToday ? "bg-emerald-500 hover:bg-emerald-600" : ""
          )}
        >
          {isAvailableToday ? (
            <>
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Available
            </>
          ) : (
            <>
              <XCircle className="h-3 w-3 mr-1" />
              Unavailable
            </>
          )}
        </Badge>
      </div>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">
              {dentist.name || "Unnamed Dentist"}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {dentist.specialization || "General Dentist"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
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
        <Separator className="bg-muted" />
        <p className="text-sm text-muted-foreground line-clamp-3">
          {dentist.bio || "No bio available"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={`/dentists/${dentist.id}`}>
            View Profile
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          className="flex-1 ml-4"
          disabled={!isAvailableToday}
        >
          <Link href={`/appointments/create?dentistId=${dentist.id}`}>
            <Calendar className="mr-2 h-4 w-4" />
            Book Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}