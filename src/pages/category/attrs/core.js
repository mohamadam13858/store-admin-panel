import { addCategoryAttrService, editCategoryAttrService } from "../../../services/categoryAttr"
import { Alert } from "../../../utils/alerts"
import * as Yup from "yup";


export const initialValues = {
    title: "",
    unit: "",
    in_filter: false
}


export const onSubmit = async (values, actions, catId, setData, attrToEdit, setAttrToEdit) => {

    try {
        values = {
            ...values,
            in_filter: values.in_filter ? 1 : 0
        }
        if (attrToEdit) {
            const res = await editCategoryAttrService(attrToEdit.id, values)
            if (res.status === 200) {
                setData(oldData =>{
                    const newData = [...oldData]
                    const index = newData.findIndex(d=>d.id === attrToEdit.id)
                    newData[index] = res.data.data
                    return newData
                })
                Alert("انجام شد", res.data.message, "success")
                setAttrToEdit(null)
            }
        } else {

            const res = await addCategoryAttrService(catId, values)
            if (res.status === 201) {
                Alert("انجام شد", res.data.message, "success")
                setData(oldData => [...oldData, res.data.data])
                actions.resetForm()
            }
        }

    } catch (error) {
        console.log(error);


    }
}



export const validationSchema = Yup.object({
    title: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sA-Za-z0-9@!%$?&]+$/, "لطفا از حروف و اعداد استفاده کنید"),
    unit: Yup.string().required("لطفا این قسمت را پر کنید").matches(/^[\u0600-\u06FF\sA-Za-z0-9@!%$?&]*$/, "لطفا از حروف و اعداد استفاده کنید"),
    in_filter: Yup.boolean(),
});