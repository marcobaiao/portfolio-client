function ErrorAlert({ children, className }) {
  return (
    <div
      className={`mb-3 bg-red-200 p-3 flex items-center rounded-md ${className}`}
    >
      {children}
    </div>
  );
}

export default ErrorAlert;
