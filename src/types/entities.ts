import { Item } from '@prisma/client';

type RentalCounts = {
  pending: number;
  confirmed: number;
  ongoing: number;
  completed: number;
  cancelled: number;
};

export type ItemWithRentalCounts = Item & { rental_counts: RentalCounts };
