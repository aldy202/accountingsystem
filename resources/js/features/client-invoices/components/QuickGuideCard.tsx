import { Info } from 'lucide-react';

interface QuickGuideCardProps {
    title: string;
    tips: string[];
}

export function QuickGuideCard({ title, tips }: QuickGuideCardProps) {
    return (
        <div className="h-fit rounded-2xl border border-primary/10 bg-[#EDE4FB]/60 p-6">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Info className="size-4" />
                </div>
                <h2 className="text-base font-semibold text-foreground">{title}</h2>
            </div>

            <ul className="flex flex-col gap-3">
                {tips.map((tip, index) => (
                    <li
                        key={index}
                        className="flex gap-2 text-sm text-foreground/80"
                    >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                        <span>{tip}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
