import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

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

export const getUser = () => API.get('/users/protected');
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

// purchase
export const checkout = (cartObjects) => API.post('/payment/create-checkout-session', cartObjects);
