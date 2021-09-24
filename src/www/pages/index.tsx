import { DashboardPage } from "./dashboard.page";
import { PreviewPage } from "./preview.page";

export default [
    {
        route: "/",
        component: DashboardPage
    },
    {
        route: "/preview/:hash",
        component: PreviewPage
    }
];