import React from "react";
const Actions = ({rowData , setGuarantiesToEdit , handleDeleteGuaranties}) => {
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش گارانتی"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_guarantee_modal"
        onClick={()=>setGuarantiesToEdit(rowData)}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف گارانتی"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>(handleDeleteGuaranties(rowData))}
      ></i>
    </>
  );
};

export default Actions;