import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Banknote } from 'lucide-react';
import { DetailPageHeader } from '@/components/common/DetailPageHeader';
import { Button } from '@/components/ui/button';
import { ManualJournalForm } from '@/features/general-ledger/components/ManualJournalForm';
import generalledger from '@/routes/generalledger';

export default function GeneralledgerCreate() {
    return (
        <>
            <Head title="Buat Manual Journal" />

            <DetailPageHeader
                breadcrumbs={[]}
                title="Buat Manual Journal"
                subtitle="Total debit dan credit harus sama sebelum bisa disimpan."
                actions={
                    <Button variant="outline" asChild>
                        <Link href={generalledger.index()}>
                            <ArrowLeft className="size-4" />
                            Back
                        </Link>
                    </Button>
                }
            />

            <div className="flex flex-1 flex-col gap-4 p-6">
                <ManualJournalForm />
            </div>
        </>
    );
}

GeneralledgerCreate.layout = {
    title: 'General Ledger',
    icon: Banknote,
    breadcrumbs: [
        {
            title: 'General Ledger',
            href: generalledger.index(),
            icon: Banknote,
        },
    ],
};
