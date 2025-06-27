import React, { useEffect, useState } from 'react';
import classes from './ProductDetail.module.css';
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoint';
import Rating from '@mui/material/Rating';
import Loader from '../../Components/Loader/Loader';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${productUrl}/products/${productId}`);
        if (!ignore) setProduct(res.data);
      } catch (error) {
        if (!ignore) console.error('Error fetching product:', error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [productId]);

  if (isLoading || !product) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={classes.product_detail}>
        <div className={classes.product_wrapper}>
          <div className={classes.product_image}>
            <img src={product.image} alt={product.title}
            renderAdd={true}
            />
          </div>

          <div className={classes.product_info}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>

            <div className={classes.product_price}>${product.price}</div>

            <div className={classes.product_rating}>
              <Rating value={product.rating?.rate || 0} precision={0.1} readOnly />
              <span>({product.rating?.count || 0})</span>
            </div>

            <div className={classes.product_buttons}>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
