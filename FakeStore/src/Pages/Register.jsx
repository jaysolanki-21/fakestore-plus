import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(`http://localhost:3000/users?email=${data.email}`);
      if (res.data.length > 0) {
        toast.error('User already exists');
        return;
      }

      data.isAdmin = false;
      data.cart = [];

      await axios.post('http://localhost:3000/users', data);
      toast.success('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error('Registration failed!');
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <label>Name</label>
          <input {...register("name", { required: true })} />
          {errors.name && <span className={style.error}>Name is required</span>}
        </div>

        <div className={style.formGroup}>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span className={style.error}>Email is required</span>}
        </div>

        <div className={style.formGroup}>
          <label>Password</label>
          <input type="password" {...register("password", { required: true })} />
          {errors.password && <span className={style.error}>Password is required</span>}
        </div>

        <button type="submit" className={style.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;
