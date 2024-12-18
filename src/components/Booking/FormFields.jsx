"use client";

// COMPONENTS
import {
  Field,
  Label,
  Input,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import {
  MdOutlineAdd,
  MdOutlineRemove,
  MdOutlineDelete,
  MdOutlineCheck,
  MdOutlineError,
} from "react-icons/md";

// FUNCTIONS
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTickets } from "@/store/GlobalStore";
import { useShallow } from "zustand/react/shallow";

export function NumberInput({ name, price, error, children }) {
  const {
    totalTickets,
    addTotalTickets,
    removeTotalTickets,
    enterTotalTickets,
  } = useTickets(
    useShallow((state) => ({
      totalTickets: state.totalTickets,
      addTotalTickets: state.addTicket,
      removeTotalTickets: state.removeTicket,
      enterTotalTickets: state.enterTicket,
    }))
  );
  // const totalTickets = useTickets((state) => state.totalTickets);
  // const addTotalTickets = useTickets((state) => state.addTicket);
  // const removeTotalTickets = useTickets((state) => state.removeTicket);
  // const enterTotalTickets = useTickets((state) => state.enterTicket);
  const [quantity, setQuantity] = useState(0);

  const addTicket = () => {
    setQuantity(quantity + 1);
    addTotalTickets();
  };

  const removeTicket = () => {
    setQuantity(quantity - 1);
    removeTotalTickets(1);
  };

  const clearTickets = () => {
    removeTotalTickets(quantity);
    setQuantity(0);
  };

  const enterTicket = (e) => {
    setQuantity(e.target.value);
    const newQuantity = totalTickets - quantity + Number(e.target.value);
    console.log("new quantity: ", newQuantity);
    enterTotalTickets(newQuantity);
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
          !quantity &&
          "not-has-data-focus:border-border-global--error bg-surface-input--focus"
        }`}
      >
        <Button
          disabled={!quantity}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={removeTicket}
        >
          <MdOutlineRemove className="text-text-global" size="24" />
        </Button>
        <Input
          type="number"
          name={name}
          value={quantity}
          onChange={enterTicket}
          className="w-6 text-center data-focus:outline-none"
        />
        <Button
          disabled={quantity >= 10}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={addTicket}
        >
          <MdOutlineAdd className="text-text-global" size="24" />
        </Button>
      </div>
      {quantity > 0 && (
        <Button
          className="cursor-pointer"
          aria-label="Clear quantity"
          onClick={clearTickets}
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
          className="place-self-center text-text-global--error error_icon"
          size="24"
        />
      )}
    </Field>
  );
}

export function CampingSpots({ selectionData }) {
  const ticketQuantity = useTickets((state) => state.totalTickets);
  const availableAreas = selectionData.filter(
    (spot) => spot.available > 0 && spot.available >= ticketQuantity
  );
  const [selected, setSelected] = useState(availableAreas[0].area);

  return (
    <RadioGroup name="area" value={selected} onChange={setSelected}>
      {selectionData.map((spot, id) => (
        <Field
          key={id}
          disabled={spot.available === 0 || spot.available < ticketQuantity}
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

export function Optionals({ name, price, minor, children }) {
  const [checked, setChecked] = useState(false);

  return (
    <Field className="flex items-center gap-3 max-w-xl group hover:cursor-pointer">
      <Checkbox
        name={name}
        checked={checked}
        onChange={setChecked}
        className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none"
      >
        <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
      </Checkbox>
      <Label
        className={`${
          minor && "text-sm text-aztec-300"
        } flex justify-between group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer`}
      >
        {children}{" "}
        {price && (
          <small className="opacity-50 place-self-end mx-8">{price} DKK</small>
        )}
      </Label>
    </Field>
  );
}

import { FaRegQuestionCircle } from "react-icons/fa";

export function TextInput({
  name,
  type,
  placeholder,
  defaultValue,
  error,
  children,
  variant,
}) {
  const variants = {
    fullSpan: "col-span-3",
    twoSpan: "col-span-2",
  };
  return (
    <Field
      className={`grid gap-y-2 ${variant ? variants[variant] : "max-w-sm"}`}
    >
      <Label
        className={`capitalize ${variant === "slim" && "text-sm opacity-65"}`}
      >
        {children}
      </Label>
      <div className="grid gap-4">
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`input-field input-field-text--focus ${
            variant === "slim" && "py-1"
          } ${
            error &&
            "not-data-focus:border-border-global--error bg-surface-input--focus"
          }`}
        />
        {/* {name === "cardSecurityCode" && (
          <FaRegQuestionCircle className="text-text-global--disabled hover:text-text-global" />
        )} */}
        {error && (
          <MdOutlineError
            aria-label="Attention!"
            className="place-self-center text-text-global--error"
            size="24"
          />
        )}
      </div>
      <small className="text-text-global--error italic h-0.5">
        {!error?.includes("ticket") && error}
      </small>
    </Field>
  );
}

export function ReservationTimer() {
  return (
    <div className="flex justify-between gap-2 items-center bg-surface-action py-2 px-4">
      <small className="leading-tight">Time to complete reservation</small>
      <CountDown seconds={60 * 5} />
    </div>
  );
}

export function CountDown({ seconds }) {
  const [countdown, setCountdown] = useState(seconds);
  const timerID = useRef();

  useEffect(() => {
    timerID.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerID.current);
  }, []);

  useEffect(() => {
    if (countdown <= 1) {
      clearInterval(timerID);
      redirect("/");
    }
  }, [countdown]);
  // COUNTDOWN FUNCTION CREDIT: https://youtu.be/4_9yJXO4F2Y

  const formattedTimer =
    new Date(countdown * 1000).getUTCMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
      useGrouping: false,
    }) +
    ":" +
    new Date(countdown * 1000).getSeconds().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
      useGrouping: false,
    });
  // TIME FORMAT CREDIT: https://www.geeksforgeeks.org/how-to-convert-seconds-to-time-string-format-hhmmss-using-javascript/

  return <p className="font-semibold">{formattedTimer}</p>;
}

import logo from "@/assets/svg/logo_bold.svg";
import { AreaSelection, TicketSelection } from "./FormSections";
export function WarningEscape() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
        <Image src={logo} alt="FooFest" className="h-16 w-fit" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-surface-global p-12 border border-border-global">
          <DialogPanel className="grid gap-6">
            <DialogTitle className="heading-4">
              Leave Booking Session
            </DialogTitle>
            <div className="grid gap-2">
              <Description className="font-bold">
                Are you sure you wish to leave?
              </Description>
              <p className="text-aztec-300">
                If you exit the booking session you will lose your reservation.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="grow cursor-pointer bg-aztec-400 p-2 rounded-sm font-semibold max-w-40"
              >
                Cancel
              </button>
              <Link
                href="/"
                className="grow flex place-content-center bg-rose-600 p-2 rounded-sm font-semibold max-w-40"
              >
                Exit
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
