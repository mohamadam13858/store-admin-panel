import { addNewColorService, editColorService } from "../../services/colors"
import { Alert } from "../../utils/alerts"
import * as Yup from "yup";




export const initialValues = {
    title: "",
    code: "#ffff"
}



export const onSubmit = async (values, actions, setData, colorToEdit) => {
    if (colorToEdit) {
        const res = await editColorService(colorToEdit.id, values)
        if (res.status === 200) {
            Alert("انجام شد", res.data.message, "success")
            setData((lastData) => {
                let newData = [...lastData]
                let index = newData.findIndex((d) => d.id == colorToEdit.id)
                newData[index] = res.data.data
                return newData
            })
        }
    } else {
        const res = await addNewColorService(values)
        if (res.status === 201) {
            Alert("انجام شد", res.data.message, "success")
            setData((lastData) => [...lastData, res.data.data])
        }
    }
}


export const validationSchema = Yup.object({
    title: Yup.string().required("لطفا این قسمت را پر کنید")
    .matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود"
      ),
      code: Yup.string().matches(/^[a-zA-Z0-9@!%$?&]+$/ , "فقط از اعداد و حروف استفاده کنید")
    
})