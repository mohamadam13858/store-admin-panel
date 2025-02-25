import React, { useEffect, useState } from "react";
import PaginatedDataTable from "../../components/PaginatedDataTable";
import AddProduct from "./AddProduct";
import Actions from "./tableAdditional/Actions";
import { deleteProductService, getProductsService } from "../../services/product";
import { Alert, Confirm } from "../../utils/alerts";
import { elements } from "chart.js";

const TableProduct = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchChar, setSearchChar] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [countOnPage, setCountOnPage] = useState(5)
  const [pageCount, setPageCount] = useState(0)

  const dataInfo = [
    { field: "id", title: "#" },
    {
      field: null,
      title: "گروه محصول",
    elements: (rowData) => rowData.categories?.[0]?.title || "بدون گروه",
      
    },
    { field: "title", title: "عنوان" },
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} handleDeleteProduct={handleDeleteProduct} />
    }
  ]

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "title",
  };

  const handleGetProducts = async (page, count, char) => {
    setLoading(true)
    const res = await getProductsService(page, count, char)
    res && setLoading(false)
    if (res.status === 200) {
      setData(res.data.data)
      setPageCount(res.data.last_page)
    }
  }
  const handleSearch = (char) => {
    setSearchChar(char);
    handleGetProducts(1 , countOnPage , char)
  }

  const handleDeleteProduct = async (product) => {
    if (await Confirm("حذف محصول" , `ایا از حذف محصول ${product.title} اطمینان دارید؟`)) {
      const res = await deleteProductService(product.id)
      if (res.status === 200) {
        Alert("انجام شد" , res.data.message , "success")
        handleGetProducts(currentPage , countOnPage , searchChar)
      }
    }
  }

  useEffect(() => {
    handleGetProducts(currentPage , countOnPage , searchChar)
  }, [currentPage])

  return (
    <>
      <PaginatedDataTable
        tableData={data}
        dataInfo={dataInfo}
        searchParams={searchParams}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        handleSearch={handleSearch}
      >
        <AddProduct />
      </PaginatedDataTable>
    </>
  )
}

export default TableProduct;
