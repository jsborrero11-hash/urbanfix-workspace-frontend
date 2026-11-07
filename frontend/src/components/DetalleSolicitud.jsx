
function DetalleSolicitud({ solicitud, onCerrar }) {
  if (!solicitud) return null;

  const formatearFecha = (fecha) => {
    if (!fecha) return 'No disponible';

    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatearPresupuesto = (presupuesto) => {
    if (
      presupuesto === null ||
      presupuesto === undefined ||
      presupuesto === ''
    ) {
      return 'No especificado';
    }

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 2,
    }).format(Number(presupuesto));
  };

  const estilosEstado = {
    PENDIENTE: 'bg-yellow-100 text-yellow-800',
    ACEPTADA: 'bg-blue-100 text-blue-800',
    EN_PROGRESO: 'bg-purple-100 text-purple-800',
    COMPLETADA: 'bg-green-100 text-green-800',
    CANCELADA: 'bg-red-100 text-red-800',
  };

  const estiloEstado =
    estilosEstado[solicitud.status] || 'bg-gray-100 text-gray-700';

  return (
    <section className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          Detalle de la solicitud
        </h2>

        <button
          type="button"
          onClick={onCerrar}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
        >
          Cerrar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            Servicio
          </p>
          <p className="mt-1 text-gray-900">
            {solicitud.service?.name || 'No disponible'}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500">
            Estado
          </p>
          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${estiloEstado}`}
          >
            {solicitud.status?.replaceAll('_', ' ') || 'No disponible'}
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500">
            Título
          </p>
          <p className="mt-1 text-gray-900">
            {solicitud.title}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500">
            Fecha de creación
          </p>
          <p className="mt-1 text-gray-900">
            {formatearFecha(solicitud.createdAt)}
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-semibold text-gray-500">
            Descripción
          </p>
          <p className="mt-1 whitespace-pre-wrap break-words text-gray-900">
            {solicitud.description || 'No disponible'}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500">
            Dirección
          </p>
          <p className="mt-1 break-words text-gray-900">
            {solicitud.address || 'No disponible'}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500">
            Presupuesto
          </p>
          <p className="mt-1 text-gray-900">
            {formatearPresupuesto(solicitud.budget)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default DetalleSolicitud;
