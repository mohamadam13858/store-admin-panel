import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import Actions from './tableAdditional/Actions';
import AddColor from './AddColor';
import { Alert } from '../../utils/alerts';
import { getAllColorsService } from '../../services/colors';

const ColorsTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)




    const dataInfo = [
        {field: "id" , title: "#"},
        {field: "title" , title: "عنوان"},
        {field: "code" , title: "کد رنگ"} 

    ]

    const additionField = [

        {
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData}/>,
        },

    ]

    const handleGetAllColors = async() =>{
        setLoading(true)
        const res = await getAllColorsService()
        res && setLoading(false)
        if (res.status === 200) {
            Alert("انجام شد" , res.data.message , "success")
             setData(res.data.data)
        }
    }

     useEffect(() => {

        handleGetAllColors()

     }, []);


    const searchParams = {
        title: "جستجو",
        placeholder: "قسمتی از عنوان را وارد کنید",
        searchField: "title",
    }
    return (
        <>
            <PaginatedTable
                data={data}
                dataInfo={dataInfo}
                additionField={additionField}
                numOfPAge={8}
                searchParams={searchParams}
                loading={loading}
            >
                <AddColor setData={setData}/>
            </PaginatedTable>
            {/* <table className="table table-responsive text-center table-hover table-bordered">
                <thead className="table-secondary">
                    <tr>
                        <th>#</th>
                        <th>نام رنگ</th>
                        <th>کد رنگ</th>
                        <th>رنگ</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>مشکی</td>
                        <td>#000000</td>
                        <td className="p-2">
                            <div className="w-100 h-100 d-block" style={{ background: "#000", color: "#000" }}>...</div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>قزمز</td>
                        <td className="dir_ltr">#f44336 </td>
                        <td className="p-2">
                            <div className="w-100 h-100 d-block" style={{ background: "#f44336", color: "#f44336" }}>...</div>
                        </td>
                        <td>
                        </td>
                    </tr>
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
            </nav> */}
        </>
    );
}

export default ColorsTable;
