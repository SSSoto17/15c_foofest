export default function Button({ label }) {
  return (
    <button className="place-self-end cursor-pointer font-bold border-2 border-forest-800 text-aztec-200 py-2 w-full max-w-48">
      {label}
    </button>
  );
}
