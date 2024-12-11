import ButtonNav from "./ButtonNav";

const LineupNav = () => {
  return (
    <ul className="flex gap-8 uppercase font-semibold justify-center mb-8">
      {/* <li className="border-b-2 border-forest-700">Stages</li> */}
      <ButtonNav label="Artist"></ButtonNav>
      <ButtonNav label="Day"></ButtonNav>
      <ButtonNav label="Stage"></ButtonNav>
    </ul>
  );
};

export default LineupNav;
