import { addNewGuarantiesService } from "../../services/guaranties";
import * as Yup from "yup";


export const initialValues = {
    title: "",
    descriptions: "",
    length: "",
    length_unit: ""
}

export const onSubmit = async (values, actions, setData) => {
    const res = await addNewGuarantiesService(values)
    if (res.status === 201) {
        setData(lastData => [...lastData, res.data.data])
        actions.resetForm()
    }

}
export const validationSchema = Yup.object({
    title: Yup.string().required("لطفا این قسمت را پر کنید")
        .matches(
            /^[a-zA-Z0-9\s@!%$?&]+$/,
            "فقط از اعداد و حروف لاتین استفاده شود"
        ),
    length: Yup.number(),
    descriptions: Yup.string()
        .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از اعداد و حروف استفاده شود"
        ),
    length_unit: Yup.string().matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف استفاده شود"
    ),
});