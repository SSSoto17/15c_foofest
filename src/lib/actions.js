"use server";

import { revalidatePath } from "next/cache";
import { putReservation, postReservation, postOrder } from "./tickets";

export async function submitTicketReservation(prev, formData) {
  const errors = {};
  const orderDetails = {};

  //  BOOKING FLOW || STEP ONE
  if (prev.activeStep === 1) {
    // COLLECT RESERVATION
    const data = {};
    data.area = formData.get("area");
    data.amount =
      Number(formData.get("Partout Ticket")) +
      Number(formData.get("VIP Ticket"));

    // FORM VALIDATION
    if (!data.amount || data.amount < 1) {
      errors.tickets = "Please select your tickets.";
    }
    if (
      Number(formData.get("Partout Ticket")) > 10 ||
      Number(formData.get("VIP Ticket")) > 10
    ) {
      errors.tickets = "Please limit your selection to 10 tickets.";
    }
    if (errors.tickets) {
      return { activeStep: prev.activeStep, success: false, errors };
    }

    // PUT RESERVATION
    const response = await putReservation(data);
    if (response) {
      orderDetails.reservationId = response.id;
      orderDetails.campingArea = data.area;
      orderDetails.optionals = {
        greenFee: formData.get("Green fee") && {
          name: "Green Fee",
          price: 249,
        },
      };
      revalidatePath("/");
      return { activeStep: 2, success: true, errors: {}, orderDetails };
    } else {
      return { activeStep: prev.activeStep, success: false, errors: {} };
    }
  }

  // BOOKING FLOW || STEP TWO
  if (prev.activeStep === 2) {
    // COLLECT FORMDATA
    Object.assign(orderDetails, prev.orderDetails);
    orderDetails.customerName = formData.get("name");
    orderDetails.customerEmail = formData.get("email");
    orderDetails.ticketHolders = {
      partoutGuests: formData.getAll("Partout Ticket Guest"),
      vipGuests: formData.getAll("VIP Ticket Guest"),
    };

    // FORM VALIDATION
    if (!orderDetails.customerName || orderDetails.customerName.length <= 1) {
      errors.customerName = "Please provide your name.";
    }
    if (
      !orderDetails.customerEmail ||
      !orderDetails.customerEmail.includes(".")
    ) {
      errors.customerEmail = "Please provide a valid email address.";
    }
    orderDetails.ticketHolders.partoutGuests.map((guest) => {
      if (!guest || guest.length <= 1) {
        errors.ticketGuests = "Please provide the name of each ticket holder.";
      }
    });
    orderDetails.ticketHolders.vipGuests.map((guest) => {
      if (!guest || guest.length <= 1) {
        errors.ticketGuests = "Please provide the name of each ticket holder.";
      }
    });

    if (errors.customerName || errors.customerEmail || errors.ticketGuests) {
      return {
        activeStep: prev.activeStep,
        success: false,
        errors,
        orderDetails,
      };
    }

    return { activeStep: 3, success: true, errors: {}, orderDetails };
  }

  // BOOKING FLOW || STEP THREE
  if (prev.activeStep === 3) {
    // COLLECT ORDER DETAILS
    Object.assign(orderDetails, prev.orderDetails);
    orderDetails.partoutGuests = orderDetails.ticketHolders.partoutGuests;
    orderDetails.vipGuests = orderDetails.ticketHolders.vipGuests;
    orderDetails.greenFee = Boolean(orderDetails.optionals?.greenFee);

    // PRICE SUMUP
    const partoutPrice = orderDetails.ticketHolders.partoutGuests.length * 799;
    const vipPrice = orderDetails.ticketHolders.vipGuests.length * 1299;
    orderDetails.priceTotal =
      partoutPrice + vipPrice + (orderDetails.greenFee && 249);

    // FULLFIL RESERVATION
    const data = {};
    data.id = orderDetails.reservationId;

    // POST RESERVATION
    const response = await postReservation(data);
    if (response) {
      revalidatePath("/");
      delete orderDetails.reservationId;
      delete orderDetails.ticketHolders;
      delete orderDetails.optionals;
      const orderCompleted = postOrder(orderDetails);
      if (orderCompleted) {
        console.log(orderCompleted);
        return { activeStep: 1, success: true, errors: {}, orderDetails };
      }
      // return { activeStep: 1, success: true, errors: {} };
    } else {
      return {
        activeStep: prev.activeStep,
        success: false,
        errors: {},
        orderDetails,
      };
    }
    // orderDetails = { ...prev.orderDetails };
    // return console.log(prev.data);
    // data.priceTotal = prev.data.
  }

  // if (Object.keys(errors).length > 0) {
  //   console.log(errors);
  //   return { activeStep: prev.activeStep, success: false, errors };
  // }
}