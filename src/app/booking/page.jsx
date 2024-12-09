import { Fieldset, Legend } from "@headlessui/react";
import { getCampingSpots } from "../lib/tickets";
import {
  NumberInput,
  CampingSpots,
  Optionals,
  TextInput,
} from "@/components/FormFields";

export default async function BookingFlow() {
  const data = await getCampingSpots();

  const formSteps = [
    { step: 1, title: "Choose Tickets" },
    { step: 2, title: "Your Information" },
    { step: 3, title: "Payment" },
  ];
  return (
    <main>
      <section className="border border-border-form">
        <FormHeader data={formSteps} />
        <form action="" className="p-12">
          <div className="grid gap-y-16">
            <Fieldset className="grid gap-y-4">
              <Legend className="text-desk-lg font-semibold">Tickets</Legend>
              <NumberInput name="partout" label="Partout Ticket" price="799" />
              <NumberInput name="vip" label="VIP Ticket" price="1299" />
            </Fieldset>
            <Fieldset className="grid gap-y-6">
              <Legend className="text-desk-lg font-semibold">
                Camping Spot
              </Legend>
              <CampingSpots availableSpots={data} />
            </Fieldset>
            <Fieldset className="grid gap-y-2">
              <Optionals name="green-fee" label="Green fee" price="+249" />
              <Optionals name="tent-setup" label="Tent setup" />
            </Fieldset>
            <button className="place-self-end cursor-pointer font-bold border-2 border-forest-800 text-aztec-200 py-2 w-full max-w-48">
              Next
            </button>
          </div>
          <div className="grid gap-y-16">
            <Fieldset className="grid gap-y-8">
              <Legend className="text-desk-lg font-semibold">
                Your Information
              </Legend>
              <TextInput
                name="buyer-name"
                type="text"
                label="Name"
                placeholder="e.g. John Doe"
              />
              <TextInput
                name="buyer-email"
                type="email"
                label="Email"
                placeholder="johndoe@gmail.com"
              />
            </Fieldset>
            <Fieldset className="grid gap-y-8">
              <Legend className="text-desk-lg font-semibold">
                Guest Information
              </Legend>
              <div>
                <TextInput label="Name" />
              </div>
            </Fieldset>
          </div>
        </form>
      </section>
    </main>
  );
}

export function FormHeader({ data }) {
  return (
    <header className="border-b border-border-form p-12">
      <ol className="flex justify-between items-center gap-4 text-aztec-500 font-semibold cursor-default">
        {data.map((step) => (
          <>
            <li className="first-of-type:hidden w-10 h-0.5 bg-aztec-800" />
            <li
              className={`text-aztec-100 flex items-center gap-3 justify-between `}
            >
              <span className="grid place-content-center bg-forest-600 rounded-full w-8 aspect-square">
                {step.step}
              </span>{" "}
              {/* <span className="grid place-content-center bg-aztec-400 rounded-full w-8 aspect-square">
                {step.step}
              </span>{" "} */}
              {step.title}
            </li>
          </>
        ))}
      </ol>
    </header>
  );
}
