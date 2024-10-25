import React from 'react'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import {BrowserRouter as Router, Routes, Route, redirect} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Payment from './Pages/Payment/Payment'
import Auth from './Pages/Auth/Auth'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetial from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51Q3hJ7RrvqFu2VWJwX5yXrvAJV7pLGsElVLoEZOAAZbPbYmxNmedQ63C6zNBClsRTaxJUrI4sngAcEDFd5erlaek00CvQmEqY3");
function Routing() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/auth" element={<Auth />} />
            <Route path="/payments" element={

              <ProtectedRoute 
              msg={"you must login to pay"} 
              redirect={"/payments"}
              >
                <Elements stripe={stripePromise}>
                   <Payment />
                 </Elements>
              </ProtectedRoute>
                
              } />
            <Route path="/Orders" element={
                  
        <ProtectedRoute 
              msg={"you must login to acces your orders"} 
              redirect={"/Orders"}
               >

              <Orders />
          </ProtectedRoute>
              
              } />
            <Route path="/category/:categoryName" element={<Results />} />
            <Route path="/products/:productId" element={<ProductDetial />} />
            <Route path="/cart" element={<Cart/>} />
        </Routes>
    </Router>
  )
}

export default Routing;