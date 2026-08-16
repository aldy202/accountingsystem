import { Link } from '@inertiajs/react';

import {
    Banknote,
    Building2,
    Calculator,
    ClipboardList,
    FileBarChart,
    FileSpreadsheet,
    FileText,
    FolderKanban,
    Landmark,
    LayoutGrid,
    ListTree,
    Percent,
    Receipt,
    Scale,
    TrendingUp,
    Truck,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
} from '@/components/ui/sidebar';

import accountspayable from '@/routes/accountspayable';
import clientinvoices from '@/routes/clientinvoices';
import clients from '@/routes/clients';
import dashboard from '@/routes/dashboard';
import generalledger from "@/routes/generalledger";
import type { NavGroup } from '@/types';


const navGroups: NavGroup[] = [
    {
        title: 'PLATFORM',
        items: [
            { title: 'Dashboard', href: dashboard.index(), icon: LayoutGrid },
            {
                title: 'Accounts Payable',
                icon: ClipboardList,
                items: [
                    { title: 'Purchase', href: accountspayable.index(), icon: Calculator },
                    { title: 'Payments', href: '#' }, // masih bisa di ganti
                    { title: 'Purchase Orders', href: '#' }, // masih bisa di ganti
                ],
            },
            { title: 'Client Invoices', href: clientinvoices.index(), icon: FileText },
            { title: 'General Ledger', href: generalledger.index(), icon: Banknote },
        ],
    },
    {
        title: 'MASTER DATA',
        items: [
            { title: 'Clients', href: clients.index(), icon: Users },
            { title: 'Vendors', href: '#', icon: Truck },
            { title: 'Projects', href: '#', icon: FolderKanban },
            { title: 'Chart of Accounts', href: '#', icon: ListTree },
            { title: 'Departments', href: '#', icon: Building2 },
        ],
    },
    {
        title: 'TAX',
        items: [
            { title: 'Tax Master', href: '#', icon: Percent },
            { title: 'Rekap PPh', href: '#', icon: FileBarChart },
            { title: 'Rekap PPN', href: '#', icon: FileSpreadsheet },
            { title: 'Gross-Up Calculator', href: '#', icon: Calculator },
        ],
    },
    {
        title: 'REPORTS',
        items: [
            { title: 'Trial Balance', href: '#', icon: Scale },
            { title: 'Balance Sheet', href: '#', icon: Landmark },
            { title: 'Profit & Loss', href: '#', icon: TrendingUp },
            { title: 'Cashflow Statement', href: '#', icon: Receipt },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <Link href={dashboard.index()} prefetch>
                        <AppLogo />
                    </Link>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={navGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
