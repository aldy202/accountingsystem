export type ApStatus =
    | 'finance_checked'
    | 'unposted_ap'
    | 'rejected'
    | 'payment_approved';

export interface ApBill {
    id: string;
    vendorName: string;
    campaignName: string;
    campaignCode: string;
    referenceNumber: string | null;
    amount: number;
    status: ApStatus;
    invoiceDate: string; // ISO date string
}

export interface ApBillFilters {
    search?: string;
    status?: ApStatus | 'all';
    invoiceDateFrom?: string;
    invoiceDateTo?: string;
    page?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    currentPage: number;
    pageCount: number;
    totalCount: number;
}
