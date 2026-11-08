
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

// Registrar nuevos usuarios CLIENTE o TECNICO
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      fullName: userData.fullName.trim(),
      role: userData.role,
      ...(userData.phone?.trim()
        ? { phone: userData.phone.trim() }
        : {}),
    });

    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};
