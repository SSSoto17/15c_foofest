import TableCell from "./TableCell";

const ColSchedule = ({ data }) => {
  return (
    <li className=" row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid ">
      <ul className="row-span-full grid grid-rows-subgrid">
        {data.map((act) =>
          act.act === "break" ? (
            <TableCell></TableCell>
          ) : act.cancelled ? (
            <TableCell>
              <p className="col-start-1">{act.act}</p>
              <p className="col-start-1 opacity-75 -rotate-12 body-copy-small uppercase border-2 border-gold-600 text-gold-600 inline-block px-2 py-0.5">Cancelled</p>
            </TableCell>
          ) : (
            <TableCell>
              <p> {act.act}</p>
            </TableCell>
          )
        )}
      </ul>
    </li>
  );
};

export default ColSchedule;

// import TableCell from "./TableCell";

// const ColSchedule = ({ data }) => {
//   return (
//     <li className=" row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid ">
//       <ul className="row-span-full grid grid-rows-subgrid">{data.map((act) => (act.act === "break" ? <TableCell className="p-2"></TableCell> : <TableCell className="p-2">{act.act}</TableCell>))}</ul>
//     </li>
//   );
// };

// export default ColSchedule;
