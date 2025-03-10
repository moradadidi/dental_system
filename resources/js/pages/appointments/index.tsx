import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Spinner icon

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Appointments",
    href: "/appointments",
  },
];

export default function Index() {
  // Extract initial appointments from Inertia page props
  const { appointments: initialAppointments = [] } = usePage().props as {
    appointments: {
      id: number;
      patient: { name: string; email: string };
      dentist: { name: string; email: string };
      start_time: string;
      end_time: string;
      status: string;
    }[];
  };

  // State to store appointments and track deletion
  const [appointments, setAppointments] = useState(initialAppointments);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setAppointments(initialAppointments);
  }, [initialAppointments]);

  // Improved delete handler with loading state
  const handleDelete = (id: number) => {
    setDeletingId(id);
    Inertia.delete(route("appointments.destroy", id), {
      onSuccess: () => {
        toast.success("Appointment deleted successfully!");
        setDeletingId(null);
        Inertia.reload();
      },
      onError: () => {
        toast.error("Failed to delete appointment.");
        setDeletingId(null);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appointments" />
      <div className="p-4">
        {/* Add Appointment Button */}
        <div className="mb-4 flex justify-end">
          <Link
            href="/appointments/create"
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Add Appointment
          </Link>
        </div>

        <Table>
          <TableCaption>Appointments List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Dentist</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.patient.email || "N/A"}</TableCell>
                  <TableCell>{appointment.dentist.email || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(appointment.start_time).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(appointment.end_time).toLocaleString()}
                  </TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link
                        href={`/appointments/${appointment.id}/edit`}
                        className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                      >
                        Edit
                      </Link>

                      {/* Delete Button with Enhanced Alert Dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                            aria-label={`Delete appointment ${appointment.id}`}
                          >
                            Delete
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Appointment #{appointment.id}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the appointment for{" "}
                              <strong>{appointment.patient.email}</strong>? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex justify-end gap-2 mt-4">
                            <AlertDialogCancel asChild>
                              <button className="rounded bg-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-400">
                                Cancel
                              </button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <button
                                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 flex items-center gap-2"
                                onClick={() => handleDelete(appointment.id)}
                                disabled={deletingId === appointment.id}
                              >
                                {deletingId === appointment.id && (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                {deletingId === appointment.id ? "Deleting..." : "Yes, Delete"}
                              </button>
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
