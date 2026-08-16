import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardStats } from '../hooks/use-dashboard-stats';
import { StatCard } from './StatCard';

export function StatCardsRow() {
    const { data, isLoading, isError } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-[104px] rounded-2xl" />
                ))}
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                Gagal memuat data ringkasan dashboard.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <StatCard label="Cash Position" value={data.cashPosition} variant="purple" />
            <StatCard label="Outstanding AP" value={data.outstandingAp} variant="pink" />
            <StatCard label="Outstanding AR" value={data.outstandingAr} variant="neutral" />
            <StatCard label="Revenue (MoM)" value={data.revenueMom} variant="green" />
            <StatCard label="Expense (MoM)" value={data.expenseMom} variant="orange" />
        </div>
    );
}
