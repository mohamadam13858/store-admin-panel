import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "../../utils/alert";



const Logout = () => {
    const [loading, setLoading] = useState(true)
useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"))
    axios.get('https://ecomadminapi.azhadev.ir/api/auth/logout' , {
        headers: {
            Authorization: `Bearer ${loginToken.token}`
        }
    }).then(res => {
        if (res.status == 200) {
            localStorage.removeItem("loginToken")
            setLoading(false)      
        }else{
            Alert("متاسفم !"  , res.data.message , "error")
        }
    }).catch(error => {
        setLoading(false)      
        Alert("متاسفم !"  , "متاسفانه مشکلی سمت سرور رخ داد" , "error")
    })


}, []);
    return (
        <div>
            {loading ? (<h3 className=" waiting_center text-center">لطفا صبر کنید</h3>) :
               ( <Navigate to="/auth/login" />)
            }

        </div>
    )
}


export default Logout;