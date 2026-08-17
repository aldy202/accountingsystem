export interface JournalRow {
    id: string;
    accountCode: string;
    description: string;
    taxType: string;
    debit: number | '';
    credit: number | '';
}
