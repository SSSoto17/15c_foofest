// COMPONENTS
import {
  Field,
  Label,
  Input,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
} from "@headlessui/react";
import {
  MdOutlineAdd,
  MdOutlineRemove,
  MdOutlineDelete,
  MdOutlineCheck,
  MdOutlineError,
} from "react-icons/md";

// FUNCTIONS
import { useState } from "react";
import { useTickets } from "@/store/GlobalStore";
import { useShallow } from "zustand/react/shallow";

export function NumberInput({ label, price, inBasket, error }) {
  const tickets = inBasket.filter((ticket) => ticket.type === label);
  const { addTicket, removeTicket, clearTickets } = useTickets(
    useShallow((state) => ({
      addTicket: state.addTicket,
      removeTicket: state.removeTicket,
      clearTickets: state.clearTickets,
    }))
  );

  const [quantity, setQuantity] = useState(0);

  const plusTicket = (label, price) => {
    if (tickets.length < 10) {
      addTicket(label, price);
      setQuantity(tickets.length + 1);
    }
  };

  const minusTicket = (label, price) => {
    if (tickets.length > 0) {
      setQuantity(tickets.length - 1);
      const updatedTickets = Array(tickets.length - 1).fill({
        type: label,
        price: price,
      });
      removeTicket(label, updatedTickets);
    }
  };

  const clearAll = (label) => {
    setQuantity(0);
    clearTickets(label);
  };

  const manualInput = (label, price, newQuantity) => {
    setQuantity(newQuantity);
    const updatedTickets = Array(Number(newQuantity)).fill({
      type: label,
      price: price,
    });
    removeTicket(label, updatedTickets);
  };

  return (
    <Field className="grid grid-cols-[1fr_auto_1rem] items-end justify-between max-w-xl gap-4">
      <Label className="flex justify-between">
        {label}{" "}
        <span className="opacity-50 place-self-end mx-8">{price} DKK</span>
      </Label>

      <div
        className={`input-field input-field-number--focus gap-4 w-fit ${
          error &&
          !quantity &&
          "not-has-data-focus:border-border-global--error bg-surface-input--focus"
        }`}
      >
        <Button
          disabled={!quantity}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => minusTicket(label, price)}
        >
          <MdOutlineRemove className="text-text-global" size="24" />
        </Button>
        <Input
          type="number"
          name={label}
          min={0}
          value={quantity}
          // {...(error.ticketsMin && { invalid: true })}
          onChange={(e) => manualInput(label, price, e.target.value)}
          className="w-6 text-center data-focus:outline-none"
        />
        <Button
          disabled={quantity >= 10}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => plusTicket(label, price)}
        >
          <MdOutlineAdd className="text-text-global" size="24" />
        </Button>
      </div>
      {quantity > 0 && (
        <Button
          className="cursor-pointer"
          aria-label="Clear quantity"
          onClick={() => clearAll(label)}
        >
          <MdOutlineDelete
            className="hover:opacity-50 opacity-25 place-self-center"
            size="24"
          />
        </Button>
      )}
      {error && !quantity && (
        <MdOutlineError
          aria-label="Attention!"
          className="place-self-center text-text-global--error"
          size="24"
        />
      )}
    </Field>
  );
}

export function CampingSpots({ selectionData }) {
  const ticketQuantity = useTickets((state) => state.tickets);
  const availableAreas = selectionData.filter(
    (spot) => spot.available >= ticketQuantity.length
  );
  const [selected, setSelected] = useState(availableAreas[0].area);

  return (
    <RadioGroup name="area" value={selected} onChange={setSelected}>
      {selectionData.map((spot, id) => (
        <Field
          key={id}
          disabled={
            spot.available === 0 || spot.available < ticketQuantity.length
          }
          className="flex items-end justify-between max-w-xl gap-8 not-data-disabled:cursor-pointer"
        >
          <Radio
            value={spot.area}
            className="group grid grid-cols-[auto_8rem_4rem] gap-3 items-center"
          >
            <span className="input-radio" />
            <Label className="group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer">
              {spot.area}
            </Label>
            <small className="opacity-25 cursor-default justify-self-end">
              {spot.available} / {spot.spots}{" "}
            </small>
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
}

export function Optionals({ label, price }) {
  const [checked, setChecked] = useState(false);
  return (
    <Field className="flex items-center gap-3 max-w-xl group hover:cursor-pointer">
      <Checkbox
        name={label}
        checked={checked}
        onChange={setChecked}
        className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none"
      >
        <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
      </Checkbox>
      <Label className="flex justify-between group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer">
        {label}{" "}
        {price && (
          <small className="opacity-50 place-self-end mx-8">{price} DKK</small>
        )}
      </Label>
    </Field>
  );
}

export function TextInput({ name, type, placeholder, error, children }) {
  return (
    <Field className="grid gap-y-2 max-w-sm">
      <Label className="capitalize">{children}</Label>
      <div className="flex gap-4">
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`input-field input-field-text--focus ${
            error &&
            "not-data-focus:border-border-global--error bg-surface-input--focus"
          }`}
        />
        {error && (
          <MdOutlineError
            aria-label="Attention!"
            className="place-self-center text-text-global--error"
            size="24"
          />
        )}
      </div>
      <small className="text-text-global--error italic h-0.5">{error}</small>
    </Field>
  );
}
