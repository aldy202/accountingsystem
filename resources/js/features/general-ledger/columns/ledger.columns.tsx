import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/format';
import generalledger from '@/routes/generalledger';
import { LedgerStatusBadge } from '../components/LedgerStatusBadge';
import type { GeneralLedger } from '../types/general-ledger.types';

export const ledgerColumns: ColumnDef<GeneralLedger>[] = [
    {
        accessorKey: 'noJurnal',
        header: 'No. Jurnal',
        cell: ({ row }) => (
            <span className="font-semibold text-foreground">
                {row.original.noJurnal}
            </span>
        ),
    },
    {
        accessorKey: 'date',
        header: 'Tanggal',
        cell: ({ row }) => formatDate(row.original.date),
    },
    {
        accessorKey: 'description',
        header: 'Deskripsi',
        cell: ({ row }) => (
            <span className="text-foreground">{row.original.description}</span>
        ),
    },
    {
        accessorKey: 'sumber',
        header: 'Sumber',
        cell: ({ row }) => row.original.sumber,
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => (
            <span className="font-semibold text-primary">
                {formatCurrency(row.original.total)}
            </span>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <LedgerStatusBadge status={row.original.status} />,
    },
    {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => (
            <Link
                href={generalledger.detail(row.original.id)}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
                Detail
                <Eye className="size-3.5" />
            </Link>
        ),
    },
];
