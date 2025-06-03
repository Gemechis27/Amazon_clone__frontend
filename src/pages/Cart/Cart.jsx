import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormat from '../../Components/Product/CurrencyFormat'
import { MdKeyboardArrowUp } from "react-icons/md";
import { Link } from 'react-router-dom'
import classes from './Cart.module.css'
import payment from '../Payment/Payment'
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";

const Cart = () => {
  const[{basket,user}, dispatch]=useContext(DataContext);
  const total=basket.reduce((amount,item)=>{
        return item.price*item.amount + amount
  },0)
 const increment =(item)=>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item
  })
 }
 const decrement=(id)=>{
  dispatch({
    type:Type.REMOVE_FROM_BASKET,
    id
  })
 }
 
  

  return (

    <Layout>
        
          <section className={classes.container}>
            <div className={classes.cart_container}>
              <h3>Your shopping Basket</h3>
              <hr />
              {
                basket?.length==0?(
                <p>Opps ! no Item in your cart</p>
                   ): (
                 basket?.map((item,i)=>{
                  return <section className={classes.cart_product}>
                  
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button className={classes.btn} onClick={()=>increment(item)}><MdKeyboardArrowUp size={30} /></button>
                    <span>
                      {item.amount}
                    </span>
                    <button className={classes.btn}  onClick={()=>decrement(item.id)}><IoIosArrowDown size={30} /></button>
                  </div>
                  </section>
                  
                 }
                ))
              }
            </div>
             { basket?.length !==0&&(
                   <div className={classes.subtotal}>
                    <div>
              <p>Subtotal ({basket?.length}items) </p>
            <CurrencyFormat amount={total}/>

            </div>
            <span>
              <input type='checkbox'/>
              <small>This order contains a gift</small>
            </span>
            <Link to='/Payment'>continue to checkout</Link>
            </div>
              )}
          
          </section>
          
    </Layout>
    
  )
}

export default Cart