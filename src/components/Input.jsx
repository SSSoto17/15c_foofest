const Input = ({ label, id, name, placeholder }) => {
  return (
    <div className="grid gap-y-2">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        className="bg-aztec-800 border border-aztec-600 rounded-xs p-2"
      />
    </div>
  );
};

export default Input;
