import React, { useContext } from "react";
import { AdminContext } from "../../../context/adminLayoutContext";

const Rightcontent = () => {
  const {setShoeSidebar} = useContext(AdminContext);
  return (
    <div className="right_content h-100 py-1 bg-dark">
      <div className="form-check form-switch mx-4 d-none d-md-block">
        <input
          id="handle_toggle_sidemenu"
          className="form-check-input pointer"
          type="checkbox"
          onChange={(e)=>setShoeSidebar(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default Rightcontent;
