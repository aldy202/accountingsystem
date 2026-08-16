import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    title,
    icon,
    children,
}: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} title={title} icon={icon}>
            {children}
        </AppLayoutTemplate>
    );
}
