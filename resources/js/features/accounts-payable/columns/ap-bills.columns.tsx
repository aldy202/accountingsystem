import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { ApStatusBadge } from '../components/ApStatusBadge';
import type { ApBill } from '../types/accounts-payable.types';


function formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export const apBillsColumns: ColumnDef<ApBill>[] = [
    {
        accessorKey: 'vendorName',
        header: 'Vendor',
        cell: ({ row }) => (
            <span className="font-medium text-foreground">
                {row.original.vendorName}
            </span>
        ),
    },
    {
        accessorKey: 'campaignName',
        header: 'Campaign',
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-foreground">{row.original.campaignName}</span>
                <span className="text-xs text-muted-foreground">
                    {row.original.campaignCode}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'referenceNumber',
        header: 'Nomor Referensi',
        cell: ({ row }) => row.original.referenceNumber ?? '—',
    },
    {
        accessorKey: 'amount',
        header: 'Nominal',
        cell: ({ row }) => (
            <span className="font-medium text-foreground">
                {formatCurrency(row.original.amount)}
            </span>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <ApStatusBadge status={row.original.status} />,
    },
    {
        accessorKey: 'invoiceDate',
        header: 'Tanggal Invoice',
        cell: ({ row }) => formatDate(row.original.invoiceDate),
    },
    {
        id: 'action',
        header: 'Action',
        cell: () => (
            <Link
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
                Detail
                <Eye className="size-3.5" />
            </Link>
        ),
    },
];
