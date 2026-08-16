import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyProfitability } from '../api/dashboard.api';

export function useMonthlyProfitability() {
    return useQuery({
        queryKey: ['dashboard', 'monthly-profitability'],
        queryFn: fetchMonthlyProfitability,
    });
}
