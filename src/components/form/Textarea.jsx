import { ErrorMessage, FastField } from "formik";
import React from "react";
import FormikControl from "./FormikControl";




const Textarea = ({className,name , placeholder , label }) => {
    return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
                <FastField as="textarea" name={name} className="form-control" placeholder={placeholder}/>
                <span className="input-group-text w_6rem justify-content-center">
                  {label}
                </span>
            </div>
            <ErrorMessage name={name} component={FormikControl}/>
        </div>
    )
}


export default Textarea;