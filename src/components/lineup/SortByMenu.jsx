import { MdOutlineCheck } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Checkbox, Field, Label } from "@headlessui/react";
import Link from "next/link";
import Button from "@/components/Button";

const SortByMenu = ({ genreNames }) => {
  const router = useRouter();

  return (
    <details className="border-2 border-border-global self-start">
      <summary className="p-4 border-b-2 border-b-border-global heading-4">Filter By Genre</summary>
      <form action="/lineup/artists" className="grid grid-cols-1 gap-4 p-4">
        <ul>
          {genreNames.map((genreName, i) => (
            <li key={i} className="pt-2">
              <GenreCheckbox label={genreName} />
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Link href="/lineup/artists" className="grow text-center cursor-pointer rounded-sm px-2 py-1 border-2 border-forest-600 text-forest-500  hover:text-forest-400 hover:border-forest-500 disabled:text-forest-800 disabled:border-forest-800">
            Clear all
          </Link>

          <Button size="small" variant="primary" type="submit">
            Apply
          </Button>
          {/* <Button size="small" variant="secondary" onClick={() => router.push("/lineup/artists")}>
            Clear all
          </Button>
          <Button size="small" variant="primary" type="submit">
            Apply
          </Button> */}
        </div>
      </form>
    </details>
  );
};

export default SortByMenu;

export function GenreCheckbox({ label }) {
  const [checked, setChecked] = useState(false);
  return (
    <Field className="flex items-center gap-3 max-w-xl group hover:cursor-pointer">
      <Checkbox name="genre" value={label} checked={checked} onChange={setChecked} className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none">
        <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
      </Checkbox>
      <Label className="">{label}</Label>
    </Field>
  );
}
