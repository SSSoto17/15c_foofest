"use client";

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

export function NumberInput({ name, label, price }) {
  const [quantity, setQuantity] = useState("");

  const enterQuantity = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuantity(e.target.value);
      e.target.blur();
    }
  };

  return (
    <Field className="grid grid-cols-[1fr_auto_1rem] items-end justify-between max-w-xl gap-4">
      <Label className="flex justify-between">
        {label}{" "}
        <span className="opacity-50 place-self-end mx-8">{price} DKK</span>
      </Label>
      <div className="bg-aztec-900/50 border border-aztec-900 has-data-focus:border-aztec-600 has-data-focus:bg-aztec-900 rounded-xs p-2 flex items-center w-fit gap-4">
        <Button
          disabled={!quantity > 0}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => setQuantity(quantity > 0 && Number(quantity) - 1)}
        >
          <MdOutlineRemove className="text-forest-100" size="24" />
        </Button>
        <Input
          type="number"
          name={name}
          min={0}
          max={10}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={enterQuantity}
          className="appearance-none text-forest-100 w-6 text-center data-focus:outline-none"
        />
        <Button
          disabled={quantity >= 10}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => setQuantity(quantity ? Number(quantity) + 1 : 1)}
        >
          <MdOutlineAdd className="text-forest-100" size="24" />
        </Button>
      </div>
      {quantity > 0 && (
        <Button
          className="cursor-pointer"
          aria-label="Clear quantity"
          onClick={() => setQuantity("")}
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
  const [selected, setSelected] = useState(availableSpots[0].area);

  return (
    <RadioGroup name="area" value={selected} onChange={setSelected}>
      {availableSpots.map((spot) => (
        <Field
          key={spot.area}
          disabled={spot.available === 0}
          className="flex items-end justify-between max-w-xl gap-8 not-data-disabled:cursor-pointer"
        >
          <Radio
            value={spot.area}
            className="group grid grid-cols-[auto_8rem_4rem] gap-3 items-center"
          >
            <span className="block w-4 h-4 rounded-full border-2 border-aztec-600 group-not-data-disabled:group-hover:bg-aztec-900 group-data-checked:border-forest-600 group-data-checked:border-6 group-data-disabled:border-aztec-900" />
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

export function Optionals({ name, label, price }) {
  const [checked, setChecked] = useState(false);
  return (
    <Field className="flex items-center gap-3 max-w-xl group hover:cursor-pointer">
      <Checkbox
        checked={checked}
        onChange={setChecked}
        name={name}
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

export function TextInput({ label, name, type, placeholder }) {
  return (
    <Field className="grid gap-y-2 max-w-sm">
      <Label>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        className="bg-aztec-900/50 border border-aztec-900 data-focus:outline-none data-focus:border-aztec-600 data-focus:bg-aztec-900 rounded-xs p-2"
      />
    </Field>
  );
}
