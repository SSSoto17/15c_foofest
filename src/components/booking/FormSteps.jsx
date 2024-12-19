import {
  GreenFee,
  TentSetup,
  EnterBuyerInfo,
  EnterPaymentInfo,
} from "./FormSections2";
import EnterGuestInfo from "./form-sections/GuestInfo";
import SelectTickets from "./form-sections/SelectTickets";
import SelectCampingArea from "./form-sections/SelectCampingArea";

export function BookingStepOne({ ticketData, error, areaData }) {
  return (
    <div className="grid gap-y-16 p-12">
      <SelectTickets {...ticketData} error={error} />
      <SelectCampingArea data={areaData} />
      <GreenFee />
    </div>
  );
}

export function BookingStepTwo({ orderData, error }) {
  return (
    <div className="grid gap-y-16 p-12">
      <EnterGuestInfo {...orderData} error={error} />
      <TentSetup {...orderData} error={error} />
    </div>
  );
}

export function BookingStepThree({ orderData, error }) {
  return (
    <div className="grid gap-y-16 p-12">
      <EnterBuyerInfo {...orderData} error={error} />
      <EnterPaymentInfo />
    </div>
  );
}
