import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories as apiFetchCategories } from '../api/apiService';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await apiFetchCategories();
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { categories: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => { state.loading = false; });
  },
});

export default categoriesSlice.reducer;
