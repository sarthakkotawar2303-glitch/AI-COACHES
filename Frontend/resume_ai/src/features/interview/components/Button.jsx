

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-zinc-100 hover:bg-zinc-200 text-zinc-950 shadow active:scale-98",
    secondary:
      "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-100 active:scale-98",
    danger:
      "bg-red-600 hover:bg-red-500 text-white shadow active:scale-98"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
