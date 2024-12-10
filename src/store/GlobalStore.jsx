import { create } from "zustand";

export const useTickets = create((set) => ({
  totalTickets: [],
  addTicket: (ticket) =>
    set((state) => ({ totalTickets: [...state.totalTickets, ticket] })),
  enterQuantity: (ticket, quantity) =>
    set((state) => ({
      totalTickets: [
        ...state.totalTickets.filter((element) => element != ticket),
        ticket.repeat(Number(quantity)),
      ],
    })),
  removeTicket: (ticket) =>
    set((state) => ({
      totalTickets: state.totalTickets.slice(
        0,
        state.totalTickets.findLastIndex((element) => element === ticket)
      ),
    })),
  clearTickets: (ticket) =>
    set((state) => ({
      totalTickets: state.totalTickets.filter((element) => element != ticket),
    })),
}));

export const useFormSteps = create((set) => ({
  formSteps: [
    { step: 1, title: "Choose Tickets" },
    { step: 2, title: "Your Information" },
    { step: 3, title: "Payment" },
  ],
}));
