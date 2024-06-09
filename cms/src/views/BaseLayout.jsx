import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar'

export default function BaseLayout(){
    return (
        <>
            <div className="flex">
                <Sidebar></Sidebar>
                <Outlet></Outlet>
            </div>
        </>
    )
}