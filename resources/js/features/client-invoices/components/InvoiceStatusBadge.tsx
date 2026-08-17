import { Check, AlertCircle } from 'lucide-react';
import type { InvoiceStatus } from '../types/client-invoice.types';

const statusConfig: Record<InvoiceStatus,
    { label: string; className: string; icon: typeof Check }
> = {
    paid: {
        label: 'PAID',
        className: 'bg-[#4EDEA3]/15 text-[#189267]',
        icon: Check,
    },
    unpaid: {
        label: 'UNPAID',
        className: 'bg-[#FC79BD]/15 text-[#D6317C]',
        icon: AlertCircle,
    },
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${config.className}`}
        >
            <Icon className="size-3" />
            {config.label}
        </span>
    );
}
