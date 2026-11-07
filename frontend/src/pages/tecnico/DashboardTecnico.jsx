
import Navbar from '../../components/ui/Navbar';

const solicitudesDisponibles = [
  {
    id: 'UF-003',
    servicio: 'Reparación de tubería',
    cliente: 'Carlos Ramírez',
    ubicacion: 'Bogotá, Chapinero',
    fecha: '04/11/2026',
    pago: '$80.000',
  },
  {
    id: 'UF-004',
    servicio: 'Instalación de lámparas',
    cliente: 'María González',
    ubicacion: 'Bogotá, Teusaquillo',
    fecha: '04/11/2026',
    pago: '$65.000',
  },
];

const misTrabajos = [
  {
    id: 'UF-002',
    servicio: 'Instalación eléctrica',
    cliente: 'Juan Pérez',
    fecha: '02/11/2026',
    estado: 'ACEPTADA',
  },
  {
    id: 'UF-005',
    servicio: 'Mantenimiento de grifo',
    cliente: 'Laura Torres',
    fecha: '01/11/2026',
    estado: 'EN_PROGRESO',
  },
];

function DashboardTecnico() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Hola, {user.name || 'Técnico'}!
          </h1>

          <p className="mt-2 text-gray-600">
            Bienvenido a tu panel de trabajo en UrbanFix.
          </p>
        </section>

        <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Solicitudes disponibles</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {solicitudesDisponibles.length}
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Trabajos asignados</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              {misTrabajos.length}
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Trabajos completados</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              0
            </p>
          </article>
        </section>

        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Solicitudes disponibles
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Oportunidades de servicio que puedes revisar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {solicitudesDisponibles.map((solicitud) => (
              <article
                key={solicitud.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    {solicitud.id}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    Disponible
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {solicitud.servicio}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p>Cliente: {solicitud.cliente}</p>
                  <p>Ubicación: {solicitud.ubicacion}</p>
                  <p>Fecha: {solicitud.fecha}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-bold text-gray-900">
                    {solicitud.pago}
                  </span>

                  <button
                    type="button"
                    disabled
                    title="Funcionalidad pendiente de implementar"
                    className="cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-600"
                  >
                    Aceptar trabajo
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Mis trabajos
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Consulta los servicios que tienes asignados.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Código</th>
                    <th className="px-5 py-4 font-semibold">Servicio</th>
                    <th className="px-5 py-4 font-semibold">Cliente</th>
                    <th className="px-5 py-4 font-semibold">Fecha</th>
                    <th className="px-5 py-4 font-semibold">Estado</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {misTrabajos.map((trabajo) => (
                    <tr key={trabajo.id}>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {trabajo.id}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {trabajo.servicio}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {trabajo.cliente}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {trabajo.fecha}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${obtenerEstado(trabajo.estado)}`}
                        >
                          {trabajo.estado.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardTecnico;
