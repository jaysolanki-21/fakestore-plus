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
      state.push(action.payload); // Add new product to local state
    },
  },
});

export default productSlice.reducer;
export const { setProducts, addProductToStore } = productSlice.actions;

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
