import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

import picture from "../../../assets/tester/terminalist.jpg";

export default function ArtistSingle() {
  return (
    <main>
      <Link href="#">
        <p className="flex gap-4 items-center mb-4 text-aztec-300">
          <span className="">
            <MdOutlineArrowBack />
          </span>
          Back
        </p>
      </Link>

      <section className="grid md:grid-cols-2 gap-10">
        <Image src={picture} alt="band image" placeholder="blur"></Image>
        <article>
          <h1 className="heading-tagline px-4 py-2 border-2 inline-block">
            Thursday<span className="ml-8">14.00</span>
          </h1>
          <h2 className="heading-1 my-6">Terminalist</h2>
          <div className="grid grid-cols-2">
            <article>
              <h3 className="heading-4">Genre</h3>
              <p>Hypertrash</p>
            </article>
            <article>
              <h3 className="heading-4">Members</h3>
              <p>Danny Carey, Adam Jones, Maynard James Keenan, Justin Chancellor</p>
            </article>
          </div>
          <article>
            <h3 className="heading-4">About</h3>
            <p>Hyperthrashers based in Copenhagen, Denmark with sci-fi-fueled lyrics revolving around dromology. Debut album 'The Great Acceleration' out May 7th 2021 on vinyl, tape and digital formats via Indisciplinarian.</p>
          </article>
          <small className="body-copy-small">Photo by Johan von Bülow</small>
        </article>
      </section>
      <section className="mt-10">OTHER RELATED ARTIST ???</section>
    </main>
  );
}
