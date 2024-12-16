"use client";
import { useState } from "react";
import { MdOutlineCheck } from "react-icons/md";

import { Checkbox } from "@headlessui/react";

const SortByMenu = ({ genreNames }) => {
  const [checked, setCheck] = useState(false);

  return (
    <form>
      <details className="border-2 border-border-global self-start">
        <summary className="p-4 border-b-2 border-b-border-global heading-4">Filter By Genre</summary>
        <ul className="p-4">
          {genreNames.map((genreName, i) => (
            <li key={i}>
              <Checkbox name={genreName} checked={checked} onChange={setCheck} className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none">
                <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
              </Checkbox>
            </li>
          ))}
        </ul>
      </details>
    </form>
  );
};

export default SortByMenu;
