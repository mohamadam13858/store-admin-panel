import React from "react";





const Actions = () => {
    return (
        <>
        <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش رنگ"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_colors_modal"
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف رنگ"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
        </>

    )
}

export default Actions;


