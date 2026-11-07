
import { useState } from 'react';
import api from '../services/api';

const datosIniciales = {
  serviceId: '',
  title: '',
  description: '',
  address: '',
  budget: '',
};

function FormularioSolicitud({ servicios, onCerrar, onCreada }) {
  const [datos, setDatos] = useState(datosIniciales);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;

    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const enviarSolicitud = async (evento) => {
    evento.preventDefault();
    setError('');
    setGuardando(true);

    try {
      const nuevaSolicitud = {
        serviceId: datos.serviceId,
        title: datos.title.trim(),
        description: datos.description.trim(),
        address: datos.address.trim(),
      };

      if (datos.budget.trim() !== '') {
        nuevaSolicitud.budget = datos.budget.trim();
      }

      await api.post('/requests', nuevaSolicitud);

      onCreada();
    } catch (error) {
      setError(
        error.response?.data?.error ||
          'No fue posible crear la solicitud. Intenta nuevamente.'
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          Nueva solicitud de servicio
        </h2>

        <button
          type="button"
          onClick={onCerrar}
          disabled={guardando}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>

      <form onSubmit={enviarSolicitud} className="space-y-5">
        <div>
          <label
            htmlFor="serviceId"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Servicio *
          </label>

          <select
            id="serviceId"
            name="serviceId"
            value={datos.serviceId}
            onChange={actualizarCampo}
            required
            disabled={guardando}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          >
            <option value="">Selecciona un servicio</option>

            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Título de la solicitud *
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={datos.title}
            onChange={actualizarCampo}
            placeholder="Ej. Reparación de lavamanos"
            required
            disabled={guardando}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Descripción *
          </label>

          <textarea
            id="description"
            name="description"
            value={datos.description}
            onChange={actualizarCampo}
            placeholder="Describe el problema o trabajo que necesitas."
            rows={4}
            required
            disabled={guardando}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Dirección *
          </label>

          <input
            id="address"
            name="address"
            type="text"
            value={datos.address}
            onChange={actualizarCampo}
            placeholder="Ej. Calle 100 #15-20, Bogotá"
            required
            disabled={guardando}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label
            htmlFor="budget"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Presupuesto (opcional)
          </label>

          <input
            id="budget"
            name="budget"
            type="number"
            min="0"
            step="0.01"
            value={datos.budget}
            onChange={actualizarCampo}
            placeholder="Ej. 80000"
            disabled={guardando}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={guardando}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {guardando ? 'Guardando...' : 'Crear solicitud'}
        </button>
      </form>
    </section>
  );
}

export default FormularioSolicitud;
