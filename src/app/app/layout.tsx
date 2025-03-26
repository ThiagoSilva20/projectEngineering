import { PropsWithChildren } from "react";
import { Sidebar } from "./admin/dashboard/(main)/_components/sidebar";

export default function Layout({children}: PropsWithChildren){
    return(
    <div className="md:ml-14 ">
        <Sidebar/>
        {children}
    </div>)
}