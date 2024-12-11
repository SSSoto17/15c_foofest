"use client";

import Form from "next/form";
import Button from "../Button";
import {
  TicketSelection,
  AreaSelection,
  OptionalsSelection,
  EnterBuyerInfo,
  EnterGuestInfo,
} from "./FormSections";

import formSteps from "../../data/formsteps";

import { Fragment, useActionState } from "react";
import { submitTicketReservation } from "@/lib/actions";

export default function BookingForm({ areaData }) {
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
      <FormHeader currentStep={!state ? 1 : state.activeStep} />
      <Form onKeyDown={keyEnter} action="" className="p-12">
        {state?.activeStep === 2 ? (
          <BookingStepTwo />
        ) : (
          <BookingStepOne areaData={areaData} error={state} />
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

export function FormHeader({ currentStep }) {
  return (
    <header className="border-b border-border-form p-12">
      <ol className="flex justify-between items-center gap-4 font-semibold cursor-default">
        {formSteps.map((step, id) => (
          <Fragment key={id}>
            <li
              key={crypto.randomUUID()}
              className="first-of-type:hidden w-10 h-0.5 bg-aztec-800"
            />
            <li
              key={id}
              {...(currentStep >= step.step && {
                "data-active": true,
              })}
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
          </Fragment>
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

export function BookingStepOne({ error, areaData }) {
  return (
    <div className="grid gap-y-16">
      <TicketSelection error={error} errorMessage={error?.errors.tickets} />
      <AreaSelection data={areaData} />
      <OptionalsSelection />
    </div>
  );
}

export function BookingStepTwo() {
  return (
    <div className="grid gap-y-16">
      <EnterBuyerInfo />
      <EnterGuestInfo />
    </div>
  );
}
