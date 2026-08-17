import type { ReactNode } from 'react';

interface DetailFieldProps {
    label: string;
    value: ReactNode;
    className?: string;
}

export function DetailField({ label, value, className }: DetailFieldProps) {
    return (
        <div className={`flex flex-col gap-1 ${className ?? ''}`}>
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-foreground">{value}</span>
        </div>
    );
}
