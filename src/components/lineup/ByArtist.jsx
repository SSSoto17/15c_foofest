"use client";
import { useState } from "react";
import ArtistCard from "@/components/lineup/ArtistCard";
import SortByMenu from "@/components/lineup/SortByMenu";

const ByArtist = ({ artists }) => {
  const endpoint = process.env.FOO_FEST_API_URL;
  const genres = Object.groupBy(artists, ({ genre }) => genre);
  const genreNames = Object.keys(genres);

  console.log("GENRES ARRAY", genres);
  console.log("JAZZ", genres["Alternative Metal"]);

  return (
    <section className="grid grid-cols-4 gap-4">
      <SortByMenu genreNames={genreNames}></SortByMenu>

      <ul className="grid grid-cols-subgrid col-start-2 col-span-3 gap-4">
        {artists.map((artist, i) => (
          <ArtistCard key={i} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`}></ArtistCard>
          // <ArtistCard key={i} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/Tool_logo_2006.svg`}></ArtistCard>
          // <ArtistCard key={i} name={artist.name} slug={artist.slug} img="https://picsum.photos/720/720?random=62"></ArtistCard>
        ))}
      </ul>
    </section>
  );
};

export default ByArtist;
