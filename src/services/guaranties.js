import httpService from "./httpService"

export const getAllGuarantiesService = () => {
    return httpService("/admin/guarantees", "get")
}


export const addNewGuarantiesService = (data) => {
   return httpService("/admin/guarantees" , "post" , data)
}


export const editGuarantiesService = (id , data) => {
    return httpService(`/admin/guarantees/${id}` , "put" , data)
}


export const deleteguarantiesService = (guaranteesId)=>{
    return httpService(`/admin/guarantees/${guaranteesId}`, "delete")
}