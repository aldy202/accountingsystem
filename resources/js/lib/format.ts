export function formatCurrency(value: number): string {
    const absFormatted = Math.abs(value).toLocaleString('id-ID');

    return `${value < 0 ? '-' : ''}Rp ${absFormatted}`;
}

export function formatDate(isoDate: string | null): string {
    if (!isoDate) {
        return '-';
    }

    return new Date(isoDate).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
