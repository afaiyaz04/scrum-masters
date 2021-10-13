import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdIcons.MdDashboard />,
        cName: "nav-text",
    },
    {
        title: "Contacts",
        path: "/contacts",
        icon: <MdIcons.MdContacts />,
        cName: "nav-text",
    },
    {
        title: "Orders",
        path: "/orders",
        icon: <FaIcons.FaFileInvoice />,
        cName: "nav-text",
    },
    {
        title: "Users",
        path: "/users",
        icon: <FaIcons.FaUsers />,
        cName: "nav-text",
    },
    {
        title: "Contracts",
        path: "/contracts",
        icon: <FaIcons.FaLock />,
        cName: "nav-text",
    },
];
