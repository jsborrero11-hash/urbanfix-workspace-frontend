
import api from './api';

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', {
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password,
    });

    const { user, token } = response.data;

    return {
      token,
      user: {
        ...user,
        name: user.fullName,
      },
    };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};
