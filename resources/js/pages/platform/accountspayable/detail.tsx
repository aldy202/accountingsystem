import { Head } from '@inertiajs/react';
import { DetailPageHeader } from '@/components/common/DetailPageHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { ApDetailCard } from '@/features/accounts-payable/components/ApDetailCard';
import { ApStatusBadge } from '@/features/accounts-payable/components/ApStatusBadge';
import { VendorCard } from '@/features/accounts-payable/components/VendorCard';
import { useApBillDetail } from '@/features/accounts-payable/hooks/use-ap-bill-detail';
import accountspayable from '@/routes/accountspayable';
import { ManualJurnalCard } from '@/features/accounts-payable/components/ManualJurnalCard';

interface DetailPageProps {
    id: string;
}

export default function AccountspayableDetail({ id }: DetailPageProps) {
    const { data, isLoading, isError } = useApBillDetail(id);

    return (
        <>
            <Head title="Detail Accounts Payable" />

            <DetailPageHeader
                breadcrumbs={[
                    { label: 'Accounts Payable', href: accountspayable.index() },
                    { label: 'Detail' },
                ]}
                title={
                    isLoading
                        ? '...'
                        : data
                          ? `${data.campaignName} ${data.campaignCode}`
                          : 'Tidak ditemukan'
                }
                subtitle={
                    data
                        ? `${data.apNumber} • Invoice ${data.invoiceNumber ?? '-'}`
                        : undefined
                }
                actions={
                    isLoading ? (
                        <Skeleton className="h-7 w-32 rounded-full" />
                    ) : (
                        data && <ApStatusBadge status={data.status} />
                    )
                }
            />

            <div className="flex flex-col gap-4 p-6">
                {isError && (
                    <p className="text-sm text-destructive">
                        Gagal memuat detail Accounts Payable.
                    </p>
                )}

                <VendorCard vendor={data?.vendor} isLoading={isLoading} />
                <ApDetailCard bill={data} isLoading={isLoading} />

                {data && <ManualJurnalCard />}
            </div>
        </>
    );
}

AccountspayableDetail.layout = {
    breadcrumbs: [
        {
            title: 'Accounts Payable',
            href: accountspayable.index(),
        },
    ],
};
