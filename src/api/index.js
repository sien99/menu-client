import axios from 'axios';

// const url = 'http://localhost:5000';
const url = 'https://menu-app-simple.herokuapp.com/';
const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    // Parse to convert string to js obj
    req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

export const getUser = (_id) => API.get(`/users/protected/${_id}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const updateUser = (payload) => API.put(`/users/update/${payload.user_id}`,payload)

// Payment (stripe api)
export const createCustomer = (_id) => API.get(`/payment/create-customer-id/${_id}`)

export const getSessionDetail = (sessionId) => API.get(`/payment/session-detail?session_id=${sessionId}`);

export const getPurchaseHistory = (customer_id,user_id) => API.get(`/payment/purchase-history/${customer_id}/${user_id}`);

export const checkout = (cartObjects) => API.post('/payment/create-checkout-session', cartObjects);

