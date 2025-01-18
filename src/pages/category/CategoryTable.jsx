import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import Addcategory from "./AddCategory";
import { GetCategoriesService } from "../../services/category";
import { Alert } from "../../utils/alert";
import ShowInMenu from "./tableAdditons/ShowInMenu";
import Actions from "./tableAdditons/Actions";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { ConvertDateToJalali } from "../../utils/convertDate";

const Categorytable = () => {

  const [data, setData] = useState([])
  const params = useParams()
  const location = useLocation()


  const handleGetCategories = async () => {

    try {
      const res = await GetCategoriesService(params.categoryId)
      if (res.status === 200) {
        setData(res.data.data)

      } else {
        Alert("مشکل !", res.data.message, "error")
      }

    } catch (error) {
      Alert("مشکل !", "مشکلی سمت سرور رخ داده است", "error")

    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [params]);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    ...(data.some(item => item.parent_id) ? [{ field: "parent_id", title: "والد" }] : []),
    // { field: "parent_id", title: "والد" },
  ];

  // const additionalElements = (itemId) => {
  //   console.log(itemId);
  //   return (
  //     <>
  //       <i
  //         className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
  //         title="زیرمجموعه"
  //         data-bs-toggle="tooltip"
  //         data-bs-placement="top"
  //       ></i>
  //       <i
  //         className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
  //         title="ویرایش دسته"
  //         data-bs-placement="top"
  //         data-bs-toggle="modal"
  //         data-bs-target="#add_product_category_modal"
  //       ></i>
  //       <i
  //         className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
  //         title="افزودن ویژگی"
  //         data-bs-placement="top"
  //         data-bs-toggle="modal"
  //         data-bs-target="#add_product_category_attr_modal"
  //       ></i>
  //       <i
  //         className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
  //         title="حذف دسته"
  //         data-bs-toggle="tooltip"
  //         data-bs-placement="top"
  //       ></i>
  //     </>
  //   );
  // };

  // const ShowInMenu= (rowData) =>{
  //   return(
  //     <span className={rowData.show_in_menu ? "text-success" : "text-danger"}>{rowData.show_in_menu ? "هست" : "نیست"}</span>
  //   )
  // }

  const additionField = [
    {
      title: "تاریخ ساخت",
      elements: (rowData) => ConvertDateToJalali(rowData.created_at)
    }
  ,
  {
    title: "نمایش در منو",
    elements: (rowData) => <ShowInMenu rowData={rowData} />
    }
    ,
{
  title: "عملیات",
    elements: (rowData) => <Actions rowData={rowData} />,
    }
  ];

const searchParams = {
  title: "جستجو",
  placeholder: "قسمتی از عنوان را وارد کنید",
  searchField: "title"
}

return (
  <>
    {/* {location.state ?
        <h5 className="text-center">
          <span>زیر گروه:</span>
          <span className="text-info">{location.state.parentData.title}</span>
        </h5> : null} */}
    <Outlet />
    {data.length ? (
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionField={additionField}
        numOfPAge={8}
        searchParams={searchParams}
      >
        <Addcategory />
      </PaginatedTable>
    ) : (
      <h5 className=" text-center text-danger my-5">هیچ دسته بندی پیدا نشد</h5>
    )}


  </>
  // <>
  //   <table className="table table-responsive text-center table-hover table-bordered">
  //     <thead className="table-secondary">
  //       <tr>
  //         <th>#</th>
  //         <th>عنوان</th>
  //         <th>وضعیت</th>
  //         <th>عملیات</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td>1</td>
  //         <td>دسته شماره فلان</td>
  //         <td>فعال</td>
  //         <td>
  //           <i
  //             className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
  //             title="زیرمجموعه"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //           <i
  //             className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
  //             title="ویرایش دسته"
  //             data-bs-toggle="modal"
  //             data-bs-placement="top"
  //             data-bs-target="#add_product_category_modal"
  //           ></i>
  //           <i
  //             className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
  //             title="افزودن ویژگی"
  //             data-bs-toggle="modal"
  //             data-bs-target="#add_product_category_attr_modal"
  //           ></i>
  //           <i
  //             className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
  //             title="حذف دسته"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //         </td>
  //       </tr>
  //       <tr>
  //         <td>1</td>
  //         <td>دسته شماره فلان</td>
  //         <td>فعال</td>
  //         <td>
  //           <i
  //             className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
  //             title="زیرمجموعه"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //           <i
  //             className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
  //             title="ویرایش دسته"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //           <i
  //             className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
  //             title="افزودن ویژگی"
  //             data-bs-placement="top"
  //             data-bs-toggle="modal"
  //             data-bs-target="#add_product_category_attr_modal"
  //           ></i>
  //           <i
  //             className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
  //             title="حذف دسته"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //         </td>
  //       </tr>
  //       <tr>
  //         <td>1</td>
  //         <td>دسته شماره فلان</td>
  //         <td>فعال</td>
  //         <td>
  //           <i
  //             className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
  //             title="زیرمجموعه"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //           <i
  //             className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
  //             title="ویرایش دسته"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //           <i
  //             className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
  //             title="افزودن ویژگی"
  //             data-bs-placement="top"
  //             data-bs-toggle="modal"
  //             data-bs-target="#add_product_category_attr_modal"
  //           ></i>
  //           <i
  //             className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
  //             title="حذف دسته"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //         </td>
  //       </tr>
  //       <tr>
  //         <td>1</td>
  //         <td>دسته شماره فلان</td>
  //         <td>فعال</td>
  //         <td>
  //           <i
  //             className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
  //             title="زیرمجموعه"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //           <i
  //             className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
  //             title="ویرایش دسته"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //           <i
  //             className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
  //             title="افزودن ویژگی"
  //             data-bs-placement="top"
  //             data-bs-toggle="modal"
  //             data-bs-target="#add_product_category_attr_modal"
  //           ></i>
  //           <i
  //             className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
  //             title="حذف دسته"
  //             data-bs-toggle="tooltip"
  //             data-bs-placement="top"
  //           ></i>
  //         </td>
  //       </tr>
  //     </tbody>
  //   </table>
  //   <nav
  //     aria-label="Page navigation example"
  //     className="d-flex justify-content-center"
  //   >
  //     <ul className="pagination dir_ltr">
  //       <li className="page-item">
  //         <a className="page-link" href="#" aria-label="Previous">
  //           <span aria-hidden="true">&raquo;</span>
  //         </a>
  //       </li>
  //       <li className="page-item">
  //         <a className="page-link" href="#">
  //           1
  //         </a>
  //       </li>
  //       <li className="page-item">
  //         <a className="page-link" href="#">
  //           2
  //         </a>
  //       </li>
  //       <li className="page-item">
  //         <a className="page-link" href="#">
  //           3
  //         </a>
  //       </li>
  //       <li className="page-item">
  //         <a className="page-link" href="#" aria-label="Next">
  //           <span aria-hidden="true">&laquo;</span>
  //         </a>
  //       </li>
  //     </ul>
  //   </nav>
  // </>
);
};

export default Categorytable;
