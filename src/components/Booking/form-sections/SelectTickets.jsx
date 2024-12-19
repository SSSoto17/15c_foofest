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
import { useQuantityStore } from "@/store/GlobalStore";
import { useShallow } from "zustand/react/shallow";
import { ErrorText } from "../FormFields";

export default function SelectTickets({ partoutGuests, vipGuests, error }) {
  const ticketQuantity = partoutGuests?.length + vipGuests?.length;

  const ticketListing = [
    { label: "Partout Ticket", price: "799", error },
    { label: "VIP Ticket", price: "1299", error },
  ];
  return (
    <Fieldset className="grid gap-y-4 max-w-xl">
      <Legend className="heading-5">Tickets</Legend>
      <ErrorText>{!ticketQuantity && error}</ErrorText>
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

export function NumberSpinner({ label, price, error, children }) {
  const { total, add, remove, enter } = useQuantityStore(
    useShallow((state) => ({
      total: state.total,
      add: state.add,
      remove: state.remove,
      enter: state.enter,
    }))
  );

  const [quantity, setQuantity] = useState(0);

  const incrInput = () => {
    setQuantity(Number(quantity) + 1);
    add();
  };

  const decrInput = () => {
    setQuantity(Number(quantity) - 1);
    remove(1);
  };

  const clearInput = () => {
    remove(quantity);
    setQuantity(0);
  };

  const manualInput = (e) => {
    let newQuantity;
    newQuantity = total - quantity + Number(e.target.value);
    enter(newQuantity);
    setQuantity(e.target.value);
  };

  return (
    <Field className="peer grid grid-cols-[1fr_auto_1rem] items-end justify-between gap-4">
      <Label className="body-copy flex justify-between">
        {children}{" "}
        <span className="body-copy opacity-50 place-self-end mx-8">
          {price} DKK
        </span>
      </Label>
      <div
        className={`input-field input-field-number--focus gap-4 w-fit ${
          error &&
          total === 0 &&
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
          className="body-copy w-6 text-center data-focus:outline-none"
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
      {error && !total && (
        <MdOutlineError
          aria-label="Attention!"
          className="place-self-center text-text-global--error error_icon"
          size="24"
        />
      )}
    </Field>
  );
}
