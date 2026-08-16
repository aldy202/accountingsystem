import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchApBills } from '../api/accounts-payable.api';
import type { ApBillFilters } from '../types/accounts-payable.types';

export function useApBills(filters: ApBillFilters) {
    return useQuery({
        queryKey: ['accounts-payable', 'bills', filters],
        queryFn: () => fetchApBills(filters),
        placeholderData: keepPreviousData,
    });
}
