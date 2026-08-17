import type { ApStatus } from './accounts-payable.types';

export interface ApVendorInfo {
    name: string;
    npwp: string | null;
    nik: string;
    pic: string;
}

export interface ApBillDetail {
    id: string;
    apNumber: string;
    campaignName: string;
    campaignCode: string;
    invoiceNumber: string | null;
    amount: number;
    taxType: string | null;
    taxAmount: number;
    netAmount: number;
    approvalStatus: string;
    approvedBy: string | null;
    approvalDate: string | null;
    paymentSchedule: string | null;
    approvalNote: string | null;
    paidAmount: number | null;
    outstanding: number;
    status: ApStatus;
    invoiceDate: string;
    referenceNumber: string | null;
    vendor: ApVendorInfo;
}
