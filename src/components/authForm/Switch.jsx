import { FastField } from "formik";
import react from "react";



const Switch = ({name , label}) => {
    return (
        <div className="form-check form-switch">
            <FastField className="form-check-input" type="checkbox" name={name} />
            <label className="form-check-label"  >{label}</label>
        </div>
    )
}
export default Switch;