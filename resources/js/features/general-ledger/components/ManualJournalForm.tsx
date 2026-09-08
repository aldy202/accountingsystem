import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { FormField } from '@/components/common/FormField';
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

// TODO: ganti dengan data asli dari modul Chart of Accounts/Projects
const dummyAccounts = [
    { value: '1-1000', label: '1-1000 · Kas' },
    { value: '1-1100', label: '1-1100 · Bank' },
    { value: '1-1200', label: '1-1200 · Piutang Usaha' },
    { value: '2-1000', label: '2-1000 · Hutang Usaha' },
    { value: '5-2000', label: '5-2000 · Beban Operasional' },
    { value: '6-1000', label: '6-1000 · Beban Gaji' },
];

const dummyProjects = [
    { value: 'cloud-migration', label: 'Cloud Migration' },
    { value: 'brand-identity', label: 'Brand Identity' },
];

interface JournalLine {
    id: string;
    accountId: string;
    description: string;
    projectId: string;
    debit: number | '';
    credit: number | '';
}

function createEmptyLine(): JournalLine {
    return {
        id: crypto.randomUUID(),
        accountId: '',
        description: '',
        projectId: '',
        debit: '',
        credit: '',
    };
}

export function ManualJournalForm() {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [lines, setLines] = useState<JournalLine[]>([
        createEmptyLine(),
        createEmptyLine(),
    ]);

    function updateLine(id: string, patch: Partial<JournalLine>) {
        setLines((prev) =>
            prev.map((line) => (line.id === id ? { ...line, ...patch } : line)),
        );
    }

    function addLine() {
        setLines((prev) => [...prev, createEmptyLine()]);
    }

    function removeLine(id: string) {
        setLines((prev) => prev.filter((line) => line.id !== id));
    }

    const totalDebit = lines.reduce(
        (sum, line) => sum + (Number(line.debit) || 0),
        0,
    );
    const totalCredit = lines.reduce(
        (sum, line) => sum + (Number(line.credit) || 0),
        0,
    );
    const isBalanced = totalDebit > 0 && totalDebit === totalCredit;

    return (
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap gap-4">
                <FormField label="Tanggal" className="w-56">
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </FormField>

                <FormField label="Deskripsi" className="min-w-[240px] flex-1">
                    <Input
                        placeholder="Masukkan deskripsi jurnal umum..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormField>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            <th className="px-4 py-3 text-left">Akun</th>
                            <th className="px-4 py-3 text-left">Deskripsi</th>
                            <th className="px-4 py-3 text-left">Project</th>
                            <th className="px-4 py-3 text-left">Debit</th>
                            <th className="px-4 py-3 text-left">Credit</th>
                            <th className="px-4 py-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lines.map((line) => (
                            <tr
                                key={line.id}
                                className="border-b border-border last:border-b-0"
                            >
                                <td className="px-4 py-3">
                                    <Select
                                        value={line.accountId}
                                        onValueChange={(value) =>
                                            updateLine(line.id, { accountId: value })
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
                                                    {account.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="px-4 py-3">
                                    <Input
                                        value={line.description}
                                        onChange={(e) =>
                                            updateLine(line.id, {
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <Select
                                        value={line.projectId}
                                        onValueChange={(value) =>
                                            updateLine(line.id, { projectId: value })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Opsional" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummyProjects.map((project) => (
                                                <SelectItem
                                                    key={project.value}
                                                    value={project.value}
                                                >
                                                    {project.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="relative">
                                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            Rp
                                        </span>
                                        <Input
                                            type="number"
                                            className="pl-9"
                                            placeholder="0"
                                            value={line.debit}
                                            onChange={(e) =>
                                                updateLine(line.id, {
                                                    debit:
                                                        e.target.value === ''
                                                            ? ''
                                                            : Number(e.target.value),
                                                })
                                            }
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="relative">
                                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            Rp
                                        </span>
                                        <Input
                                            type="number"
                                            className="pl-9"
                                            placeholder="0"
                                            value={line.credit}
                                            onChange={(e) =>
                                                updateLine(line.id, {
                                                    credit:
                                                        e.target.value === ''
                                                            ? ''
                                                            : Number(e.target.value),
                                                })
                                            }
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        disabled={lines.length <= 1}
                                        onClick={() => removeLine(line.id)}
                                    >
                                        <Trash2 className="size-4 text-destructive" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-muted/30 text-foreground">
                            <td className="px-4 py-3 font-semibold" colSpan={3}>
                                Total
                            </td>
                            <td className="px-4 py-3 font-semibold">
                                {formatCurrency(totalDebit)}
                            </td>
                            <td className="px-4 py-3 font-semibold">
                                {formatCurrency(totalCredit)}
                            </td>
                            <td />
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <Button type="button" variant="outline" onClick={addLine}>
                        <Plus className="size-4" />
                        Tambah Baris
                    </Button>

                    {!isBalanced && (
                        <span className="flex items-center gap-1.5 text-sm text-destructive">
                            <AlertCircle className="size-4" />
                            Total debit dan credit belum sama.
                        </span>
                    )}
                </div>

                <Button type="button" size="lg" disabled={!isBalanced}>
                    Simpan Journal
                </Button>
            </div>
        </div>
    );
}
