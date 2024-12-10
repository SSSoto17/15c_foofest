"use server";

import { revalidatePath } from "next/cache";
import { putReservation } from "./tickets";

export async function submitTicketReservation(prev, formData) {
  const data = {
    area: formData.get("area"),
    amount:
      Number(formData.get("Partout Ticket")) +
      Number(formData.get("VIP Ticket")),
  };
  const errors = {};

  if (data.amount < 1) {
    errors.tickets = "Please choose your tickets.";
  }

  if (errors.tickets) {
    return { success: false, errors };
  }

  const response = await putReservation(data);

  if (response) {
    revalidatePath("/");
    return { success: true, errors: {}, activeStep: 2 };
  } else {
    return { success: false, errors: {} };
  }
}
