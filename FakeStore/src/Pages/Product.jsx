import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Store/productSlice'; 
import ProductCard from '../Components/ProductCard';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product); 

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F3F4F6',
          height: '80vh',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
