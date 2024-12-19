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
export const useQuantityStore = create((set) => ({
  total: 0,
  setTotal: (quantity) =>
    set(() => ({
      total: quantity,
    })),
  // add: (quantity) =>
  //   set((state) => ({
  //     total: state.total + 1,
  //   })),
  // remove: (quantity) =>
  //   set((state) => ({
  //     total: state.total - Number(quantity),
  //   })),
  // enter: (quantity) =>
  //   set((state) => ({
  //     total: (state.total = quantity),
  //   })),
}));
