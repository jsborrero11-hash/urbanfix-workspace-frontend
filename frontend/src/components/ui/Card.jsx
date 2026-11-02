
function Card({
  children,
  title,
  description,
  className = '',
}) {
  return (
    <section
      className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg font-bold text-gray-800">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}

export default Card;
