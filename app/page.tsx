import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { BsStars } from "react-icons/bs";
import SearchHandler from "./components/SearchHandler";
export default function Home() {
  const state: string = "open";
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div
            className="@container/main flex flex-1 flex-col gap-2 overflow-scroll  pb-12"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />

              <SearchHandler />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
