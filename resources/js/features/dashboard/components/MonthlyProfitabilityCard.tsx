import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/format';
import { useMonthlyProfitability } from '../hooks/use-monthly-profitability';

export function MonthlyProfitabilityCard() {
    const { data, isLoading, isError } = useMonthlyProfitability();

    return (
        <div className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between p-5">
                <h2 className="text-lg font-semibold text-foreground">
                    Monthly Profitability
                </h2>
                <Button variant="outline" size="sm">
                    <Download className="size-4" />
                    Export Report
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-t border-border bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            <th className="px-5 py-3 text-left">Period</th>
                            <th className="px-5 py-3 text-right">Revenue</th>
                            <th className="px-5 py-3 text-right">Expense</th>
                            <th className="px-5 py-3 text-right">Net Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading &&
                            Array.from({ length: 6 }).map((_, index) => (
                                <tr key={index} className="border-t border-border">
                                    <td className="px-5 py-4" colSpan={4}>
                                        <Skeleton className="h-5 w-full" />
                                    </td>
                                </tr>
                            ))}

                        {isError && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-5 py-8 text-center text-sm text-destructive"
                                >
                                    Gagal memuat data profitabilitas bulanan.
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            !isError &&
                            data?.map((row) => (
                                <tr key={row.period} className="border-t border-border">
                                    <td className="px-5 py-4 font-medium text-foreground">
                                        {row.period}
                                    </td>
                                    <td className="px-5 py-4 text-right text-foreground">
                                        {formatCurrency(row.revenue)}
                                    </td>
                                    <td className="px-5 py-4 text-right text-foreground">
                                        {formatCurrency(row.expense)}
                                    </td>
                                    <td
                                        className={`px-5 py-4 text-right font-semibold ${
                                            row.netProfit < 0
                                                ? 'text-destructive'
                                                : 'text-foreground'
                                        }`}
                                    >
                                        {formatCurrency(row.netProfit)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
