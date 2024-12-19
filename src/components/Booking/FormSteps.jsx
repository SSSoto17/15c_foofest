import {
  GreenFee,
  TentSetup,
  EnterBillingInfo,
  EnterPaymentInfo,
  OrderSummary,
} from "./FormSections";
import EnterGuestInfo from "./form-sections/GuestInfo";
import SelectTickets from "./form-sections/SelectTickets";
import SelectCampingArea from "./form-sections/SelectCampingArea";

export function BookingStepOne({ ticketData, error, areaData }) {
  return (
    <div className="grid gap-y-16 p-12">
      <SelectTickets {...ticketData} error={error.tickets} />
      <SelectCampingArea data={areaData} />
      <GreenFee />
    </div>
  );
}

export function BookingStepTwo({ orderData, error }) {
  return (
    <div className="grid gap-y-16 p-12">
      <EnterGuestInfo {...orderData} error={error} />
      <TentSetup {...orderData} error={error.tentSetup} />
    </div>
  );
}

export function BookingStepThree({ orderData, error }) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-16 p-12 items-start">
      {/* <EnterBuyerInfo {...orderData} error={error} /> */}
      <EnterPaymentInfo />
      <EnterBillingInfo {...orderData} />
      <OrderSummary {...orderData} />
    </div>
  );
}
