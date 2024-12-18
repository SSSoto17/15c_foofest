"use server";

import { revalidatePath } from "next/cache";
import { putReservation, postReservation, postOrder } from "../../lib/tickets";

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

    // COLLECT ORDER
    orderDetails.partoutGuests = Array(
      Number(formData.get("Partout Ticket"))
    ).fill("partoutGuests");
    orderDetails.vipGuests = Array(Number(formData.get("VIP Ticket"))).fill(
      "vipGuests"
    );
    orderDetails.campingArea = data.area;
    orderDetails.greenFee = Boolean(formData.get("greenFee"));

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
      revalidatePath("/");
      return { activeStep: 2, success: true, errors: {}, orderDetails };
    } else {
      return { activeStep: prev.activeStep, success: false, errors: {} };
    }
  }

  // BOOKING FLOW || STEP TWO
  if (prev.activeStep === 2) {
    // REASSIGN VALUES FROM PREVIOUS STEP TO ORDER DETAILS
    Object.assign(orderDetails, prev.orderDetails);

    // CLEAR PARTOUT GUESTS
    orderDetails.partoutGuests = [];

    // COLLECT PARTOUT GUESTS INFORMATION
    formData.getAll("partoutName").map((name) => {
      orderDetails.partoutGuests = [
        ...orderDetails.partoutGuests,
        { name: name },
      ];
    });
    formData.getAll("partoutEmail").map((email, id) => {
      orderDetails.partoutGuests[id].email = email;
    });

    // orderDetails.partoutGuests = formData.getAll("partoutName");
    // orderDetails.partoutGuestsEmails = formData.getAll("partoutEmail");
    // orderDetails.vipGuests = formData.getAll("vipName");
    // orderDetails.vipGuestsEmails = formData.getAll("vipEmail");
    // orderDetails.tentDouble = formData.get("Double Person Tent");
    // orderDetails.tentTriple = formData.get("Triple Person Tent");

    // MOVED TO STEP 3
    // orderDetails.customerName = formData.get("name");
    // orderDetails.customerEmail = formData.get("email");

    // FORM VALIDATION
    // if (!orderDetails.customerName || orderDetails.customerName.length <= 1) {
    //   errors.customerName = "Please provide your name.";
    // }
    // if (
    //   !orderDetails.customerEmail ||
    //   !orderDetails.customerEmail.includes(".")
    // ) {
    //   errors.customerEmail = "Please provide a valid email address.";
    // }
    // orderDetails.partoutGuests.map((name) => {
    //   if (!name || name.length <= 1) {
    //     errors.ticketGuestsName =
    //       "Please provide the name of each ticket holder.";
    //   }
    // });
    // orderDetails.partoutGuestsEmails.map((email) => {
    //   if (!email || !email.includes(".")) {
    //     errors.ticketGuestsEmail =
    //       "Please provide a valid email for each ticket holder.";
    //   }
    // });
    // orderDetails.vipGuests.map((name) => {
    //   if (!name || name.length <= 1) {
    //     errors.ticketGuestsName =
    //       "Please provide the name of each ticket holder.";
    //   }
    // });
    // orderDetails.vipGuestsEmails.map((email) => {
    //   if (!email || !email.includes(".")) {
    //     errors.ticketGuestsEmail =
    //       "Please provide a valid email for each ticket holder.";
    //   }
    // });
    // if (orderDetails.tentTriple * 3 > orderDetails.partoutGuests.length) {
    //   errors.tentSetup = "Please fill up all tent space.";
    // }

    if (
      errors.ticketGuestsName ||
      errors.ticketGuestsEmail
      // errors.tentSetup
    ) {
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
    // orderDetails.partoutGuests = orderDetails.ticketHolders.partoutGuests;
    // orderDetails.vipGuests = orderDetails.ticketHolders.vipGuests;
    // orderDetails.greenFee = Boolean(orderDetails.optionals?.greenFee);

    // PRICE SUMUP
    const pricePartout = orderDetails.partoutGuests.length * 799;
    const priceVip = orderDetails.vipGuests.length * 1299;
    orderDetails.priceTotal =
      pricePartout + priceVip + (orderDetails.greenFee && 249) + 99;

    // FULLFIL RESERVATION
    const data = {};
    data.id = orderDetails.reservationId;

    // POST RESERVATION
    const response = await postReservation(data);
    if (response) {
      delete orderDetails.reservationId;
      // delete orderDetails.ticketHolders;
      // delete orderDetails.optionals;
      revalidatePath("/");
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
  }

  // if (Object.keys(errors).length > 0) {
  //   console.log(errors);
  //   return { activeStep: prev.activeStep, success: false, errors };
  // }
}
