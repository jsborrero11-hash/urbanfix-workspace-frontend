
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'CLIENTE',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!['CLIENTE', 'TECNICO'].includes(formData.role)) {
      setError('Selecciona un rol válido.');
      return;
    }

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError('Completa los campos obligatorios.');
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      setSuccess('Cuenta creada correctamente. Ya puedes iniciar sesión.');

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'No fue posible completar el registro.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            UrbanFix
          </h1>

          <p className="mt-2 text-gray-500">
            Crea tu cuenta
          </p>
        </div>

        {error && (
          <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Teléfono (opcional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
              Tipo de usuario
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="CLIENTE">Cliente</option>
              <option value="TECNICO">Técnico</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
