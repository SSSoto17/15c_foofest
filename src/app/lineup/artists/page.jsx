import { getArtists } from "@/app/lib/lineup";
import LineupLayout from "@/components/lineup/LineupLayout";
import ByArtist from "@/components/lineup/ByArtist";

export default async function Artists() {
  const artists = await getArtists();

  return (
    <LineupLayout category="artists">
      <ByArtist artists={artists}></ByArtist>
    </LineupLayout>
  );
}
