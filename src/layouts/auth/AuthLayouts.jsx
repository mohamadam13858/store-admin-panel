import react from "react";
import Login from "../../pages/auth/Login";
import { Route, Routes } from "react-router-dom";



const AuthLayouts = () => {
    return (
        <div class="limiter">
            <div class="container-login100">
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default AuthLayouts;