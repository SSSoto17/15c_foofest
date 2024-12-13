import ButtonNav from "./ButtonNav";

const LineupNav = ({ category }) => {
  const activeCategory = category;

  return (
    <ul className="flex gap-8 uppercase font-semibold justify-center mb-8">
      {/* <li className="border-b-2 border-forest-700">Stages</li> */}
      <ButtonNav activeCategory={activeCategory} label="Artist"></ButtonNav>
      <ButtonNav activeCategory={activeCategory} label="Day"></ButtonNav>
      <ButtonNav activeCategory={activeCategory} label="Stage"></ButtonNav>
    </ul>
  );
};

export default LineupNav;
