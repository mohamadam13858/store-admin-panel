import React from "react";



const Actions = () => {
    return (
        <>
            <i
                className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش محصول"
                data-bs-placement="top"
                data-bs-toggle="modal"
                data-bs-target="#add_products_modal"
            ></i>

            <i
                className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف محصول"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
            ></i>
        </>
    )
}


export default Actions