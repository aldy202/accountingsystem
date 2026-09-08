import type { GeneralLedgerStatus } from './general-ledger.types';

export interface LedgerLine {
    id: string;
    accountCode: string;
    description: string;
    tag: string | null;
    debit: number;
    credit: number;
}

export interface GeneralLedgerDetail {
    id: string;
    noJurnal: string;
    date: string;
    description: string;
    sumber: string;
    total: number;
    status: GeneralLedgerStatus;
    subtitle: string | null;
    sourceReference: string | null;
    lines: LedgerLine[];
}
