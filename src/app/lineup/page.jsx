import Accordion from "@/components/lineup/Accordion";
import ArtistCard from "@/components/lineup/ArtistCard";
import SortByMenu from "@/components/lineup/SortByMenu";

import { getArtists } from "../lib/lineup";

export default async function Lineup() {
  const artists = await getArtists();

  return (
    <main className="grid gap-10">
      <header>
        <h1 className="heading-title text-center">Line up</h1>
        <section className="te">
          <ul className="flex gap-8 uppercase font-semibold justify-center">
            <li className="border-b-2 border-forest-700">Stage</li>
            <li>Day</li>
            <li>Artist</li>
          </ul>
        </section>
      </header>

      {/* Stage */}
      <section className="grid gap-4">
        <Accordion summary="Jotunheim">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia minima aliquid numquam voluptas enim deleniti commodi laudantium? Accusantium repudiandae sunt ut quo nobis, tenetur quidem recusandae dolore explicabo esse commodi!</Accordion>
        <Accordion summary="Midgard">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia minima aliquid numquam voluptas enim deleniti commodi laudantium? Accusantium repudiandae sunt ut quo nobis, tenetur quidem recusandae dolore explicabo esse commodi!</Accordion>
        <Accordion summary="Vanaheim">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia minima aliquid numquam voluptas enim deleniti commodi laudantium? Accusantium repudiandae sunt ut quo nobis, tenetur quidem recusandae dolore explicabo esse commodi!</Accordion>
      </section>
      {/* Day */}
      <section></section>
      {/* Artist */}
      <section className="grid grid-cols-4 gap-4">
        <SortByMenu></SortByMenu>
        <ul className="grid grid-cols-subgrid col-start-2 col-span-3 gap-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.slug} name={artist.name} slug={artist.slug} img={artist.logo}></ArtistCard>
          ))}
        </ul>
      </section>
    </main>
  );
}
