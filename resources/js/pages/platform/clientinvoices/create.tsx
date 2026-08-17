import { Head, Link } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateInvoiceForm } from '@/features/client-invoices/components/CreateInvoiceForm';
import { QuickGuideCard } from '@/features/client-invoices/components/QuickGuideCard';
import clientinvoices from '@/routes/clientinvoices';


export default function ClientinvoicesCreate() {
    return (
        <>
            <Head title="Buat Invoice" />

            <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-sm text-muted-foreground">
                    Generate invoice baru untuk client. Jurnal piutang & pendapatan
                    akan langsung diposting ke General Ledger secara otomatis.
                </p>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
                    <CreateInvoiceForm />
                    <QuickGuideCard
                        title="Panduan Cepat"
                        tips={[
                            'Pastikan Client sudah terdaftar di modul Clients.',
                            'Jatuh tempo otomatis diatur 14 hari dari hari ini.',
                            'Nomor invoice akan digenerate otomatis secara urut.',
                        ]}
                    />
                </div>
            </div>
        </>
    );
}

ClientinvoicesCreate.layout = {
    title: 'Buat Invoice',
    icon: FileText,
    actions: (
        <div className="flex items-center gap-3">
            <Link
                href={clientinvoices.index()}
                className="text-sm font-semibold text-primary hover:underline"
            >
                Drafts
            </Link>
            <Button>Manage Clients</Button>
        </div>
    ),
    breadcrumbs: [
        {
            title: 'Buat Invoice',
            href: clientinvoices.create(),
        },
    ],
};
