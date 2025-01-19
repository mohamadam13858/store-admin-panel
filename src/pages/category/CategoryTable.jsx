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

      }
    } catch (error) {
      

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
  )
};

export default Categorytable;
