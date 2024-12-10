import Accordion from "@/components/lineup/Accordion";
import ArtistCard from "@/components/lineup/ArtistCard";
import SortByMenu from "@/components/lineup/SortByMenu";
import Schedule from "@/components/lineup/Schedule";

import { getArtists, getStages } from "../lib/lineup";

export default async function Lineup() {
  const endpoint = process.env.FOO_FEST_API_URL;
  const artists = await getArtists();
  const stages = await getStages();

  const Midgard = stages.Midgard;
  const Vanaheim = stages.Vanaheim;
  const Jotunheim = stages.Jotunheim;
  //   console.log("STAGES");

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
        <Accordion summary="Jotunheim">
          <Schedule data={Jotunheim}></Schedule>
        </Accordion>
        <Accordion summary="Midgard">
          <Schedule data={Midgard}></Schedule>
        </Accordion>
        <Accordion summary="Vanaheim">
          <Schedule data={Vanaheim}></Schedule>
        </Accordion>
      </section>

      {/* Artist */}
      <section className="grid grid-cols-4 gap-4">
        <SortByMenu></SortByMenu>
        <ul className="grid grid-cols-subgrid col-start-2 col-span-3 gap-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.slug} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`}></ArtistCard>
          ))}
        </ul>
      </section>
    </main>
  );
}
