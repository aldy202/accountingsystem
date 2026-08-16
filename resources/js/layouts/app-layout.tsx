import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    title,
    icon,
    eyebrow,
    eyebrowIcon,
    actions,
    children,
}: AppLayoutProps) {
    return (
        <AppLayoutTemplate
            breadcrumbs={breadcrumbs}
            title={title}
            icon={icon}
            eyebrow={eyebrow}
            eyebrowIcon={eyebrowIcon}
            actions={actions}
        >
            {children}
        </AppLayoutTemplate>
    );
}
