import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage, Link } from "@inertiajs/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { type SharedData } from "@/types";
import { Calendar, Clock, CheckCircle2, XCircle, MapPin, FileText, User, Award, BookOpen } from "lucide-react";

type Appointment = {
  id: number;
  dentist: { 
    id: number; 
    name: string; 
    email: string; 
    profile_picture: string | null;
  };
  dentist_info: {
    bio: string;
    credentials: string;
    specialization: string;
    office_address: string;
  };
  start_time: string;
  end_time: string;
  notes: string;
  status: string;
};

export default function MyAppointments() {
  const { appointments } = usePage<SharedData>().props;
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
console.log(appointments);
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          text: "Upcoming",
          variant: "default",
          icon: <Calendar className="h-3 w-3 mr-1" />
        };
      case "completed":
        return {
          text: "Completed",
          variant: "success",
          icon: <CheckCircle2 className="h-3 w-3 mr-1" />
        };
      case "canceled":
        return {
          text: "Canceled",
          variant: "destructive",
          icon: <XCircle className="h-3 w-3 mr-1" />
        };
      default:
        return {
          text: "Unknown",
          variant: "secondary",
          icon: null
        };
    }
  };

  return (
    <AppLayout>
      <Head title="My Appointments" />
      <div className="container mx-auto p-4 md:p-8">
        <Card className="border-none shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">My Appointments</CardTitle>
                <CardDescription>
                  View and manage your dental appointments
                </CardDescription>
              </div>
            </div>
            <Separator className="bg-muted" />
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <Alert className="border-0 shadow-sm">
                <Calendar className="h-6 w-6 text-muted-foreground" />
                <AlertTitle>No Appointments Found</AlertTitle>
                <AlertDescription>
                  You don't have any appointments scheduled yet. 
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/dentists">Book an appointment now</Link>
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Dentist</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment: Appointment) => {
                    const statusConfig = getStatusConfig(appointment.status);
                    return (
                      <TableRow 
                        key={appointment.id} 
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage 
                                src={appointment.dentist.profile_picture ? `/storage/${appointment.dentist.profile_picture}` : "/placeholder.svg"} 
                                alt={appointment.dentist.name}
                              />
                              <AvatarFallback>
                                {appointment.dentist.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{appointment.dentist.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {appointment.dentist.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" /> 
                              {format(new Date(appointment.start_time), "PPP")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(appointment.start_time), "p")} - 
                              {format(new Date(appointment.end_time), "p")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={statusConfig.variant}
                            className="gap-1"
                          >
                            {statusConfig.icon}
                            {statusConfig.text}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[450px]">
                              <DialogHeader>
                                <DialogTitle>Appointment Details</DialogTitle>
                              </DialogHeader>
                              <ScrollArea className="h-[600px]">
                                <div className="space-y-6 p-4">
                                  {/* Dentist Information */}
                                  <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2">
                                      <User className="h-5 w-5" /> Dentist Profile
                                    </h3>
                                    <div className="flex items-start gap-4">
                                      <Avatar className="h-24 w-24">
                                        <AvatarImage 
                                src={ `/storage/${appointment.dentist.profile_picture }`|| "/placeholder.svg"} 
                                alt={appointment.dentist.name}
                                        />
                                        <AvatarFallback>
                                          {appointment.dentist.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="space-y-2">
                                        <p className="font-bold text-lg">{appointment.dentist.name}</p>
                                        <p className="text-sm flex items-center gap-1">
                                          <Award className="h-4 w-4" />
                                          {appointment.dentist_info.specialization}
                                        </p>
                                        <p className="text-sm flex items-center gap-1">
                                          <BookOpen className="h-4 w-4" />
                                          {appointment.dentist_info.credentials}
                                        </p>
                                        <p className="text-sm flex items-center gap-1">
                                          <MapPin className="h-4 w-4" />
                                          {appointment.dentist_info.office_address}
                                        </p>
                                      </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <p className="text-sm text-muted-foreground">
                                      {appointment.dentist_info.bio || "No bio available"}
                                    </p>
                                  </div>

                                  {/* Appointment Timing */}
                                  <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                      <Clock className="h-5 w-5" /> Schedule
                                    </h3>
                                    <div className="grid gap-1">
                                      <p className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {format(new Date(appointment.start_time), "PPP")}
                                      </p>
                                      <p className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {format(new Date(appointment.start_time), "p")} - 
                                        {format(new Date(appointment.end_time), "p")}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Notes */}
                                  <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                      <FileText className="h-5 w-5" /> Notes
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {appointment.notes || "No additional notes provided"}
                                    </p>
                                  </div>

                                  {/* Status */}
                                  <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                      <CheckCircle2 className="h-5 w-5" /> Status
                                    </h3>
                                    <Badge 
                                      variant={statusConfig.variant}
                                      className="gap-1 px-3 py-2"
                                    >
                                      {statusConfig.icon}
                                      {statusConfig.text}
                                    </Badge>
                                  </div>
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}