import Form from "@/components/Booking/Form";
import { getCampingSpots } from "../../lib/tickets";

export default async function Page() {
  const campingSpots = await getCampingSpots();

  return (
    <main>
      <section className="border border-border-form">
        <Form areaData={campingSpots} />
      </section>
    </main>
  );
}
