import BookingForm from "@/components/booking/Form";
import { getCampingSpots } from "@/lib/order";

export default async function Page() {
  const data = await getCampingSpots();

  return (
    <main>
      <section className="grid grid-cols-4 grid-rows-[auto_auto_auto] gap-x-4">
        <BookingForm areaData={data} />
      </section>
    </main>
  );
}
