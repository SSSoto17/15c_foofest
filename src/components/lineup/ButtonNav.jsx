import Link from "next/link";

const ButtonNav = ({ activeCategory, label }) => {
  return (
    <li className={activeCategory === label ? "border-b-2 border-forest-700" : undefined}>
      <Link href={`?category=${label}`}>{label}</Link>
      {/* <button onClick=`/${label}`>{label}</button> */}
    </li>
  );
};

export default ButtonNav;
