import { useQuery } from '@tanstack/react-query';
import { fetchGeneralLedgerDetail } from '../api/general-ledger.api';

export function useGeneralLedgerDetail(id: string) {
    return useQuery({
        queryKey: ['general-ledger', id],
        queryFn: () => fetchGeneralLedgerDetail(id),
        enabled: !!id,
    });
}
