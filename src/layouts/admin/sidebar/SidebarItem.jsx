import React from "react";


const SidebarItem = ({icon , title})=>{
    return(
        <a
        className="py-1 text-start pe-4 sidebar_menu_item li_style" 
      >
        <i className={`ms-3 icon text-light ${icon}`}></i>
        <span className="hiddenable no_wrap font_08">{title}</span>
      </a>
    )
}

export default SidebarItem;