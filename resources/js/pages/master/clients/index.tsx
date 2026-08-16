import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import clients from '@/routes/clients';

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface ClientsIndexProps {
    clients: Client[];
}

export default function ClientsIndex({ clients: clientList }: ClientsIndexProps) {
    return (
        <>
            <Head title="Clients" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-left text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientList.map((client) => (
                                <tr key={client.id} className="border-t border-border">
                                    <td className="px-4 py-3 font-medium">{client.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{client.email}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{client.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {clientList.length === 0 && (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            Belum ada data client.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

ClientsIndex.layout = {
    title: 'Clients',
    icon: Users,
    breadcrumbs: [
        {
            title: 'Clients',
            href: clients.index(),
        },
    ],
};
