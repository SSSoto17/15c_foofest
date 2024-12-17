import { MdAdd } from "react-icons/md";

const Accordion = ({ label, variant, name, children }) => {
  const variants = {
    primary: "heading-2 justify-between",
    secondary: "heading-4",
  };

  return (
    <details
      name={name}
      className="group border-2 border-border-global px-6 py-6"
    >
      <summary
        className={`cursor-pointer list-none flex items-center gap-4 ${variants[variant]}`}
      >
        <MdAdd
          size="2rem"
          className={`duration-300 ease-in-out group-open:rotate-45 ${
            variant === "primary" && "order-2"
          }`}
        />
        {label}
      </summary>
      {children}
    </details>
  );
};

export default Accordion;
