"use client";

import Form from "next/form";
import Button from "../Button";

import { BookingStepOne, BookingStepTwo, BookingStepThree } from "./FormSteps";
import { OrderSummary } from "./FormSections2";

import formSteps from "../../data/formsteps";

import { useActionState } from "react";
import { submitTicketReservation } from "@/app/session/reservation/flow/checkout/actions";
import { keyEnter } from "@/lib/utils";

export default function BookingForm({ areaData }) {
  const initState = { activeStep: 1, success: false, errors: {} };
  const [state, submitReservation, isPending] = useActionState(
    submitTicketReservation,
    initState
  );

  console.log(state?.errors);

  return (
    <>
      <Form
        onKeyDown={keyEnter}
        action={submitReservation}
        className="col-span-3 row-span-full border border-border-form grid grid-rows-subgrid"
      >
        <FormHeader {...state} />
        {state?.activeStep === 2 ? (
          <BookingStepTwo
            orderData={state?.orderDetails}
            error={state?.errors}
          />
        ) : state?.activeStep === 3 ? (
          <BookingStepThree
            orderData={state?.orderDetails}
            error={state?.errors}
          />
        ) : (
          <BookingStepOne
            areaData={areaData}
            ticketData={state?.orderDetails}
            error={state?.errors}
          />
        )}
        <FormFooter nextStep={submitReservation} isPending={isPending} />
      </Form>
      <OrderSummary step={state?.activeStep} {...state?.orderDetails} />
    </>
  );
}

function FormHeader({ activeStep }) {
  return (
    <header className="border-b border-border-form py-8 px-12">
      <ol className="flex justify-between items-center gap-4 font-semibold cursor-default">
        {formSteps.map((step, id) => (
          <FormStepIndicator activeStep={activeStep} {...step} key={id} />
        ))}
      </ol>
    </header>
  );
}

function FormStepIndicator({ activeStep, step, title }) {
  return (
    <>
      <li
        key={crypto.randomUUID()}
        className="first-of-type:hidden w-10 h-0.5 bg-aztec-800"
      />
      <li
        {...(activeStep >= step && {
          "data-active": true,
        })}
        className={`group body-copy font-semibold flex items-center gap-3 justify-between ${
          activeStep === step
            ? "text-text-global"
            : "text-text-global--disabled"
        }`}
      >
        <span className="grid place-content-center w-8 rounded-full aspect-square text-text-global bg-surface-action--disabled group-data-active:bg-surface-action">
          {step}
        </span>{" "}
        {title}
      </li>
    </>
  );
}

function FormFooter({ nextStep, isPending }) {
  return (
    <footer className="flex justify-end gap-4 items-end p-12 pt-0">
      <Button
        variant="primary"
        size="base"
        formAction={nextStep}
        isDisabled={isPending}
      >
        Next
      </Button>
    </footer>
  );
}
