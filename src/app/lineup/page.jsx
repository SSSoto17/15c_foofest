import { getArtists, getStages } from "../lib/lineup";
import ByArtist from "@/components/lineup/ByArtist";
import ByDay from "@/components/lineup/ByDay";
import ByStage from "@/components/lineup/ByStage";

export default async function Lineup() {
  const artists = await getArtists();
  const stages = await getStages();

  //   console.log("STAGES",stages);

  return (
    <main className="grid gap-10">
      <h1 className="heading-title text-center">Line up</h1>
      <section className="te">
        <ul className="flex gap-8 uppercase font-semibold justify-center">
          <li className="border-b-2 border-forest-700">Stages</li>
          <li>Day</li>
          <li>Artist</li>
        </ul>

        {/* <ByArtist data={artists}></ByArtist> */}
        {/* <ByStage data={stages}></ByStage> */}
        <ByDay data={stages}></ByDay>
      </section>
    </main>
  );
}
