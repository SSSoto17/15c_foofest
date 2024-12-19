"use client";
import ArtistCard from "@/components/lineup/ArtistCard";
import SortByMenu from "@/components/lineup/SortByMenu";
import ScrollToButton from "./ScrollToButton";

const ByArtist = ({ artists, filters }) => {
  const endpoint = process.env.FOO_FEST_API_URL;
  const genres = Object.groupBy(artists, ({ genre }) => genre);
  const genreNames = Object.keys(genres);
  const sortedGenreNames = genreNames.toSorted();
  console.log("ARTIST:", artists);

  // const filteredArtists = filters.map((genre) => {
  //   return artists.filter((artist) => artist.genre === genre);
  // });

  // const displayArtists = filters ? filteredArtists : artists;

  // console.log("ARTISTS", artists);
  // console.log("FILTERS", filteredArtists);
  // console.log("GENRES", genres);
  // console.log(artists[1].genre);

  // console.log("GENRES ARRAY", genres);
  // console.log("JAZZ", genres["Alternative Metal"]);

  return (
    <section>
      <ul className="grid grid-cols-4 gap-4">
        {artists.map((artist, i) => (
          // console.log("ARTIST:", artist.slug)
          <ArtistCard key={i} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`}></ArtistCard>
        ))}
      </ul>
      <ScrollToButton scrollFromTop="0" simple={false}>
        Back to top
      </ScrollToButton>
    </section>
  );
};

export default ByArtist;
