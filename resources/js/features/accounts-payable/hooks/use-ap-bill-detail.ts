import { useQuery } from '@tanstack/react-query';
import { fetchApBillDetail } from '../api/accounts-payable.api';

export function useApBillDetail(id: string) {
    return useQuery({
        queryKey: ['accounts-payable', 'bills', id],
        queryFn: () => fetchApBillDetail(id),
        enabled: !!id,
    });
}
