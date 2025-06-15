import React from 'react';
import style from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  const cartcounter = useSelector(state => state.cart.totalQuantity);
  console.log(cartcounter);

  return (
    <div className={style.nav}>
      <div className={style.logo}>
        <h1>FakeStore</h1>
      </div>
      <div className={style.menu}>
        <NavLink to="/">Products</NavLink>
        <NavLink to="/add">
          <button>Add Product</button>
        </NavLink>
        <NavLink to="/cart">
          <button>
            Cart <span className={style.badge}>{cartcounter}</span>
          </button>
        </NavLink>
        {/* <NavLink to="/login">Login</NavLink> */}
        {/* <NavLink to="/register">Register</NavLink> */}
      </div>
    </div>
  );
};

export default Nav;
