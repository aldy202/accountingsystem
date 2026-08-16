import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavGroup, NavItem } from '@/types';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    const isParentActive = (item: NavItem) => {
        if (item.href && isCurrentUrl(item.href)) {
            return true;
        }

        return item.items?.some((child) => child.href && isCurrentUrl(child.href)) ?? false;
    };

    return (
        <>
            {groups.map((group) => (
                <SidebarGroup key={group.title} className="px-3 py-2">
                    <SidebarGroupLabel className="px-1 pb-2 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                        {group.title}
                    </SidebarGroupLabel>
                    <SidebarMenu className="gap-1.5">
                        {group.items.map((item) =>
                            item.items && item.items.length > 0 ? (
                                // Parent dengan child menu → collapsible
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={isParentActive(item)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                isActive={isParentActive(item)}
                                                tooltip={{ children: item.title }}
                                                className="h-10 gap-3 rounded-lg px-3 text-[15px]"
                                            >
                                                {item.icon && <item.icon className="size-[18px]" />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((child) => (
                                                    <SidebarMenuSubItem key={child.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={!!child.href && isCurrentUrl(child.href)}
                                                        >
                                                            <Link href={child.href ?? '#'}>
                                                                <span>{child.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                // Item biasa, tanpa child → link langsung seperti sebelumnya
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={!!item.href && isCurrentUrl(item.href)}
                                        tooltip={{ children: item.title }}
                                        className="h-10 gap-3 rounded-lg px-3 text-[15px]"
                                    >
                                        <Link href={item.href ?? '#'} prefetch>
                                            {item.icon && <item.icon className="size-[18px]" />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ),
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
