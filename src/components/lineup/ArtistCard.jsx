import Image from "next/image";
import picture from "../../assets/tester/terminalist.jpg";
import Link from "next/link";

const ArtistCard = () => {
  return (
    <li>
      <Link href="/" className="grid aspect-square">
        <Image src={picture} alt="Billede af band" className="grayscale row-start-1 col-start-1"></Image>
        <h3 className="z-1 text-aztec-100 heading-2 px-6 py-1 row-start-1 col-start-1 self-end bg-gradient-to-t from-black">Terminalist</h3>
      </Link>
    </li>
  );
};

export default ArtistCard;
