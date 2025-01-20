import { FastField } from "formik";
import React from "react";
import Spinnerload from "../spinnerload";






const SubmitButton = () =>{
    return(
        <FastField>
        {({ form }) => {
          return (
              <button className="btn btn-primary" disabled={form.isSubmitting}>ذخیره
                {form.isSubmitting ? <Spinnerload colorClass={"text-white"} isSmall={true} inline={true}/> : null}
              </button>
          )
        }}
      </FastField>
    )
}



export default SubmitButton