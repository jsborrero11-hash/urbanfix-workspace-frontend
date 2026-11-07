
import { useEffect, useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import FormularioSolicitud from '../../components/FormularioSolicitud';
import DetalleSolicitud from '../../components/DetalleSolicitud';
import api from '../../services/api';

const detallesServicios = {
  plomeria: {
    descripcion: 'Reparación de tuberías, grifos y fugas de agua.',
    emoji: '🔧',
  },
  electricidad: {
    descripcion: 'Instalaciones, reparaciones y mantenimiento eléctrico.',
    emoji: '💡',
  },
  carpinteria: {
    descripcion: 'Reparación y fabricación de muebles.',
    emoji: '🪚',
  },
  pintura: {
    descripcion: 'Pintura y renovación de espacios interiores y exteriores.',
    emoji: '🎨',
  },
};

function DashboardCliente() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [servicios, setServicios] = useState([]);
  const [cargandoServicios, setCargandoServicios] = useState(true);
  const [errorServicios, setErrorServicios] = useState('');

  const [solicitudes, setSolicitudes] = useState([]);
  const [cargandoSolicitudes, setCargandoSolicitudes] = useState(true);
  const [errorSolicitudes, setErrorSolicitudes] = useState('');

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');

  const [cancelandoId, setCancelandoId] = useState(null);
  const [errorCancelacion, setErrorCancelacion] = useState('');

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const response = await api.get('/services');

        const serviciosAPI = response.data.items.map((servicio) => ({
          id: servicio.id,
          nombre: servicio.name,
          slug: servicio.slug,
          descripcion:
            detallesServicios[servicio.slug]?.descripcion ||
            'Servicio profesional para tu hogar.',
          emoji: detallesServicios[servicio.slug]?.emoji || '🛠️',
        }));

        setServicios(serviciosAPI);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
        setErrorServicios(
          'No fue posible cargar los servicios. Intenta nuevamente.'
        );
      } finally {
        setCargandoServicios(false);
      }
    };

    cargarServicios();
  }, []);

  const cargarSolicitudes = async () => {
    setCargandoSolicitudes(true);
    setErrorSolicitudes('');

    try {
      const response = await api.get('/requests/mine');
      setSolicitudes(response.data.items);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      setErrorSolicitudes('No fue posible cargar tus solicitudes.');
    } finally {
      setCargandoSolicitudes(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const abrirFormulario = () => {
    setMensajeExito('');
    setErrorCancelacion('');
    setSolicitudSeleccionada(null);
    setMostrarFormulario(true);
  };

  const abrirDetalle = (solicitud) => {
    setMostrarFormulario(false);
    setSolicitudSeleccionada(solicitud);
  };

  const solicitudCreada = async () => {
    setMostrarFormulario(false);
    setMensajeExito('Tu solicitud fue creada correctamente.');
    await cargarSolicitudes();
  };

  const cancelarSolicitud = async (solicitud) => {
    if (solicitud.status !== 'PENDIENTE' || cancelandoId) {
      return;
    }

    const confirmar = window.confirm(
      `¿Estás seguro de cancelar la solicitud "${solicitud.title}"?`
    );

    if (!confirmar) {
      return;
    }

    setCancelandoId(solicitud.id);
    setErrorCancelacion('');
    setMensajeExito('');

    try {
      const response = await api.patch(
        `/requests/${solicitud.id}/cancel`
      );

      const solicitudActualizada = response.data;

      setSolicitudes((anteriores) =>
        anteriores.map((item) =>
          item.id === solicitud.id ? solicitudActualizada : item
        )
      );

      setSolicitudSeleccionada((actual) =>
        actual?.id === solicitud.id ? solicitudActualizada : actual
      );

      setMensajeExito('La solicitud fue cancelada correctamente.');
    } catch (error) {
      setErrorCancelacion(
        error.response?.data?.error ||
          'No fue posible cancelar la solicitud. Intenta nuevamente.'
      );

      await cargarSolicitudes();
    } finally {
      setCancelandoId(null);
    }
  };

  const obtenerEstado = (estado) => {
    const estilos = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800',
      ACEPTADA: 'bg-blue-100 text-blue-800',
      EN_PROGRESO: 'bg-purple-100 text-purple-800',
      COMPLETADA: 'bg-green-100 text-green-800',
      CANCELADA: 'bg-red-100 text-red-800',
    };

    return estilos[estado] || 'bg-gray-100 text-gray-700';
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Hola, {user.name || 'Cliente'}!
          </h1>

          <p className="mt-2 text-gray-600">
            Bienvenido a UrbanFix. ¿Qué servicio necesitas hoy?
          </p>
        </section>

        <section className="mb-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Explora nuestros servicios
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Encuentra el profesional que necesitas.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirFormulario}
              disabled={cargandoServicios || Boolean(errorServicios)}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Solicitar servicio
            </button>
          </div>

          {cargandoServicios && (
            <p className="py-6 text-center text-gray-500">
              Cargando servicios...
            </p>
          )}

          {errorServicios && (
            <p className="py-6 text-center text-red-600">
              {errorServicios}
            </p>
          )}

          {!cargandoServicios && !errorServicios && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {servicios.map((servicio) => (
                <article
                  key={servicio.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 text-4xl">{servicio.emoji}</div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {servicio.nombre}
                  </h3>

                  <p className="text-sm leading-6 text-gray-600">
                    {servicio.descripcion}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        {mensajeExito && (
          <div
            role="status"
            className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
          >
            {mensajeExito}
          </div>
        )}

        {errorCancelacion && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
          >
            {errorCancelacion}
          </div>
        )}

        {mostrarFormulario && (
          <FormularioSolicitud
            servicios={servicios}
            onCerrar={() => setMostrarFormulario(false)}
            onCreada={solicitudCreada}
          />
        )}

        {solicitudSeleccionada && (
          <DetalleSolicitud
            solicitud={solicitudSeleccionada}
            onCerrar={() => setSolicitudSeleccionada(null)}
          />
        )}

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Mis solicitudes
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Consulta el estado de tus solicitudes de servicio.
            </p>
          </div>

          {cargandoSolicitudes && (
            <p className="py-6 text-center text-gray-500">
              Cargando tus solicitudes...
            </p>
          )}

          {errorSolicitudes && (
            <p className="py-6 text-center text-red-600">
              {errorSolicitudes}
            </p>
          )}

          {!cargandoSolicitudes && !errorSolicitudes && (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Solicitud</th>
                      <th className="px-5 py-4 font-semibold">Servicio</th>
                      <th className="px-5 py-4 font-semibold">Fecha</th>
                      <th className="px-5 py-4 font-semibold">Estado</th>
                      <th className="px-5 py-4 font-semibold">Acciones</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {solicitudes.map((solicitud) => (
                      <tr key={solicitud.id}>
                        <td className="px-5 py-4 font-medium text-gray-800">
                          {solicitud.title}
                        </td>

                        <td className="px-5 py-4 text-gray-700">
                          {solicitud.service?.name || 'Servicio'}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {formatearFecha(solicitud.createdAt)}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${obtenerEstado(solicitud.status)}`}
                          >
                            {solicitud.status.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => abrirDetalle(solicitud)}
                              className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Ver detalle
                            </button>

                            {solicitud.status === 'PENDIENTE' && (
                              <button
                                type="button"
                                onClick={() => cancelarSolicitud(solicitud)}
                                disabled={Boolean(cancelandoId)}
                                className="font-semibold text-red-600 hover:text-red-800 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {cancelandoId === solicitud.id
                                  ? 'Cancelando...'
                                  : 'Cancelar'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}

                    {solicitudes.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-5 py-8 text-center text-gray-500"
                        >
                          Todavía no tienes solicitudes registradas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardCliente;
