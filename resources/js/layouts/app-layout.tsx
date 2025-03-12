import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import AppHeaderLayout from '@/layouts/app/app-header-layout'; // Import the header layout
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner"
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';



interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs,  ...props }: AppLayoutProps) => {
    const { auth } = usePage<SharedData>().props;

    const Layout = auth.user?.role === 'patient' || auth.user?.role === 'dentist' ? AppHeaderLayout : AppLayoutTemplate;

    return (
        <Layout breadcrumbs={breadcrumbs} {...props}>
            <Toaster />
            {children}
        </Layout>
    );
};
