const endpoint = process.env.FOO_FEST_API_URL;

export async function getArtists() {
  const response = await fetch(`${endpoint}/bands`, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

// export async function getArtistBySlug(slug) {
//   const response = await fetch(`${endpoint}/${slug}`, {
//     method: "GET",
//   });

//    const data = await response.json();
//    return data;
// }
