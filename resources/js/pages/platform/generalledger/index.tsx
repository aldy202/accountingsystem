import { Head } from "@inertiajs/react";
import { Banknote } from "lucide-react";
import generalledger from "@/routes/generalledger";
export default function GeneralledgerIndex() {
    return (
        <>
            <Head title="General Ledger" />
        </>
    );
}

GeneralledgerIndex.layout = {
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
