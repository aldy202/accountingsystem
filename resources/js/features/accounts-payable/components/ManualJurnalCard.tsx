import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { formatCurrency } from '@/lib/format';
import { dummyAccounts } from '../constants/dummy-accounts';
import type { JournalRow } from '../types/journal.types';

function createEmptyRow(): JournalRow {
    return {
        id: crypto.randomUUID(),
        accountCode: '',
        description: '',
        taxType: '',
        debit: '',
        credit: '',
    };
}

interface ManualJurnalCardProps {
    initialRows?: JournalRow[];
    onSaveDraft?: (rows: JournalRow[]) => void;
    onPosting?: (rows: JournalRow[]) => void;
}

export function ManualJurnalCard({
    initialRows,
    onSaveDraft,
    onPosting,
}: ManualJurnalCardProps) {
    const [journalDate, setJournalDate] = useState(
        new Date().toISOString().slice(0, 10),
    );
    const [description, setDescription] = useState('');
    const [rows, setRows] = useState<JournalRow[]>(
        initialRows && initialRows.length > 0 ? initialRows : [createEmptyRow()],
    );

    const totalDebit = rows.reduce(
        (sum, row) => sum + (Number(row.debit) || 0),
        0,
    );
    const totalCredit = rows.reduce(
        (sum, row) => sum + (Number(row.credit) || 0),
        0,
    );
    const selisih = totalDebit - totalCredit;

    function updateRow(id: string, patch: Partial<JournalRow>) {
        setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
        );
    }

    function addRow() {
        setRows((prev) => [...prev, createEmptyRow()]);
    }

    function removeRow(id: string) {
        setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
    }

    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">Manual Jurnal</h2>
                <Badge variant="secondary">Draft</Badge>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-muted-foreground">Tanggal</label>
                    <Input
                        type="date"
                        value={journalDate}
                        onChange={(e) => setJournalDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-muted-foreground">Keterangan</label>
                    <Input
                        placeholder="Diisi manual"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            <th className="px-4 py-3 text-left">Akun</th>
                            <th className="px-4 py-3 text-left">Deskripsi</th>
                            <th className="px-4 py-3 text-left">Gross PPh</th>
                            <th className="px-4 py-3 text-right">Debit</th>
                            <th className="px-4 py-3 text-right">Credit</th>
                            <th className="w-10 px-2 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className="border-t border-border">
                                <td className="px-4 py-3">
                                    <Select
                                        value={row.accountCode}
                                        onValueChange={(value) =>
                                            updateRow(row.id, { accountCode: value })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih akun" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummyAccounts.map((account) => (
                                                <SelectItem
                                                    key={account.value}
                                                    value={account.value}
                                                >
                                                    {account.code}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="px-4 py-3">
                                    <Input
                                        value={row.description}
                                        onChange={(e) =>
                                            updateRow(row.id, {
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={row.taxType}
                                            onValueChange={(value) =>
                                                updateRow(row.id, { taxType: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Tipe pajak" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pph21">PPh 21</SelectItem>
                                                <SelectItem value="pph23">PPh 23</SelectItem>
                                                <SelectItem value="ppn">PPN</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                        >
                                            Hitung
                                        </Button>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <Input
                                        type="number"
                                        className="text-right"
                                        value={row.debit}
                                        onChange={(e) =>
                                            updateRow(row.id, {
                                                debit:
                                                    e.target.value === ''
                                                        ? ''
                                                        : Number(e.target.value),
                                            })
                                        }
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <Input
                                        type="number"
                                        className="text-right"
                                        value={row.credit}
                                        onChange={(e) =>
                                            updateRow(row.id, {
                                                credit:
                                                    e.target.value === ''
                                                        ? ''
                                                        : Number(e.target.value),
                                            })
                                        }
                                    />
                                </td>
                                <td className="px-2 py-3 text-center">
                                    <button
                                        type="button"
                                        onClick={() => removeRow(row.id)}
                                        className="text-xs text-muted-foreground hover:text-destructive"
                                    >
                                        ✕
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-border font-semibold">
                            <td colSpan={3} className="px-4 py-3 text-right">
                                Total
                            </td>
                            <td className="px-4 py-3 text-right">
                                {formatCurrency(totalDebit)}
                            </td>
                            <td className="px-4 py-3 text-right">
                                {formatCurrency(totalCredit)}
                            </td>
                            <td />
                        </tr>
                        <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-destructive">
                                Selisih
                            </td>
                            <td
                                colSpan={2}
                                className="px-4 py-2 text-right text-destructive"
                            >
                                {formatCurrency(selisih)}
                            </td>
                            <td />
                        </tr>
                    </tfoot>
                </table>
            </div>

            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={addRow}
            >
                + Tambah Baris
            </Button>

            <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <Button
                    variant="outline"
                    onClick={() => onSaveDraft?.(rows)}
                >
                    Simpan Draft
                </Button>
                <Button
                    variant="outline-primary"
                    disabled={selisih !== 0}
                    onClick={() => onPosting?.(rows)}
                >
                    Posting
                </Button>
                <Button type="button" variant="ghost">
                    Batal
                </Button>
            </div>
        </div>
    );
}
