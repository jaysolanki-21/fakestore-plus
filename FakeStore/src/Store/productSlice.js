import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
    addProductToStore(state, action) {
      state.push(action.payload); 
      
    },
    removeProductFromStore(state, action) {
      state = state.filter((product) => product.id !== action.payload); 
      return state;
    },
  },
});

export default productSlice.reducer;
export const { setProducts, addProductToStore, removeProductFromStore } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    dispatch(setProducts(data));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/products', productData);
    dispatch(addProductToStore(response.data));
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

export const removeProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/products/${productId}`);
    dispatch(removeProductFromStore(productId));
  } catch (error) {
    console.error('Error removing product:', error);
  }
};