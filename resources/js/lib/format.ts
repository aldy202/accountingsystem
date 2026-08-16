export function formatCurrency(value: number): string {
    const absFormatted = Math.abs(value).toLocaleString('id-ID');

    return `${value < 0 ? '-' : ''}Rp ${absFormatted}`;
}
