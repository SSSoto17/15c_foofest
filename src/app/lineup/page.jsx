import { getArtists, getStages } from "../lib/lineup";
import ByArtist from "@/components/lineup/ByArtist";
import ByDay from "@/components/lineup/ByDay";
import ByStage from "@/components/lineup/ByStage";
import LineupNav from "@/components/lineup/LineupNav";

export default async function Lineup({ searchParams }) {
  const { category } = await searchParams;
  //   console.log("CATEGORY", category);

  const artists = await getArtists();
  const stages = await getStages();

  return (
    <main className="grid gap-10">
      <section className="flow-space">
        <h1 className="heading-title text-center">Line up</h1>
        <LineupNav category={category}></LineupNav>
        {category === "Artist" ? <ByArtist artists={artists}></ByArtist> : category === "Stage" ? <ByStage data={stages}></ByStage> : <ByDay data={stages}></ByDay>}
      </section>
    </main>
  );
}
