function Button({
  buttonRef,
  type,
  onClick,
  color = "primary",
  hoverColor = "primary-hovered",
  textColor = "white",
  fontWeight = "semibold",
  roundedSize = "md",
  children,
  disabled = false,
  className,
}) {
  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`bg-${color} text-${textColor} px-5 py-1.5 rounded-${roundedSize} font-${fontWeight} hover:bg-${hoverColor} ${
        disabled && "disabled"
      }  ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
