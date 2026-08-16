import { Head } from '@inertiajs/react';
import { ClipboardList, FileText, LayoutGrid, Search } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/common/data-table/DataTable';
import { FilterCard } from '@/components/common/FilterCard';
import { FilterField } from '@/components/common/FilterField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { apBillsColumns } from '@/features/accounts-payable/columns/ap-bills.columns';
import { useApBills } from '@/features/accounts-payable/hooks/use-ap-bills';
import type { ApBillFilters } from '@/features/accounts-payable/types/accounts-payable.types';
import accountspayable from '@/routes/accountspayable';

const initialFilters: ApBillFilters = {
    search: '',
    status: 'all',
    invoiceDateFrom: '',
    invoiceDateTo: '',
    page: 1,
};

export default function AccountspayableIndex() {
    const [draftFilters, setDraftFilters] = useState<ApBillFilters>(initialFilters);
    const [appliedFilters, setAppliedFilters] = useState<ApBillFilters>(initialFilters);

    const { data, isLoading, isError } = useApBills(appliedFilters);

    function handleFilterSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setAppliedFilters({ ...draftFilters, page: 1 });
    }

    function handlePageChange(page: number) {
        setAppliedFilters((prev) => ({ ...prev, page }));
    }

    return (
        <>
            <Head title="Accounts Payable" />

            <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-sm text-muted-foreground">
                    Tagihan vendor/KOL/freelancer yang tersinkron dari vendor portal,
                    beserta status posting jurnal.
                </p>

                <FilterCard onSubmit={handleFilterSubmit}>
                    <FilterField label="Cari">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Vendor, campaign..."
                                className="pl-9"
                                value={draftFilters.search}
                                onChange={(e) =>
                                    setDraftFilters((prev) => ({
                                        ...prev,
                                        search: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </FilterField>

                    <FilterField label="Status">
                        <Select
                            value={draftFilters.status}
                            onValueChange={(value) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    status: value as ApBillFilters['status'],
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Semua status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua status</SelectItem>
                                <SelectItem value="finance_checked">
                                    Finance Checked
                                </SelectItem>
                                <SelectItem value="unposted_ap">
                                    Terjadwal (Unposted AP)
                                </SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="payment_approved">
                                    Payment Approved
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </FilterField>

                    <FilterField label="Tanggal Invoice Dari">
                        <Input
                            type="date"
                            value={draftFilters.invoiceDateFrom}
                            onChange={(e) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    invoiceDateFrom: e.target.value,
                                }))
                            }
                        />
                    </FilterField>

                    <FilterField label="Sampai">
                        <Input
                            type="date"
                            value={draftFilters.invoiceDateTo}
                            onChange={(e) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    invoiceDateTo: e.target.value,
                                }))
                            }
                        />
                    </FilterField>
                </FilterCard>

                <DataTable
                    columns={apBillsColumns}
                    data={data?.data ?? []}
                    isLoading={isLoading}
                    isError={isError}
                    enableRowSelection
                    getRowId={(row) => row.id}
                    pagination={
                        data
                            ? {
                                  currentPage: data.currentPage,
                                  pageCount: data.pageCount,
                                  totalCount: data.totalCount,
                                  onPageChange: handlePageChange,
                              }
                            : undefined
                    }
                />
            </div>
        </>
    );
}

AccountspayableIndex.layout = {
    title: 'Accounts Payable',
    icon: ClipboardList,
    eyebrow: 'Accounts Payable',
    eyebrowIcon: ClipboardList,
    actions: (
        <Button variant="outline-primary">
            <FileText className="size-4" />
            AP Aging Report
        </Button>
    ),
    breadcrumbs: [
        {
            title: 'Accounts Payable',
            href: accountspayable.index(),
            icon: LayoutGrid,
        },
    ],
};
