import { Head } from '@inertiajs/react';
import { Banknote, Printer } from 'lucide-react';
import { DetailPageHeader } from '@/components/common/DetailPageHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { LedgerDetailCard } from '@/features/general-ledger/components/LedgerDetailCard';
import { LedgerLinesCard } from '@/features/general-ledger/components/LedgerLinesCard';
import { LedgerStatusBadge } from '@/features/general-ledger/components/LedgerStatusBadge';
import { useGeneralLedgerDetail } from '@/features/general-ledger/hooks/use-general-ledger-detail';
import generalledger from '@/routes/generalledger';

interface DetailPageProps {
    id: string;
}

export default function GeneralledgerDetail({ id }: DetailPageProps) {
    const { data, isLoading, isError } = useGeneralLedgerDetail(id);

    return (
        <>
            <Head title="Detail Jurnal" />

            <DetailPageHeader
                breadcrumbs={[]}
                title={
                    isLoading ? (
                        '...'
                    ) : data ? (
                        <>
                            {data.noJurnal}
                            <LedgerStatusBadge status={data.status} />
                        </>
                    ) : (
                        'Tidak ditemukan'
                    )
                }
                subtitle={data ? (data.subtitle ?? data.description) : undefined}
                actions={
                    data && (
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                        >
                            <Printer className="size-4" />
                            Print
                        </button>
                    )
                }
            />

            <div className="flex flex-col gap-4 p-6">
                {isError && (
                    <p className="text-sm text-destructive">
                        Gagal memuat detail jurnal.
                    </p>
                )}

                {isLoading ? (
                    <Skeleton className="h-40 w-full rounded-2xl" />
                ) : (
                    data && (
                        <>
                            <LedgerDetailCard ledger={data} />
                            <LedgerLinesCard lines={data.lines} />
                        </>
                    )
                )}
            </div>
        </>
    );
}

GeneralledgerDetail.layout = {
    title: 'Detail',
    icon: Banknote,
    breadcrumbs: [
        {
            title: 'General Ledger',
            href: generalledger.index(),
            icon: Banknote,
        },
    ],
};
