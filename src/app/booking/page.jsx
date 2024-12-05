import { Field, Fieldset, Label, Legend, Input } from "@headlessui/react";

export default function BookingFlow() {
  return (
    <main>
      <section className="border border-aztec-800 p-12">
        <header></header>
        <form action="">
          <Fieldset>
            <Legend className=" font-bold">Tickets</Legend>
            <Field>
              <Label>Partout Ticket</Label>
              <Input type="number" />
            </Field>
          </Fieldset>
        </form>
      </section>
    </main>
  );
}
