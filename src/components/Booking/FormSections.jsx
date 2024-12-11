import { Fieldset, Legend } from "@headlessui/react";
import {
  NumberInput,
  CampingSpots,
  Optionals,
  TextInput,
} from "@/components/Booking/FormFields";

import optionalsListing from "../../data/optionals";
import buyerInfo from "../../data/buyerfields";

export function TicketSelection({ error, errorMessage }) {
  const ticketListing = [
    { label: "Partout Ticket", price: "799", error: error?.errors.tickets },
    { label: "VIP Ticket", price: "1299", error: error?.errors.tickets },
  ];
  console.log("arr: ", ticketListing[0].error);
  return (
    <Fieldset className="grid gap-y-4">
      <Legend className="heading-3">Tickets</Legend>
      <small className="text-text-global--error italic h-0.5">
        {" "}
        {error?.errors.tickets}{" "}
      </small>
      {ticketListing.map((ticket, id) => {
        return (
          <NumberInput
            key={id}
            label={ticket.label}
            price={ticket.price}
            error={error?.errors.tickets}
          />
        );
      })}
    </Fieldset>
  );
}

export function AreaSelection({ data }) {
  return (
    <Fieldset className="grid gap-y-6">
      <Legend className="heading-3">Camping Spot</Legend>
      <CampingSpots selectionData={data} />
    </Fieldset>
  );
}

export function OptionalsSelection() {
  return (
    <Fieldset className="grid gap-y-2">
      {optionalsListing.map((option, id) => {
        return <Optionals key={id} label={option.label} price={option.price} />;
      })}
    </Fieldset>
  );
}

export function EnterBuyerInfo() {
  return (
    <Fieldset className="grid gap-y-8">
      <Legend className="heading-3">Your Information</Legend>
      {buyerInfo.map((field, id) => {
        return <TextInput key={id} {...field} />;
      })}
    </Fieldset>
  );
}

export function EnterGuestInfo() {
  const guests = Array(4).fill("");
  return (
    <Fieldset className="grid gap-y-8">
      <Legend className="heading-3">Guest Information</Legend>
      <ul className="grid grid-cols-2 gap-4">
        {guests.map((guest, id) => {
          return (
            <li key={id}>
              <TextInput name="name" type="text" />
              {/* <select name="" id=""></select> */}
            </li>
          );
        })}
      </ul>
    </Fieldset>
  );
}
