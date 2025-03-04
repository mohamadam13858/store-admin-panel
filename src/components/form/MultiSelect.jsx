import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import FormikError from "./FormikError";

const MultiSelect = ({ resultType, options , name, label, className, firstItem }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (selectedId, formik) => {
        setSelectedItems(oldData => {
            if (oldData.findIndex(d => d.id == selectedId) == -1 && selectedId > 0) {
                const newData = [...oldData, options.filter(d => d.id == selectedId)[0]];

                const selectedIds = newData.map(nd => nd.id);
                const nameValue = resultType === "string" ? selectedIds.join("-") : selectedIds;
                formik.setFieldValue(name, nameValue);

                return newData;
            } else {
                return oldData;
            }
        });
    };

    const handleRemoveFromSelectedItems = (selectedId, formik) => {

        setSelectedItems(oldData => {
            const newData = oldData.filter(d => d.id != selectedId);

            const selectedIds = newData.map(nd => nd.id);
            formik.setFieldValue(name, selectedIds.join("-"));

            return newData;
        });
    };

    return (
        <Field>
            {({ form }) => (
                <div className={`col-12 ${className}`}>
                    <div className="input-group mb-3 dir_ltr">
                        <select
                            className="form-select chips_container"
                            id={`${name}_select`}
                            onChange={(e) => handleSelectItem(e.target.value, form)}
                        >
                            <option value="">{firstItem}</option>
                            {Array.isArray(options) ? options.map((o) => (
                                <option key={o.id} value={o.id}>{o.value}</option>
                            )) : null}
                        </select>
                        <label htmlFor={`${name}_select`} className="input-group-text w_6rem justify-content-center">
                            {label}
                        </label>
                    </div>

                    <ErrorMessage name={name} component={FormikError} />

                    <div className="col-12 col-md-6 col-lg-8 chips_container">
                        {selectedItems.map((item) => (
                            <span className="chips_elem" key={item.id}>
                                <i
                                    className="fas fa-times text-danger"
                                    onClick={() => handleRemoveFromSelectedItems(item.id, form)}
                                    ></i>
                                {item.value}
                            </span>
                        ))}
                    </div>
            </div>
            )}
        </Field>
    );
};

export default MultiSelect;
