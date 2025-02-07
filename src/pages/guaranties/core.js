import { addNewGuarantiesService, editGuarantiesService } from "../../services/guaranties";
import * as Yup from "yup";
import { Alert } from "../../utils/alerts";


export const initialValues = {
    title: "",
    descriptions: "",
    length: "",
    length_unit: ""
}

export const onSubmit = async (values, actions, setData, guarantiesToEdit) => {
    if (guarantiesToEdit) {
        const res = await editGuarantiesService(guarantiesToEdit.id, values)
        if (res.status === 200) {
            Alert('انجام شد', res.data.message, 'success');
            setData(lastData => {
              let newData = [...lastData]
              let index = newData.findIndex(d=>d.id == guarantiesToEdit.id)
              newData[index] = res.data.data
              return newData
            })
        }

    } else {
        const res = await addNewGuarantiesService(values)
        if (res.status === 201) {
            Alert('انجام شد', res.data.message, 'success');
            setData(lastData => [...lastData, res.data.data])
            actions.resetForm()
        }
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