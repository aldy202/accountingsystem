import type { ColumnDef } from '@tanstack/react-table';
import { formatCurrency, formatDate } from '@/lib/format';
import { InvoiceStatusBadge } from '../components/InvoiceStatusBadge';
import type { ClientInvoice } from '../types/client-invoice.types';

export const invoiceColumns: ColumnDef<ClientInvoice>[] = [
    {
        accessorKey: 'clientName',
        header: 'Client',
        cell: ({ row }) => (
            <span className="font-semibold text-foreground">
                {row.original.clientName}
            </span>
        ),
    },
    {
        accessorKey: 'projectName',
        header: 'Project',
        cell: ({ row }) => (
            <span className="text-foreground">{row.original.projectName}</span>
        ),
    },
    {
        accessorKey: 'dueDate',
        header: 'Jatuh Tempo',
        cell: ({ row }) => formatDate(row.original.dueDate),
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
        accessorKey: 'ppn',
        header: 'PPN',
        cell: ({ row }) => formatCurrency(row.original.ppn),
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => (
            <span className="font-semibold text-foreground">
                {formatCurrency(row.original.total)}
            </span>
        ),
    },
    {
        accessorKey: 'outstanding',
        header: 'Outstanding',
        cell: ({ row }) => (
            <span
                className={
                    row.original.outstanding > 0
                        ? 'font-semibold text-destructive'
                        : 'text-foreground'
                }
            >
                {formatCurrency(row.original.outstanding)}
            </span>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <InvoiceStatusBadge status={row.original.status} />,
    },
];
