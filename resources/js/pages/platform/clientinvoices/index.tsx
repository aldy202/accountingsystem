import { Head, Link } from '@inertiajs/react';
import { BarChart3, FileText, Plus } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { DataTable } from '@/components/common/data-table/DataTable';
import { FilterCard } from '@/components/common/FilterCard';
import { FilterCheckbox } from '@/components/common/FilterCheckbox';
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
import clientinvoices from '@/routes/clientinvoices';
import { invoiceColumns } from '@/features/client-invoices/columns/invoice.columns';
import { useClientInvoices } from '@/features/client-invoices/hooks/use-client-invoices';
import type { ClientInvoiceFilters } from '@/features/client-invoices/types/client-invoice.types';


const initialFilters: ClientInvoiceFilters = {
    search: '',
    status: 'all',
    outstandingOnly: false,
    dueOnly: false,
    page: 1,
};

export default function ClientinvoicesIndex() {
    const [draftFilters, setDraftFilters] =
        useState<ClientInvoiceFilters>(initialFilters);
    const [appliedFilters, setAppliedFilters] =
        useState<ClientInvoiceFilters>(initialFilters);

    const { data, isLoading, isError } = useClientInvoices(appliedFilters);

    function handleFilterSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setAppliedFilters({ ...draftFilters, page: 1 });
    }

    function handlePageChange(page: number) {
        setAppliedFilters((prev) => ({ ...prev, page }));
    }

    return (
        <>
            <Head title="Client Invoices" />

            <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-sm text-muted-foreground">
                    Daftar invoice client beserta status pembayaran (Accounts
                    Receivable)
                </p>

                <FilterCard onSubmit={handleFilterSubmit}>
                    <FilterField label="Cari">
                        <Input
                            placeholder="Nomor invoice atau client"
                            value={draftFilters.search}
                            onChange={(e) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                }))
                            }
                        />
                    </FilterField>

                    <FilterField label="Status">
                        <Select
                            value={draftFilters.status}
                            onValueChange={(value) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    status: value as ClientInvoiceFilters['status'],
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Semua status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua status</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="unpaid">Unpaid</SelectItem>
                            </SelectContent>
                        </Select>
                    </FilterField>

                    <div className="flex items-end gap-6 sm:col-span-2">
                        <FilterCheckbox
                            id="outstanding-only"
                            label="Outstanding Saja"
                            checked={!!draftFilters.outstandingOnly}
                            onCheckedChange={(checked) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    outstandingOnly: checked,
                                }))
                            }
                        />
                        <FilterCheckbox
                            id="due-only"
                            label="Jatuh Tempo Saja"
                            checked={!!draftFilters.dueOnly}
                            onCheckedChange={(checked) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    dueOnly: checked,
                                }))
                            }
                        />
                    </div>
                </FilterCard>

                <DataTable
                    columns={invoiceColumns}
                    data={data?.data ?? []}
                    isLoading={isLoading}
                    isError={isError}
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

ClientinvoicesIndex.layout = {
    title: 'Client Invoices',
    icon: FileText,
    eyebrow: 'Client Invoices',
    eyebrowIcon: FileText,
    actions: (
        <div className="flex items-center gap-3">
            <Button variant="outline-primary">
                <BarChart3 className="size-4" />
                AR Aging Report
            </Button>
            <Button asChild>
                <Link href={clientinvoices.create()}>
                    <Plus className="size-4" />
                    Buat Invoice
                </Link>
            </Button>
        </div>
    ),
    breadcrumbs: [
        {
            title: 'Client Invoices',
            href: clientinvoices.index(),
        },
    ],
};
