import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import FormikControl from "../../components/form/FormikControl";
import FormikError from "../../components/form/FormikError";
import PrevPageButton from "../../components/PrevPageButton";
import SpinnerLoad from "../../components/SpinnerLoad";
import { getCategoriesService } from "../../services/category";
import { initialValues, onSubmit, validationSchema } from "./core";
import { getAllColorsService } from "../../services/colors";
import { getAllGuaranteesService } from "../../services/guarantees";
import { getAllBrandsService } from "../../services/brands";
import SubmitButton from "../../components/form/SubmitButton";

const AddProduct = () => {
  const [parentCategories, setparentCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);
  const [brands, setBrands] = useState([]);

  const getAllParentCategories = async () => {
    const res = await getCategoriesService();
    console.log(res);
    if (res.status === 200) {
      setparentCategories(res.data.data.map(d => {
        return { id: d.id, value: d.title }
      }));
    }
  }


  const getAllColors = async () => {
    const res = await getAllColorsService()
    if (res.status === 200) {
      setColors(res.data.data.map(a => {
        return { id: a.id, value: a.title }
      }))
    }
  }
  const getAllGuarantees = async () => {
    const res = await getAllGuaranteesService()
    if (res.status === 200) {
      setGuarantees(res.data.data.map(a => {
        return { id: a.id, value: a.title }
      }))
    }
  }
  const getAllBrands = async () => {
    const res = await getAllBrandsService()
    if (res.status === 200) {
      setBrands(res.data.data.map(a => {
        return { id: a.id, value: a.original_name }
      }))
    }
  }



  useEffect(() => {
    getAllParentCategories();
    getAllBrands();
    getAllColors();
    getAllGuarantees()
  }, [])

  const handleSetMainCategories = async (value) => {
    setMainCategories("waiting");
    if (value > 0) {
      const res = await getCategoriesService(value);
      if (res.status === 200) {
        setMainCategories(res.data.data.map(d => {
          return { id: d.id, value: d.title }
        }));
      }
    } else {
      setMainCategories([]);
    }
  }





  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={validationSchema}
    >
      {formik => {
        return (
          <Form>
            <div className="container">
              <h4 className="text-center my-3">افزودن محصول جدید</h4>
              <div className="text-left col-md-6 col-lg-8 m-auto my-3">
                <PrevPageButton />
              </div>
              <div className="row justify-content-center">

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="select"
                  options={parentCategories}
                  name="parentCats"
                  label="دسته والد"
                  firstItem="دسته مورد نظر را انتخاب کنبد..."
                  handleOnchange={handleSetMainCategories}
                />


                {mainCategories === "waiting" ? (
                  <SpinnerLoad isSmall={true} colorClass="text-primary" />
                ) : null}


                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="searchableSelect"
                  options={typeof (mainCategories) == "object" ? mainCategories : []}
                  name="category_ids"
                  label="دسته اصلی"
                  firstItem="دسته مورد نظر را انتخاب کنبد..."
                  resultType="string"
                />


                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان"
                  placeholder="فقط حروف و اعداد"
                />
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="number"
                  name="price"
                  label="قیمت محصول"
                  placeholder="لطفا قیمت را وراد کنید"
                />
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="weight"
                  label="وزن محصول"
                  placeholder="وزن محصول (کیلوگرم)"
                />


                <button className="btn btn-outline-dark mb-2 w-25 justify-content-center row fs-14 ">افزودن برند</button>

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="select"
                  options={brands}
                  name="brand_id"
                  label="برند"
                  firstItem="برند مورد نظر را انتخاب کنبد..."
                />


                <button className="btn btn-outline-dark mb-2 w-25 justify-content-center row fs-14">افزودن رنگ</button>



                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="searchableSelect"
                  options={colors}
                  name="color_ids"
                  label="رنگ"
                  firstItem="رنگ مورد نظر را انتخاب کنبد..."
                  resultType="string"
                />

                <button className="btn btn-outline-dark mb-2 w-25 justify-content-center d-flex fs-14"
                  data-bs-toggle="modal"
                  data-bs-target="#add_guarantee_modal"
                > افزودن گارانتی</button>

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="searchableSelect"
                  options={guarantees}
                  name="guarantee_ids"
                  label="گارانتی"
                  firstItem="گارانتی مورد نظر را انتخاب کنبد..."
                  resultType="string"
                />



                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  type="text"
                  name="descriptions"
                  label="توضیحات"
                  placeholder="توضیحات"
                />


                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  type="text"
                  name="short_descriptions"
                  label=" توضیحات کوتاه"
                  placeholder=" توضیحات کوتاه"
                />
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  type="text"
                  name="cart_descriptions"
                  label=" توضیحات سبد"
                  placeholder=" توضیحات سبد"
                />

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="file"
                  name="image"
                  label="تصویر"
                  placeholder="تصویر"
                />


                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  type="text"
                  name="alt_image"
                  label=" توضیحات تصویر"
                  placeholder=" توضیحات تصویر"
                />



                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="keywords"
                  label="کلمات کلیدی"
                  placeholder="مثلا test1-test2-test3"
                />


                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="number"
                  name="stock"
                  label="موجودی"
                  placeholder="فقط از اعداد استفاده کنید (عدد)"
                />

                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="number"
                  name="discount"
                  label="درصد تخفیف"
                  placeholder="فقط از اعداد استفاده کنید (عدد)"
                />

                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4 ">
                  <SubmitButton />
                  <PrevPageButton className="me-2" />
                </div>

              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};

export default AddProduct;
