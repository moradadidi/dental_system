import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedData>().props;

    // Avoid running on the server
    if (typeof window === 'undefined') {
        return null;
    }
    const userRole = auth.user?.role || '';

    // Define the sidebar navigation
    const sidebarNavItems: NavItem[] = [
        { title: 'Profile', url: '/settings/profile', icon: null },
        { title: 'Appearance', url: '/settings/appearance', icon: null },
        { title: 'Details', url: '/dentistsInfos/create', icon: null },
        ...(userRole !== 'patient' ? [{ title: 'Schedules', url: '/schedules/create', icon: null }] : []),
    ];

    // Get the current path
    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                {/* Sidebar Navigation */}
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.url}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.url,
                                })}
                            >
                                <Link href={item.url} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                {/* Mobile Separator */}
                <Separator className="my-6 md:hidden" />

                {/* Main Content */}
                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
