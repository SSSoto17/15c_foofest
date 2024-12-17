"use client";
import { useState } from "react";
import ArtistCard from "@/components/lineup/ArtistCard";
import SortByMenu from "@/components/lineup/SortByMenu";

const ByArtist = ({ artists, searchParams }) => {
  const endpoint = process.env.FOO_FEST_API_URL;
  const genres = Object.groupBy(artists, ({ genre }) => genre);
  const genreNames = Object.keys(genres);
  const sortedGenreNames = genreNames.toSorted();

  // console.log("GENRES ARRAY", genres);
  // console.log("JAZZ", genres["Alternative Metal"]);

  return (
    <section className="grid grid-cols-4 gap-4">
      <SortByMenu genreNames={sortedGenreNames}></SortByMenu>

      <ul className="grid grid-cols-subgrid col-start-2 col-span-3 gap-4">
        {artists.map((artist, i) => (
          <ArtistCard key={i} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`}></ArtistCard>
        ))}
      </ul>
    </section>
  );
};

export default ByArtist;
