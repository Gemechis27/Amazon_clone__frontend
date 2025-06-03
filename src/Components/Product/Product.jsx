import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../Loader/Loader';


const Product = () => {
  const [products, setProducts] = useState([]);
      const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError ('Failed to fetch products.');
        setIsLoading(false);
      });
  }, []);


  return (
    <>
    {
      isLoading?(<Loader/>) :(

         <section className={classes.product_container}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id}
        renderAdd={true}
        />
      ))}
    </section>

      )
    }
   

    </>
  );
};

export default Product;
