import React, { useContext } from 'react';
import classes from './Header.module.css';

import Amazon from '../../assets/images/amazon.png';
import flag from '../../assets/images/flag.svg.png';

import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { FaShoppingCart } from "react-icons/fa";
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';


const Header = () => {
  const[{ user,basket}, dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0)
  
  
 
  
  return (
    <section className={classes.header_all_wrapper}> 
    <section className={classes.header_container}>
      <div className={classes.logo_container}>
        <Link to="/">
          <img src={Amazon} alt="Amazon Logo" className={classes.logo} />
        </Link>
        <div className={classes.delivery}>
          <span><SlLocationPin /></span>
          <div>
            <p>Deliver to</p>
            <span>Ethiopia</span>
          </div>
        </div>
      </div>

      <div className={classes.search}>
        <select name="" id="">
          <option value="">All</option>
        </select>
        <input type="text" placeholder="Search" />
        <button>
          <BsSearch size={25} />
        </button>
      </div>

      <div className={classes.order_container}>
        <div className={classes.language}>
          <img src={flag} alt="Flag" />
          <select>
            <option value="EN">EN</option>
          </select>
        </div>

        <Link to= {!user && "/Auth"}>
          <div>
            {user ? (
            <>
            
            <p>Hello {user?.email?.split("@")[0]}</p>
            
            <span onClick={()=>auth.signOut()}>Sign Out</span>
           </>
             
                  ) : (

            <>
             <p>Hello, sign in</p>
             <span>Account & Lists</span>
            </>
            )}
              
          </div>
         
        </Link>

        <Link to="/Order">
          <div>
            <p>Returns</p>
            <span>& Orders</span>
          </div>
        </Link>

        <Link to="/Cart" className={classes.cart}>
          <FaShoppingCart size={35} />
          <span>{totalItem}</span>
        </Link>
      </div>
      
    </section>
    <LowerHeader/>
    </section>
  );
};

export default Header;
