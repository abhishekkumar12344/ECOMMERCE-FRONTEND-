import axios from 'axios';

const API = axios.create({
  baseURL: "https://ecommerce-backend-6yw4.onrender.com/api" ,   // ✅ FIXED
  timeout: 15000 ,
});

// Attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  changePassword: (data) => API.put('/auth/change-password', data),
};

// ✅ FIX: rename to productsAPI
export const productsAPI = {
  getAll: (params) => API.get('/products', { params }),
  getOne: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
  addReview: (id, data) => API.post(`/products/${id}/reviews`, data),
  adminGetAll: () => API.get('/products/admin/all'),
};

// Orders
export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getMyOrders: () => API.get('/orders/myorders'),
  getOne: (id) => API.get(`/orders/${id}`),
  getAll: (params) => API.get('/orders', { params }),
  updateStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  cancel: (id) => API.put(`/orders/${id}/cancel`),
  getStats: () => API.get('/orders/stats'),
};

// Users
export const userAPI = {
  getAll: (params) => API.get('/users', { params }),
  getOne: (id) => API.get(`/users/${id}`),
  updateRole: (id, role) => API.put(`/users/${id}/role`, { role }),
  delete: (id) => API.delete(`/users/${id}`),
  getDashboardStats: () => API.get('/users/dashboard/stats'),
};

// Contact
export const contactAPI = {
  submit: (data) => API.post('/contact', data),
  getAll: () => API.get('/contact'),
  markRead: (id) => API.put(`/contact/${id}/read`),
  delete: (id) => API.delete(`/contact/${id}`),
};

export default API;