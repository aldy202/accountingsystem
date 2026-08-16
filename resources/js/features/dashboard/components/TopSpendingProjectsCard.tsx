import { BarChart3, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/format';
import { useTopSpendingProjects } from '../hooks/use-top-spending-projects';

export function TopSpendingProjectsCard() {
    const { data, isLoading, isError } = useTopSpendingProjects();

    return (
        <div className="flex h-full flex-col rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between p-5">
                <h2 className="text-lg font-semibold text-foreground">
                    Top Spending Projects
                </h2>
                <Button variant="ghost" size="icon" className="size-8 rounded-full">
                    <History className="size-4 text-muted-foreground" />
                </Button>
            </div>

            <div className="flex flex-1 items-center justify-center px-5 pb-8">
                {isLoading && (
                    <div className="w-full space-y-3">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                )}

                {isError && (
                    <p className="text-sm text-destructive">
                        Gagal memuat data top spending projects.
                    </p>
                )}

                {!isLoading && !isError && data && data.length === 0 && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-[#FCE4EE]">
                            <BarChart3 className="size-6 text-[#D6317C]" />
                        </div>
                        <p className="max-w-[220px] text-sm text-muted-foreground">
                            No expenses have been posted to any project for this period.
                        </p>
                    </div>
                )}

                {!isLoading && !isError && data && data.length > 0 && (
                    <ul className="w-full space-y-3">
                        {data.map((project) => (
                            <li
                                key={project.projectId}
                                className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3"
                            >
                                <span className="text-sm font-medium text-foreground">
                                    {project.projectName}
                                </span>
                                <span className="text-sm font-semibold text-foreground">
                                    {formatCurrency(project.totalExpense)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
