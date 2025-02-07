import React, { useEffect, useState } from 'react';
import AddGuaranty from './AddGuaranty';
import Actions from './tableAdditional/Actions';
import { getAllGuarantiesService } from '../../services/guaranties';
import PaginatedTable from '../../components/PaginatedTable';

const GuarantiesTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [guarantiesToEdit , setGuarantiesToEdit] = useState([])


    const dataInfo = [
        {field: "id" , title:"#"},
        { field: "title", title: "عنوان" },
        { field: "descriptions", title: "توضیحات" },
        { field: "length", title: "مدت گارانتی" },
        { field: "length_unit", title: "واحد" },
    ]
    const additionField = [
        {
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} setGuarantiesToEdit={setGuarantiesToEdit} />,
        },
    ];

    const searchParams = {
        title: "جستجو",
        placeholder: "قسمتی از عنوان را وارد کنید",
        searchField: "title",
    };

    const handleGetAllGuaranties = async () => {
        setLoading(true)
        const res = await getAllGuarantiesService()
        res && setLoading(false)
        if (res.status === 200) {
            setData(res.data.data)
        }
    }
    useEffect(() => {
         
        handleGetAllGuaranties()

    }, []);


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
                <AddGuaranty setData={setData} />
            </PaginatedTable>
        </>
    );
}

export default GuarantiesTable;
