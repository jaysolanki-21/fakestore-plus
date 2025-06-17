import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.user.cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.user.cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("user", JSON.stringify(state.user));
    },
    removeFromCart: (state, action) =>{
        const id = action.payload;
        const existingItem = state.user.cart.find(item => item.id === id);
        if (existingItem.quantity === 1) {
            state.user.cart = state.user.cart.filter(item => item.id !== id);
        } else {
            existingItem.quantity--;
        }
        localStorage.setItem("user", JSON.stringify(state.user));
    },
    clearCart: (state) => {
        state.user.cart = [];
        localStorage.setItem("user", JSON.stringify(state.user));
    }
  },
});

export const { login, logout, addToCart, removeFromCart, clearCart } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = (user, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3000/users?email=${user.email}&password=${user.password}`);
    if (res.data.length > 0) {
      dispatch(login(res.data[0]));
      navigate('/');
    } else {
      dispatch(logout());
      alert("Invalid email or password");
    }
  } catch (err) {
    console.error("Login error:", err);
    dispatch(logout());
    alert("Server error");
  }
};


