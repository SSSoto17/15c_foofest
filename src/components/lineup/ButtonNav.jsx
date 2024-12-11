import Link from "next/link";

const ButtonNav = ({ label }) => {
  return (
    <li className="border-b-2 border-forest-700">
      <Link href={`?category=${label}`}>{label}</Link>
      {/* <button onClick=`/${label}`>{label}</button> */}
    </li>
  );
};

export default ButtonNav;
