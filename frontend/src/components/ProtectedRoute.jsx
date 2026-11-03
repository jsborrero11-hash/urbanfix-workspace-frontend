import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ allowedRoles }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <div className="p-4 text-center font-sans">Cargando verificación de sesión...</div>;
  }

  // 1. Si no hay token o usuario en sesión, redirige al Login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si el rol del usuario no está dentro de los permitidos para esta vista
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'CLIENTE') return <Navigate to="/cliente" replace />;
    if (user.role === 'TECNICO') return <Navigate to="/tecnico" replace />;
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    return <Navigate to="/login" replace />;
  }

  // Si pasa todas las validaciones, renderiza la vista solicitada
  return <Outlet />;
}