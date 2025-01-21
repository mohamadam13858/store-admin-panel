import React from "react";





const Spinnerload = ({ colorClass , isSmall , inline}) => {
    return (
        <span 
        className={`text-center ${!inline ? "d-block" : "mx-2"} ${colorClass}`}>
        <div className={`spinner-border ${isSmall ? "spinner-border-sm" : ""}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </span>
    )
}


export default Spinnerload