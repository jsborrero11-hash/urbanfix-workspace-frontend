
import api from './api';

export const loginUser = async (credentials) => {
  const response = await api.post('', credentials);
  return response.data;
};
