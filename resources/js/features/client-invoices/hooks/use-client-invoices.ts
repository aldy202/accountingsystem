import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchClientInvoices } from '../api/client-invoices.api';
import type { ClientInvoiceFilters } from '../types/client-invoice.types';

export function useClientInvoices(filters: ClientInvoiceFilters) {
    return useQuery({
        queryKey: ['client-invoices', filters],
        queryFn: () => fetchClientInvoices(filters),
        placeholderData: keepPreviousData,
    });
}
