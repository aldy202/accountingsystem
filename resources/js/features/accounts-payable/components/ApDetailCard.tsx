import { DetailField } from '@/components/common/DetailField';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/lib/format';
import type { ApBillDetail } from '../types/ap-detail.types';
import { ApReferenceForm } from './ApReferenceForm';

interface ApDetailCardProps {
    bill?: ApBillDetail;
    isLoading: boolean;
}

export function ApDetailCard({ bill, isLoading }: ApDetailCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-5 text-lg font-semibold text-foreground">Detail AP</h2>

            {isLoading ? (
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} className="h-10 w-full" />
                    ))}
                </div>
            ) : (
                bill && (
                    <>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
                            <DetailField
                                label="Campaign"
                                value={`${bill.campaignName} ${bill.campaignCode}`}
                            />
                            <DetailField
                                label="Nomor Invoice"
                                value={bill.invoiceNumber ?? '-'}
                            />
                            <DetailField label="Tax Type" value={bill.taxType ?? '-'} />
                            <DetailField
                                label="Nominal Invoice"
                                value={formatCurrency(bill.amount)}
                            />

                            <DetailField
                                label="Pajak (Portal)"
                                value={formatCurrency(bill.taxAmount)}
                            />
                            <DetailField
                                label="Net Amount (Portal)"
                                value={formatCurrency(bill.netAmount)}
                            />
                            <DetailField
                                label="Status Approval"
                                value={
                                    <span className="font-semibold capitalize">
                                        {bill.approvalStatus}
                                    </span>
                                }
                            />
                            <DetailField
                                label="Disetujui Oleh"
                                value={bill.approvedBy ?? '-'}
                            />

                            <DetailField
                                label="Tanggal Approval"
                                value={formatDate(bill.approvalDate)}
                            />
                            <DetailField
                                label="Jadwal Bayar"
                                value={formatDate(bill.paymentSchedule)}
                            />
                            <DetailField
                                label="Catatan Approval"
                                value={bill.approvalNote ?? '-'}
                            />
                            <DetailField
                                label="Nominal Dibayar"
                                value={
                                    bill.paidAmount ? formatCurrency(bill.paidAmount) : '-'
                                }
                            />

                            <DetailField
                                label="Outstanding"
                                value={formatCurrency(bill.outstanding)}
                                className="col-span-2 lg:col-span-1"
                            />
                        </div>

                        <ApReferenceForm defaultDate={bill.invoiceDate} />
                    </>
                )
            )}
        </div>
    );
}
