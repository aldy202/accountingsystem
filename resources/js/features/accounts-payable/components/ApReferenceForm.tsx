import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ApReferenceFormProps {
    defaultDate?: string;
    onSave?: (values: { date: string; referenceNumber: string }) => void;
}

export function ApReferenceForm({ defaultDate, onSave }: ApReferenceFormProps) {
    const [date, setDate] = useState(defaultDate ?? '');
    const [referenceNumber, setReferenceNumber] = useState('');

    function handleSave() {
        onSave?.({ date, referenceNumber });
    }

    return (
        <div className="mt-6 grid grid-cols-1 items-end gap-4 border-t border-border pt-6 sm:grid-cols-[1fr_1fr_auto]">
            <div className="flex flex-col gap-2">
                <label className="text-xs text-muted-foreground">Tanggal</label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs text-muted-foreground">Nomor Referensi</label>
                <Input
                    placeholder="Diisi manual"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                />
            </div>

            <Button variant="outline-primary" onClick={handleSave}>
                Simpan
            </Button>
        </div>
    );
}
