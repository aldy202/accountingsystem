import { DetailField } from '@/components/common/DetailField';
import { Skeleton } from '@/components/ui/skeleton';
import type { ApVendorInfo } from '../types/ap-detail.types';

interface VendorCardProps {
    vendor?: ApVendorInfo;
    isLoading: boolean;
}

export function VendorCard({ vendor, isLoading }: VendorCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-5 text-lg font-semibold text-foreground">Vendor</h2>

            {isLoading ? (
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-10 w-full" />
                    ))}
                </div>
            ) : (
                vendor && (
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                        <DetailField label="Nama" value={vendor.name} />
                        <DetailField label="NPWP" value={vendor.npwp ?? '-'} />
                        <DetailField label="NIK" value={vendor.nik} />
                        <DetailField label="PIC" value={vendor.pic} />
                    </div>
                )
            )}
        </div>
    );
}
