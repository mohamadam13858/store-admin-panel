import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import Addcategory from "./AddCategory";
import { getCategoriesService, GetCategoriesService } from "../../services/category";
import { Alert } from "../../utils/alert";
import ShowInMenu from "./tableAdditons/ShowInMenu";
import Actions from "./tableAdditons/Actions";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { convertDateToJalali, ConvertDateToJalali } from "../../utils/convertDate";

const Categorytable = () => {

  const [data, setData] = useState([])
  const [render , setRender] = useState(0)
  const [loading , setLoading] = useState(false)
  const params = useParams()


  const handleGetCategories = async () => {
    setLoading(true)
    try {
      const res = await getCategoriesService(params.categoryId)
      if (res.status === 200) {
        setData(res.data.data)

      }
    } catch (error) {
      

    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [params , render]);

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    ...(data.some(item => item.parent_id) ? [{ field: "parent_id", title: "والد" }] : []),
  ];


  const additionField = [
    {
      title: "تاریخ ساخت",
      elements: (rowData) => convertDateToJalali(rowData.created_at)
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
      <Outlet />
        <PaginatedTable
          data={data}
          dataInfo={dataInfo}
          additionField={additionField}
          numOfPAge={8}
          searchParams={searchParams}
          loading={loading}
        >
          <Addcategory  setRender={setRender}/>
        </PaginatedTable>


    </>
  )
};

export default Categorytable;
