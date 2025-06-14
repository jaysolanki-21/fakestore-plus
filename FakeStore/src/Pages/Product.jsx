import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../Components/ProductCard'

const Product = () => {

    const [products, setProducts] = useState([])
   useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      console.log(response.data); 
      setProducts(response.data);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, []);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
  )
}

export default Product
