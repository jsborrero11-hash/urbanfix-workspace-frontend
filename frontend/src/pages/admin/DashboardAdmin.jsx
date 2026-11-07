
import Navbar from '../../components/ui/Navbar';

const usuarios = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    correo: 'juan@test.com',
    rol: 'CLIENTE',
    estado: 'ACTIVO',
  },
  {
    id: 2,
    nombre: 'Pedro Técnico',
    correo: 'pedro@test.com',
    rol: 'TECNICO',
    estado: 'ACTIVO',
  },
  {
    id: 3,
    nombre: 'Administrador',
    correo: 'admin@test.com',
    rol: 'ADMIN',
    estado: 'ACTIVO',
  },
];

const servicios = [
  { id: 1, nombre: 'Plomería', categoria: 'Hogar', estado: 'ACTIVO' },
  { id: 2, nombre: 'Electricidad', categoria: 'Hogar', estado: 'ACTIVO' },
  { id: 3, nombre: 'Carpintería', categoria: 'Mantenimiento', estado: 'ACTIVO' },
  { id: 4, nombre: 'Pintura', categoria: 'Remodelación', estado: 'ACTIVO' },
];

const solicitudes = [
  {
    id: 'UF-001',
    cliente: 'Juan Pérez',
    servicio: 'Reparación de grifo',
    estado: 'PENDIENTE',
  },
  {
    id: 'UF-002',
    cliente: 'María González',
    servicio: 'Instalación eléctrica',
    estado: 'ACEPTADA',
  },
  {
    id: 'UF-003',
    cliente: 'Carlos Ramírez',
    servicio: 'Reparación de tubería',
    estado: 'EN_PROGRESO',
  },
];

function DashboardAdmin() {
  const obtenerEstado = (estado) => {
    const estilos = {
      ACTIVO: 'bg-green-100 text-green-800',
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
            Panel de Administración
          </h1>

          <p className="mt-2 text-gray-600">
            Gestiona y supervisa la plataforma UrbanFix Solutions.
          </p>
        </section>

        <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Usuarios registrados</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {usuarios.length}
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Técnicos</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              {usuarios.filter((usuario) => usuario.rol === 'TECNICO').length}
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Servicios publicados</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {servicios.length}
            </p>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Solicitudes registradas</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">
              {solicitudes.length}
            </p>
          </article>
        </section>

        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Gestión de usuarios
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Consulta los usuarios registrados en la plataforma.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Nombre</th>
                    <th className="px-5 py-4 font-semibold">Correo</th>
                    <th className="px-5 py-4 font-semibold">Rol</th>
                    <th className="px-5 py-4 font-semibold">Estado</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {usuario.nombre}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {usuario.correo}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {usuario.rol}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${obtenerEstado(usuario.estado)}`}>
                          {usuario.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Gestión de servicios
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Servicios disponibles en UrbanFix.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Servicio</th>
                    <th className="px-5 py-4 font-semibold">Categoría</th>
                    <th className="px-5 py-4 font-semibold">Estado</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {servicios.map((servicio) => (
                    <tr key={servicio.id}>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {servicio.nombre}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {servicio.categoria}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${obtenerEstado(servicio.estado)}`}>
                          {servicio.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Seguimiento de solicitudes
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Supervisa las solicitudes de servicio registradas.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Código</th>
                    <th className="px-5 py-4 font-semibold">Cliente</th>
                    <th className="px-5 py-4 font-semibold">Servicio</th>
                    <th className="px-5 py-4 font-semibold">Estado</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {solicitudes.map((solicitud) => (
                    <tr key={solicitud.id}>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {solicitud.id}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {solicitud.cliente}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {solicitud.servicio}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${obtenerEstado(solicitud.estado)}`}>
                          {solicitud.estado.replace('_', ' ')}
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

export default DashboardAdmin;
