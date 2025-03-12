import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dentists", href: "/dentists" },
  { title: "Edit Dentist", href: "" },
];

export default function EditDentist() {
  const { dentist } = usePage().props as {
    dentist: {
      id: number;
      name: string;
      email: string;
      phone_number: string;
      profile_picture: string | null;
    };
  };

  const { data, setData, post, errors, processing } = useForm({
    name: dentist.name,
    email: dentist.email,
    phone_number: dentist.phone_number,
    profile_picture: null as File | null,
    _method: "PATCH", // Required for Laravel to treat it as a PATCH request
  });

  const [preview, setPreview] = useState<string | null>(dentist.profile_picture);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);
    if (data.profile_picture) {
      formData.append("profile_picture", data.profile_picture);
    }
    formData.append("_method", "PATCH");

    console.log("Submitting FormData:", Array.from(formData.entries())); // Debugging output

    // Send request using POST (because FormData with PATCH isn't allowed)
    post(route("dentists.update", dentist.id), {
      data: formData,
      onSuccess: () => {
        toast.success("Dentist updated successfully!");
      },
      onError: () => {
        toast.error("Failed to update dentist. Please check your inputs.");
      },
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData("profile_picture", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Dentist" />
      <div className="p-4 w-1/2 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Edit Dentist</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter dentist name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              disabled={processing}
              autoFocus
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter dentist email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              disabled={processing}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              type="tel"
              placeholder="Enter dentist phone number"
              value={data.phone_number}
              onChange={(e) => setData("phone_number", e.target.value)}
              disabled={processing}
            />
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>
            )}
          </div>
          <div>
            <Label htmlFor="profile_picture">Profile Picture</Label>
            <Input
              id="profile_picture"
              type="file"
              onChange={handleFileChange}
              disabled={processing}
            />
            {errors.profile_picture && (
              <p className="mt-1 text-sm text-red-500">{errors.profile_picture}</p>
            )}
            {preview && (
              <img
                src={
                  preview.startsWith("data")
                    ? preview
                    : `/storage/${dentist.profile_picture}`
                }
                alt="Profile Preview"
                className="mt-2 h-32 w-32 object-cover rounded"
              />
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Link
              href="/dentists"
              className="rounded border border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-100"
            >
              Cancel
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </span>
              ) : (
                "Update Dentist"
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
