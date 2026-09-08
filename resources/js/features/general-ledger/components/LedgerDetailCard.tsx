import { DetailField } from '@/components/common/DetailField';
import { formatDate } from '@/lib/format';
import type { GeneralLedgerDetail } from '../types/general-ledger-detail.types';

interface LedgerDetailCardProps {
    ledger: GeneralLedgerDetail;
}

export function LedgerDetailCard({ ledger }: LedgerDetailCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-5 text-lg font-semibold text-foreground">
                Detail Jurnal
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <DetailField label="Tanggal" value={formatDate(ledger.date)} />
                <DetailField
                    label="Sumber"
                    value={ledger.sourceReference ?? ledger.sumber}
                />
            </div>
        </div>
    );
}
