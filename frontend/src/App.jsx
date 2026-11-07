import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Páginas del proyecto
import Login from './pages/Login';
import DashboardCliente from './pages/cliente/DashboardCliente';
import DashboardTecnico from './pages/tecnico/DashboardTecnico';
import DashboardAdmin from './pages/admin/DashboardAdmin';

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
