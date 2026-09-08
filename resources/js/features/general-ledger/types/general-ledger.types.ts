export type GeneralLedgerStatus = 'POSTED' | 'UNPOSTED' | 'DRAFT' | 'VOID';

export interface GeneralLedger {
    id: string;
    noJurnal: string;
    date: string;
    description: string;
    sumber: string;
    total: number;
    status: GeneralLedgerStatus;
}

export interface GeneralLedgerFilters {
    status?: GeneralLedgerStatus | 'all';
    dateFrom?: string;
    dateTo?: string;
    page?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    currentPage: number;
    pageCount: number;
    totalCount: number;
}
