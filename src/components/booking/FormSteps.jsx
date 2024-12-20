import {
  GreenFee,
  TentSetup,
  EnterBuyerInfo,
  EnterPaymentInfo,
  OrderSummary,
} from "./FormSections";
import EnterGuestInfo from "./form-sections/GuestInfo";
import SelectTickets from "./form-sections/SelectTickets";
import SelectCampingArea from "./form-sections/SelectCampingArea";

export function BookingStepOne({ ticketData, error, areaData }) {
  return (
    <div className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12">
      <SelectTickets {...ticketData} error={error} />
      <SelectCampingArea data={areaData} />
      <GreenFee />
    </div>
  );
}

export function BookingStepTwo({ orderData, error }) {
  return (
    <div className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12">
      <EnterGuestInfo {...orderData} error={error} />
      <TentSetup {...orderData} error={error} />
    </div>
  );
}

export function BookingStepThree({ orderData, error }) {
  return (
    <div className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12">
      <EnterBuyerInfo {...orderData} error={error} />
      <EnterPaymentInfo />
    </div>
  );
}
