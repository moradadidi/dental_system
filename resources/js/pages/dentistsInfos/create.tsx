import React from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import SettingsLayout from '@/layouts/settings/layout';
import { type SharedData } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile Details',
        href: '/dentistsInfos/create',
    },
];

export default function Create() {
    const { auth, dentist } = usePage<SharedData>().props;

    // List of predefined specializations
    const specializations = [
        "General Dentist",
        "Orthodontist",
        "Periodontist",
        "Endodontist",
        "Oral Surgeon",
        "Pediatric Dentist",
        "Prosthodontist",
    ];

    // Initialize the form with existing values if available
    const { data, setData, post, errors, processing } = useForm({
        user_id: auth.user.id,
        specialization: dentist?.specialization || "",
        credentials: dentist?.credentials || "",
        bio: dentist?.bio || "",
        office_address: dentist?.office_address || "",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Post data to the dentist store route
        post(route("dentistsInfos.store"), {
            onSuccess: () => {
                toast.success("Your information was updated successfully!");
            },
            onError: () => {
                toast.error("Failed to update your information. Please check your inputs.");
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Information" />
            <SettingsLayout>
                <div className="p-4 mx-auto max-w-2xl">
                    <h1 className="mb-4 text-2xl font-bold">Update Information</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Specialization Field (Select Dropdown) */}
                        <div>
                            <Label htmlFor="specialization">Specialization</Label>
                            <Select
                                onValueChange={(value) => setData("specialization", value)}
                                defaultValue={data.specialization}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select specialization" />
                                </SelectTrigger>
                                <SelectContent>
                                    {specializations.map((spec) => (
                                        <SelectItem key={spec} value={spec}>
                                            {spec}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.specialization && (
                                <p className="mt-1 text-sm text-red-500">{errors.specialization}</p>
                            )}
                        </div>

                        {/* Credentials Field */}
                        <div>
                            <Label htmlFor="credentials">Credentials</Label>
                            <Textarea
                                id="credentials"
                                placeholder="Enter credentials (e.g., DDS, DMD, Board Certified, etc.)"
                                value={data.credentials}
                                onChange={(e) => setData("credentials", e.target.value)}
                                disabled={processing}
                            />
                            {errors.credentials && (
                                <p className="mt-1 text-sm text-red-500">{errors.credentials}</p>
                            )}
                        </div>

                        {/* Bio Field */}
                        <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Enter your bio"
                                value={data.bio}
                                onChange={(e) => setData("bio", e.target.value)}
                                disabled={processing}
                            />
                            {errors.bio && (
                                <p className="mt-1 text-sm text-red-500">{errors.bio}</p>
                            )}
                        </div>

                        {/* Office Address Field */}
                        <div>
                            <Label htmlFor="office_address">Office Address</Label>
                            <Input
                                id="office_address"
                                type="text"
                                placeholder="Enter office address"
                                value={data.office_address}
                                onChange={(e) => setData("office_address", e.target.value)}
                                disabled={processing}
                            />
                            {errors.office_address && (
                                <p className="mt-1 text-sm text-red-500">{errors.office_address}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Updating...
                                    </span>
                                ) : (
                                    "Update Info"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
