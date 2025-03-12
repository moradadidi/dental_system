import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage, Link } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dentists", href: "/dentists" },
  { title: "Dentist Info", href: "" },
];

type Dentist = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_picture: string | null;
  specialization?: string;
  credentials?: string;
  bio?: string;
};

type User = {
  id: number;
  // Other user fields if needed
};

export default function DentistInfo() {
  // Retrieve dentist and user data passed from the controller.
  const { dentist, user } = usePage().props as { 
    dentist: Dentist; 
    user: User;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dentist Info" />
      <div className="p-4 max-w-2xl mx-auto bg-white shadow rounded">
        <div className="flex items-center space-x-4">
          <img
            src={
              dentist.profile_picture
                ? `/storage/${dentist.profile_picture}`
                : "https://via.placeholder.com/150"
            }
            alt={dentist.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{dentist.name}</h1>
            <p className="text-gray-600">
              {dentist.specialization || "General Dentist"}
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <p className="font-semibold">Email:</p>
            <p>{dentist.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>{dentist.phone_number}</p>
          </div>
          {dentist.credentials && (
            <div>
              <p className="font-semibold">Credentials:</p>
              <p>{dentist.credentials}</p>
            </div>
          )}
          {dentist.bio && (
            <div>
              <p className="font-semibold">About:</p>
              <p>{dentist.bio}</p>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            href={route("dentists.schedule", dentist.id)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            View Schedule
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
