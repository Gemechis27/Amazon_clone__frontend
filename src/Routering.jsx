import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Payment from './pages/Payment/Payment';
import Auth from './pages/Auth/Auth';
import Order from './pages/Orders/Order';
import Cart from './pages/Cart/Cart';
import Results from './pages/Results/Results';
import ProductDetail from './pages/ProductsDetail/ProductDetail';
import {CheckoutProvider, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';

const stripePromise = loadStripe
('pk_test_51RUSzJPV1Un2O8ICsIfGJmcc98rC28tM1Y4p24m18GYz9qRwcY0KVDngxMIAVGziVeuMuDrcnRWyzifdWG098ub000uEZAhvdb');

const Routering = () => {
  return (
    <Router basename="Amazon_clone__frontend/">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path=
        '/Payment' element={
          <ProtectedRouter 
          msg={"you must log in topay" } > 
          redirect={"/payments"}
                
                <Elements stripe={stripePromise}>
            <Payment /> 
          </Elements>
          </ProtectedRouter>
          
        
        } />
        <Route 
        path='/Order' 
        element={
          
             <ProtectedRouter 
          msg={"you must log in to see your orders" }  
          redirect={"/Order"}
              >  
                
              <Order />
          
            
          </ProtectedRouter>
          
          
          } />
        <Route path='/Auth' element={<Auth/>} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/category/:categoryName' element={<Results />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default Routering;
