const endpoint = process.env.FOO_FEST_API_URL;

export async function getCampingSpots() {
  const data = await fetch(`${endpoint}available-spots`).then((res) =>
    res.json()
  );

  return data;
}
