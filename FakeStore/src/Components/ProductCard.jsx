import React from 'react';
import styles from './ProductCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Store/userSlice'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = Boolean(user);

  const addCart = (product) => {
    if (!isLoggedIn) {
      toast.warn("Please login to add items to cart!", {
        position: 'top-right',
        autoClose: 2000,
      });
      navigate('/login');
      return;
    }

    dispatch(addToCart(product));
    toast.success(`${product.title.substring(0, 20)} added to cart! 🛒`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.bottomRow}>
          <span className={styles.price}>${product.price}</span>
          <button onClick={() => addCart(product)} className={styles.button}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
