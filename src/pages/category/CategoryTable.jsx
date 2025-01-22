import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import Addcategory from "./AddCategory";
import { deleteCategoryService, getCategoriesService, GetCategoriesService } from "../../services/category";
import { Alert } from "../../utils/alert";
import ShowInMenu from "./tableAdditons/ShowInMenu";
import Actions from "./tableAdditons/Actions";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { convertDateToJalali, ConvertDateToJalali } from "../../utils/convertDate";
import { Confirm } from "../../utils/alerts";

const Categorytable = () => {

  const [data, setData] = useState([])
  const [render, setRender] = useState(0)
  const [loading, setLoading] = useState(false)
  const params = useParams()


  const handleDeleteCategory = async (rowData) => {
    if (await Confirm('حذف دسته بندی', `ایا از حذف ${rowData.title} اطمینان دارید؟`)) {
      try {
        const res  = await deleteCategoryService(rowData.id)
        if (res.status == 200 ) {
          setData(data.filter(d =>d.id != rowData.id))
          Alert('انجام شد', 'ok', 'success')
        } 
      } catch (error) {
        console.log(error);
        
      }
    }
  }


  const handleGetCategories = async () => {
    setLoading(true)
    try {
      const res = await getCategoriesService(params.categoryId)
      if (res.status === 200) {
        setData(res.data.data)

      }
    } catch (error) {


    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [params, render]);

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
      elements: (rowData) => <Actions rowData={rowData} handleDeleteCategory={handleDeleteCategory} />,
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
        <Addcategory setRender={setRender} />
      </PaginatedTable>


    </>
  )
};

export default Categorytable;
