import React, { useEffect } from 'react';
import styles from './ManageProduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, fetchProducts } from '../Store/productSlice';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product); 
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, isAdmin, navigate]);

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  };

  const handleEdit = (product) => {
    navigate(`/edit/${product.id}`, { state: product });
  };

  return (
    <div className={styles.container}>
      <h2>Manage Products</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.image} alt={product.title} className={styles.image} />
            <div className={styles.details}>
              <h4>{product.title}</h4>
              <p>{product.category}</p>
            </div>
            <div className={styles.actions}>
              <button onClick={() => handleEdit(product)} className={styles.iconBtn}>
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(product.id)} className={styles.iconBtn}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
