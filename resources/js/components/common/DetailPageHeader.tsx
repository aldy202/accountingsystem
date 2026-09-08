import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface BreadcrumbEntry {
    label: string;
    href?: string;
}

interface DetailPageHeaderProps {
    breadcrumbs: BreadcrumbEntry[];
    title: ReactNode;
    subtitle?: string;
    actions?: ReactNode;
}

export function DetailPageHeader({
    breadcrumbs,
    title,
    subtitle,
    actions,
}: DetailPageHeaderProps) {
    return (
        <div className="flex flex-col gap-3 px-6 pt-6">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
                {breadcrumbs.map((crumb, index) => (
                    <span key={crumb.label} className="flex items-center gap-1.5">
                        {index > 0 && <ChevronRight className="size-3.5" />}
                        {crumb.href ? (
                            <Link href={crumb.href} className="hover:text-foreground">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span>{crumb.label}</span>
                        )}
                    </span>
                ))}
            </nav>

            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    )}
                </div>

                {actions}
            </div>
        </div>
    );
}
