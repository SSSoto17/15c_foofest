"use server";

import { revalidatePath } from "next/cache";
import { putReservation } from "./tickets";

export async function submitTicketReservation(prev, formData) {
  const data = {};
  const errors = {};

  // COLLECT FORMDATA FOR STEP ONE
  if (prev.activeStep === 1) {
    data.area = formData.get("area");
    data.amount =
      Number(formData.get("Partout Ticket")) +
      Number(formData.get("VIP Ticket"));

    if (!data.amount || data.amount < 1) {
      errors.tickets = "Please select your tickets.";
    }

    if (
      Number(formData.get("Partout Ticket")) > 10 ||
      Number(formData.get("VIP Ticket")) > 10
    ) {
      errors.tickets = "Please limit your selection to 10 tickets.";
    }

    // if (errors.tickets) {
    //   return { activeStep: prev.activeStep, success: false, errors };
    // }

    const response = await putReservation(data);

    if (response) {
      revalidatePath("/");
      return { activeStep: 2, success: true, errors: {} };
    } else {
      return { activeStep: prev.activeStep, success: false, errors: {} };
    }
  }

  if (prev.activeStep === 2) {
    data.buyerName = formData.get("name");
    data.buyerEmail = formData.get("email");
    data.ticketHolders = {
      partout: formData.getAll("Partout Ticket Guest"),
      vip: formData.getAll("VIP Ticket Guest"),
    };

    if (!data.buyerName || data.buyerName.length <= 1) {
      errors.customerName = "Please provide your name.";
    }
    if (!data.buyerEmail || !data.buyerEmail.includes(".")) {
      errors.customerEmail = "Please provide a valid email address.";
    }

    data.ticketHolders.partout.map((guest) => {
      if (!guest || guest.length <= 1) {
        errors.ticketGuests = "Please provide the name of each ticket holder.";
      }
    });
    data.ticketHolders.vip.map((guest) => {
      if (!guest || guest.length <= 1) {
        errors.ticketGuests = "Please provide the name of each ticket holder.";
      }
    });

    // if (errors.customerName || errors.customerEmail || errors.ticketGuests) {
    //   return { activeStep: prev.activeStep, success: false, errors, data };
    // } else {
    return { activeStep: 3, success: true, errors: {}, data };
    // }
  }

  if (prev.activeStep === 3) {
  }

  // if (Object.keys(errors).length > 0) {
  //   console.log(errors);
  //   return { activeStep: prev.activeStep, success: false, errors };
  // }
}
