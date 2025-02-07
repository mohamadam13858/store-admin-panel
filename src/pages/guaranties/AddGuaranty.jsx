import React from 'react';
import ModalsContainer from '../../components/ModalsContainer';
import SubmitButton from '../../components/form/SubmitButton';
import { Form, Formik } from 'formik';
import FormikControl from '../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './core';


const AddGuaranty = ({ setData }) => {


    return (

        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_guarantee_modal">
                <i className="fas fa-plus text-light"></i>
            </button>
            <ModalsContainer
                id={"add_guarantee_modal"}
                title={"افزودن گارانتی"}
                fullScreen={false}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, actions) => onSubmit(values, actions , setData)}
                            validationSchema={validationSchema}
                        >
                            <Form>

                                <FormikControl
                                    control="input"
                                    type="text"
                                    name="title"
                                    label="عنوان"
                                    placeholder="عنوان را وارد کنید"
                                />
                                <FormikControl
                                    control="textarea"
                                    type="text"
                                    name="descriptions"
                                    label="توضیحات"
                                    placeholder="توضیحات را وارد کنید"
                                />
                                <FormikControl
                                    control="input"
                                    type="number"
                                    name="length"
                                    label="مدت گارانتی"
                                    placeholder="مدت گارانتی را وارد کنید"
                                />
                                <FormikControl
                                    control="input"
                                    type="text"
                                    name="length_unit"
                                    label="واحد"
                                    placeholder="واحد را وارد کنید"
                                />

                                <div className="btn_box text-center col-12">
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

export default AddGuaranty;
