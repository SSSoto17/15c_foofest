import { Fieldset, Legend } from "@headlessui/react";
import { NumberInput } from "@/components/Booking/FormFields";

export default function SelectTickets({ partoutGuests, vipGuests, error }) {
  const ticketQuantity = partoutGuests?.length + vipGuests?.length;

  const ticketListing = [
    { label: "Partout Ticket", price: "799", error },
    { label: "VIP Ticket", price: "1299", error },
  ];
  return (
    <Fieldset className="grid gap-y-4">
      <Legend className="heading-3">Tickets</Legend>
      <small className="text-text-global--action italic h-0.5">
        {!ticketQuantity && error}
      </small>
      {ticketListing.map((ticket, id) => {
        return (
          <NumberInput
            tickets
            key={id}
            name={ticket.label}
            price={ticket.price}
            error={(!ticketQuantity && error) || (ticketQuantity > 10 && error)}
          >
            {ticket.label}
          </NumberInput>
        );
      })}
    </Fieldset>
  );
}
