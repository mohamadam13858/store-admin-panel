import React from "react";
import PaginatedTable from "../../components/PaginatedTable";



const TableProduct = () => {
    const data = [{
        id: "1",
        category: "ddd",
        title: "nnn",
        price: "aaa",
        stoke: "hghg",
        like_count: "2",
        status: "1"
    }]
    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان محصول" },
        { field: "price", title: "قیمت محصول" },
    ]
    const additionalElements = () => {
        return(
        <>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" title="ویرایش محصول" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_product_modal"></i>
            <i className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip" title="ثبت ویژگی" data-bs-toggle="modal" data-bs-target="#add_product_attr_modal"></i>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="حذف محصول" data-bs-toggle="tooltip" data-bs-placement="top"></i>
        </>
   ) }
    const additionfield = {
        title: "عملیات",
        elements: () => additionalElements()

    }

    return (
        <div>
            <PaginatedTable data={data} dataInfo={dataInfo} additionfield={additionfield} />
        </div>
    )
}

export default TableProduct;