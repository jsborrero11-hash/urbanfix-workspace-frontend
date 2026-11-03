
function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',

    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',

    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',

    success:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',

    outline:
      'border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const buttonStyles = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      className={buttonStyles}
    >
      {loading ? 'Procesando...' : children}
    </button>
  );
}

export default Button;
