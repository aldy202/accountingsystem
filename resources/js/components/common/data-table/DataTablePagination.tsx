import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataTablePaginationProps {
    currentPage: number; // 1-based
    pageCount: number;
    totalCount: number;
    onPageChange: (page: number) => void;
}

export function DataTablePagination({
    currentPage,
    pageCount,
    totalCount,
    onPageChange,
}: DataTablePaginationProps) {
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < pageCount;

    return (
        <div className="flex items-center justify-between border-t border-border px-5 py-4">
            <p className="text-sm text-muted-foreground">
                Halaman {currentPage} dari {pageCount}{' '}
                <span className="text-muted-foreground/70">
                    ({totalCount.toLocaleString('id-ID')} total data)
                </span>
            </p>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    disabled={!canGoPrev}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Sebelumnya
                </Button>
                <Button
                    variant="outline-primary"
                    disabled={!canGoNext}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Selanjutnya
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}
