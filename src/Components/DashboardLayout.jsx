
import { Outlet } from "react-router-dom"

import Navber from "./Navber"
import Sidebar from "./Deshboard/Sidebar"

export default function DashboardLayout() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-100">
                <Navber />
                <main className="p-4 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
