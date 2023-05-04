import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt" | "location"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;   
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "phoneNumber" | "idCard" | "image"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  phoneNumber: string | null;
  idCard: string | null;
  image: string | null;
};