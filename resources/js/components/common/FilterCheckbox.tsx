import { Checkbox } from '@/components/ui/checkbox';

interface FilterCheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export function FilterCheckbox({
    id,
    label,
    checked,
    onCheckedChange,
}: FilterCheckboxProps) {
    return (
        <div className="flex items-center gap-2">
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(value) => onCheckedChange(!!value)}
            />
            <label
                htmlFor={id}
                className="text-xs font-semibold tracking-wide text-foreground uppercase select-none"
            >
                {label}
            </label>
        </div>
    );
}
