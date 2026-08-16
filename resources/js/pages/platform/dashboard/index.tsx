import { Head } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { MonthlyProfitabilityCard } from '@/features/dashboard/components/MonthlyProfitabilityCard';
import { StatCardsRow } from '@/features/dashboard/components/StatCardsRow';
import { TopSpendingProjectsCard } from '@/features/dashboard/components/TopSpendingProjectsCard';
import dashboard from '@/routes/dashboard';


export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <StatCardsRow />
                <MonthlyProfitabilityCard />
                <TopSpendingProjectsCard />
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard Overview',
            href: dashboard.index(),
            icon: LayoutGrid,
        },
    ],
};
