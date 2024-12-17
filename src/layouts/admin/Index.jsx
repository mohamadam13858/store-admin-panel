import React, { useContext, useEffect } from "react";
import AdminContextContainer, { AdminContext } from "../../context/adminLayoutContext";
import Category from "../../pages/category/Category";
import Dashboard from "../../pages/dashboard/Dashboard";
import { toggleSidebar } from "../../utils/initialDoms";
import Navbar from "./navbar/Index";
import Sidebar from "./sidebar/Index";
import Content from "../../pages/content";

const Index = () => {
  useEffect(()=>{
    // require('../../assets/js/toggleSidebar')
    // toggleSidebar();
  },[])
  return (
    <AdminContextContainer>
      <div>
        <Content/>
        <Navbar />
        <Sidebar />
      </div>
    </AdminContextContainer>
  );
};

export default Index;
