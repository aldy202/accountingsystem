import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchGeneralLedger } from "@/features/general-ledger/api/general-ledger.api";
import type { GeneralLedgerFilters } from "@/features/general-ledger/types/general-ledger.types";

export function useGeneralLedger(filters: GeneralLedgerFilters) {
    return useQuery({
        queryKey: ['general-ledger', filters],
        queryFn: () => fetchGeneralLedger(filters),
        placeholderData: keepPreviousData,
    });
}
