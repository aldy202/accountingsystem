import api from '@/lib/axios';
import type {
    ApBill,
    ApBillFilters,
    PaginatedResponse,
} from '../types/accounts-payable.types';
import type { ApBillDetail } from '../types/ap-detail.types';

export async function fetchApBills(
    filters: ApBillFilters,
): Promise<PaginatedResponse<ApBill>> {
    const { data } = await api.get<PaginatedResponse<ApBill>>(
        '/accounts-payable/bills',
        { params: filters },
    );

    return data;
}

export async function fetchApBillDetail(id: string): Promise<ApBillDetail> {
    const { data } = await api.get<ApBillDetail>(`/accounts-payable/bills/${id}`);

    return data;
}
