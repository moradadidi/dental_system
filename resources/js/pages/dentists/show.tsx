import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbItem } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Award, Calendar, FileText, Mail, MapPin } from 'lucide-react';

type Dentist = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    profile_picture: string | null;

        specialization: string;
        credentials: string;
        bio: string;
        office_address: string;
    availableToday: boolean;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dentists', href: '/ourDentists' },
    { title: 'Profile', href: '#' },
];

export default function DentistProfile() {
    const { dentist } = usePage<SharedData>().props;
    console.log(dentist.dentist[0]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${dentist.name} Profile`} />
            <div className="container mx-auto p-4 md:p-8">
                <Card className="border-none shadow-sm">
                    <CardHeader className="space-y-4">
                        {/* Profile Header */}
                        <div className="flex flex-col items-center gap-6 md:flex-row">
                            <Avatar className="border-primary h-32 w-32 border-2 md:h-40 md:w-40">
                                <AvatarImage src={dentist.profile_picture ? `/storage/${dentist.profile_picture}` : undefined} alt={dentist.name} />
                                <AvatarFallback className="bg-primary text-primary-foreground">{dentist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center md:text-left">
                                <CardTitle className="text-3xl font-bold">{dentist.name}</CardTitle>
                                <CardDescription className="text-primary text-xl">{dentist.dentist[0].specialization}</CardDescription>
                                <div className="mt-4 flex flex-col gap-4 md:flex-row">
                                    <Button asChild size="lg" className="w-full md:w-auto">
                                        <Link href={`/appointments/create?dentistId=${dentist.id}`}>
                                            <Calendar className="mr-2 h-5 w-5" />
                                            Book Appointment
                                        </Link>
                                    </Button>
                                    <Badge variant={dentist.availableToday ? 'success' : 'destructive'} className="mt-2 md:mt-0">
                                        {dentist.availableToday ? 'Available Today' : 'Not Available Today'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <Separator className="bg-muted" />
                    </CardHeader>

                    <CardContent className="space-y-8">
                        {/* Bio Section */}
                        <div>
                            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                                <FileText className="h-5 w-5" />
                                About Me
                            </h3>
                            <p className="text-muted-foreground">{dentist.dentist[0].bio}</p>
                        </div>

                        {/* Credentials Section */}
                        <div>
                            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                                <Award className="h-5 w-5" />
                                Credentials
                            </h3>
                            <p className="text-muted-foreground">{dentist.dentist[0].credentials}</p>
                        </div>

                        {/* Office Information */}
                        <div>
                            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                                <MapPin className="h-5 w-5" />
                                Office Location
                            </h3>
                            <p className="text-muted-foreground">{dentist.dentist[0].office_address}</p>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                                <Mail className="h-5 w-5" />
                                Contact
                            </h3>
                            <div className="space-y-2">
                                <p>Email: {dentist.email}</p>
                                <p>Phone: {dentist.phone_number}</p>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <Button asChild variant="outline">
                            <Link href="/dentists">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dentists
                            </Link>
                        </Button>
                        <Button asChild className="ml-4">
                            <Link href={`/appointments/create?dentistId=${dentist.id}`}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule Appointment
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
