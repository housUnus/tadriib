import TaskManager from "@/app/components/app/kanban/TaskManager";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import { Card } from "@/components/ui/card";
import { KanbanDataContextProvider } from '@/app/context/kanbancontext/index'
import type { Metadata } from "next";
import CardBox from "@/app/components/shared/CardBox";
export const metadata: Metadata = {
  title: "Kanban App",
};

const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "Kanban",
    },
];

function kanban() {
    return (
        <>
            <KanbanDataContextProvider>
                <BreadcrumbComp title="Kanban app" items={BCrumb} />
                <CardBox>
                    <TaskManager />
                </CardBox>
            </KanbanDataContextProvider>
        </>
    )
}
export default kanban
