// COMPONENTS
import {
  Fieldset,
  Legend,
  Field,
  Label,
  Input,
  Button,
} from "@headlessui/react";
// import { NumberInput } from "@/components/Booking/FormFields";
import {
  MdOutlineAdd,
  MdOutlineRemove,
  MdOutlineDelete,
  MdOutlineError,
} from "react-icons/md";

// FUNCTIONS
import { useState } from "react";
import { useTickets, useTents } from "@/store/GlobalStore";
import { useShallow } from "zustand/react/shallow";
import { M_PLUS_1 } from "next/font/google";

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
          <NumberSpinner
            forTickets
            key={id}
            {...ticket}
            error={(!ticketQuantity && error) || (ticketQuantity > 10 && error)}
          >
            {ticket.label}
          </NumberSpinner>
        );
      })}
    </Fieldset>
  );
}

export function NumberSpinner({
  label,
  price,
  error,
  forTickets,
  forTents,
  children,
}) {
  const { totalTickets, addTickets, removeTickets, enterTickets } = useTickets(
    useShallow((state) => ({
      totalTickets: state.totalTickets,
      addTickets: state.addTicket,
      removeTickets: state.removeTicket,
      enterTickets: state.enterTicket,
    }))
  );
  const { totalTentSpaces, addTents, removeTents, enterTents } = useTents(
    useShallow((state) => ({
      totalTentSpaces: state.tentSpaces,
      addTents: state.addTent,
      removeTents: state.removeTent,
      enterTents: state.enterTent,
    }))
  );

  const [quantity, setQuantity] = useState(0);
  let tentSpaces;
  console.log(totalTentSpaces);

  const incrInput = () => {
    setQuantity(Number(quantity) + 1);
    if (forTickets) {
      addTickets();
    }
    if (forTents) {
      if (label.includes("Double")) {
        tentSpaces = 2;
      }
      if (label.includes("Triple")) {
        tentSpaces = 3;
      }
      addTents(tentSpaces);
    }
  };

  const decrInput = () => {
    setQuantity(Number(quantity) - 1);
    if (forTickets) {
      removeTickets(1);
    }
    if (forTents) {
      if (label.includes("Double")) {
        tentSpaces = 2;
      }
      if (label.includes("Triple")) {
        tentSpaces = 3;
      }
      removeTents(1, tentSpaces);
    }
  };

  const clearInput = () => {
    if (forTickets) {
      removeTickets(quantity);
    }
    if (forTents) {
      if (label.includes("Double")) {
        tentSpaces = 2;
      }
      if (label.includes("Triple")) {
        tentSpaces = 3;
      }
      removeTents(quantity, tentSpaces);
    }
    setQuantity(0);
  };

  const manualInput = (e) => {
    let newQuantity;
    if (forTickets) {
      newQuantity = totalTickets - quantity + Number(e.target.value);
      enterTickets(newQuantity);
    }
    if (forTents) {
      if (label.includes("Double")) {
        tentSpaces = 2;
      }
      if (label.includes("Triple")) {
        tentSpaces = 3;
      }
      const currentQuantity = quantity * tentSpaces;
      const editedQuantity = Number(e.target.value) * tentSpaces;
      newQuantity = totalTentSpaces - currentQuantity + editedQuantity;
      enterTents(newQuantity, tentSpaces);
    }
    setQuantity(e.target.value);
  };

  return (
    <Field className="peer grid grid-cols-[1fr_auto_1rem] items-end justify-between max-w-xl gap-4">
      <Label className="flex justify-between">
        {children}{" "}
        <span className="opacity-50 place-self-end mx-8">{price} DKK</span>
      </Label>
      <div
        className={`input-field input-field-number--focus gap-4 w-fit ${
          error &&
          !totalTickets &&
          "not-has-data-focus:border-border-global--error bg-surface-input--focus"
        }`}
      >
        <Button
          disabled={!quantity}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={decrInput}
        >
          <MdOutlineRemove className="text-text-global" size="24" />
        </Button>
        <Input
          type="number"
          name={label}
          value={quantity}
          onChange={manualInput}
          className="w-6 text-center data-focus:outline-none"
        />
        <Button
          disabled={quantity >= 10}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={incrInput}
        >
          <MdOutlineAdd className="text-text-global" size="24" />
        </Button>
      </div>
      {quantity > 0 && (
        <Button
          className="cursor-pointer"
          aria-label="Clear quantity"
          onClick={clearInput}
        >
          <MdOutlineDelete
            className="hover:opacity-50 opacity-25 place-self-center"
            size="24"
          />
        </Button>
      )}
      {error && !totalTickets && (
        <MdOutlineError
          aria-label="Attention!"
          className="place-self-center text-text-global--error error_icon"
          size="24"
        />
      )}
    </Field>
  );
}
