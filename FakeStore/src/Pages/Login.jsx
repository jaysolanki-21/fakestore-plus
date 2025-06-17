import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.css'; 
import { loginUser } from '../Store/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
     dispatch(loginUser(data, navigate));
  };

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" className={style.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
