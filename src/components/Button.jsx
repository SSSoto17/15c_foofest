export default function PrimaryButton({
  variant,
  formAction,
  onClick,
  isDisabled,
  children,
}) {
  const variants = {
    primary: "",
    secondary: "",
    ghost: "",
    form: "border-3 border-forest-600 text-aztec-200",
  };
  return (
    <button
      {...(formAction ? { formAction } : { onClick })}
      disabled={isDisabled}
      className={`button ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
