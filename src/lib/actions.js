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

    if (data.amount < 1) {
      errors.ticketsMin = "Please select your tickets.";
    }

    if (Number(formData.get("Partout Ticket")) > 10) {
      errors.ticketsMax = "Please limit your selection to 10 tickets.";
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

    if (!errors) {
      console.log("no errors in input");
    }
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return { activeStep: prev.activeStep, success: false, errors };
  }

  const response = await putReservation(data);

  if (response) {
    revalidatePath("/");
    return { activeStep: 2, success: true, errors: {} };
  } else {
    return { activeStep: prev.activeStep, success: false, errors: {} };
  }
}
