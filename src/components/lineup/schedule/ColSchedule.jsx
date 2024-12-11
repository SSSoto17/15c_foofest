import TableCell from "./TableCell";

const ColSchedule = ({ data }) => {
  return (
    <li className=" row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid ">
      <ul className="row-span-full grid grid-rows-subgrid">{data.map((act) => (act.act === "break" ? <TableCell className="p-2"></TableCell> : <TableCell className="p-2">{act.act}</TableCell>))}</ul>
    </li>
  );
};

export default ColSchedule;
