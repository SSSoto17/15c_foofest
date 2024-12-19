"use server";

import { revalidatePath } from "next/cache";
import {
  putReservation,
  postReservation,
  postOrder,
} from "../../../../../lib/order";

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

    // COLLECT PARTOUT GUESTS INFORMATION
    orderDetails.partoutGuests = formData
      .getAll("partoutName")
      .map((str) => ({ name: str }));

    orderDetails.partoutGuests.forEach(function (guest, id) {
      const emails = formData.getAll("partoutEmail");
      guest.email = emails[id];
    });

    // COLLECT VIP GUESTS INFORMATION
    orderDetails.vipGuests = formData
      .getAll("vipName")
      .map((str) => ({ name: str }));

    orderDetails.vipGuests.forEach(function (guest, id) {
      const emails = formData.getAll("vipEmail");
      guest.email = emails[id];
    });

    // formData.getAll("vipName").map((name) => {
    //   orderDetails.vipGuests = [];
    //   orderDetails.vipGuests = [...orderDetails.vipGuests, { name: name }];
    //   if (formData.get("isBuyerGuest")) {
    //     orderDetails.customerName = orderDetails.vipGuests[0].name;
    //   }
    // });
    // formData.getAll("vipEmail").map((email, id) => {
    //   orderDetails.vipGuests[id].email = email;
    //   if (formData.get("isBuyerGuest")) {
    //     orderDetails.customerEmail = orderDetails.vipGuests[0].email;
    //   }
    // });

    // COLLECT TENT ORDER
    orderDetails.tentDouble = Number(formData.get("Double Person Tent")) * 2;
    orderDetails.tentTriple = Number(formData.get("Triple Person Tent")) * 3;

    // FORM VALIDATION

    orderDetails.partoutGuests.map((guest) => {
      if (!guest.name || guest.name.length <= 1) {
        errors.ticketGuestsName =
          "Please provide the name and email of each ticket holder.";
      }
      if (!guest.email || !guest.email.includes(".")) {
        errors.ticketGuestsEmail =
          "Please provide the name and email of each ticket holder.";
      }
    });

    orderDetails.vipGuests.map((guest) => {
      if (!guest.name || guest.name.length <= 1) {
        errors.ticketGuestsName =
          "Please provide the name of each ticket holder.";
      }
      if (!guest.email || !guest.email.includes(".")) {
        errors.ticketGuestsEmail =
          "Please provide the email of each ticket holder.";
      }
    });
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

    if (errors.ticketGuestsName || errors.ticketGuestsEmail) {
      // orderDetails.partoutGuests = prev.orderDetails.partoutGuests;
      // orderDetails.vipGuests = prev.orderDetails.vipGuests;
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

    // orderDetails.customerName = formData.get("name");
    // orderDetails.customerEmail = formData.get("email");

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
