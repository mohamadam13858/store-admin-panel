import React from "react";
import Login from "../../pages/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsLogin } from "../../hooks/AuthHooks";

const AuthLayouts = () => {
    const [loading, isLogin] = useIsLogin();

    return (
        <div className="limiter">
            {
                loading ?
                    <h1 className="text-center">لطفا صبر کنید</h1>
                    : isLogin ?
                        <div className="container-login100">
                            <Routes>
                                <Route path="/auth/login" element={<Login />} />
                            </Routes>
                        </div>
                        : <Navigate to={'/'} />
            }
        </div>
    );
}

export default AuthLayouts;
