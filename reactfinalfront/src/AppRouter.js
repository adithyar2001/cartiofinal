import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Contact from "./core/Contact ";
import Aboutus from "./core/Aboutus";
import Notfound from "./core/Notfound";
import { Navigate } from "react-router-dom";
import Dummypage from "./core/Dummypage";
import Allproductpage from "./core/Allproductpage";
import Cart from "./core/Cart";
import Login from "./core/Login";
import Signin from "./core/Signin";
import Payment from "./core/Payment";
import { AuthProvider } from "./AuthContext";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import MyOrder from "./core/MyOrder";
import UpdateUserForm from "./core/UpdateUser";
function AppRouter() {
  return (
  //  <AuthProvider>
     <BrowserRouter>
    <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
        {/* <Route path="/payment" element={<Payment/>}/> */}
        <Route path="/allproducts" element={<Allproductpage/>} />
        {/* <Route path="/myorder" element={<MyOrder/>} /> */}
        <Route path="/cart" element={<PrivateRoutes Component={Cart} />} />
        <Route path="/payment" element={<PrivateRoutes Component={Payment} />} />
        <Route path="/myorder" element={<PrivateRoutes Component={MyOrder} />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/aboutus" element={<Aboutus/>} />
        <Route path="/updateuser" element={<PrivateRoutes Component={UpdateUserForm} />} />
        {/* <Route path="/updateuser" element={<UpdateUserForm/>} /> */}
        <Route path="/dummy/:id" element={<Dummypage/>} />
        <Route path="/404" element={<Notfound/>}/>
        <Route path="*" element={<Navigate to='/404'/>}/>
    </Routes>
    </BrowserRouter>
  //  </AuthProvider>
  )
}

export default AppRouter