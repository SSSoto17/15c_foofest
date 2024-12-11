import TitleSchedule from "./TitleSchedule";

const HeaderSchedule = () => {
  return (
    <header className="col-start-2 col-span-full row-start-1 grid grid-cols-subgrid">
      <TitleSchedule text="Thursday" decoration="08"></TitleSchedule>
      <TitleSchedule text="Friday" decoration="09"></TitleSchedule>
      <TitleSchedule text="Saturday" decoration="10"></TitleSchedule>
    </header>
  );
};

export default HeaderSchedule;
