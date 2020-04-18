import axios from 'axios';

const api = axios.create({
  baseURL: 'http://d4ac5d1a.ngrok.io',
});

export default api;
