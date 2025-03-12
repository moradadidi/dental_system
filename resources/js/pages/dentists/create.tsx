import React from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dentists", href: "/dentists" },
  { title: "Create Dentist", href: "/dentists/create" },
];

export default function CreateDentist() {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    profile_picture: null as File | null,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(data);

    // Submit the form data to the dentist store route.
    post(route("dentists.store"), {
      onSuccess: () => {
        toast.success("Dentist created successfully!");
      },
      onError: () => {
        toast.error("Failed to create dentist. Please check your inputs.");
      },
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setData("profile_picture", e.target.files[0]);
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Dentist" />
      <div className="p-4 w-1/2 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Create Dentist</h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Name Field */}
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
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Email Field */}
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
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter dentist password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              disabled={processing}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Phone Number Field */}
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

          {/* Profile Picture Field */}
          <div>
    <Label htmlFor="profile_picture">Profile Picture</Label>
    <Input
      id="profile_picture"
      type="file"
      onChange={(e) => {
        if (e.target.files) {
          setData("profile_picture", e.target.files[0]);
        }
      }}
      disabled={processing}
    />
    {errors.profile_picture && (
      <p className="mt-1 text-sm text-red-500">{errors.profile_picture}</p>
    )}
  </div>

          {/* Action Buttons */}
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
                  Creating...
                </span>
              ) : (
                "Create Dentist"
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
