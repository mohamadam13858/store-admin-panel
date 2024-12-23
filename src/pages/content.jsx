import React, { useContext } from 'react';
import { AdminContext } from '../context/adminLayoutContext';
import Category from './category/Category';
import Dashboard from './dashboard/Dashboard';
import Product from './product/Product';
import { Route, Router, Routes } from 'react-router-dom';

const Content = () => {
    const {showSidebar} = useContext(AdminContext)
    return (
        <section id="content_section" 
        className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='Category' element={<Category/>}/>
            <Route path='Product' element={<Product/>}/>






            <Route path='*' element={<Dashboard/>}/>
          </Routes>
          {/* <Dashboard/> */}
          {/* <Category/> */}
          {/* <Product/> */}
        </section>
    );
}

export default Content;
