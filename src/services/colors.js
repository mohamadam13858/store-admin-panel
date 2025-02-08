import httpService from "./httpService"



export const getAllColorsService = ()=>{
     return httpService("/admin/colors" , "get")
}