import httpService from "./httpService";
import { convertDataToFormdata } from "../utils/convertData";

export const getProductsService = (page, countOnPage, searchChar) => {
  return httpService(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
};

export const deleteProductService = (productId)=>{
  return httpService(`/admin/products/${productId}`, "delete");
}

export const createNewProductService = (data)=>{
  return httpService("/admin/products" , "post" , data.image ? convertDataToFormdata(data) : data )
}
