import {
  Field,
  Label,
  Input,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
} from "@headlessui/react";
import { useState } from "react";
import {
  MdOutlineAdd,
  MdOutlineRemove,
  MdOutlineDelete,
  MdOutlineCheck,
  MdOutlineError,
} from "react-icons/md";
import { useTickets } from "@/store/GlobalStore";

export function NumberInput({ label, price, error }) {
  const allTickets = useTickets((state) => state.tickets);
  const tickets = allTickets.filter((ticket) => ticket.type === label);
  const addTicket = useTickets((state) => state.addTicket);
  const removeTicket = useTickets((state) => state.removeTicket);
  const clearTickets = useTickets((state) => state.clearTickets);

  console.log(Boolean(error));

  const [quantity, setQuantity] = useState(0);
  const [errorState, setErrorState] = useState(Boolean(error));

  const plusTicket = (label, price) => {
    if (tickets.length < 10) {
      addTicket(label, price);
      setQuantity(tickets.length + 1);
    }
  };

  const minusTicket = (label, price) => {
    if (tickets.length > 0) {
      setQuantity(tickets.length - 1);
      const singleTicket = { type: label, price: price };
      const updatedTickets = Array(tickets.length - 1).fill(singleTicket);
      removeTicket(label, updatedTickets);
    }
  };

  const clearAll = (label) => {
    setQuantity(0);
    clearTickets(label);
  };

  const manualInput = (label, price, newQuantity) => {
    setQuantity(newQuantity);
    const singleTicket = { type: label, price: price };
    const updatedTickets = Array(Number(newQuantity)).fill(singleTicket);
    removeTicket(label, updatedTickets);
  };

  const clearError = () => {
    if (error) {
      setErrorState(false);
    }
  };

  return (
    <Field className="grid grid-cols-[1fr_auto_1rem] items-end justify-between max-w-xl gap-4">
      <Label className="flex justify-between">
        {label}{" "}
        <span className="opacity-50 place-self-end mx-8">{price} DKK</span>
      </Label>
      <div
        className={`input-field-base gap-4 w-fit ${
          errorState && "border-border-global--error bg-surface-input--focus"
        }`}
      >
        <Button
          disabled={!quantity > 0}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => minusTicket(label, price)}
        >
          <MdOutlineRemove className="text-text-global" size="24" />
        </Button>
        <Input
          type="number"
          name={label}
          min={0}
          max={10}
          value={quantity}
          onFocus={clearError}
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
      {errorState && (
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

export function TextInput({ name, type, placeholder }) {
  return (
    <Field className="grid gap-y-2 max-w-sm">
      <Label className="capitalize">{name}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        className="input-field-base data-focus:outline-none"
      />
    </Field>
  );
}
