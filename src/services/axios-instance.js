import axios from 'axios';
import { API } from '../config/global-constant';

const axiosInstance = axios.create({
  baseURL: API.URL,
});

export default axiosInstance;
