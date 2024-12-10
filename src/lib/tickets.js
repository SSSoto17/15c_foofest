const endpoint = process.env.FOO_FEST_API_URL;

export async function getCampingSpots() {
  const data = await fetch(`${endpoint}available-spots`).then((res) =>
    res.json()
  );

  return data;
}

export async function putReservation(reservationData) {
  const data = await fetch(`${endpoint}reserve-spot`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  }).then((res) => res.json());

  return data;
}
