import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        setProducts(state, action) {
            return action.payload;
        },
    },
});

export default productSlice.reducer;
export const { setProducts } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        dispatch(setProducts(data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}