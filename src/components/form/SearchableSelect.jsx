import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import FormikError from "./FormikError";




const SearchableSelect = ({ resultType, options = [], name, label, className, firstItem, initialItems }) => {
    const [selectedItems, setSelectedItems] = useState([])
    const [showItems, setShowItems] = useState(false)
    const [copyOptions, setCopyOptions] = useState(options)



    useEffect(() => {
        setSelectedItems(initialItems)
    }, [initialItems])


    const handleSelectItem = (selectedId, formik) => {

        if (selectedItems.findIndex(d => d.id == selectedId) == -1 && selectedId > 0) {



            const newData = [...selectedItems, options.filter(o => o.id == selectedId)[0]]
            setSelectedItems(newData)




            const selectedIds = newData.map(nd => nd.id)
            const nameValue = resultType == "string" ? selectedIds.join("-") : selectedIds
            formik.setFieldValue(name, nameValue)
        }
    };

    const handleRemoveFromSelectedItems = (event, selectedId, formik) => {
        event.stopPropagation()
        setSelectedItems(oldData => {
            const newData = oldData.filter(d => d.id != selectedId);

            const selectedIds = newData.map(nd => nd.id);
            formik.setFieldValue(name, selectedIds.join("-"));

            return newData;
        });
    };

    useEffect(() => {
        document.querySelector("body").addEventListener('click', () => {
            setShowItems(false)
        })
    }, [])

    useEffect(() => {
        setCopyOptions(options)
    }, [options]);





    return (
        <Field>
            {({ form }) => {
                return (
                    <div className={`col-12 ${className}`}>
                        <div className="input-group mb-3 dir_ltr pointer" onClick={(e) => {
                            e.stopPropagation()
                            setShowItems(!showItems)

                        }}
                        >

                            <div className="form-select " id={name + "-select"}>
                                {selectedItems.length > 0 ? selectedItems.map((selectedItems) => (
                                    <span className="chips_elem" key={selectedItems.id}>
                                        <i className="fas fa-times text-danger" onClick={(e) => handleRemoveFromSelectedItems(e, selectedItems.id, form)}></i>
                                        {selectedItems.value}
                                    </span>
                                ))
                                    : (
                                        <span className="text-secondary">{firstItem}</span>
                                    )}
                                <div className={`multi_select_items_content ${!showItems ? "d-none" : ""}`}>
                                    <input type="text" className="form-select" autoFocus={showItems}
                                        placeholder="قسمتی از عنوان را وارد کنید"
                                        onClick={(e) => e.stopPropagation()} onChange={(e) => setCopyOptions(options.filter(o => o.value.includes(e.target.value)))}
                                    />
                                    <ul className="p-0">
                                        {copyOptions.map((o) => (
                                            <li key={o.id} className="multi_select_items pointer"
                                                onClick={() => handleSelectItem(o.id, form)}
                                            >{o.value}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <span htmlFor={name + "-select"} className="input-group-text w_6rem justify-content-center">
                                {label}
                            </span>
                        </div>
                        <ErrorMessage name={name} component={FormikError} />
                    </div>
                )
            }}
        </Field>
    )
}




export default SearchableSelect;