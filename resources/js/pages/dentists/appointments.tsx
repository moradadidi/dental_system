import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage, router } from "@inertiajs/react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, X, Trash2, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { type BreadcrumbItem, type Appointment } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Appointments", href: "/dentist/appointments" },
];

export default function DentistAppointments() {
  const { appointments: initialAppointments } = usePage<{ 
    appointments: { data: Appointment[] };
  }>().props;
  
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments.data);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedStatusAppointment, setSelectedStatusAppointment] = useState<Appointment | null>(null);

  const handleStatusUpdate = (appointment: Appointment, newStatus: string) => {
    router.put(route("dentist.appointments.updateStatus", appointment.id), { status: newStatus }, {
      onSuccess: () => {
        setAppointments(prev => 
          prev.map(a => 
            a.id === appointment.id ? { ...a, status: newStatus } : a
          )
        );
        setSelectedStatusAppointment(null);
        toast.success(`Appointment ${newStatus} successfully`);
      },
      onError: () => {
        toast.error("Failed to update status");
        setSelectedStatusAppointment(null);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Appointments" />
      <div className="container mx-auto p-6">
        {/* Header */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Manage Appointments</CardTitle>
            <CardDescription>
              View and manage your scheduled appointments
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Appointments Table */}
        <Card>
          <CardContent className="p-6">
            {appointments.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No appointments found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment: Appointment) => (
                    <TableRow key={appointment.id}>
                      {/* Patient Info */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/storage/${appointment.patient?.profile_picture}`}
                              alt={appointment.patient?.name || "Patient"}
                            />
                            <AvatarFallback>
                              {appointment.patient?.name?.charAt(0).toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{appointment.patient?.name}</p>
                            <p className="text-xs text-muted-foreground">{appointment.patient?.email}</p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Date/Time */}
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

                      {/* Status with Popover */}
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Badge 
                              variant={
                                appointment.status === "canceled" ? "destructive" :
                                appointment.status === "completed" ? "secondary" :
                                "default"
                              }
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-2">
                            <div className="grid gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="justify-start font-normal"
                                onClick={() => handleStatusUpdate(appointment, "confirmed")}
                              >
                                <Check className="mr-2 h-4 w-4 text-green-500" /> 
                                Confirm
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="justify-start font-normal"
                                onClick={() => handleStatusUpdate(appointment, "completed")}
                              >
                                <Check className="mr-2 h-4 w-4 text-blue-500" /> 
                                Complete
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="justify-start font-normal text-red-500"
                                onClick={() => setSelectedStatusAppointment(appointment)}
                              >
                                <X className="mr-2 h-4 w-4" /> 
                                Cancel
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex gap-2 text-right ">
                          {/* Details Dialog */}
                          <Dialog>
                            <DialogTrigger asChild  >
                                <Button variant="outline" size="sm" className="text-left">
                                Details
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Appointment Details</DialogTitle>
                                <DialogDescription>
                                  <p><strong>Patient:</strong> {appointment.patient?.name}</p>
                                  <p><strong>Notes:</strong> {appointment.notes || "None"}</p>
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => setSelectedAppointment(appointment)}
                                >
                                  <Trash2 className="h-4 w-4" /> Cancel Appointment
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Cancel Confirmation Dialog */}
        <Dialog
          open={!!selectedAppointment}
          onOpenChange={(open) => !open && setSelectedAppointment(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Appointment</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel the appointment with 
                <strong> {selectedAppointment?.patient.name}</strong> on 
                {selectedAppointment?.start_time 
                  ? format(new Date(selectedAppointment.start_time), "PPP") 
                  : ""}
                ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                No, go back
              </Button>
              <Button variant="destructive" onClick={() => {
                if (selectedAppointment) {
                  handleStatusUpdate(selectedAppointment, "canceled");
                }
              }}>
                Yes, Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}