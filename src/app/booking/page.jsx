import BookingForm from "@/components/BookingForm";
import { getCampingSpots } from "../../lib/tickets";
import { FormHeader } from "@/components/BookingForm";

export default async function Page() {
  const availableSpots = await getCampingSpots();

  const formSteps = [
    { step: 1, title: "Choose Tickets" },
    { step: 2, title: "Your Information" },
    { step: 3, title: "Payment" },
  ];
  return (
    <main>
      <section className="border border-border-form">
        {/* <FormHeader formSteps={formSteps} /> */}
        <BookingForm formSteps={formSteps} availableSpots={availableSpots} />
      </section>
    </main>
  );
}
