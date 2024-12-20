import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";
import { getArtistBySlug } from "@/lib/lineup";

import picture from "@/assets/tester/terminalist.jpg";
const endpoint = process.env.FOO_FEST_API_URL;

export default async function ArtistSingle({ params }) {
  const slug = await params;
  const artist = await getArtistBySlug(slug.slug);
  const artistImg = artist.logo.startsWith("https://")
    ? artist.logo
    : `${endpoint}/logos/${artist.logo}`;

  return (
    <main>
      <Link href="/lineup/artists">
        <p className="flex gap-4 items-center mb-4 text-aztec-300">
          <span className="">
            <MdOutlineArrowBack />
          </span>
          Back
        </p>
      </Link>

      <section className="grid md:grid-cols-2 gap-10">
        <div>
          <Image
            src={artistImg}
            alt={`Image of ${artist.name}`}
            placeholder="blur"
          ></Image>
          {artist.logoCredits && (
            <small className="mt-2 inline-block body-copy-small">
              Photo by Johan von Bülow
            </small>
          )}
        </div>
        <article className="">
          <h1 className="heading-tagline px-4 py-2 border-2 inline-block">
            Thursday<span className="ml-8">14.00</span>
          </h1>
          <h2 className="heading-1 my-6">{artist.name}</h2>
          <div className="grid grid-cols-2">
            <article>
              <h3 className="heading-4">Genre</h3>
              <p>{artist.genre}</p>
            </article>
            <article>
              <h3 className="heading-4">Members</h3>
              <ul className="flex flex-wrap gap-x-3">
                {artist.members.map((member) => (
                  <li>{member}</li>
                ))}
              </ul>
              {/* <p>{artist.members}</p> */}
            </article>
          </div>
          <article>
            <h3 className="heading-4">About</h3>
            <p>{artist.bio}</p>
          </article>
        </article>
      </section>
    </main>
  );
}
