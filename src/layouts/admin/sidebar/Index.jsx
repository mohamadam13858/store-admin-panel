import React, { useContext } from "react";
import { AdminContext } from "../../../context/adminLayoutContext";
import Avatar from "./Avatar";
import SidebarGroupTitle from "./SidebarGroupTitle";
import SidebarItem from "./SidebarItem";

const Index = () => {
  const {showSidebar} = useContext(AdminContext)
  return (
    <section id="sidebar_section">
      <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSidebar ? "expanded" : null}`}>
        <div className="p-0 m-0">
          <Avatar name="قاسم بساکی" imagePath="/assets/images/avatar/user2.jpg"/>
          <SidebarItem targetPath="/" icon="fas fa-tachometer-alt" title="داشبورد"/>
          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title="فروشگاه"/>
          <SidebarItem targetPath="/Category" icon="fas fa-stream" title="مدیریت گروه محصول"/>
          <SidebarItem targetPath="/Product" icon="fas fa-cube" title="مدیریت محصول"/>
          <SidebarItem targetPath="*" icon="fas fa-copyright"  title="مدیریت برندها"/>
          <SidebarItem targetPath="*" icon="fab fa-pagelines" title="مدیریت گارانتی ها"/>
          <SidebarItem targetPath="*" icon="fas fa-palette"  title="مدیریت رنگ ها"/>
          <SidebarItem targetPath="*" icon="fas fa-percentage" title="مدیریت تخفیف ها"/>
          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title="سفارشات و سبد"/>
          <SidebarItem targetPath="*" icon="fas fa-shopping-basket" title="مدیریت سبد ها"/>
          <SidebarItem targetPath="*" icon="fas fa-luggage-cart" title="مدیریت سفارشات"/>
          <SidebarItem targetPath="*" icon="fas fa-truck-loading" title="مدیریت نحوه ارسال"/>
          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title="کاربران و همکاران"/>
          <SidebarItem targetPath="*" icon="fas fa-users" title="مشاهده کاربران"/>
          <SidebarItem targetPath="*" icon="fas fa-user-tag" title="نقش ها"/>
          <SidebarItem targetPath="*" icon="fas fa-shield-alt" title="مجوز ها"/>
          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title="ارتباطات"/>
          <SidebarItem targetPath="*" icon="fas fa-question-circle" title="سوال ها"/>
          <SidebarItem targetPath="*" icon="fas fa-comment" title="نظرات"/>
        </div>
      </div>
    </section>
  );
};

export default Index;
