import React, { useContext } from "react";
import Navbar from "../admin/navbar/Index"
import Sidebar from "../admin/sidebar/Index"
import AdminContextContainer, { AdminContext } from "../../context/AdminLayoutsContext";


const Index = () => {
    const {showSidebar} = useContext(AdminContext)
    return (

        
        <AdminContextContainer>
        <div>
            <Navbar/>
            <Sidebar/>
            <section id="content_section" class={`bg-light py-2 px-3 ${showSidebar? "with_sidebar" : null}`}></section>
        </div>
        </AdminContextContainer>
    )
}

export default Index;