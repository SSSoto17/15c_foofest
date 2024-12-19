import { create } from "zustand";

// export const useTickets = create((set) => ({
//   tickets: [],
//   addTicket: (ticketType, ticketPrice) =>
//     set((state) => ({
//       tickets: [...state.tickets, { type: ticketType, price: ticketPrice }],
//     })),
//   removeTicket: (ticketType, updatedQuantity) =>
//     set((state) => ({
//       tickets: [
//         ...state.tickets.filter((ticket) => ticket.type !== ticketType),
//         ...updatedQuantity,
//       ],
//     })),
//   clearTickets: (ticketType) =>
//     set((state) => ({
//       tickets: state.tickets.filter((ticket) => ticket.type !== ticketType),
//     })),
// }));
export const useTickets = create((set) => ({
  totalTickets: 0,
  addTicket: () =>
    set((state) => ({
      totalTickets: state.totalTickets + 1,
    })),
  removeTicket: (quantity) =>
    set((state) => ({
      totalTickets: state.totalTickets - Number(quantity),
    })),
  enterTicket: (quantity) =>
    set((state) => ({
      totalTickets: (state.totalTickets = quantity),
    })),
}));

export const useTents = create((set) => ({
  tentSpaces: 0,
  addTent: (spaces) =>
    set((state) => ({
      tentSpaces: state.tentSpaces + 1 * spaces,
    })),
  removeTent: (quantity, spaces) =>
    set((state) => ({
      tentSpaces: state.tentSpaces - Number(quantity) * spaces,
    })),
  enterTent: (quantity, spaces) =>
    set((state) => ({
      tentSpaces: (state.tentSpaces = Number(quantity) * spaces),
    })),
}));
