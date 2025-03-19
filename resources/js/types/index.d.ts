import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// types.ts
type Dentist = {
    id: number;
    user_id: number;
    name: string;
    email: string;
    profile_picture: string | null;
    specialization: string | null;
    availableToday?: boolean;
  };
  
  type Appointment = {
    id: number;
    dentist: Dentist;
    start_time: string;
    end_time: string;
    status: 'upcoming' | 'completed' | 'canceled';
    fee: number;
  };
  
  type Stats = {
    totalDentists: number;
    activePatients: number;
    totalAppointments: number;
    upcomingAppointments: number;
    completedAppointments: number;
    canceledAppointments: number;
    totalRevenue: number;
    revenueGrowth: number;
    patientGrowth: number;
    newDentists: number;
    revenueLabels: string[];
    revenueData: number[];
  };