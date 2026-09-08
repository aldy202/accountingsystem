import api from "@/lib/axios";
import type { GeneralLedgerDetail } from "../types/general-ledger-detail.types";
import type { GeneralLedgerFilters, PaginatedResponse, GeneralLedger } from "../types/general-ledger.types";

export async function fetchGeneralLedger(
    filters: GeneralLedgerFilters
): Promise<PaginatedResponse<GeneralLedger>> {
    const { data } = await api.get<PaginatedResponse<GeneralLedger>>(
        '/general-ledger',
        { params: filters },
    );

    return data;

}

export async function fetchGeneralLedgerDetail(
    id: string
): Promise<GeneralLedgerDetail> {
    const { data } = await api.get<GeneralLedgerDetail>(`/general-ledger/${id}`);

    return data;
}
