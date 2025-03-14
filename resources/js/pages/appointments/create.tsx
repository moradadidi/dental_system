import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Calendar, Clock, UserCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { type SharedData } from "@/types";

type Dentist = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_picture: string | null;
  specialization?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Appointments", href: "/appointments" },
  { title: "Create Appointment", href: "/appointments/create" },
];

export default function Create() {
  const { auth, dentists, dentistId } = usePage<SharedData>().props;
  const [showConfirm, setShowConfirm] = useState(false);

  const { data, setData, post, errors, processing } = useForm({
    patient_id: auth.user.id,
    dentist_id: dentistId ? dentistId.toString() : (dentists.length > 0 ? dentists[0].id.toString() : ""),
    start_time: "",
    end_time: "",
    notes: "",
  });

  const currentDateTime = new Date();

  function handleBookClick(e: React.FormEvent) {
    e.preventDefault();

    if (!data.dentist_id || !data.start_time || !data.end_time) {
      // toast.error("Please fill in all required fields.", {
      //   icon: <Clock className="text-red-500" />,
      // });
      return;
    }

    if (data.start_time >= data.end_time) {
      toast.error("End time must be after start time", {
        icon: <Clock className="text-red-500" />,
      });
      return;
    }

    setShowConfirm(true);
  }

  function confirmAppointment() {
    post(route("appointments.store"), {
      onSuccess: () => {
        toast.success("Appointment created successfully!", {
          icon: <UserCheck className="text-green-500" />,
        });
      },
      onError: () => {
        toast.error("Failed to create appointment. Please check your inputs.", {
          icon: <UserCheck className="text-red-500" />,
        });
      },
      onFinish: () => {
        setShowConfirm(false);
      },
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Appointment" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-background border shadow-sm rounded-lg">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-2xl font-bold">Book an Appointment</CardTitle>
                  <CardDescription>
                    Schedule your dental appointment with our specialists
                  </CardDescription>
                </div>
              </div>
              <Separator className="bg-muted" />
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookClick} className="space-y-6">
                {/* Dentist Selection */}
                <div className="space-y-2">
                  <Label htmlFor="dentist_id">Select Dentist</Label>
                  <Select
                    value={data.dentist_id}
                    onValueChange={(value) => setData("dentist_id", value)}
                    disabled={processing}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a dentist" />
                    </SelectTrigger>
                    <SelectContent>
                      {dentists.map((dentist: Dentist) => (
                        <SelectItem key={dentist.id} value={dentist.id.toString()}>
                          <div className="flex items-center gap-3">
                            {dentist.profile_picture && (
                              <img
                                src={`/storage/${dentist.profile_picture}`}
                                alt={dentist.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <p>{dentist.name}</p>
                              <p className="text-xs text-muted-foreground">{dentist.email}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.dentist_id && (
                    <p className="text-sm text-red-500">{errors.dentist_id}</p>
                  )}
                </div>
                {/* Start Date + Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !data.start_time && "text-muted-foreground"
                            )}
                            disabled={processing}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {data.start_time
                              ? format(new Date(data.start_time), "PPP")
                              : <span>Pick a date</span>}
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <DatePicker
                          mode="single"
                          selected={data.start_time ? new Date(data.start_time) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              setData("start_time", date.toISOString().slice(0, 16));
                            }
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.start_time && (
                      <p className="text-sm text-red-500">{errors.start_time}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start_time">Start Time</Label>
                    <Input
                      type="time"
                      value={data.start_time?.split("T")[1] || ""}
                      onChange={(e) => {
                        const time = e.target.value;
                        const date =
                          data.start_time?.split("T")[0] ||
                          new Date().toISOString().split("T")[0];
                        setData("start_time", `${date}T${time}`);
                      }}
                      disabled={processing}
                      className="w-full"
                    />
                  </div>
                  {/* End Date + Time */}
                  <div className="space-y-2">
                    <Label htmlFor="end_time">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !data.end_time && "text-muted-foreground"
                            )}
                            disabled={processing}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {data.end_time
                              ? format(new Date(data.end_time), "PPP")
                              : <span>Pick a date</span>}
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <DatePicker
                          mode="single"
                          selected={data.end_time ? new Date(data.end_time) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              setData("end_time", date.toISOString().slice(0, 16));
                            }
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.end_time && (
                      <p className="text-sm text-red-500">{errors.end_time}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_time">End Time</Label>
                    <Input
                      type="time"
                      value={data.end_time?.split("T")[1] || ""}
                      onChange={(e) => {
                        const time = e.target.value;
                        const date =
                          data.end_time?.split("T")[0] ||
                          new Date().toISOString().split("T")[0];
                        setData("end_time", `${date}T${time}`);
                      }}
                      disabled={processing}
                      className="w-full"
                    />
                  </div>
                </div>
                {/* Notes Field */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    placeholder="Enter any special requests or concerns..."
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                    disabled={processing}
                    className="min-h-[100px]"
                  />
                  {errors.notes && (
                    <p className="text-sm text-red-500">{errors.notes}</p>
                  )}
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-end">
                  <Link
                    href="/appointments"
                    className="flex-1 md:flex-none w-full md:w-auto"
                  >
                    <Button variant="outline" className="w-full" disabled={processing}>
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 md:flex-none w-full md:w-auto"
                    disabled={processing}
                  >
                    {processing ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </span>
                    ) : (
                      "Book Appointment"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Please review your appointment details before confirming.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 mt-4">
            <p>
              <strong>Dentist:</strong>{" "}
              {dentists.find((d) => d.id.toString() === data.dentist_id)?.name}
            </p>
            <p>
              <strong>Specialization:</strong>{" "}
              {dentists.find((d) => d.id.toString() === data.dentist_id)?.specialization || "General"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {data.start_time ? format(new Date(data.start_time), "PPP") : "N/A"}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {data.start_time ? format(new Date(data.start_time), "HH:mm") : "N/A"}
            </p>
            <p>
              <strong>Notes:</strong> {data.notes || "No additional notes"}
            </p>
          </div>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Final creation step
                post(route("appointments.store"), {
                  onSuccess: () => {
                    toast.success("Appointment created successfully!", {
                      icon: <UserCheck className="text-green-500" />,
                    });
                  },
                  onError: () => {
                    toast.error("Failed to create appointment. Please check your inputs.", {
                      icon: <UserCheck className="text-red-500" />,
                    });
                  },
                  onFinish: () => {
                    setShowConfirm(false);
                  },
                });
              }}
              disabled={processing}
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Confirming...
                </span>
              ) : (
                "Confirm Appointment"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}