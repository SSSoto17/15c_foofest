const TitleSchedule = ({ text, decoration }) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_4fr] grid-rows-4">
      <p className="heading-title text-forest-900 row-start-1 row-span-4 col-start-1 col-span-3">{decoration}</p>
      <h2 className="heading-3 row-start-3 row-span-2 col-start-2 col-span-full">{text}</h2>
    </div>
  );
};

export default TitleSchedule;

// const TitleSchedule = ({ text, decoration }) => {
//   return <h2 className="heading-3 relative after:content-['08'] after:heading-1 after:text-forest-700 after:absolute">{text}</h2>;
// };

// export default TitleSchedule;
