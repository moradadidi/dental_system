import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import SettingsLayout from "@/layouts/settings/layout";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { type SharedData } from "@/types";

export default function CreateSchedule() {
  const { dentist } = usePage<SharedData>().props;

  // List of days for selection
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Initialize the form; ensure days_of_week is an array.
  const { data, setData, post, errors, processing } = useForm({
    dentist_id: dentist?.id || "",
    days_of_week: Array.isArray(dentist?.days_of_week) ? dentist.days_of_week : [],
    start_time: "",
    end_time: "",
    break_start: "",
    break_end: "",
  });

  function handleDayChange(day: string) {
    setData("days_of_week", data.days_of_week.includes(day)
      ? data.days_of_week.filter((d: string) => d !== day)
      : [...data.days_of_week, day]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post(route("schedules.store"), {
      onSuccess: () => toast.success("Schedule updated successfully!"),
      onError: () => toast.error("Failed to update the schedule. Please check your inputs."),
    });
  }

  return (
    <AppLayout breadcrumbs={[{ title: "Schedule", href: "/schedules/create" }]}>
      <Head title="Set Your Schedule" />
      <SettingsLayout>
        <div className="p-6 mx-auto max-w-2xl">
          <h1 className="mb-4 text-2xl font-bold">Set Your Schedule</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Days of the Week Selection using a Popover with Checkboxes */}
            <div>
              <Label htmlFor="days_of_week">Days of the Week</Label>
              <Popover>
                <PopoverTrigger className="w-full px-4 py-2 border rounded-md text-left">
                  {data.days_of_week.length > 0 ? data.days_of_week.join(", ") : "Select Days"}
                </PopoverTrigger>
                <PopoverContent className="w-full p-3 rounded-md shadow-md">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={day}
                        checked={data.days_of_week.includes(day)}
                        onCheckedChange={() => handleDayChange(day)}
                      />
                      <Label htmlFor={day} className="cursor-pointer">
                        {day}
                      </Label>
                    </div>
                  ))}
                  {data.days_of_week.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full flex items-center justify-center"
                      onClick={() => setData("days_of_week", [])}
                    >
                      <X className="w-4 h-4 mr-2" /> Clear Selection
                    </Button>
                  )}
                </PopoverContent>
              </Popover>
              {errors.days_of_week && (
                <p className="mt-1 text-sm text-red-500">{errors.days_of_week}</p>
              )}
            </div>

            {/* Start Time */}
            <div>
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                value={data.start_time}
                onChange={(e) => setData("start_time", e.target.value)}
                disabled={processing}
              />
              {errors.start_time && (
                <p className="mt-1 text-sm text-red-500">{errors.start_time}</p>
              )}
            </div>

            {/* End Time */}
            <div>
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="time"
                value={data.end_time}
                onChange={(e) => setData("end_time", e.target.value)}
                disabled={processing}
              />
              {errors.end_time && (
                <p className="mt-1 text-sm text-red-500">{errors.end_time}</p>
              )}
            </div>

            {/* Break Start */}
            <div>
              <Label htmlFor="break_start">Break Start</Label>
              <Input
                id="break_start"
                type="time"
                value={data.break_start}
                onChange={(e) => setData("break_start", e.target.value)}
                disabled={processing}
              />
              {errors.break_start && (
                <p className="mt-1 text-sm text-red-500">{errors.break_start}</p>
              )}
            </div>

            {/* Break End */}
            <div>
              <Label htmlFor="break_end">Break End</Label>
              <Input
                id="break_end"
                type="time"
                value={data.break_end}
                onChange={(e) => setData("break_end", e.target.value)}
                disabled={processing}
              />
              {errors.break_end && (
                <p className="mt-1 text-sm text-red-500">{errors.break_end}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                  </span>
                ) : (
                  "Save Schedule"
                )}
              </Button>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
