
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCart as apiFetchCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeCartItem as apiRemoveCartItem, clearCartall } from '../api/apiService';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await apiFetchCart();
    return response.data.items;
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ productId, qty }) => {
    await apiAddToCart(productId, qty);
    const response = await apiFetchCart();
    return response.data.items;
  }
);

export const updateCartItemQty = createAsyncThunk(
  'cart/updateCartItemQty',
  async ({ id, qty }) => {
    await apiUpdateCartItem(id, qty);
    const response = await apiFetchCart();
    return response.data.items;
  }
);

export const removeCartItemById = createAsyncThunk(
  'cart/removeCartItemById',
  async (id) => {
    await apiRemoveCartItem(id);
    const response = await apiFetchCart();
    return response.data.items;
  }
);

export const clearCartapi = createAsyncThunk('cart/clearCart', async () => {
  await clearCartall();  
  return []; 
});




const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], loading: false },
  reducers: { clearCart: (state) => { state.items = []; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addCartItem.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(updateCartItemQty.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(removeCartItemById.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(clearCartapi.fulfilled, (state) => { state.items = []; }); 
      
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
