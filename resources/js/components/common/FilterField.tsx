import type { ReactNode } from 'react';

interface FilterFieldProps {
    label: string;
    children: ReactNode;
    className?: string;
}

export function FilterField({ label, children, className }: FilterFieldProps) {
    return (
        <div className={`flex flex-col gap-2 ${className ?? ''}`}>
            <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {label}
            </label>
            {children}
        </div>
    );
}
