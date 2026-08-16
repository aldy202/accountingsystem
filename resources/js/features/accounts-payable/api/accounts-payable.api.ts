import api from '@/lib/axios';
import type {
    ApBill,
    ApBillFilters,
    PaginatedResponse,
} from '../types/accounts-payable.types';

export async function fetchApBills(
    filters: ApBillFilters,
): Promise<PaginatedResponse<ApBill>> {
    const { data } = await api.get<PaginatedResponse<ApBill>>(
        '/accounts-payable/bills',
        { params: filters },
    );

    return data;
}
