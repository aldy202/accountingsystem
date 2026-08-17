import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { FormField } from '@/components/common/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// TODO: ganti dengan data asli dari modul Clients/Projects
const dummyClients = [
    { value: 'tech-solutions', label: 'Tech Solutions' },
    { value: 'creative-agency', label: 'Creative Agency' },
];

const dummyProjects = [
    { value: 'cloud-migration', label: 'Cloud Migration' },
    { value: 'brand-identity', label: 'Brand Identity' },
];

export function CreateInvoiceForm() {
    const [clientId, setClientId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState<number | ''>('');
    const [description, setDescription] = useState('');

    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField label="Client">
                    <Select value={clientId} onValueChange={setClientId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih client" />
                        </SelectTrigger>
                        <SelectContent>
                            {dummyClients.map((client) => (
                                <SelectItem key={client.value} value={client.value}>
                                    {client.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Project" optional>
                    <Select value={projectId} onValueChange={setProjectId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih project" />
                        </SelectTrigger>
                        <SelectContent>
                            {dummyProjects.map((project) => (
                                <SelectItem key={project.value} value={project.value}>
                                    {project.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Tanggal Invoice">
                    <Input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                </FormField>

                <FormField label="Jatuh Tempo">
                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </FormField>

                <FormField label="Nominal" className="sm:col-span-2">
                    <div className="relative">
                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                            Rp
                        </span>
                        <Input
                            type="number"
                            className="pl-9"
                            value={amount}
                            onChange={(e) =>
                                setAmount(
                                    e.target.value === '' ? '' : Number(e.target.value),
                                )
                            }
                        />
                    </div>
                </FormField>

                <FormField label="Deskripsi" optional className="sm:col-span-2">
                    <Textarea
                        placeholder="Detail pekerjaan atau catatan tambahan..."
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormField>
            </div>

            <Button className="mt-6" size="lg">
                Buat Invoice
                <ArrowRight className="size-4" />
            </Button>
        </div>
    );
}
