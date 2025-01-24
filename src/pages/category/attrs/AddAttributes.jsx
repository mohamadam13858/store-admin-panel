import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaginatedTable from '../../../components/PaginatedTable';
import Actions from '../tableAdditons/Actions';
import ShowInMenu from '../tableAdditons/ShowInMenu';
import { convertDateToJalali } from '../../../utils/convertDate';
import Addcategory from '../AddCategory';
import ShowInFilter from './ShowInFilter';
import AttrActions from './AttrActions';
import PrevPageButton from '../../../components/PrevPageButton';
import { getCategoriesService } from '../../../services/category';
import { getCategoryAttuService } from '../../../services/categoryAttr';
const AddAttributes = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()






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
            elements: (rowData) => <AttrActions rowData={rowData} />,
        }
    ];
    const searchParams = {
        title: "جستجو",
        placeholder: "قسمتی از عنوان را وارد کنید",
        searchField: "title"
    }

    const handleGetCategoryAttrs = async ()=>{
        setLoading(true)
        try {
            const res = await getCategoryAttuService(location.state.categoryData.id)
            if (res.status === 200) {
                setData(res.data.data)

            }
            
        } catch (error) {
            console.log(error.message);
            
        }finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        handleGetCategoryAttrs()

    }, [])
    return (
        <>
            <h4 className=' text-center my-3'>مدیریت ویژگی های دسته بندی </h4>
            <h6 className=' text-center my-3'>
                ویژگس های :
                <span className=' text-primary'>
                    {location.state.categoryData.title}
                </span>
            </h6>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="row my-3">
                        <div className="col-12 col-md-6 col-lg-4 my-1">
                            <input type="text" className="form-control" placeholder="عنوان ویژگی جدید" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 my-1">
                            <input type="text" className="form-control" placeholder="واحد ویژگی جدید" />
                        </div>
                        <div className="col-8 col-lg-2 my-1">
                            <div className="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
                                <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">نمایش در فیلتر</label>
                                <input className="form-check-input pointer mx-3" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                        </div>
                        <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
                            <i className="fas fa-check text-light bg-success rounded-circle p-2 mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text" title="ثبت ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                        </div>
                    </div>
                    <hr />

                    <PaginatedTable
                        data={data}
                        dataInfo={dataInfo}
                        additionField={additionField}
                        numOfPAge={5}
                        loading={loading}
                        searchParams={searchParams}
                    >
                        <PrevPageButton/>

                    </PaginatedTable>


                </div>
            </div>

        </>
    );
}

export default AddAttributes;
