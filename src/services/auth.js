import httpsService from "./httpsService"



export const loginService = (values) =>{
    return  httpsService('/auth/login' , 'post' , {
        ...values,
        remember:values.remember ? 1 : 0
      })
}

export const logoutSernice = () => {
    return httpsService("/auth/logout" , "get")
}


export const getUserService = ()=>{
    return httpsService("/auth/user" , "get")
}