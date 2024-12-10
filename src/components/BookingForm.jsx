"use client";

import Form from "next/form";
import { Fieldset, Legend } from "@headlessui/react";
import {
  NumberInput,
  CampingSpots,
  Optionals,
  TextInput,
} from "@/components/FormFields";
import { submitTicketReservation } from "@/lib/actions";
import { useActionState } from "react";
import Button from "./Button";

export default function BookingForm({ formSteps, availableSpots }) {
  const [state, submitReservation, isPending] = useActionState(
    submitTicketReservation
  );

  const keyEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <>
      <FormHeader
        currentStep={!state ? 1 : state.activeStep}
        formSteps={formSteps}
      />
      <Form onKeyDown={keyEnter} action="" className="p-12">
        {!state?.activeStep && (
          <div className="grid gap-y-16">
            <Fieldset className="grid gap-y-4">
              <Legend className="heading-3">Tickets</Legend>
              <NumberInput label="Partout Ticket" price="799" />
              <NumberInput label="VIP Ticket" price="1299" />
              <p> {state?.errors.tickets} </p>
            </Fieldset>
            <Fieldset className="grid gap-y-6">
              <Legend className="heading-3">Camping Spot</Legend>
              <CampingSpots availableSpots={availableSpots} />
            </Fieldset>
            <Fieldset className="grid gap-y-2">
              <Optionals label="Green fee" price="+249" />
              <Optionals label="Tent setup" />
            </Fieldset>
            <button
              formAction={submitReservation}
              className="place-self-end cursor-pointer font-bold border-2 border-forest-800 text-aztec-200 py-2 w-full max-w-48"
            >
              Next
            </button>
          </div>
        )}
        {state?.activeStep === 2 && (
          <div className="grid gap-y-16">
            <Fieldset className="grid gap-y-8">
              <Legend className="heading-3">Your Information</Legend>
              <TextInput type="text" label="Name" placeholder="e.g. John Doe" />
              <TextInput
                type="email"
                label="Email"
                placeholder="johndoe@gmail.com"
              />
            </Fieldset>
            <Fieldset className="grid gap-y-8">
              <Legend className="heading-3">Guest Information</Legend>
              <div>
                <TextInput label="Name" />
              </div>
            </Fieldset>
          </div>
        )}
        <FormFooter />
      </Form>
    </>
  );
}

export function FormHeader({ formSteps, currentStep }) {
  return (
    <header className="border-b border-border-form p-12">
      <ol className="flex justify-between items-center gap-4 font-semibold cursor-default">
        {formSteps.map((step, id) => (
          <>
            <li
              key={id + "-line"}
              className="first-of-type:hidden w-10 h-0.5 bg-aztec-800"
            />
            <li
              key={id}
              {...(currentStep >= step.step && { "data-active": true })}
              className={`group flex items-center gap-3 justify-between ${
                currentStep === step.step
                  ? "text-text-global"
                  : "text-text-global--disabled"
              }`}
            >
              <span className="grid place-content-center w-8 rounded-full aspect-square text-text-global bg-surface-action--disabled group-data-active:bg-surface-action">
                {step.step}
              </span>{" "}
              {step.title}
            </li>
          </>
        ))}
      </ol>
    </header>
  );
}

export function FormFooter() {
  return (
    <footer className="flex justify-between gap-4 items-end">
      <Button label="Back" />
      <Button label="Next" />
    </footer>
  );
}
