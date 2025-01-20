import React, { useEffect, useState } from "react";
import ModalsContainer from "../../components/ModalsContainer";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import FormikControl from "../../components/form/FormikControl";
import { createNewCategory, createNewCategoryService, GetCategoriesService } from "../../services/category";
import { Alert } from "../../utils/alert";
import Spinnerload from "../../components/spinnerload";
import SubmitButton from "../../components/form/submitButton";
import { useParams } from "react-router-dom";

const initialValues = {
  parent_id: "",
  title: "",
  description: "",
  image: "",
  is_active: true,
  show_in_menu: true,
};

const validationSchema = Yup.object({
  parent_id: Yup.number(),
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[\u0600-\u06FF\sA-Za-z0-9@!%$?&]+$/, "لطفا از حروف و اعداد استفاده کنید"),
  description: Yup.string().matches(/^[\u0600-\u06FF\sA-Za-z0-9@!%$?&]*$/, "لطفا از حروف و اعداد استفاده کنید"),
  image: Yup.mixed()
    .test("filesize", "حجم فایل نمی‌تواند بیشتر از 500 کیلوبایت باشد", (value) => !value || (value.size <= 500 * 1024))
    .test("format", "فرمت فایل باید jpg باشد", (value) => !value || (value.type === "image/jpeg")),
  is_active: Yup.boolean(),
  show_in_menu: Yup.boolean(),
});

const onSubmit = async (values, actions, setRender) => {
  try {
    values = {
      ...values,
      is_active: values.is_active ? 1 : 0,
      show_in_menu: values.show_in_menu ? 1 : 0,
    }
    const res = await createNewCategoryService(values)
    if (res.status === 201) {
      Alert("رکورد ثبت شد", res.data.message, "success")
      actions.resetForm()
      setRender(last => last + 1)

    }

  } catch (error) {
    console.log(error.message);

  }
};

// تعریف متغیر parents
// const parents = [
//   { key: 'انتخاب کنید', value: '' },
//   { key: 'دسته 1', value: '1' },
//   { key: 'دسته 2', value: '2' },
// ];
const Addcategory = ({ setRender }) => {
  const params = useParams()
  const [parents, setParents] = useState([])
  const [reInitialValues, setReInitialValues] = useState(null)
  const handleGetParentsCategories = async () => {
    try {
      const res = await GetCategoriesService()
      if (res.status === 200) {
        const allParents = res.data.data
        setParents(allParents.map(p => {
          return { id: p.id, value: p.title }
        }))

      }
    } catch (error) {
      Alert("مشکل !", "متاسفانه دسته بندی های ولد دریافت نشد", "warning")
    }
  }
  useEffect(() => {
    handleGetParentsCategories()
  }, []);

  useEffect(()=>{
        if (params.categoryId) {
          setReInitialValues({
            ...initialValues ,
            parent_id: params.categoryId
          })
        }else{
          setReInitialValues(null)
        }
  }, [params.categoryId])

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>

      <ModalsContainer
        fullScreen={true}
        id="add_product_category_modal"
        title="افزودن دسته محصولات"
      >
        <Formik
          initialValues={reInitialValues||initialValues}
          onSubmit={(values, actions) => onSubmit(values, actions, setRender)}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <div className="container">
              <div className="row justify-content-center">

                {parents.length > 0 ? (
                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={parents}
                    name="parent_id"
                    label="دسته والد"
                  />
                ) : null}

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان دسته"
                  placeholder="عنوان دسته"
                />

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  name="description"
                  label="توضیحات"
                  placeholder="توضیحات"
                />

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="file"
                  name="image"
                  label="تصویر"
                  placeholder="تصویر"
                />

                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      control="switch"
                      name="is_active"
                      label="وضعیت فعال"
                    />
                  </div>
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      control="switch"
                      name="show_in_menu"
                      label="نمایش در منو"
                    />
                  </div>
                </div>

                  <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                    <SubmitButton/>
                  </div>
              </div>
            </div>
          </Form>
        </Formik>
      </ModalsContainer>
    </>
  );
};

export default Addcategory;
