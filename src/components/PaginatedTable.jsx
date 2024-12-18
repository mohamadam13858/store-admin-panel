import React from "react";




const PaginatedTable = ({ data, dataInfo, additionfield }) => {
    return (
        <div>
            <table className="table table-responsive text-center table-hover table-bordered">
                <thead className="table-secondary">
                    <tr>
                        {dataInfo.map(i => (
                            <th key={i.field}>{i.title}</th>
                        ))}
                        {
                            additionfield ? (
                                <th>{additionfield.title}</th>
                            ) : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((m) => (
                        <tr>
                            {dataInfo.map((i) => (
                                <td key={i.field + "_" + m.id}>{m[i.field]}</td>
                            ))}
                            {
                                additionfield ? (
                                    <th>{additionfield.elements(m.id)}</th>
                                ) : null
                            }

                        </tr>
                    ))}
                    {/* <td>
                            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" title="ویرایش محصول" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_product_modal"></i>
                            <i className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip" title="ثبت ویژگی" data-bs-toggle="modal" data-bs-target="#add_product_attr_modal"></i>
                            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="حذف محصول" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                        </td> */}
                </tbody>
            </table>
            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}



export default PaginatedTable;