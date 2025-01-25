import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaginatedTable from '../../../components/PaginatedTable';
import ShowInFilter from './ShowInFilter';
import AttrActions from './AttrActions';
import PrevPageButton from '../../../components/PrevPageButton';
import { addCategoryAttrService, getCategoryAttuService } from '../../../services/categoryAttr';
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import { unix } from 'moment-jalaali';
import FormikControl from '../../../components/form/FormikControl';
import SubmitButton from '../../../components/form/SubmitButton';
import { Alert } from '../../../utils/alerts';
const AddAttributes = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()


    const initialValues = {
        title: "",
        unit: "",
        in_filter: false
    }


    const onSubmit = async (values, actions, catId , setData) => {

        try {
            values = {
                ...values,
                in_filter: values.in_filter ? 1 : 0
            }
            const res = await addCategoryAttrService(catId, values)
            if (res.status === 201) {
                Alert("انجام شد" , res.data.message , "success")
                setData(oldData => [...oldData , res.data.data])
                actions.resetForm()
            }

        } catch (error) {
            console.log(error);
            

        }
    }



    const validationSchema = Yup.object({
        title: Yup.string()
            .required("لطفا این قسمت را پر کنید")
            .matches(/^[\u0600-\u06FF\sA-Za-z0-9@!%$?&]+$/, "لطفا از حروف و اعداد استفاده کنید"),
        unit: Yup.string().required("لطفا این قسمت را پر کنید").matches(/^[\u0600-\u06FF\sA-Za-z0-9@!%$?&]*$/, "لطفا از حروف و اعداد استفاده کنید"),
        in_filter: Yup.boolean(),
    });




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
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, location.state.categoryData.id , setData)}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <div className="row my-3">
                                <FormikControl
                                    control="input"
                                    type="text"
                                    name="title"
                                    label="عنوان"
                                    className="col-md-6 col-lg-4 my-1"
                                    placeholder="عنوان ویژگی جدید"
                                />
                                <FormikControl
                                    control="input"
                                    type="text"
                                    name="unit"
                                    label="واحد"
                                    className="col-md-6 col-lg-4 my-1"
                                    placeholder="واحد ویژگی جدید"
                                />

                                <div className="col-8 col-lg-2 my-1">
                                    <FormikControl
                                        control="switch"
                                        name="in_filter"
                                        label="نمایش در فیلتر"
                                    />
                                </div>
                                <div className="col-4 col-lg-2 d-flex justify-content-center align-items-start my-1">
                                    <SubmitButton />
                                </div>
                            </div>
                        </Form>
                    </Formik>
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

export default AddAttributes;
