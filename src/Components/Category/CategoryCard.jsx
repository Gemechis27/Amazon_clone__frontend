import React from 'react';
import classes from './catagory.module.css'
import {Link}  from 'react-router-dom'

const CategoryCard = ({ data }) => {
 
  
  return (
    <section  className={classes.blended_product_wrapper}> 
    <div className={classes.category}>
    <Link to={`category/${data.name}`}> 
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt={data.title} />
        <p>Shop now</p>
      </Link>
    </div>
    </section>
  );
};

export default CategoryCard;
