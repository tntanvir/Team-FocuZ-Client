
import { Outlet } from "react-router-dom"

import Navber from "./Navber"
import Sidebar from "./Deshboard/Sidebar"
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { DrawerContext } from "../Utils/SidebarContext";
export default function DashboardLayout() {
    // const [open, setOpen] = useState(false);

    // const openDrawer = () => setOpen(true);
    // const closeDrawer = () => setOpen(false);
    const { open, openDrawer, closeDrawer } = useContext(DrawerContext);

    return (
        <div className="flex h-screen">
            <div className="hidden md:block ">

                <Sidebar />
            </div>
            <div className="md:hidden ">
                {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
                <Drawer open={open} onClose={closeDrawer} className="w-fit">
                    <Sidebar />
                </Drawer>
            </div>
            <div className="flex-1 flex flex-col bg-gray-100">
                <Navber />
                <main className="p-4 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
