import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../components/PaginatedTable';
import Actions from './tableAdditional/Actions';
import AddColor from './AddColor';
import { Alert, Confirm } from '../../utils/alerts';
import { deleteColorService, getAllColorsService } from '../../services/colors';

const ColorsTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [colorToEdit, setColorToEdit] = useState(null)




    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان" },
        { field: "code", title: "کد رنگ" }

    ]

    const additionField = [
        {
            title: "رنگ",
            elements: (rowData) => <div className=' w-100 h-100 d-block ' style={{ background: rowData.code, color: rowData.code }}>...</div>
        },

        {
            title: "عملیات",
            elements: (rowData) => <Actions rowData={rowData} setColorToEdit={setColorToEdit} handleDeleteColor={handleDeleteColor} />,
        },

    ]

    const handleGetAllColors = async () => {
        setLoading(true)
        const res = await getAllColorsService()
        res && setLoading(false)
        if (res.status === 200) {
            Alert("انجام شد", res.data.message, "success")
            setData(res.data.data)
        }
    }

    const handleDeleteColor = async (color) => {
        if (await Confirm("حذف رنگ", `ایا از حذف ${color.title} اطمینان دارید؟`)) {
            const res = await deleteColorService(color.id)
            if (res.status === 200) {
                Alert("انجام شد", res.data.message, "success")
                setData((lastData) => lastData.filter((d) => d.id != color.id))
            }
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
                <AddColor setData={setData} colorToEdit={colorToEdit} setColorToEdit={setColorToEdit} />
            </PaginatedTable>
        </>
    );
}

export default ColorsTable;
