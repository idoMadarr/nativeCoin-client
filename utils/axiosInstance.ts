import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({baseURL: Config.PRODUCTION});

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    console.log(error.response.data);
    return false;
  },
);

export default axiosInstance;
