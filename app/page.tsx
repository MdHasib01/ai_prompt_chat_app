import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BsStars } from "react-icons/bs";
export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 overflow-scroll pb-12">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className=" flex items-center justify-center flex-col w-full fixed bottom-0 bg-white dark:bg-zinc-950 rounded-b-lg">
                <div className="w-full max-w-4xl relative border rounded-lg my-2">
                  <input
                    type="text"
                    placeholder="Ask anything"
                    className="w-full py-4 px-2 dark:bg-slate-950 bg-slate-100 rounded-lg"
                  />
                  <Button className="absolute right-2 bottom-2 cursor-pointer">
                    Ask <BsStars />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
