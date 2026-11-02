
import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      // Guardar usuario y token en AuthContext
      login(data.user, data.token);

      console.log('Respuesta del servidor:', data);

      alert(`Bienvenido ${data.user.name}. Login exitoso.`);

    } catch (error) {
      console.error('Error en el Login:', error);

      alert(
        error.response?.data?.message ||
        'No fue posible iniciar sesión. Intenta nuevamente.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            UrbanFix
          </h1>

          <p className="mt-2 text-gray-500">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="usuario@correo.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

        </form>
      </section>
    </main>
  );
}

export default Login;
