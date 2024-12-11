"use client";

import Form from "next/form";
import { Fieldset, Legend } from "@headlessui/react";
import {
  NumberInput,
  CampingSpots,
  Optionals,
  TextInput,
} from "@/components/FormFields";
import Button from "./Button";

import { useActionState } from "react";
import { submitTicketReservation } from "@/lib/actions";

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

  console.log(state?.errors.tickets);

  return (
    <>
      <FormHeader
        currentStep={!state ? 1 : state.activeStep}
        formSteps={formSteps}
      />
      <Form onKeyDown={keyEnter} action="" className="p-12">
        {(!state?.activeStep || state?.activeStep === 1) && (
          <div className="grid gap-y-16">
            <Fieldset className="grid gap-y-4">
              <Legend className="heading-3">Tickets</Legend>
              <NumberInput
                label="Partout Ticket"
                price="799"
                error={state?.errors.tickets}
              />
              <NumberInput
                label="VIP Ticket"
                price="1299"
                error={state?.errors.tickets}
              />
              <small className="text-text-global--error italic h-0.5">
                {" "}
                {state?.errors.tickets}{" "}
              </small>
            </Fieldset>
            <Fieldset className="grid gap-y-6">
              <Legend className="heading-3">Camping Spot</Legend>
              <CampingSpots availableSpots={availableSpots} />
            </Fieldset>
            <Fieldset className="grid gap-y-2">
              <Optionals label="Green fee" price="+249" />
              <Optionals label="Tent setup" />
            </Fieldset>
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
        <FormFooter
          currentStep={state?.activeStep}
          nextStep={
            (!state && submitReservation) ||
            (state?.errors && submitReservation)
          }
        />
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

export function FormFooter({ currentStep, nextStep }) {
  return (
    <footer
      className={`flex ${
        currentStep > 1 ? "justify-between" : "justify-end"
      }  gap-4 items-end pt-10`}
    >
      {currentStep > 1 && <Button label="Back" variant="form" />}
      <Button label="Next" variant="form" formAction={nextStep} />
    </footer>
  );
}
