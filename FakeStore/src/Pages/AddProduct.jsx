import React from 'react';
import style from './AddProduct.module.css';
import { useForm } from 'react-hook-form';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Store/productSlice';
import { useNavigate } from 'react-router-dom';
import  Swal from 'sweetalert2'

const AddProduct = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.id = nanoid();
    dispatch(addProduct(data));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Product Added Successfully',
      showConfirmButton: true,
      timer: 1500
    })
    Navigate('/');
    console.log(data);
  };

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        
        <div className={style.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className={`${style.input} ${errors.title ? style.errorInput : ''}`}
          />
          {errors.title && <span className={style.errorMsg}>This field is required</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            {...register("price", { required: true })}
            className={`${style.input} ${errors.price ? style.errorInput : ''}`}
          />
          {errors.price && <span className={style.errorMsg}>This field is required</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            {...register("description", { required: true })}
            className={`${style.input} ${errors.description ? style.errorInput : ''}`}
          />
          {errors.description && <span className={style.errorMsg}>This field is required</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            {...register("category", { required: true })}
            className={`${style.input} ${errors.category ? style.errorInput : ''}`}
          />
          {errors.category && <span className={style.errorMsg}>This field is required</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            {...register("image", { required: true })}
            className={`${style.input} ${errors.image ? style.errorInput : ''}`}
          />
          {errors.image && <span className={style.errorMsg}>This field is required</span>}
        </div>

        <button type="submit" className={style.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
