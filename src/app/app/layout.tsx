import { PropsWithChildren } from "react";
import { Sidebar } from "./admin/dashboard/(main)/_components/sidebar";

export default function Layout({children}: PropsWithChildren){
    return(
    <div className="ml-14 p-4">
        <Sidebar/>
        {children}
    </div>)
}