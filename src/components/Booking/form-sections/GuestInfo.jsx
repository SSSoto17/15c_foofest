import Image from "next/image";
import vipStamp from "@/assets/svg/vip.svg";

import { Fieldset, Legend } from "@headlessui/react";
import { TextInput, CheckField } from "@/components/Booking/FormFields";

export default function EnterGuestInfo({ partoutGuests, vipGuests, error }) {
  const TicketGuestKeys = {
    partoutGuests: { name: "partoutName", email: "partoutEmail" },
    vipGuests: { name: "vipName", email: "vipEmail" },
  };
  const singleTicket = partoutGuests.length + vipGuests.length === 1;

  return (
    <section
      className={`grid ${
        partoutGuests.length > 1 && "md:grid-cols-2"
      } gap-4 w-full`}
    >
      <header className="col-span-full flow-space mb-6">
        <h2 className="heading-3">Ticket Information</h2>
        <p className="opacity-50">
          Please provide the name and email of each ticket holder.
        </p>
      </header>
      {partoutGuests &&
        partoutGuests.map((guest, id) => {
          return (
            <TicketGuestCard
              key={id}
              data={guest}
              {...TicketGuestKeys[guest]}
              number={id + 1}
              single={singleTicket}
              error={error}
            />
          );
        })}
      {vipGuests &&
        vipGuests.map((guest, id) => {
          return (
            <TicketGuestCard
              key={id}
              data={guest}
              {...TicketGuestKeys[guest]}
              number={partoutGuests.length + id + 1}
              single={singleTicket}
              vip
            />
          );
        })}
    </section>
  );
}

export function TicketGuestCard({
  data,
  name,
  email,
  number,
  single,
  vip,
  error,
}) {
  const checkboxData = { name: "isBuyerGuest" };
  return (
    <>
      <Fieldset className="grid gap-y-4 max-w-md grow shrink">
        <Legend className="heading-3 text-xl">Ticket #{number}</Legend>
        <div
          className={`grid gap-y-1 border border-border-input py-4 px-6 relative`}
        >
          {vip && (
            <Image
              src={vipStamp}
              alt="VIP Ticket"
              className="absolute right-6 -top-6"
            />
          )}
          <TextInput
            name={name}
            error={error?.ticketGuestsName}
            defaultValue={data?.name}
            type="text"
            variant="slim"
          >
            Name
          </TextInput>
          <TextInput
            name={email}
            error={error?.ticketGuestsEmail}
            type="email"
            variant="slim"
          >
            Email
          </TextInput>
        </div>
        {single && (
          <CheckField data={checkboxData} minor>
            Are you buying this ticket for yourself?
          </CheckField>
        )}
        {/* <small className="text-text-global--error italic h-8">{error}</small> */}
      </Fieldset>
    </>
  );
}
