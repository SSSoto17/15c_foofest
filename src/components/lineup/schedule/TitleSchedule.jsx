const TitleSchedule = ({ text, decoration }) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_4fr] grid-rows-4">
      <p className="hidden font-display text-res-5xl md:block uppercase text-forest-900 row-start-1 row-span-4 col-start-1 col-span-3">{decoration}</p>
      <h2 className="-rotate-45 md:rotate-0 heading-5 row-start-3 row-span-2 col-start-2 col-span-full">{text}</h2>
    </div>
    // <div className="grid grid-cols-[1fr_1fr_1fr_4fr] grid-rows-4">
    //   <p className="heading-1 uppercase text-forest-900 row-start-1 row-span-4 col-start-1 col-span-3">{decoration}</p>
    //   <h2 className="heading-5 row-start-3 row-span-2 col-start-2 col-span-full">{text}</h2>
    // </div>
  );
};

export default TitleSchedule;
