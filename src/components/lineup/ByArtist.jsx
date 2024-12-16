import ArtistCard from "@/components/lineup/ArtistCard";
import SortByMenu from "@/components/lineup/SortByMenu";

const ByArtist = ({ data }) => {
  const artists = data;
  const endpoint = process.env.FOO_FEST_API_URL;

  return (
    <section className="grid grid-cols-4 gap-4">
      <SortByMenu></SortByMenu>
      <ul className="grid grid-cols-subgrid col-start-2 col-span-3 gap-4">
        {artists.map((artist) => {
          // console.log("URL", `${endpoint}/logos/${artist.logo}`);

          const artistImg = artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`;
          console.log("IMG", artistImg);
          return <ArtistCard key={artist.slug} name={artist.name} slug={artist.slug} img={artistImg}></ArtistCard>;
        })}
      </ul>
    </section>
  );
};

export default ByArtist;
