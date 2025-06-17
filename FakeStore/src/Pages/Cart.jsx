import React, { useEffect } from 'react';
import styles from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../Store/userSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const cartItems = user?.cart || [];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAdd = (item) => dispatch(addToCart(item));
  const handleRemove = (item) => dispatch(removeFromCart(item.id));
  const handleClearCart = () => dispatch(clearCart());

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return <div className={styles.empty}>🛒 Your cart is empty</div>;
  }

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.heading}>Your Cart</h2>
      <div className={styles.cartList}>
        {cartItems.map((item) => (
          <div className={styles.cartItem} key={item.id}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.details}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.price}>${item.price}</p>
              <div className={styles.quantityControls}>
                <button onClick={() => handleRemove(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleAdd(item)}>+</button>
              </div>
              <p className={styles.total}>
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <span>Total:</span> <strong>${totalPrice}</strong>
      </div>

      <div className={styles.actions}>
        <button className={styles.clearButton} onClick={handleClearCart}>
          Clear Cart 🧹
        </button>
      </div>
    </div>
  );
};

export default Cart;
