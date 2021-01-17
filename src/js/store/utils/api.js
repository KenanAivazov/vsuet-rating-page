import axios from "axios";
import store from '../index';
import config from "../../config";

const client = axios.create({
  baseURL: `${config.API_URL}/api/`,
  headers: {
    Authorization: localStorage.getItem('token')
  }
});

axios.interceptors.response.use(res => {
  return res
}, err => {
   console.log(err)
  return Promise.reject(err)
});

export default client;
