import Image from "next/image";
import picture from "../../assets/tester/terminalist.jpg";
import Link from "next/link";

const ArtistCard = ({ name, slug, img }) => {
  console.log("IMG:", img);

  return (
    <li>
      <Link href={`artist/${slug}`} className="grid aspect-square">
        <Image src={picture} width="400" height="400" alt={`Image of ${name}`} className="grayscale row-start-1 col-start-1"></Image>
        <h3 className="z-1 text-aztec-100 heading-2 px-6 py-1 row-start-1 col-start-1 self-end bg-gradient-to-t from-black">{name}</h3>
      </Link>
    </li>
  );
};

export default ArtistCard;
