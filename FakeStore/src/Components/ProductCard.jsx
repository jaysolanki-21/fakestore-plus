import React from 'react';
import styles from './ProductCard.module.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../Store/cartSlice';
const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    const addCart = (product) => {
        dispatch(addItem(product))
    }

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.bottomRow}>
          <span className={styles.price}>${product.price}</span>
          <button onClick={() => {addCart(product)}} className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
