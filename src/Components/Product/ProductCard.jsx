import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from './CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { DataContext } from '../DataProvider/DataProvider';
import {Type} from '../../Utility/action.type'


const ProductCard = ({ product, renderAdd }) => {
  const { image, title, id, rating, price } = product;
    const[state,dispatch]=useContext(DataContext)
    
    const addToCart =()=>{
      dispatch({
        type:Type.ADD_TO_BASKET,
        item:{
            image, title, id, rating, price
        }
      })
    }

  return (
    <div className={classes.productCard_container}>
      <div>
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} />
        </Link>
        <div>
          <h3>{title}</h3>

          <div className={classes.rating}>
            <Rating value={rating?.rate || 0} precision={0.1} readOnly />
            <small>{rating?.count || 0}</small>
          </div>

          <div>
            <CurrencyFormat amount={price} />
          </div>
     {renderAdd && <button className={classes.Button} onClick={addToCart}>
            Add to Cart
          </button>} 
          
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
