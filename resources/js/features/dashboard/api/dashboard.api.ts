import api from '@/lib/axios';
import type {
    DashboardStats,
    MonthlyProfitabilityRow,
    TopSpendingProject,
} from '../types/dashboard.types';

export async function fetchDashboardStats(): Promise<DashboardStats> {
    const { data } = await api.get<DashboardStats>('/dashboard/stats');

    return data;
}

export async function fetchMonthlyProfitability(): Promise<MonthlyProfitabilityRow[]> {
    const { data } = await api.get<MonthlyProfitabilityRow[]>(
        '/dashboard/monthly-profitability',
    );

    return data;
}


export async function fetchTopSpendingProjects(): Promise<TopSpendingProject[]> {
    const { data } = await api.get<TopSpendingProject[]>(
        '/dashboard/top-spending-projects',
    );

    return data;
}
