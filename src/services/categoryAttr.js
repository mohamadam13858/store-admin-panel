import httpService from "./httpService"

export const getCategoryAttuService = (categoryId) => {
    return httpService(`/admin/categories/${categoryId}/attributes` , 'get')
}
