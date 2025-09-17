import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${Cookies.get('token')}` }
});

export const login = (email, password) =>
  axios.post(`${API_URL}/auth/login`, { email, password });

export const fetchCategories = () =>
  axios.get(`${API_URL}/categories`, getAuthHeaders());

export const fetchProducts = () =>
  axios.get(`${API_URL}/products`, getAuthHeaders());

export const fetchCart = () =>
  axios.get(`${API_URL}/cart`, getAuthHeaders());

export const addToCart = (productId, qty) =>
  axios.post(`${API_URL}/cart/add`, { productId, qty }, getAuthHeaders());

export const updateCartItem = (id, qty) =>
  axios.put(`${API_URL}/cart/update/${id}`, { qty }, getAuthHeaders());

export const removeCartItem = (id) =>
  axios.delete(`${API_URL}/cart/remove/${id}`, getAuthHeaders());

export const clearCartall = () =>
  axios.delete(`${API_URL}/cart/remove-all`, getAuthHeaders());


