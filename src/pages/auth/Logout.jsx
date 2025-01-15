import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "../../utils/alert";
import { logoutSernice } from "../../services/auth";



const Logout = () => {
    const [loading, setLoading] = useState(true)
    const handlelogout = async()=>{
        try {
            const res = await logoutSernice()
            if (res.status == 200) {
                localStorage.removeItem("loginToken")
            }else{
                Alert("متاسفم !"  , res.data.message , "error")
            }
            setLoading(false)      
            
        } catch (error) {
            setLoading(false)      
            Alert("متاسفم !"  , "متاسفانه مشکلی سمت سرور رخ داد" , "error")
            
        }
    }
useEffect(() => {
    handlelogout()

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