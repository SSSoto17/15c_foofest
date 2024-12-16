import { Fieldset, Legend, Input } from "@headlessui/react";
import {
  NumberInput,
  CampingSpots,
  Optionals,
  TextInput,
} from "@/components/Booking/FormFields";
import { useTickets } from "@/store/GlobalStore";

import optionalsListing from "../../data/optionals";
import buyerInfo from "../../data/buyerfields";

export function TicketSelection({ error }) {
  const tickets = useTickets((state) => state.tickets);
  const inBasket = tickets.length;

  const ticketListing = [
    { label: "Partout Ticket", price: "799", error },
    { label: "VIP Ticket", price: "1299", error },
  ];
  return (
    <Fieldset className="grid gap-y-4">
      <Legend className="heading-3">Tickets</Legend>
      <small className="text-text-global--error italic h-0.5">
        {!inBasket && error}
      </small>
      {ticketListing.map((ticket, id) => {
        return (
          <NumberInput
            key={id}
            label={ticket.label}
            price={ticket.price}
            inBasket={tickets}
            error={(!inBasket && error) || (inBasket > 10 && error)}
          />
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
      {optionalsListing.map((option, id) => {
        return <Optionals key={id} label={option.label} price={option.price} />;
      })}
    </Fieldset>
  );
}

export function EnterBuyerInfo({
  buyerName,
  buyerEmail,
  customerName,
  customerEmail,
}) {
  return (
    <Fieldset className="grid gap-y-8">
      <Legend className="heading-3">Your Information</Legend>
      {buyerInfo.map((field, id) => {
        return (
          <TextInput
            key={id}
            {...field}
            defaultValue={field.name === "name" ? buyerName : buyerEmail}
            error={field.name === "name" ? customerName : customerEmail}
          >
            {field.name}
          </TextInput>
        );
      })}
    </Fieldset>
  );
}

export function EnterGuestInfo({ ticketHolders, error }) {
  const tickets = useTickets((state) => state.tickets);
  const partoutTickets = tickets.filter(
    (ticket) => ticket.type === "Partout Ticket"
  );
  const vipTickets = tickets.filter((ticket) => ticket.type === "VIP Ticket");

  const guests = [
    ...Array(partoutTickets.length).fill("Partout Ticket"),
    ...Array(vipTickets.length).fill("VIP Ticket"),
  ];

  const singleType =
    guests.every((ticket) => ticket === "Partout Ticket") ||
    guests.every((ticket) => ticket === "VIP Ticket");

  return (
    <Fieldset className="grid gap-y-1">
      <Legend className="heading-3">Guest Information</Legend>
      <small className="text-text-global--error italic h-8">{error}</small>
      <section className="grid gap-x-4">
        {singleType ? (
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
        )}
      </section>
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

export function EnterBillingInfo({ buyerName }) {
  return (
    <Fieldset className="grid gap-y-6 col-span-2">
      <Legend className="heading-3">Billing Address</Legend>
      <div className="grid grid-cols-3 gap-x-4 max-w-md">
        <TextInput type="text" defaultValue={buyerName} variant="fullSpan">
          Name
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

export function OrderSummary({ green }) {
  const productBasket = useTickets((state) => state.tickets);
  const basketByTicket = [
    productBasket.filter((ticket) => ticket.type === "Partout Ticket"),
    productBasket.filter((ticket) => ticket.type === "VIP Ticket"),
  ];
  const greenFee = green?.price ? green.price : 0;
  const totalPrice =
    productBasket.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.price),
      0
    ) + greenFee;

  return (
    <section className="col-start-3 row-start-1 row-span-2 border border-border-form self-start">
      <header className="border-b border-border-form p-6">
        <h3 className="heading-4 w-full text-center">Order Summary</h3>
      </header>
      <ul className="p-6">
        {basketByTicket.map((type, id) => {
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
        })}
        {green?.price && (
          <li className="flex justify-between items-end gap-2">
            <p className="flex gap-2 items-end">
              <span className="text-desk-sm">1 x</span>
              {green?.name}
            </p>
            <p>{green?.price},-</p>
          </li>
        )}
      </ul>
      <footer className="flex justify-between gap-4 mx-6 pt-2 pb-6 items-end border-t border-border-global font-bold">
        <p>Total</p>
        {/* <Input name="totalPrice" className="w-12" value={totalPrice} readOnly /> */}
        <p>{totalPrice}</p>
      </footer>
    </section>
  );
}
