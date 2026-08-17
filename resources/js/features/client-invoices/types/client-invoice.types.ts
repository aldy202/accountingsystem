export type InvoiceStatus = 'paid' | 'unpaid';

export interface ClientInvoice {
    id: string;
    clientName: string;
    projectName: string;
    dueDate: string; // ISO date
    amount: number;
    ppn: number;
    total: number;
    outstanding: number;
    status: InvoiceStatus;
}

export interface ClientInvoiceFilters {
    search?: string;
    status?: InvoiceStatus | 'all';
    outstandingOnly?: boolean;
    dueOnly?: boolean;
    page?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    currentPage: number;
    pageCount: number;
    totalCount: number;
}
