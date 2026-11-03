
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          UrbanFix
        </Link>

        <div className="flex items-center gap-5">

          {user && (
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                {user.name}
              </p>

              <p className="text-xs text-gray-500">
                {user.role}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Cerrar sesión
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
