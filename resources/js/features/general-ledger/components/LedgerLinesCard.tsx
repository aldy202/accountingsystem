import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import type { LedgerLine } from '../types/general-ledger-detail.types';

interface LedgerLinesCardProps {
    lines: LedgerLine[];
}

export function LedgerLinesCard({ lines }: LedgerLinesCardProps) {
    const totalDebit = lines.reduce((sum, line) => sum + line.debit, 0);
    const totalCredit = lines.reduce((sum, line) => sum + line.credit, 0);

    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-5 text-lg font-semibold text-foreground">
                Baris Jurnal
            </h2>

            <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            <th className="px-4 py-3 text-left">Akun</th>
                            <th className="px-4 py-3 text-left">Deskripsi</th>
                            <th className="px-4 py-3 text-left">Tag</th>
                            <th className="px-4 py-3 text-right">Debit</th>
                            <th className="px-4 py-3 text-right">Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lines.map((line) => (
                            <tr key={line.id} className="border-t border-border">
                                <td className="px-4 py-3 font-medium text-foreground">
                                    {line.accountCode}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {line.description}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {line.tag ?? '-'}
                                </td>
                                <td className="px-4 py-3 text-right font-medium text-foreground">
                                    {line.debit > 0 ? formatCurrency(line.debit) : '-'}
                                </td>
                                <td className="px-4 py-3 text-right font-medium text-foreground">
                                    {line.credit > 0 ? formatCurrency(line.credit) : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-border bg-muted/30 font-semibold text-foreground">
                            <td className="px-4 py-3" colSpan={3}>
                                Total
                            </td>
                            <td className="px-4 py-3 text-right">
                                {formatCurrency(totalDebit)}
                            </td>
                            <td className="px-4 py-3 text-right">
                                {formatCurrency(totalCredit)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <Button type="button" variant="destructive" className="mt-6">
                Reverse Journal
            </Button>
        </div>
    );
}
