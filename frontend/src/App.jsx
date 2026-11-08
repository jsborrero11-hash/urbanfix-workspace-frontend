
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Páginas del proyecto
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardCliente from './pages/cliente/DashboardCliente';
import DashboardTecnico from './pages/tecnico/DashboardTecnico';
import DashboardAdmin from './pages/admin/DashboardAdmin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta protegida: SOLO para CLIENTE */}
          <Route element={<ProtectedRoute allowedRoles={['CLIENTE']} />}>
            <Route path="/cliente" element={<DashboardCliente />} />
          </Route>

          {/* Ruta protegida: SOLO para TECNICO */}
          <Route element={<ProtectedRoute allowedRoles={['TECNICO']} />}>
            <Route path="/tecnico" element={<DashboardTecnico />} />
          </Route>

          {/* Ruta protegida: SOLO para ADMIN */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<DashboardAdmin />} />
          </Route>

          {/* Redirección para rutas desconocidas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
