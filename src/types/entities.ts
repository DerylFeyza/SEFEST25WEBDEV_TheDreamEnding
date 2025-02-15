import { Item, Prisma, Review, User } from '@prisma/client';

type RentalCounts = {
  pending: number;
  confirmed: number;
  ongoing: number;
  completed: number;
  cancelled: number;
};

export type ItemWithRentalCounts = Item & { rental_counts: RentalCounts };

export type RentalWithRenter = Prisma.RentalGetPayload<{
  include: { User: true };
}>;

export type RentWithItemAndOwner = Prisma.RentalGetPayload<{
  include: { item: { include: { owner: true } } };
}>;

export type allItems = Item & { reviews: Review[] & { user: User }[] };
