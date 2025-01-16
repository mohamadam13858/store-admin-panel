import httpsService from "./httpsService"




export const GetCategoriesService = (id=null) =>{
     return httpsService(`/admin/categories${id ? `?parent=${id}` : ""}`, "get")

}