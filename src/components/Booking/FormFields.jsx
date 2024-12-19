"use client";

// COMPONENTS
import {
  Field,
  Label,
  Input,
  Checkbox,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { MdOutlineCheck, MdOutlineError } from "react-icons/md";

// FUNCTIONS
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function CheckField({ data, minor, children }) {
  const [checked, setChecked] = useState(false);

  return (
    <Field className="flex items-center gap-3 max-w-xl group hover:cursor-pointer">
      <Checkbox
        name={data?.name}
        checked={checked}
        onChange={setChecked}
        className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none"
      >
        <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
      </Checkbox>
      <Label
        className={`body-copy flex justify-between group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer ${
          minor && "body-copy-small text-aztec-300"
        }`}
      >
        {children}{" "}
        {data?.price && (
          <span className="body-copy opacity-50 place-self-end mx-8">
            {data?.price} DKK
          </span>
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
        className={`body-copy capitalize ${variant === "slim" && "opacity-65"}`}
      >
        {children}
      </Label>
      <div className="grid gap-4">
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`input-field input-field-text--focus body-copy ${
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
      <ErrorText>{!error?.includes("ticket") && error}</ErrorText>
    </Field>
  );
}

export function ReservationTimer() {
  return (
    <div className="flex justify-between gap-2 items-center bg-surface-action py-2 px-4">
      <small className="body-copy-small leading-tight">
        Time to complete reservation
      </small>
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

  return <p className="body-copy font-semibold">{formattedTimer}</p>;
}

import logo from "@/assets/svg/logo_bold.svg";
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
        <div className="bg-surface-global p-12 border border-border-global max-w-md">
          <DialogPanel className="grid gap-8">
            <DialogTitle className="heading-6 text-red-400">
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
                className="grow cursor-pointer bg-aztec-300 p-2 rounded-sm font-semibold max-w-40"
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

export function ErrorText({ children }) {
  return (
    <small className="body-copy-small text-text-global--action italic h-0.5">
      {children}
    </small>
  );
}
