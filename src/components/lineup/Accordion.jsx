import { MdAdd } from "react-icons/md";

const Accordion = ({ children, summary }) => {
  return (
    <details className="group border-2 border-border-global px-6 py-6">
      <summary className="cursor-pointer list-none flex items-center justify-between heading-2">
        {summary}
        <MdAdd size="2rem" className="duration-300 ease-in-out group-open:rotate-45" />
      </summary>
      {children}
    </details>
  );
};

export default Accordion;
