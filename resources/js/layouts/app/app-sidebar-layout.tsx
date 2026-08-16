import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    title,
    icon,
    eyebrow,
    eyebrowIcon,
    actions,
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader
                    breadcrumbs={breadcrumbs}
                    title={title}
                    icon={icon}
                    eyebrow={eyebrow}
                    eyebrowIcon={eyebrowIcon}
                    actions={actions}
                />
                {children}
            </AppContent>
        </AppShell>
    );
}
