import type { ApStatus } from '../types/accounts-payable.types';

const statusConfig: Record<ApStatus, { label: string; className: string }> = {
    finance_checked: {
        label: 'FINANCE CHECKED',
        className: 'bg-[#ECECF4] text-foreground/70',
    },
    unposted_ap: {
        label: 'TERJADWAL (UNPOSTED AP)',
        className: 'bg-[#F0528A] text-white',
    },
    rejected: {
        label: 'REJECTED',
        className: 'bg-destructive/10 text-destructive',
    },
    payment_approved: {
        label: 'PAYMENT APPROVED',
        className: 'bg-[#EDE4FB] text-primary',
    },
};

export function ApStatusBadge({ status }: { status: ApStatus }) {
    const config = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${config.className}`}
        >
            {config.label}
        </span>
    );
}
