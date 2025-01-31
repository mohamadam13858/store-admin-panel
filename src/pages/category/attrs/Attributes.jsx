import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaginatedTable from '../../../components/PaginatedTable';
import ShowInFilter from './ShowInFilter';
import AttrActions from './AttrActions';
import PrevPageButton from '../../../components/PrevPageButton';
import {  deleteCategoryAttrService, getCategoryAttuService } from '../../../services/categoryAttr';
import { Alert, Confirm } from '../../../utils/alerts';
import AddAttr from './AddAttr';
const Attributes = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const [attrToEdit, setAttrToEdit] = useState(null)
    const [reInitialValues, setReInitialValues] = useState(null)


    const dataInfo = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان محصول" },
        { field: "unit", title: "واحد" }
    ];


    const additionField = [
        ,
        {
            title: "نمایش در فیلتر",
            elements: (rowData) => <ShowInFilter rowData={rowData} />
        }
        ,
        {
            title: "عملیات",
            elements: (rowData) => <AttrActions rowData={rowData} attrToEdit={attrToEdit} setAttrToEdit={setAttrToEdit} handleDeleteCategoryAttr={handleDeleteCategoryAttr} />,
        }
    ];


    const searchParams = {
        title: "جستجو",
        placeholder: "قسمتی از عنوان را وارد کنید",
        searchField: "title"
    }

    const handleGetCategoryAttrs = async () => {
        setLoading(true)
        try {
            const res = await getCategoryAttuService(location.state.categoryData.id)
            if (res.status === 200) {
                setData(res.data.data)

            }

        } catch (error) {
            console.log(error.message);

        } finally {
            setLoading(false)
        }
    }

    const handleDeleteCategoryAttr = async(attr)=>{
        if (await Confirm(`حذف ${attr.title}` , "ایا از حذف این رکورداطمینان دارید؟") ) {
            try {
                const res = await deleteCategoryAttrService(attr.id)
                if (res.status === 200) {
                    Alert("انجام شد" , res.data.message , "success")
                    setData(oldData=>[...oldData].filter(d=>d.id != attr.id))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    useEffect(() => {
        handleGetCategoryAttrs()

    }, [])

    useEffect(() => {
        if (attrToEdit) {
            setReInitialValues({
                title: attrToEdit.title,
                unit: attrToEdit.unit,
                in_filter: attrToEdit.in_filter ? 1 : 0
            });
        } else {
            setReInitialValues(null)
        }
    }, [attrToEdit]);

    return (
        <>
            <h4 className=' text-center my-3'>مدیریت ویژگی های دسته بندی </h4>
            <h6 className=' text-center my-3'>
                ویژگی های :
                <span className=' text-primary'>
                    {location.state.categoryData.title}
                </span>
            </h6>
            <div className="container">
                <div className="row justify-content-center">

                    <AddAttr reInitialValues={reInitialValues} location={location} setData={setData} attrToEdit={attrToEdit} setAttrToEdit={setAttrToEdit} />

                    <hr />

                    <PaginatedTable
                        data={data}
                        dataInfo={dataInfo}
                        additionField={additionField}
                        numOfPAge={5}
                        loading={loading}
                        searchParams={searchParams}
                    >
                        <PrevPageButton />

                    </PaginatedTable>


                </div>
            </div>

        </>
    );
}

export default Attributes;
