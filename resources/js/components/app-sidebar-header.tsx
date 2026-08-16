import type { LucideIcon } from 'lucide-react';
import { Bell, LayoutGrid, Settings } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';


type Props = {
    breadcrumbs?: BreadcrumbItemType[];
    title?: string;
    icon?: LucideIcon;
    eyebrow?: string;
    eyebrowIcon?: LucideIcon;
    actions?: ReactNode;
};

export function AppSidebarHeader({
    breadcrumbs = [],
    title,
    icon: Icon = LayoutGrid,
    eyebrow,
    eyebrowIcon: EyebrowIcon,
    actions,
}: Props) {
    const { toggleSidebar } = useSidebar();
    const pageTitle =
        title ?? breadcrumbs[breadcrumbs.length - 1]?.title ?? 'Dashboard';

    return (
        <header className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-sidebar-border/30 bg-background px-6 py-3 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-primary transition-colors hover:bg-sidebar-accent/80"
                >
                    <Icon className="size-5" />
                </button>

                <div className="flex flex-col gap-0.5">
                    {eyebrow && (
                        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            {EyebrowIcon && <EyebrowIcon className="size-3.5" />}
                            <span>{eyebrow}</span>
                        </div>
                    )}
                    <h1 className="text-xl font-semibold text-foreground">
                        {pageTitle}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {actions}

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative size-9 rounded-full"
                    >
                        <Bell className="size-5 text-muted-foreground" />
                        <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-9 rounded-full">
                        <Settings className="size-5 text-muted-foreground" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
