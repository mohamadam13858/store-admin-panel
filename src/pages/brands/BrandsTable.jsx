import React, { useState } from "react";
import { useEffect } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import { deleteBrandService, getAllBrandsService } from "../../services/brands";
import { apiPath } from "../../services/httpService";
import AddBrands from "./AddBrands";
import Actions from "./tableAdditional/Actions";
import { Alert, Confirm } from "../../utils/alerts";

const Brandstable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null)

  const dataInfo = [
    { field: "id", title: "#" },
    { field: "original_name", title: "عنوان لاتین" },
    { field: "persian_name", title: "عنوان فارسی" },
    { field: "descriptions", title: "توضیحات" },
  ];

  const additionField = [
    {
      title: "لوگو",
      elements: (rowData) =>
        rowData.logo ? <img src={apiPath + "/" + rowData.logo} width="40" /> : '',
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} setBrandToEdit={setBrandToEdit} handleDeleteBrand={handleDeleteBrand} />,
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchField: "original_name",
  };

  const handleGetAllBrands = async () => {
    setLoading(true)
    const res = await getAllBrandsService();
    console.log(res);
    res && setLoading(false)
    if (res.status === 200) {
      Alert("انجام شد", res.data.message, "success")
      setData(res.data.data);
    }
  }

  const handleDeleteBrand = async (brand) => {
    if (await Confirm("حذف برند ", `ایا از حذف ${brand.original_name} اطمینان دارید؟`)) {
      const res = await deleteBrandService(brand.id)
      if (res.status === 200) {
        Alert("انجام شد", res.data.message, "success")
        setData((lastData) => lastData.filter((d) => d.id != brand.id))
      }
    }
  }

  useEffect(() => {
    handleGetAllBrands()
  }, [])

  return (
    <>
      <PaginatedTable
        data={data}
        dataInfo={dataInfo}
        additionField={additionField}
        numOfPAge={8}
        searchParams={searchParams}
        loading={loading}
      >
        <AddBrands setData={setData} brandToEdit={brandToEdit} setBrandToEdit={setBrandToEdit} />
      </PaginatedTable>
    </>
  );
};

export default Brandstable;
