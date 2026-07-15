"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Activity,
  FileDown,
  FileText,
  FolderDown,
  Home,
  LogOut,
  Package,
  Palette,
} from "lucide-react";
import { logoutClient } from "@/app/portal/actions";
import { PortalThemeToggle } from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type DocLink = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
};

type Props = {
  name: string;
  tagline: string | null;
  logoUrl: string | null;
  docs: DocLink[];
};

const nav = [
  { title: "Overview", href: "/portal", icon: Home, exact: true },
  { title: "Brand", href: "/portal/brand", icon: Palette },
  { title: "Assets", href: "/portal/assets", icon: FolderDown },
  { title: "Docs", href: "/portal/docs", icon: FileText },
  { title: "Updates", href: "/portal/updates", icon: Activity },
];

export function PortalSidebar({ name, tagline, logoUrl, docs }: Props) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <Sidebar className="border-sidebar-border">
      <SidebarHeader className="px-3 pt-4 pb-2">
        <div className="flex items-center gap-2.5 px-1">
          <div className="bg-sidebar-accent ring-sidebar-border grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg ring-1">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt=""
                width={32}
                height={32}
                className="size-full object-contain"
              />
            ) : (
              <span className="text-[0.7rem] font-semibold">
                {name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              {name}
            </p>
            {tagline ? (
              <p className="text-muted-foreground truncate text-[0.7rem]">
                {tagline}
              </p>
            ) : null}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                const active = isActive(item.href, item.exact);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      render={<Link href={item.href} />}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>

                    {item.title === "Docs" && docs.length > 0 ? (
                      <SidebarMenuSub>
                        {docs.map((doc) => (
                          <SidebarMenuSubItem key={doc.id}>
                            <SidebarMenuSubButton
                              isActive={pathname === `/portal/docs/${doc.slug}`}
                              render={
                                <Link href={`/portal/docs/${doc.slug}`} />
                              }
                            >
                              <span className="truncate">{doc.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-1 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<a href="/api/portal/export/tokens" download />}
              className="text-muted-foreground hover:text-foreground"
            >
              <FileDown />
              <span>Export design tokens</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<a href="/api/portal/export/assets" download />}
              className="text-muted-foreground hover:text-foreground"
            >
              <Package />
              <span>Export all assets</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <PortalThemeToggle />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form action={logoutClient}>
              <SidebarMenuButton
                type="submit"
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut />
                <span>Sign out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
