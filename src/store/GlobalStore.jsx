import { create } from "zustand";

export const useTickets = create((set) => ({
  tickets: [],
  addTicket: (ticketType, ticketPrice) =>
    set((state) => ({
      tickets: [...state.tickets, { type: ticketType, price: ticketPrice }],
    })),
  removeTicket: (ticketType, updatedQuantity) =>
    set((state) => ({
      tickets: [
        ...state.tickets.filter((ticket) => ticket.type !== ticketType),
        ...updatedQuantity,
      ],
    })),
  clearTickets: (ticketType) =>
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.type !== ticketType),
    })),
}));
