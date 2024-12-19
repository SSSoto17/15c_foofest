import ColSchedule from "./ColSchedule";
import HeaderSchedule from "./HeaderSchedule";
import TableCell from "./TableCell";

const StageSchedule = ({ data }) => {
  // console.log("Schedule DATA", data);

  const dataArr = Object.values(data); //Laver objektet om til et array
  const threeDays = dataArr.slice(4, 7); // Laver et array med blot 3 dage men de er ikke torsdag til lørdag...
  const aDay = data.mon;
  console.log("MON", data.mon);

  return (
    // grid-rows-[repeat(13,_minmax(0,_1fr)
    <section className="grid grid-cols-[0.5fr_1fr_1fr_1fr] grid-rows-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
      <HeaderSchedule text1="Thursday" dec1="08" text2="Friday" dec2="09" text3="Saturday" dec3="10"></HeaderSchedule>
      <ul className="row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid">
        {aDay.map((time) => (
          <TableCell>{time.start}</TableCell>
        ))}
      </ul>
      <ul className="col-start-2 col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid">
        {threeDays.map((day) => (
          <ColSchedule data={day}></ColSchedule>
        ))}
      </ul>
    </section>
  );
};

export default StageSchedule;
