import { Fieldset, Legend } from "@headlessui/react";
import {
  NumberInput,
  CampingSpots,
  Optionals,
  TextInput,
} from "@/components/Booking/FormFields";
import { useTickets } from "@/store/GlobalStore";

import optionalsListing from "../../data/optionals";
import buyerInfo from "../../data/buyerfields";

export function TicketSelection({ error }) {
  const tickets = useTickets((state) => state.tickets);
  const inBasket = tickets.length;

  const ticketListing = [
    { label: "Partout Ticket", price: "799", error },
    { label: "VIP Ticket", price: "1299", error },
  ];
  return (
    <Fieldset className="grid gap-y-4">
      <Legend className="heading-3">Tickets</Legend>
      <small className="text-text-global--error italic h-0.5">
        {!inBasket && error.ticketsMin}
      </small>
      {ticketListing.map((ticket, id) => {
        return (
          <NumberInput
            key={id}
            label={ticket.label}
            price={ticket.price}
            inBasket={tickets}
            error={(!inBasket && error) || (inBasket > 10 && error)}
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

export function EnterBuyerInfo({ customerName, customerEmail }) {
  return (
    <Fieldset className="grid gap-y-8">
      <Legend className="heading-3">Your Information</Legend>
      {buyerInfo.map((field, id) => {
        return (
          <TextInput
            key={id}
            {...field}
            error={field.name === "name" ? customerName : customerEmail}
          >
            {field.name}
          </TextInput>
        );
      })}
    </Fieldset>
  );
}

export function EnterGuestInfo() {
  const tickets = useTickets((state) => state.tickets);
  const partoutTickets = tickets.filter(
    (ticket) => ticket.type === "Partout Ticket"
  );
  const vipTickets = tickets.filter((ticket) => ticket.type === "VIP Ticket");

  console.log(partoutTickets);
  const guests = [
    ...Array(partoutTickets.length).fill("Partout Ticket"),
    ...Array(vipTickets.length).fill("VIP Ticket"),
  ];

  const singleType =
    guests.every((ticket) => ticket === "Partout Ticket") ||
    guests.every((ticket) => ticket === "vip Ticket");

  return (
    <Fieldset className="grid gap-y-8">
      <Legend className="heading-3">Guest Information</Legend>
      {singleType ? (
        <ul className="grid grid-cols-2 gap-4">
          {guests.map((guest, id) => {
            return (
              <li key={id}>
                <TextInput name={guest + " Guest"} type="text">
                  Name
                </TextInput>
              </li>
            );
          })}
        </ul>
      ) : (
        <section className="grid grid-cols-2 gap-4">
          <article className="flow-space">
            <h3 className="heading-4">Partout Tickets</h3>
            <ul className="grid gap-4">
              {partoutTickets.map((guest, id) => {
                return (
                  <li key={id}>
                    <TextInput name={guest.type + " Guest"} type="text">
                      Name
                    </TextInput>
                  </li>
                );
              })}
            </ul>
          </article>
          <article className="flow-space">
            <h3 className="heading-4">VIP Tickets</h3>
            <ul className="grid gap-4">
              {vipTickets.map((guest, id) => {
                return (
                  <li key={id}>
                    <TextInput name={guest.type + " Guest"} type="text">
                      Name
                    </TextInput>
                  </li>
                );
              })}
            </ul>
          </article>
        </section>
      )}
    </Fieldset>
  );
}
