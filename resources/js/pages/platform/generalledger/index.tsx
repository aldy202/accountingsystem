import { Head, Link } from "@inertiajs/react";
import { Banknote, BarChart3, Plus } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/common/data-table/DataTable";
import { FilterCard } from "@/components/common/FilterCard";
import { FilterField } from "@/components/common/FilterField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ledgerColumns } from "@/features/general-ledger/columns/ledger.columns";
import { useGeneralLedger } from "@/features/general-ledger/hooks/use-general-ledger";
import type { GeneralLedgerFilters } from "@/features/general-ledger/types/general-ledger.types";
import generalledger from "@/routes/generalledger";


const initialFilters: GeneralLedgerFilters = {
    status: 'all',
    dateFrom: '',
    dateTo: '',
    page: 1
}
export default function GeneralledgerIndex() {
    const [draftFilters, setDraftFilters] =
        useState<GeneralLedgerFilters>(initialFilters);
    const [appliedFilters, setAppliedFilters] =
        useState<GeneralLedgerFilters>(initialFilters);

    const { data, isLoading, isError } = useGeneralLedger(appliedFilters);

    function handleFilterSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setAppliedFilters({ ...draftFilters, page: 1 });
    }
    function handlePageChange(page: number) {
        setAppliedFilters((prev) => ({ ...prev, page }));
    }

    return (
        <>
            <Head title="General Ledger" />

            <div className="flex flex-1 flex-col gap-4 p-6 ">
                <p className="text-sm text-muted-foreground">
                    Daftar Jurnal (Otomatis & Manual) yang sudah diposting
                </p>

                <FilterCard onSubmit={handleFilterSubmit} submitLabel="Terapkan">
                    <FilterField label="Status">
                        <Select
                            value={draftFilters.status}
                            onValueChange={(value) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    status: value as GeneralLedgerFilters["status"],
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Semua status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua status</SelectItem>
                                <SelectItem value="POSTED">Posting</SelectItem>
                                <SelectItem value="UNPOSTED">Unposting</SelectItem>
                                <SelectItem value="DRAFT">DRAFT</SelectItem>
                                <SelectItem value="VOID">VOID</SelectItem>
                            </SelectContent>
                        </Select>
                    </FilterField>

                    <FilterField label="Dari">
                        <Input
                            type="date"
                            value={draftFilters.dateFrom}
                            onChange={(e) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    dateFrom: e.target.value,
                                }))
                            }
                        />
                    </FilterField>

                    <FilterField label="Sampai">
                        <Input
                            type="date"
                            value={draftFilters.dateTo}
                            onChange={(e) =>
                                setDraftFilters((prev) => ({
                                    ...prev,
                                    dateTo: e.target.value,
                                }))
                            }
                        />
                    </FilterField>
                </FilterCard>

                <DataTable
                    columns={ledgerColumns}
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

GeneralledgerIndex.layout = {
    title: 'General Ledger',
    icon: Banknote,
    eyebrow: 'General Ledger',
    eyebrowIcon: Banknote,
    actions: (
        <div className="flex items-center gap-3">
            <Button variant="outline-primary">
                <BarChart3 className="size-4" />
                AR Aging Report
            </Button>
            <Button asChild>
                <Link href={generalledger.create()}>
                    <Plus className="size-4" />
                    Buat Manual Jurnal
                </Link>
            </Button>
        </div>
    ),
    breadcrumbs: [
        {
            title: 'General Ledger',
            href: generalledger.index(),
            icon: Banknote,
        },
    ],
};
