import { Fieldset, Legend } from "@headlessui/react";
import { CampingSpots } from "@/components/Booking/FormFields";

export default function SelectCampingArea({ data }) {
  return (
    <Fieldset className="grid gap-y-6">
      <Legend className="heading-3">Camping Spot</Legend>
      <CampingSpots selectionData={data} />
    </Fieldset>
  );
}
