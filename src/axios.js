import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});
axios.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  if (response.data.code === 0) {
    return Promise.reject(response.data.msg);
  }
  return response.data.result;
}, (error) => Promise.reject(error));

export default instance;
