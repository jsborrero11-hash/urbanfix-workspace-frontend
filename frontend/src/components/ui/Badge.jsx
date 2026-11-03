
function Badge({ status, children, className = '' }) {
  const statusStyles = {
    PENDIENTE: 'bg-yellow-100 text-yellow-800',
    ACEPTADA: 'bg-blue-100 text-blue-800',
    EN_PROGRESO: 'bg-purple-100 text-purple-800',
    COMPLETADA: 'bg-green-100 text-green-800',
    CANCELADA: 'bg-red-100 text-red-800',
  };

  const labels = {
    PENDIENTE: 'Pendiente',
    ACEPTADA: 'Aceptada',
    EN_PROGRESO: 'En progreso',
    COMPLETADA: 'Completada',
    CANCELADA: 'Cancelada',
  };

  const currentStatus = status?.trim().toUpperCase();

  const styles =
    statusStyles[currentStatus] || 'bg-gray-100 text-gray-800';

  const label =
    children || labels[currentStatus] || status || 'Sin estado';

  return (
    <span
      role="status"
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles} ${className}`}
    >
      {label}
    </span>
  );
}

export default Badge;
