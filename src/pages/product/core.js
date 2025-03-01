import * as Yup from "yup";

export const initialValues = {
    category_ids: "",
    title: "",
    price: "",
    weight: null,
    brand_id: null,
    color_ids: "",
    guarantee_ids: "",
    description: "",
    short_description: "",
    cart_description: "",
    image: null,
    alt_image: "",
    keywords: "",
    stock: null,
    discount: null
};

export const onSubmit = (values, actions) => {
    console.log(values);
}

export const validationSchema = Yup.object({
    category_ids: Yup.string().required('لطفا این قسمت را پر کنید')
        .matches(/^[0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
    title: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
        ),
    price: Yup.number().required("لطفا این قسمت را پر کنید"),
    weight: Yup.number(),
    brand_id: Yup.number(),
    color_ids: Yup.string().matches(/^[0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
    guarantee_ids: Yup.string().matches(/^[0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
    description: Yup.string()
        .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
        ),
    short_description: Yup.string()
        .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
        ),
    cart_description: Yup.string()
        .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
        ),
    image: Yup.mixed()
        .test("filesize", "حجم فایل نمیتواند بیشتر از 500 کیلوبایت باشد", (value) => !value || (value && value.size <= 500 * 1024))
        .test("format", "فرمت فایل باید jpg یا png باشد", (value) => !value || (value && (value.type === "image/jpeg" || value.type === "image/png"))),
    alt_image: Yup.string().matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود"
    ),
    keywords: Yup.string()
        .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
        ),
    stock: Yup.number(),
    discount: Yup.number(),
});
