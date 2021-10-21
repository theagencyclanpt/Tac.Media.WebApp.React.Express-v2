import React from "react";
import { IPageMap } from "@/ui/interfaces";
import { DashboardPage } from "./dashboard.page";
import { PreviewPage } from "./preview.page";
import { LoginPage } from "./login.page";


export default [
    {
        route: "/",
        component: <DashboardPage />,
        isProtected: true
    },
    {
        route: "/preview/:hash",
        component: <PreviewPage />,
        isProtected: false
    },
    {
        route: "/login",
        component: <LoginPage />,
        isProtected: false
    }
] as IPageMap[];