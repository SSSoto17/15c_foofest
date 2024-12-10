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
} from "react-icons/md";
import { useTickets } from "@/store/GlobalStore";

export function NumberInput({ label, price }) {
  const allTickets = useTickets((state) => state.tickets);
  const tickets = allTickets.filter((ticket) => ticket.type === label);
  const addTicket = useTickets((state) => state.addTicket);
  const removeTicket = useTickets((state) => state.removeTicket);
  const clearTickets = useTickets((state) => state.clearTickets);

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

  return (
    <Field className="grid grid-cols-[1fr_auto_1rem] items-end justify-between max-w-xl gap-4">
      <Label className="flex justify-between">
        {label}{" "}
        <span className="opacity-50 place-self-end mx-8">{price} DKK</span>
      </Label>
      <div className="input-field-base gap-4 w-fit">
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
    </Field>
  );
}

export function CampingSpots({ availableSpots }) {
  const ticketQuantity = useTickets((state) => state.tickets);
  const available =
    ticketQuantity > 0
      ? availableSpots.filter((spot) => spot.available >= ticketQuantity.length)
      : availableSpots.filter((spot) => spot.available > 0);
  const [selected, setSelected] = useState(available[0].area);

  return (
    <RadioGroup name="area" value={selected} onChange={setSelected}>
      {availableSpots.map((spot, id) => (
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

export function TextInput({ label, type, placeholder }) {
  return (
    <Field className="grid gap-y-2 max-w-sm">
      <Label>{label}</Label>
      <Input
        name={label}
        type={type}
        placeholder={placeholder}
        className="input-field-base data-focus:outline-none"
      />
    </Field>
  );
}
