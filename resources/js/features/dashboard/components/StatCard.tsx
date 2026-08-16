import { formatCurrency } from '@/lib/format';

type StatCardVariant = 'purple' | 'pink' | 'neutral' | 'green' | 'orange';

interface StatCardProps {
    label: string;
    value: number;
    variant: StatCardVariant;
}

const variantStyles: Record<StatCardVariant, { bg: string; dot: string }> = {
    purple: { bg: 'bg-[#EDE4FB]', dot: 'bg-primary' },
    pink: { bg: 'bg-[#FCE4EE]', dot: 'bg-[#D6317C]' },
    neutral: { bg: 'bg-[#ECECF4]', dot: 'bg-muted-foreground' },
    green: { bg: 'bg-[#DFF7EC]', dot: 'bg-[#189267]' },
    orange: { bg: 'bg-[#FDEAD6]', dot: 'bg-[#D97C1F]' },
};

export function StatCard({ label, value, variant }: StatCardProps) {
    const { bg, dot } = variantStyles[variant];

    return (
        <div className={`relative overflow-hidden rounded-2xl p-5 ${bg}`}>
            <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${dot}`} />
                <span className="text-xs font-semibold tracking-wide text-foreground/70 uppercase">
                    {label}
                </span>
            </div>
            <p className="mt-3 text-xl font-bold text-foreground">
                {formatCurrency(value)}
            </p>
        </div>
    );
}
