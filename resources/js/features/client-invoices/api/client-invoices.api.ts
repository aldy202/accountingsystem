import api from '@/lib/axios';
import type {
    ClientInvoice,
    ClientInvoiceFilters,
    PaginatedResponse,
} from '../types/client-invoice.types';

export async function fetchClientInvoices(
    filters: ClientInvoiceFilters,
): Promise<PaginatedResponse<ClientInvoice>> {
    const { data } = await api.get<PaginatedResponse<ClientInvoice>>(
        '/client-invoices',
        { params: filters },
    );

    return data;
}
