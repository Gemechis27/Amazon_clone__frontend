import React from 'react'
import Layout from '../../Components/Layout/Layout'
import classes from './Payment.module.css'
import { DataContext} from '../../Components/DataProvider/DataProvider'
import { useContext,useState } from 'react'
import ProductCard from '../../Components/Product/ProductCard'
import {useStripe, useElements,CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/Product/CurrencyFormat'
import axiosInstance from '../../Api/Axios'
import { ClipLoader } from 'react-spinners'
import { db } from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'


function Payment()  {

  const [{user,basket,},dispatch] = useContext( DataContext)
  const [processing, setProcessing] = useState(false)
  // console.log(user);
  const navigate=useNavigate()

  const total=basket.reduce((amount,item)=>{
        return item.price*item.amount + amount
  },0)
  
  const handlePayment =async(e)=>{
    e.preventDefault();


    try {
      // step-1
    // Backend contant---- to get the client secrect code
    setProcessing(true)
      const response=await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total*100}`,
        
      });
      // console.log(response.data);
      const client_secret=response.data?.client_secret;
      
      const confimation=await stripe.confirmCardPayment(client_secret,
        {
           payment_method:{
          card:elements.getElement(CardElement)
        },
        });

      const paymentIntent = confimation.paymentIntent;

       await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
       
    //  empy the Basket
       dispatch({
        type:Type.EMPTY_BASKET
       })

      // console.log(confimation);
      setProcessing(false)
      navigate("/Order",{state:{msg:"you have placed new order"}})
      
    } catch (error) {
              console.log(error);
              setProcessing(false)
    }
  }

   const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0)
     const [carderror, setCardError] = useState(null)
    const elements=useElements();  
    const stripe=useStripe();
       
      const handleChange = (e) => {
  setCardError(e?.error?.message ? e.error.message : "");
};


  return (
    <Layout>
      {/* Haeder */}
      <div className={classes.Payment_header}>
        Cheackout ({totalItem}) items
      </div>

      {/* payment */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>

          <div>
            <div>{user?.email}</div>
            <div>123 React Lame</div>
            <div>chicago, Il</div>
          </div>
        </div>
        
        <hr />

        {/* Product */}
        <div className={classes.flex}>
          <h3>Review item and Delivery </h3>
            <div className={classes.payment_image}>
            {
              basket?.map((item)=> <ProductCard key={item.id} product={item} flex={true}/>

              )
            }
          </div>
          
        </div>
        <hr />


        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_Detail}>
              <form  onSubmit={handlePayment} action="">
                {/* error */}
                {carderror&& <small style={{color:'red'}}>{carderror}</small>}
                {/* card */}
                <CardElement onChange={handleChange}/>
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span>
                       Total Order |
                       <CurrencyFormat  amount={total}/>
                       
                    </span>
                  </div>
                  <button type='submit'>
                    Pay Now
                    {
                      processing?(
                        <div className={classes.Loading}>
                          <ClipLoader color='gray' size={12}/>
                          <p>Please wait ...</p>

                        </div>

                      ):" Pay Now"
                    }
                    
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </Layout>
    
  )
}

export default Payment
