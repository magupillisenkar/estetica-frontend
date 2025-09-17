
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts as apiFetchProducts } from '../api/apiService';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await apiFetchProducts();
    return response.data.items;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => { state.loading = false; });
  },
});

export default productsSlice.reducer;
