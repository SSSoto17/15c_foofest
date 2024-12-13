"use client";

import Form from "next/form";
import Button from "../Button";
import {
  TicketSelection,
  AreaSelection,
  OptionalsSelection,
  EnterBuyerInfo,
  EnterGuestInfo,
  EnterPaymentInfo,
  EnterBillingInfo,
  OrderSummary,
  TentSetup,
} from "./FormSections";

import formSteps from "../../data/formsteps";

import { Fragment, useActionState } from "react";
import { submitTicketReservation } from "@/lib/actions";

export default function BookingForm({ areaData }) {
  const initState = { activeStep: 1, success: false, errors: {} };
  const [state, submitReservation, isPending] = useActionState(
    submitTicketReservation,
    initState
  );

  console.log(state?.orderDetails);

  const keyEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <>
      <FormHeader activeStep={state?.activeStep} />
      <Form onKeyDown={keyEnter} action={submitReservation} className="p-12">
        {state?.activeStep === 2 ? (
          <BookingStepTwo
            guestData={state?.orderDetails}
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
    </>
  );
}

export function FormHeader({ activeStep }) {
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
              {...(activeStep >= step.step && {
                "data-active": true,
              })}
              className={`group flex items-center gap-3 justify-between ${
                activeStep === step.step
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

export function FormFooter({ nextStep, isPending }) {
  return (
    <footer className="flex justify-end gap-4 items-end pt-10">
      <Button variant="form" formAction={nextStep} isDisabled={isPending}>
        Next
      </Button>
    </footer>
  );
}

export function BookingStepOne({ ticketData, error, areaData }) {
  return (
    <div className="grid gap-y-16">
      <TicketSelection {...ticketData} error={error.tickets} />
      <AreaSelection data={areaData} />
      <OptionalsSelection />
    </div>
  );
}

export function BookingStepTwo({ guestData, error }) {
  return (
    <div className="grid gap-y-16">
      <EnterGuestInfo {...guestData} error={error.ticketGuests} />
      <TentSetup error={error.tentSetup} />
    </div>
  );
}

export function BookingStepThree({ orderData, error }) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-16 items-start">
      {/* <EnterBuyerInfo {...orderData} error={error} /> */}
      <EnterPaymentInfo />
      <EnterBillingInfo {...orderData} />
      <OrderSummary {...orderData} />
    </div>
  );
}
