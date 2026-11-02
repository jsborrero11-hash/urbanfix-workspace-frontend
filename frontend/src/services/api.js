
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6d4656a8-c2e1-45da-a9c3-ec2d7d81f5f7.mock.pstmn.io/api/auth/login/api/auth/login',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
