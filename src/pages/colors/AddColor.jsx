import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../components/ModalsContainer';
import { FastField, Form, Formik } from 'formik';
import FormikControl from '../../components/form/FormikControl';
import SubmitButton from '../../components/form/SubmitButton';
import { initialValues, onSubmit, validationSchema } from './core';

const AddColor = ({ setData, colorToEdit, setColorToEdit }) => {
    const [reInitValues, setReInitValues] = useState(null)

    useEffect(() => {
        if (colorToEdit) {


            setReInitValues({
                title: colorToEdit.title,
                code: colorToEdit.code
            })
        }
        else {
            setReInitValues(null)
        }

    }, [colorToEdit]);
    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_color_modal"
                onClick={() => setColorToEdit(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>
            <ModalsContainer
                fullScreen={false}
                id={"add_color_modal"}
                title={colorToEdit ? "ویرایش رنگ" : "افزودن رنگ جدید"}
                className={colorToEdit ? "text-warning" : "text-success"}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <Formik
                            initialValues={reInitValues || initialValues}
                            onSubmit={(values, actions) => onSubmit(values, actions, setData, colorToEdit)}
                            validationSchema={validationSchema}
                            enableReinitialize
                        >
                            <Form>
                                <FormikControl
                                    control="input"
                                    type="text"
                                    name="title"
                                    label="عنوان"
                                    placeholder="عنوان را وارد کنید"
                                />
                                <FastField>
                                    {({ form }) => {
                                        return (

                                            <div className="col-12 d-flex align-items-center justify-content-start">
                                                <label htmlFor="exampleColorInput" className="form-label m-0">انتخاب رنگ</label>
                                                <input type="color" className="form-control form-control-color mx-2" id="code" name='code' title="انتخاب رنگ"
                                                    // onChange={(e) => handleChangeColorCodeField(e, form)}
                                                     />
                                            </div>
                                        )
                                    }}
                                </FastField>

                                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                    <SubmitButton />
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

            </ModalsContainer>
        </>
    );
}

export default AddColor;
