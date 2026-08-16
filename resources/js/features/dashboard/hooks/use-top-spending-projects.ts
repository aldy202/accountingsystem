import { useQuery } from '@tanstack/react-query';
import { fetchTopSpendingProjects } from '../api/dashboard.api';

export function useTopSpendingProjects() {
    return useQuery({
        queryKey: ['dashboard', 'top-spending-projects'],
        queryFn: fetchTopSpendingProjects,
    });
}
