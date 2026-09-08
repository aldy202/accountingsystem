import type { GeneralLedgerStatus } from '../types/general-ledger.types';

const statusConfig: Record<GeneralLedgerStatus, { label: string; className: string }> = {
    POSTED: {
        label: 'POSTED',
        className: 'bg-[#4EDEA3]/15 text-[#189267]',
    },
    UNPOSTED: {
        label: 'UNPOSTED',
        className: 'bg-[#ECECF4] text-foreground/70',
    },
    DRAFT: {
        label: 'DRAFT',
        className: 'bg-[#FDE68A]/40 text-[#92650B]',
    },
    VOID: {
        label: 'VOID',
        className: 'bg-destructive/10 text-destructive',
    },
};

export function LedgerStatusBadge({ status }: { status: GeneralLedgerStatus }) {
    const config = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${config.className}`}
        >
            {config.label}
        </span>
    );
}
