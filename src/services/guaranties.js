
import httpService from "./httpService"

export const getAllGuarantiesService = () => {
    return httpService("/admin/guarantees", "get")
}


export const addNewGuarantiesService = (data) => {
   return httpService("/admin/guarantees" , "post" , data)
}