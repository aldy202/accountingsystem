import type { ColumnDef, OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTablePagination } from './DataTablePagination';

interface DataTablePaginationConfig {
    currentPage: number;
    pageCount: number;
    totalCount: number;
    onPageChange: (page: number) => void;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    isError?: boolean;
    getRowId?: (row: TData) => string;
    enableRowSelection?: boolean;
    rowSelection?: RowSelectionState;
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    pagination?: DataTablePaginationConfig;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading = false,
    isError = false,
    getRowId,
    enableRowSelection = false,
    rowSelection: controlledRowSelection,
    onRowSelectionChange: controlledOnRowSelectionChange,
    pagination,
}: DataTableProps<TData, TValue>) {
    const [internalRowSelection, setInternalRowSelection] =
        useState<RowSelectionState>({});

    const rowSelection = controlledRowSelection ?? internalRowSelection;
    const onRowSelectionChange =
        controlledOnRowSelectionChange ?? setInternalRowSelection;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId,
        manualPagination: true,
        enableRowSelection,
        state: {
            rowSelection,
        },
        onRowSelectionChange,
    });

    return (
        <div className="rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="border-b border-border bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                            >
                                {enableRowSelection && (
                                    <th className="w-12 px-5 py-3">
                                        <Checkbox
                                            checked={table.getIsAllRowsSelected()}
                                            onCheckedChange={(value) =>
                                                table.toggleAllRowsSelected(!!value)
                                            }
                                        />
                                    </th>
                                )}
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-5 py-3 text-left">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="border-b border-border">
                                    <td
                                        className="px-5 py-4"
                                        colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                                    >
                                        <Skeleton className="h-6 w-full" />
                                    </td>
                                </tr>
                            ))}

                        {isError && !isLoading && (
                            <tr>
                                <td
                                    colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                                    className="px-5 py-10 text-center text-sm text-destructive"
                                >
                                    Gagal memuat data.
                                </td>
                            </tr>
                        )}

                        {!isLoading && !isError && table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                                    className="px-5 py-10 text-center text-sm text-muted-foreground"
                                >
                                    Tidak ada data.
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            !isError &&
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-border last:border-b-0 hover:bg-muted/20"
                                >
                                    {enableRowSelection && (
                                        <td className="px-5 py-4">
                                            <Checkbox
                                                checked={row.getIsSelected()}
                                                onCheckedChange={(value) =>
                                                    row.toggleSelected(!!value)
                                                }
                                            />
                                        </td>
                                    )}
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-5 py-4 align-top">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <DataTablePagination
                    currentPage={pagination.currentPage}
                    pageCount={pagination.pageCount}
                    totalCount={pagination.totalCount}
                    onPageChange={pagination.onPageChange}
                />
            )}
        </div>
    );
}
