import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ab761118.ngrok.io',
});

export default api;
