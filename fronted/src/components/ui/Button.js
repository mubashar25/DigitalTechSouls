export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
}) {

  const baseStyle =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {

    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/20",

    secondary:
      "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md",

    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-red-500/20",

    outline:
      "border border-indigo-500/30 text-indigo-600 hover:bg-indigo-50",

    ghost:
      "text-gray-300 hover:bg-white/10 hover:text-white",

    gradient:
      "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:opacity-95 shadow-lg hover:shadow-cyan-500/20",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className={`
        ${baseStyle}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >

      {/* LEFT ICON */}
      {!loading && leftIcon}

      {/* LOADING */}
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </>
      ) : (
        children
      )}

      {/* RIGHT ICON */}
      {!loading && rightIcon}

    </button>
  );
}