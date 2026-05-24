"use client";

import { create } from "zustand";

interface BookingState {
  open: boolean;
  preselectService?: string;
  openModal: (service?: string) => void;
  closeModal: () => void;
}

export const useBooking = create<BookingState>((set) => ({
  open: false,
  preselectService: undefined,
  openModal: (service) => set({ open: true, preselectService: service }),
  closeModal: () => set({ open: false, preselectService: undefined })
}));
