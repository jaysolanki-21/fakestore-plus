import React, { useState } from 'react';
import style from './Nav.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Store/userSlice';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.isAdmin;
  const isLoggedIn = Boolean(user);
  const cartcounter = useSelector((state) => state.cart.totalQuantity);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={style.nav}>
      <div className={style.logo}>
        <h1>FakeStore</h1>
      </div>

      <div className={style.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${style.menu} ${isMenuOpen ? style.open : ''}`}>
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Products</NavLink>

        {isAdmin && (
          <NavLink to="/add" onClick={() => setIsMenuOpen(false)}>
            <button>Add Product</button>
          </NavLink>
        )}

        {isLoggedIn ? (
          <>
            <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>
              <button>
                Cart <span className={style.badge}>{cartcounter}</span>
              </button>
            </NavLink>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
            <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
