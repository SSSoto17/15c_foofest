"use client";
import ButtonNav from "./ButtonNav";

import { useState } from "react";

const LineupNav = ({ active }) => {
  const pages = ["artists", "days", "stages"];
  // const [active, setActive] = useState(category);
  return (
    <ul className="flex gap-8 uppercase font-semibold justify-center mb-8">
      {/* <li className="border-b-2 border-forest-700">Stages</li> */}
      {pages.map((page, id) => {
        console.log("active?", active == page);
        return <ButtonNav key={id} label={page} active={active == page} />;
      })}
      {/* <ButtonNav
        active={active}
        label="artists"
        onClick={() => {
          setActive();
        }}
      ></ButtonNav>
      <ButtonNav active={active} label="days"></ButtonNav>
      <ButtonNav label="stages"></ButtonNav> */}
    </ul>
  );
};

export default LineupNav;
