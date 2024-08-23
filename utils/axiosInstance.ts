import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({baseURL: Config.EMULATOR_LOCALHOST});

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    console.log(error);
  },
);

export default axiosInstance;
