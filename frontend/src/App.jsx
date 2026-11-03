import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Páginas del proyecto
import Login from './pages/Login';

// Componentes temporales (Placeholder) para probar que cada rol llegue a su sitio
const DashboardCliente = () => (
  <div className="p-8 font-sans">
    <h1 className="text-2xl font-bold text-blue-600">Bienvenido al Dashboard del Cliente</h1>
    <p>Aquí el cliente creará y verá sus solicitudes de servicio.</p>
  </div>
);

const DashboardTecnico = () => (
  <div className="p-8 font-sans">
    <h1 className="text-2xl font-bold text-green-600">Bienvenido al Dashboard del Técnico</h1>
    <p>Aquí el técnico aceptará trabajos y actualizará sus estados.</p>
  </div>
);

const DashboardAdmin = () => (
  <div className="p-8 font-sans">
    <h1 className="text-2xl font-bold text-purple-600">Bienvenido al Panel de Administración</h1>
    <p>Aquí el administrador gestionará usuarios y servicios.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta Pública */}
          <Route path="/login" element={<Login />} />

          {/* Ruta Protegida: SOLO para CLIENTE */}
          <Route element={<ProtectedRoute allowedRoles={['CLIENTE']} />}>
            <Route path="/cliente" element={<DashboardCliente />} />
          </Route>

          {/* Ruta Protegida: SOLO para TECNICO */}
          <Route element={<ProtectedRoute allowedRoles={['TECNICO']} />}>
            <Route path="/tecnico" element={<DashboardTecnico />} />
          </Route>

          {/* Ruta Protegida: SOLO para ADMIN */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<DashboardAdmin />} />
          </Route>

          {/* Redirección automática si escriben cualquier otra ruta desconocida */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
