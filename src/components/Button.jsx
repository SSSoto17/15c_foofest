export default function Button({ label, variant, formAction, onClick }) {
  const variants = {
    primary: "",
    secondary: "",
    ghost: "",
    form: "border-3 border-forest-600 text-aztec-200",
  };
  return (
    <button
      {...(formAction
        ? (formAction = { formAction })
        : (onClick = { onClick }))}
      className={`button ${variants[variant]}`}
    >
      {label}
    </button>
  );
}
