import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BarChart2, Users, DollarSign, TrendingUp, CheckCircle2,XCircle  } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type SharedData } from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

type BreadcrumbItem = {
  title: string;
  href: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
];

export default function Dashboard() {
  const { stats, recentAppointments, availableDentists } = usePage<SharedData>().props;

  // Appointment status chart data
  const appointmentStatusData = {
    labels: ["Completed", "Confirmed", "Canceled"],
    datasets: [{
      data: [
        stats?.completedAppointments || 0,
        stats?.upcomingAppointments || 0,
        stats?.canceledAppointments || 0
      ],
      backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
      borderColor: "#ffffff",
      borderWidth: 2,
    }]
  };

  // Revenue trend data
  const revenueTrendData = {
    labels: stats?.revenueLabels || [],
    datasets: [{
      label: "Revenue",
      data: stats?.revenueData || [],
      borderColor: "#10B981",
      backgroundColor: "#10B98133",
      tension: 0.4
    }]
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Practice Dashboard</h1>
          <p className="text-muted-foreground">Your dental practice overview</p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Dentists"
            value={stats?.totalDentists || 0}
            icon={<Users className="h-6 w-6 text-primary" />}
            trend={`${stats?.newDentists || 0} new this month`}
          />
          <StatCard
            title="Active Patients"
            value={stats?.activePatients || 0}
            icon={<Users className="h-6 w-6 text-primary" />}
            trend={`${stats?.patientGrowth || 0}% growth`}
          />
          <StatCard
            title="Appointments"
            value={stats?.totalAppointments || 0}
            icon={<Calendar className="h-6 w-6 text-primary" />}
            trend={`${stats?.upcomingAppointments || 0} upcoming`}
          />
          <StatCard
            title="Revenue"
            value={`$${stats?.totalRevenue || 0}`}
            icon={<DollarSign className="h-6 w-6 text-primary" />}
            trend={`${stats?.revenueGrowth || 0}% increase`}
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Appointment Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Breakdown</CardTitle>
              <CardDescription>Status distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <Pie data={appointmentStatusData} className="h-[300px]" />
            </CardContent>
          </Card>

          {/* Revenue Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Line data={revenueTrendData} className="h-[300px]" />
            </CardContent>
          </Card>
        </div>

        {/* Dentist Availability Section */}
        <Card>
          <CardHeader>
            <CardTitle>Dentist Availability</CardTitle>
            <CardDescription>Today&apos;s available specialists</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="py-4">
            {availableDentists?.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {availableDentists.map((dentist: Dentist) => (
                  <DentistAvailabilityCard key={dentist.id} dentist={dentist} />
                ))}
              </div>
            ) : (
              <EmptyState message="No dentists available today" />
            )}
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Last 5 appointments</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="py-4">
            <ScrollArea className="h-[300px]">
              {recentAppointments?.length ? (
                <div className="space-y-4">
                  {recentAppointments.map((appointment: Appointment) => (
                    <AppointmentItem key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <EmptyState message="No recent appointments" />
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  icon, 
  trend 
}: { 
  title: string; 
  value: number | string; 
  icon: React.ReactNode; 
  trend: string; 
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">{value}</CardTitle>
          <CardDescription>{title}</CardDescription>
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> {trend}
        </p>
      </CardContent>
    </Card>
  );
}

// Dentist Availability Card
function DentistAvailabilityCard({ dentist }: { dentist: Dentist }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
      <Avatar className="h-12 w-12">
        <AvatarImage src={dentist.profile_picture || "/placeholder.svg"} />
        <AvatarFallback>{dentist.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-semibold">{dentist.name}</p>
        <p className="text-sm text-muted-foreground">{dentist.specialization}</p>
      </div>
      <Badge variant="success" className="gap-1">
        <CheckCircle2 className="h-4 w-4" />
        Available Today
      </Badge>
    </div>
  );
}

// Appointment Item Component
function AppointmentItem({ appointment }: { appointment: Appointment }) {
  const statusConfig = {
    confirmed: { color: "bg-yellow-500", icon: <Calendar className="h-4 w-4" /> },
    completed: { color: "bg-green-500", icon: <CheckCircle2 className="h-4 w-4" /> },
    canceled: { color: "bg-red-500", icon: <XCircle className="h-4 w-4" /> },
  };

    function cn(...classes: string[]): string {
        return classes.filter(Boolean).join(' ');
    }
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={appointment.dentist.profile_picture || "/placeholder.svg"} />
          <AvatarFallback>{appointment.dentist.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{appointment.dentist.name}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(appointment.start_time).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Badge 
        className={cn(
          "px-3 py-1",
          statusConfig[appointment.status]?.color || "bg-gray-500"
        )}
      >
        {statusConfig[appointment.status]?.icon}
        {appointment.status}
      </Badge>
    </div>
  );
}

// Empty State Component
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-6">
      <BarChart2 className="h-10 w-10 text-muted-foreground" />
      <p className="text-sm text-muted-foreground mt-2">{message}</p>
    </div>
  );
}