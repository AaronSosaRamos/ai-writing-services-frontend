import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'api-key': process.env.REACT_APP_API_KEY || '', 
  },
});

export default api;
