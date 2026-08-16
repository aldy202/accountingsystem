import { Head } from "@inertiajs/react";
import { FileText } from "lucide-react";
import clientinvoices from "@/routes/clientinvoices";

export default function ClientinvoiceIndex() {
    return (
        <>
            <Head title="Client Invoice" />
        </>
    );
}

ClientinvoiceIndex.layout = {
    title: 'Client Invoice',
    icon: FileText,
    breadcrumbs: [
        {
            title: 'Client Invoice',
            href: clientinvoices.index(),
            icon: FileText,
        },
    ],
};
