import classes from './Results.module.css';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import { productUrl } from '../../Api/endPoint';
import ProductCard from '../../Components/Product/ProductCard';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    let ignore = false;
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${productUrl}/products/category/${categoryName}`);
        if (!ignore) {
          setResults(res.data);
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      ignore = true;
    };
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category: {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.product_container}>
            {results?.map((product) => (
              <ProductCard 
              key={product.id} 
              product={product} 
              renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Results;
