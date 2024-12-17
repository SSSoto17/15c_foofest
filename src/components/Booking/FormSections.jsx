import { Fieldset, Label, Legend } from "@headlessui/react";
import {
  NumberInput,
  CampingSpots,
  Optionals,
  TextInput,
  TicketGuestInput,
} from "@/components/Booking/FormFields";
import { useTickets } from "@/store/GlobalStore";
import Image from "next/image";

import vipStamp from "@/assets/svg/vip.svg";
import optionalsListing from "../../data/optionals";
import buyerInfo from "../../data/buyerfields";
import Accordion from "../lineup/Accordion";

export function TicketSelection({ partoutGuests, vipGuests, error }) {
  const ticketQuantity = partoutGuests?.length + vipGuests?.length;

  const ticketListing = [
    { label: "Partout Ticket", price: "799", error },
    { label: "VIP Ticket", price: "1299", error },
  ];
  return (
    <Fieldset className="grid gap-y-4">
      <Legend className="heading-3">Tickets</Legend>
      <small className="text-text-global--error italic h-0.5">
        {!ticketQuantity && error}
      </small>
      {ticketListing.map((ticket, id) => {
        return (
          <NumberInput
            key={id}
            name={ticket.label}
            price={ticket.price}
            error={(!ticketQuantity && error) || (ticketQuantity > 10 && error)}
          >
            {ticket.label}
          </NumberInput>
        );
      })}
    </Fieldset>
  );
}

export function AreaSelection({ data }) {
  return (
    <Fieldset className="grid gap-y-6">
      <Legend className="heading-3">Camping Spot</Legend>
      <CampingSpots selectionData={data} />
    </Fieldset>
  );
}

export function OptionalsSelection() {
  return (
    <Fieldset className="grid gap-y-2">
      <Optionals label="Green Fee" price={249} />
    </Fieldset>
  );
}

export function TentSetup({ error }) {
  const tentListing = [
    { label: "Double Person Tent", price: "299" },
    { label: "Triple Person Tent", price: "399" },
  ];
  return (
    <Accordion label="Tent Setup" variant="secondary">
      <Fieldset className="grid gap-y-4 ml-12">
        <small>{error}</small>
        {tentListing.map((tent, id) => {
          return (
            <NumberInput
              key={id}
              name={tent.label}
              price={tent.price}
              error={error}
            >
              {tent.label}
            </NumberInput>
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

export function EnterGuestInfo({ partoutGuests, vipGuests, error }) {
  return (
    <Fieldset className="grid gap-y-4 max-w-md">
      <Legend className="heading-3 text-xl">Ticket #1</Legend>
      <div className="grid gap-y-1 border border-border-input py-4 px-6 relative">
        <Image
          src={vipStamp}
          alt="VIP Ticket"
          className="absolute right-6 -top-6"
        />
        <TextInput variant="slim">Name</TextInput>
        <TextInput variant="slim">Email</TextInput>
      </div>
      {/* <Legend className="heading-3">Guests</Legend> */}
      {/* <small className="text-text-global--error italic h-8">{error}</small> */}
      {/* <section className="grid gap-x-4"> */}
      {/* {partoutGuests && (
          <ul>
          {partoutGuests.map((guest, id) => {
            return (
              <li key={id}>
              <TextInput
              name={guest}
              type="text"
              error={error}
              // defaultValue={
                //   ticketHolders?.partout[id] || ticketHolders?.vip[id]
                // }
                >
                Name
                </TextInput>
                </li>
                );
                })}
                </ul>
                )}
                {vipGuests && (
                  <ul>
                  {vipGuests.map((guest, id) => {
                    return (
                      <li key={id}>
                      <TextInput
                      name={guest}
                      type="text"
                      error={error}
                      // defaultValue={
                        //   ticketHolders?.partout[id] || ticketHolders?.vip[id]
                        // }
                        >
                        Name
                        </TextInput>
                        </li>
                        );
                        })}
                        </ul>
                        )} */}
      {/* {singleType ? (
          <ul className="grid grid-cols-2 gap-4">
          {guests.map((guest, id) => {
            return (
              <li key={id}>
              <TextInput
              name={guest + " Guest"}
              type="text"
              error={error}
              defaultValue={
                ticketHolders?.partout[id] || ticketHolders?.vip[id]
                }
                >
                Name
                </TextInput>
                </li>
                );
                })}
                </ul>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                  <article className="flow-space">
                  <h3 className="heading-4">Partout Tickets</h3>
                  <ul className="grid gap-4">
                  {partoutTickets.map((guest, id) => {
                    return (
                      <li key={id}>
                      <TextInput
                      name={guest.type + " Guest"}
                      type="text"
                      error={error}
                      defaultValue={ticketHolders?.partout[id]}
                      >
                      Name
                      </TextInput>
                      </li>
                      );
                      })}
                      </ul>
                      </article>
                      <article className="flow-space">
                      <h3 className="heading-4">VIP Tickets</h3>
                      <ul className="grid gap-4">
                      {vipTickets.map((guest, id) => {
                        return (
                    <li key={id}>
                    <TextInput
                    name={guest.type + " Guest"}
                    type="text"
                    error={error}
                    defaultValue={ticketHolders?.vip[id]}
                    >
                    Name
                      </TextInput>
                    </li>
                    );
                    })}
                    </ul>
                    </article>
                    </div>
                    )} */}
      {/* </section> */}
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
  partoutGuests,
  vipGuests,
  tentDouble,
  tentTriple,
  greenFee,
}) {
  // const productBasket = useTickets((state) => state.tickets);
  // const basketByTicket = [
  //   productBasket.filter((ticket) => ticket.type === "Partout Ticket"),
  //   productBasket.filter((ticket) => ticket.type === "VIP Ticket"),
  // ];
  const green = greenFee ? 249 : 0;
  const totalPrice =
    partoutGuests.length * 799 + vipGuests.length * 1299 + green + 99;
  // const totalPrice =
  //   productBasket.reduce(
  //     (accumulator, currentValue) => accumulator + Number(currentValue.price),
  //     0
  //   ) + greenFee;

  return (
    <section className="col-start-3 row-start-1 row-span-2 border border-border-form self-start">
      <header className="border-b border-border-form p-6">
        <h3 className="heading-4 w-full text-center">Order Summary</h3>
      </header>
      <ul className="p-6">
        {partoutGuests.length > 0 && (
          <li className="flex justify-between items-end gap-2">
            <p className="flex gap-2 items-end">
              <span className="text-desk-sm">{partoutGuests.length} x</span>
              Partout {partoutGuests.length === 1 ? "Ticket" : "Tickets"}
            </p>
            <p>{partoutGuests.length * 799},-</p>
          </li>
        )}
        {vipGuests.length > 0 && (
          <li className="flex justify-between items-end gap-2">
            <p className="flex gap-2 items-end">
              <span className="text-desk-sm">{vipGuests.length} x</span>
              VIP {vipGuests.length === 1 ? "Ticket" : "Tickets"}
            </p>
            <p>{vipGuests.length * 799},-</p>
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
        {/* {basketByTicket.map((type, id) => {
          const totalQuantity = type.length;
          if (totalQuantity > 0) {
            const ticketType = type[0].type;
            // console.log(ticketType);
            const ticketPrice = type.reduce(
              (accumulator, currentValue) =>
                accumulator + Number(currentValue.price),
              0
            );
            return (
              <li key={id} className="flex justify-between items-end gap-2">
                <p className="flex gap-2 items-end">
                  <span className="text-desk-sm">{totalQuantity} x</span>
                  {ticketType}
                </p>
                {<p>{ticketPrice},-</p>}
              </li>
            );
          }
        })} */}
        {greenFee && (
          <li className="flex justify-between items-end gap-2">
            <p className="flex gap-2 items-end">
              <span className="text-desk-sm">1 x</span>
              Green Fee
            </p>
            <p>249,-</p>
          </li>
        )}
        <li className="flex justify-between items-end gap-2">
          <p className="flex gap-2 items-end">
            <span className="text-desk-sm">1 x</span>
            Fixed Booking Fee
          </p>
          <p>99,-</p>
        </li>
      </ul>
      <footer className="flex justify-between gap-4 mx-6 pt-2 pb-6 items-end border-t border-border-global font-bold">
        <p>Total</p>
        {/* <Input name="totalPrice" className="w-12" value={totalPrice} readOnly /> */}
        <p>{totalPrice}</p>
      </footer>
    </section>
  );
}
