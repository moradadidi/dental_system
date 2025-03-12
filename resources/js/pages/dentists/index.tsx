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
      title: "Dentists",
      href: "/dentists",
    },
  ];
  
  export default function Index() {
    // Extract initial dentists from Inertia page props
    const { dentists: initialDentists = [] } = usePage().props as {
      dentists: {
        id: number;
        name: string;
        email: string;
        phone_number: string;
        profile_picture: string;
        avatar: string;
      }[];
    };
  
    // Use state for dentists and track deletion state
    const [dentists, setDentists] = useState(initialDentists);
    const [deletingId, setDeletingId] = useState<number | null>(null);
  
    useEffect(() => {
      setDentists(initialDentists);
    }, [initialDentists]);
  
    // Delete handler for a dentist
    const handleDelete = (id: number) => {
      setDeletingId(id);
      Inertia.delete(route("dentists.destroy", id), {
        onSuccess: () => {
          toast.success("Dentist deleted successfully!");
          setDeletingId(null);
          Inertia.reload();
        },
        onError: () => {
          toast.error("Failed to delete dentist.");
          setDeletingId(null);
        },
      });
    };
  
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dentists" />
        <div className="p-4">
          {/* Add Dentist Button */}
          <div className="mb-4 flex justify-end">
            <Link
              href="/dentists/create"
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Add Dentist
            </Link>
          </div>
  
          <Table>
            <TableCaption>Dentists List</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dentists.length > 0 ? (
                dentists.map((dentist) => (
                  <TableRow key={dentist.id}>
                    <TableCell>{dentist.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={`/storage/${dentist.profile_picture}`}
                          alt={dentist.name}
                          className="h-8 w-8 rounded-full"
                        />
                        {dentist.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={dentist.avatar}
                          alt={dentist.name}
                          className="h-8 w-8 rounded-full"
                        />
                        {dentist.email}
                      </div>
                    </TableCell>
                    {/* <TableCell>{dentist.email}</TableCell> */}
                    <TableCell>{dentist.phone_number}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link
                          href={`/dentists/${dentist.id}/edit`}
                          className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                        >
                          Edit
                        </Link>
  
                        {/* Delete Button with AlertDialog */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              type="button"
                              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                              aria-label={`Delete dentist ${dentist.id}`}
                            >
                              Delete
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Dentist #{dentist.id}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete <strong>{dentist.name}</strong>? This action cannot be undone.
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
                                  onClick={() => handleDelete(dentist.id)}
                                  disabled={deletingId === dentist.id}
                                >
                                  {deletingId === dentist.id && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  )}
                                  {deletingId === dentist.id ? "Deleting..." : "Yes, Delete"}
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
                  <TableCell colSpan={5} className="text-center">
                    No dentists found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </AppLayout>
    );
  }
  