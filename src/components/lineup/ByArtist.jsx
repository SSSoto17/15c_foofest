"use client";
import ArtistCard from "@/components/lineup/ArtistCard";
import SortByMenu from "@/components/lineup/SortByMenu";

const ByArtist = ({ artists, filters }) => {
  const endpoint = process.env.FOO_FEST_API_URL;
  const genres = Object.groupBy(artists, ({ genre }) => genre);
  const genreNames = Object.keys(genres);
  const sortedGenreNames = genreNames.toSorted();

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
    <section className="grid grid-cols-4 gap-4">
      <SortByMenu genreNames={sortedGenreNames}></SortByMenu>
      {filters ? (
        filters.map((filter, i) => {
          return (
            <article className="grid grid-cols-subgrid col-start-2 col-span-3 gap-4 mb-8" key={i}>
              <h2 className="heading-3 col-span-full">{filter}</h2>
              <ul className="grid grid-cols-subgrid col-span-3 gap-4">
                {artists
                  .filter((artist) => artist.genre === filter)
                  .map((artist, i) => (
                    <ArtistCard key={i} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`}></ArtistCard>
                  ))}
              </ul>
            </article>
          );
        })
      ) : (
        <ul className="grid grid-cols-subgrid col-span-3 gap-4">
          {artists.map((artist, i) => (
            <ArtistCard key={i} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`}></ArtistCard>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ByArtist;
