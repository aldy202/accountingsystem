import type { ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    optional?: boolean;
    children: ReactNode;
    className?: string;
}

export function FormField({ label, optional, children, className }: FormFieldProps) {
    return (
        <div className={`flex flex-col gap-2 ${className ?? ''}`}>
            <label className="text-sm font-semibold text-foreground">
                {label}
                {optional && (
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                        (opsional)
                    </span>
                )}
            </label>
            {children}
        </div>
    );
}
