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

export function FormHeader({ formSteps }) {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <header className="border-b border-border-form p-12">
      <ol className="flex justify-between items-center gap-4 font-semibold cursor-default">
        {formSteps.map((step, id) => (
          <>
            <li
              key={id + "-line"}
              className="first-of-type:hidden w-10 h-0.5 bg-aztec-800"
            />
            <li
              key={id}
              {...(currentStep >= step.step && { "data-active": true })}
              className={`group flex items-center gap-3 justify-between ${
                currentStep === step.step
                  ? "text-text-global"
                  : "text-text-global--disabled"
              }`}
            >
              <span className="grid place-content-center w-8 rounded-full aspect-square text-text-global bg-surface-action--disabled group-data-active:bg-surface-action">
                {step.step}
              </span>{" "}
              {step.title}
            </li>
          </>
        ))}
      </ol>
    </header>
  );
}

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
      <div className="input-field-base gap-4 w-fit">
        <Button
          disabled={!quantity > 0}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => setQuantity(quantity > 0 && Number(quantity) - 1)}
        >
          <MdOutlineRemove className="text-text-global" size="24" />
        </Button>
        <Input
          type="number"
          name={name}
          min={0}
          max={10}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onKeyDown={enterQuantity}
          className="w-6 text-center data-focus:outline-none"
        />
        <Button
          disabled={quantity >= 10}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => setQuantity(quantity ? Number(quantity) + 1 : 1)}
        >
          <MdOutlineAdd className="text-text-global" size="24" />
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
  const currentlyAvailable = availableSpots.filter(
    (spot) => spot.available > 0
  );
  const [selected, setSelected] = useState(currentlyAvailable[0].area);

  return (
    <RadioGroup name="area" value={selected} onChange={setSelected}>
      {availableSpots.map((spot, id) => (
        <Field
          key={id}
          disabled={spot.available === 0}
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
        className="input-field-base data-focus:outline-none"
      />
    </Field>
  );
}
