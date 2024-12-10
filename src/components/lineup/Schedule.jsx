import ColSchedule from "./ColSchedule";
import TableCell from "./TableCell";

const Schedule = ({ data }) => {
  //   console.log("Schedule DATA", data);

  const dataArr = Object.values(data);
  //   console.log("ARRAY DATA", dataArr);

  const threeDays = dataArr.slice(0, 3);
  //   console.log("THREE DAYS", threeDays);

  return (
    <section className="grid grid-cols-4 grid-rows-12">
      <article className="row-span-full grid grid-cols-1 grid-rows-subgrid">
        <ul className="row-start-2 row-span-full grid grid-rows-subgrid">
          <TableCell>06.00</TableCell>
          <TableCell>08.00</TableCell>
          <TableCell>10.00</TableCell>
          <TableCell>12.00</TableCell>
          <TableCell>14.00</TableCell>
          <TableCell>16.00</TableCell>
          <TableCell>18.00</TableCell>
          <TableCell>20.00</TableCell>
          <TableCell>22.00</TableCell>
          <TableCell>00.00</TableCell>
          <TableCell>02.00</TableCell>
          {/* <TableCell>04.00</TableCell> */}
        </ul>
      </article>
      <ul className="col-start-2 col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid">
        {threeDays.map((day) => (
          <ColSchedule data={day}></ColSchedule>
        ))}
      </ul>
    </section>
  );
};

export default Schedule;
