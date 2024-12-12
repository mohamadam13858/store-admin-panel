import { createContext,  useState } from "react";





export const AdminContext = createContext({
    showSidebar: false , 
    setShowSidebar: ()=>{}
});



const AdminContextContainer = ({Children})=>{
    const [showSidebar , setShowSidebar] = useState(false)
    return(
        <AdminContext.Provider value={{
            showSidebar ,
            setShowSidebar
        }}>
            {Children}
        </AdminContext.Provider>
    )
}

export default AdminContextContainer;