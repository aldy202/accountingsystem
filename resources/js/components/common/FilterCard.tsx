import type { FormEventHandler, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface FilterCardProps {
    children: ReactNode;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    submitLabel?: string;
    isSubmitting?: boolean;
}

export function FilterCard({
    children,
    onSubmit,
    submitLabel = 'Terapkan Filter',
    isSubmitting = false,
}: FilterCardProps) {
    return (
        <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6"
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {children}
            </div>

            <div className="mt-5">
                <Button type="submit" disabled={isSubmitting}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
