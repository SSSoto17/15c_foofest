import { Fieldset, Legend } from "@headlessui/react";
import {
  CheckField,
  TextInput,
  ReservationTimer,
} from "@/components/Booking/FormFields";
import buyerInfo from "../../data/buyerfields";
import Accordion from "../lineup/Accordion";
import { NumberSpinner } from "./form-sections/SelectTickets";

export function GreenFee() {
  const data = { name: "greenFee", price: 249 };
  return (
    <Fieldset className="grid gap-y-2">
      <CheckField data={data}>Green Fee</CheckField>
    </Fieldset>
  );
}

export function TentSetup({ tentDouble, tentTriple, error }) {
  const tentSpaces = tentDouble?.length * 2 + tentTriple?.length * 3;
  const tentListing = [
    { label: "Double Person Tent", price: "299" },
    { label: "Triple Person Tent", price: "399" },
  ];
  return (
    <Accordion label="Tent Setup" variant="secondary">
      <Fieldset className="grid gap-y-4 ml-12">
        <small className="text-text-global--action italic h-0.5">
          {!tentSpaces && error}
        </small>
        {tentListing.map((tent, id) => {
          return (
            <NumberSpinner
              forTents
              key={id}
              {...tent}
              error={(!tentSpaces && error) || (tentSpaces > 10 && error)}
            >
              {tent.label}
            </NumberSpinner>
          );
        })}
      </Fieldset>
    </Accordion>
  );
}

export function EnterBuyerInfo({ customerName, customerEmail, error }) {
  return (
    <Fieldset className="grid gap-y-8">
      <Legend className="heading-3">Your Information</Legend>
      {buyerInfo.map((field, id) => {
        return (
          <TextInput
            key={id}
            {...field}
            defaultValue={field.name === "name" ? customerName : customerEmail}
            error={
              field.name === "name" ? error.customerName : error.customerEmail
            }
          >
            {field.name}
          </TextInput>
        );
      })}
    </Fieldset>
  );
}

export function EnterPaymentInfo() {
  return (
    <Fieldset className="grid gap-y-6 col-span-2">
      <Legend className="heading-3">Payment</Legend>
      <div className="grid grid-cols-3 gap-x-4 max-w-md">
        <TextInput
          name="cardNumber"
          type="number"
          placeholder="Card number"
          variant="fullSpan"
        />
        <TextInput
          name="cardExp"
          type="number"
          placeholder="Expiration date ( MM / YY )"
          variant="twoSpan"
        />
        <TextInput
          name="cardSecurityCode"
          type="number"
          placeholder="Security code"
        />
        <TextInput
          name="cardHolder"
          type="text"
          placeholder="Name on card"
          variant="fullSpan"
        />
      </div>
    </Fieldset>
  );
}

export function EnterBillingInfo({ customerName }) {
  return (
    <Fieldset className="grid gap-y-6 col-span-2">
      <Legend className="heading-3">Billing Address</Legend>
      <div className="grid grid-cols-3 gap-x-4 max-w-md">
        <TextInput type="text" defaultValue={customerName} variant="fullSpan">
          Name
        </TextInput>
        <TextInput type="email" variant="fullSpan">
          Email
        </TextInput>
        <TextInput type="text" variant="fullSpan">
          Address
        </TextInput>
        <TextInput type="text" variant="twoSpan">
          City
        </TextInput>
        <TextInput type="number">Zip Code</TextInput>
        <TextInput type="tel" variant="fullSpan">
          Phone
        </TextInput>
      </div>
    </Fieldset>
  );
}

export function OrderSummary({
  step,
  partoutGuests,
  vipGuests,
  tentDouble,
  tentTriple,
  greenFee,
}) {
  const green = greenFee ? 249 : 0;
  const partoutPrice = partoutGuests ? partoutGuests.length * 799 : 0;
  const vipPrice = vipGuests ? vipGuests.length * 1299 : 0;
  const totalPrice = partoutPrice + vipPrice + green + 99;

  return (
    <section className="border border-border-form self-start grid grid-rows-subgrid row-span-full">
      <header className="border-b border-border-form grid place-items-end p-8">
        <h3 className="text-desk-base font-semibold w-full text-center">
          Order Summary
        </h3>
      </header>
      <article
        className={`grid grid-rows-[auto_1fr] ${
          step !== 1 && "grid-rows-[auto_auto_1fr]"
        } gap-y-2`}
      >
        <div>{step !== 1 && <ReservationTimer />}</div>
        {!partoutGuests && !vipGuests && (
          <small className="p-6 italic opacity-50">No tickets selected.</small>
        )}
        <ul className="p-6">
          {partoutGuests?.length > 0 && (
            <li className="flex justify-between items-end gap-2">
              <p className="flex gap-2 items-end">
                <span className="text-desk-sm">{partoutGuests.length} x</span>
                Partout {partoutGuests.length === 1 ? "Ticket" : "Tickets"}
              </p>
              <p>{partoutGuests.length * 799},-</p>
            </li>
          )}
          {vipGuests?.length > 0 && (
            <li className="flex justify-between items-end gap-2">
              <p className="flex gap-2 items-end">
                <span className="text-desk-sm">{vipGuests.length} x</span>
                VIP {vipGuests.length === 1 ? "Ticket" : "Tickets"}
              </p>
              <p>{vipGuests.length * 1299},-</p>
            </li>
          )}
          {tentDouble > 0 && (
            <li className="flex justify-between items-end gap-2">
              <p className="flex gap-2 items-end">
                <span className="text-desk-sm">{tentDouble} x</span>
                Double Person {tentDouble === 1 ? "Tent" : "Tents"}
              </p>
              <p>{tentDouble * 299},-</p>
            </li>
          )}
          {tentTriple > 0 && (
            <li className="flex justify-between items-end gap-2">
              <p className="flex gap-2 items-end">
                <span className="text-desk-sm">{tentTriple} x</span>
                Triple Person {tentTriple === 1 ? "Tent" : "Tents"}
              </p>
              <p>{tentTriple * 399},-</p>
            </li>
          )}
        </ul>
        <ul className="p-6 place-content-end">
          {greenFee && (
            <li className="flex justify-between items-end gap-2">
              <p className="flex gap-2 items-end">Green Fee</p>
              <p>249,-</p>
            </li>
          )}
          <li className="flex justify-between items-end gap-2">
            <p className="flex gap-2 items-end">Fixed Booking Fee</p>
            <p>99,-</p>
          </li>
        </ul>
      </article>
      <footer className="flex justify-between gap-4 p-6 items-center border-t border-border-global font-bold">
        <p>Total</p>
        <p>{totalPrice},-</p>
      </footer>
    </section>
  );
}
