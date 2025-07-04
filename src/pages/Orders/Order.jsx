import React, { useContext, useState,useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import classes from './Orders.module.css'
import { db } from '../../Utility/firebase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'

function Order ()  {
    const [{user}, dispatch]=useContext(DataContext)
    const [orders, setOrders] = useState([])
    useEffect(() => {
      if(user){

     db.collection("users").doc(user.uid).collection("orders")
     .orderBy("created","desc").onSnapshot((Snapshot)=>{
        console.log(Snapshot);
        
        setOrders(
          Snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
          }))
        )
     })

      }else{
        setOrders([])

      }
    }, [])
    
  return (
    <Layout>
     <section className={classes.container}>
      <div className={classes.Orders_container}>
        <h2>Your orders</h2>
        {
          orders?.length== 0 && <div style={{
            padding:"20px",
            color:"yellow"
            
          }}>
            You don't have order yet
          </div>
        }
        {/* orders items */}
        <div>
  {orders?.map((eachOrder, i) => {
    return (
      <div key={i}>
        <hr />
        <p>Order ID: {eachOrder.id}</p>
        {eachOrder?.data?.basket.map(order => (
          <ProductCard
            flex={true}
            product={order}
            key={order.id}
          />
        ))}
      </div>
    );
  })}
</div>

      </div>
     </section>
    </Layout>
    
  )
}

export default Order