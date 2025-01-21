import * as Yup from "yup";
import { createNewCategoryService, editCategoryService } from "../../services/category";
import { Alert } from "../../utils/alert";



export const initialValues = {
    parent_id: "",
    title: "",
    description: "",
    image: "",
    is_active: true,
    show_in_menu: true,
};

export const validationSchema = Yup.object({
    parent_id: Yup.number(),
    title: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sA-Za-z0-9@!%$?&]+$/, "لطفا از حروف و اعداد استفاده کنید"),
    description: Yup.string().matches(/^[\u0600-\u06FF\sA-Za-z0-9@!%$?&]*$/, "لطفا از حروف و اعداد استفاده کنید"),
    image: Yup.mixed()
        .test("filesize", "حجم فایل نمی‌تواند بیشتر از 500 کیلوبایت باشد", (value) => !value || (value.size <= 500 * 1024))
        .test("format", "فرمت فایل باید jpg باشد", (value) => !value || (value.type === "image/jpeg")),
    is_active: Yup.boolean(),
    show_in_menu: Yup.boolean(),
});
export const onSubmit = async (values, actions, setRender , editId ) => {
    try {
        values = {
            ...values,
            is_active: values.is_active ? 1 : 0,
            show_in_menu: values.show_in_menu ? 1 : 0,
        }
        if (editId) {
            const res = await editCategoryService(editId , values) 
            if (res.status === 200) {
                Alert("ویرایش رکورد" , res.data.message , "success")
                setRender(last => last + 1)
            }
        }else{
            const res = await createNewCategoryService(values)
            if (res.status === 201) {
                Alert("رکورد ثبت شد", res.data.message, "success")
                actions.resetForm()
                setRender(last => last + 1)
    
            }
        }

        

    } catch (error) {
        console.log(error.message);

    }
};