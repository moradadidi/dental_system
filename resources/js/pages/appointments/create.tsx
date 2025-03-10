import React from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Appointments", href: "/appointments" },
  { title: "Create Appointment", href: "/appointments/create" },
];

export default function Create() {
  const { data, setData, post, errors, processing } = useForm({
    patient_id: "",
    dentist_id: "",
    start_time: "",
    end_time: "",
    notes: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Ensure end_time is after start_time
    if (data.start_time && data.end_time && data.start_time >= data.end_time) {
      toast.error("End time must be after start time.");
      return;
    }

    post(route("appointments.store"), {
      onSuccess: () => {
        toast.success("Appointment created successfully!");
      },
      onError: () => {
        toast.error("Failed to create appointment. Please check your inputs.");
      },
    });
  }

  // Set the minimum start time as the current local date/time (in ISO format without seconds)
  const currentDateTimeLocal = new Date().toISOString().slice(0, 16);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Appointment" />
      <div className="p-4 w-1/2 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Create Appointment</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient ID Field */}
          <div>
            <Label htmlFor="patient_id">Patient ID</Label>
            <Input
              id="patient_id"
              type="number"
              placeholder="Enter patient ID"
              value={data.patient_id}
              onChange={(e) => setData("patient_id", e.target.value)}
              disabled={processing}
              autoFocus
            />
            {errors.patient_id && (
              <p className="mt-1 text-sm text-red-500">{errors.patient_id}</p>
            )}
          </div>

          {/* Dentist ID Field */}
          <div>
            <Label htmlFor="dentist_id">Dentist ID</Label>
            <Input
              id="dentist_id"
              type="number"
              placeholder="Enter dentist ID"
              value={data.dentist_id}
              onChange={(e) => setData("dentist_id", e.target.value)}
              disabled={processing}
            />
            {errors.dentist_id && (
              <p className="mt-1 text-sm text-red-500">{errors.dentist_id}</p>
            )}
          </div>

          {/* Start Time Field */}
          <div>
            <Label htmlFor="start_time">Start Time</Label>
            <Input
              id="start_time"
              type="datetime-local"
              value={data.start_time}
              onChange={(e) => setData("start_time", e.target.value)}
              disabled={processing}
              min={currentDateTimeLocal}
            />
            {errors.start_time && (
              <p className="mt-1 text-sm text-red-500">{errors.start_time}</p>
            )}
          </div>

          {/* End Time Field */}
          <div>
            <Label htmlFor="end_time">End Time</Label>
            <Input
              id="end_time"
              type="datetime-local"
              value={data.end_time}
              onChange={(e) => setData("end_time", e.target.value)}
              disabled={processing}
              // End time cannot be before start time
              min={data.start_time || currentDateTimeLocal}
            />
            {errors.end_time && (
              <p className="mt-1 text-sm text-red-500">{errors.end_time}</p>
            )}
          </div>

          {/* Notes Field */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any notes..."
              value={data.notes}
              onChange={(e) => setData("notes", e.target.value)}
              disabled={processing}
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-500">{errors.notes}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Link
              href="/appointments"
              className="rounded border border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100"
            >
              Cancel
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Appointment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
