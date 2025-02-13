import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllRentals = async () => {
  return await prisma.rental.findMany({
    include: {
      item: true,
      User: true,
    },
  });
};

export const findRental = async (where: Prisma.RentalWhereUniqueInput) => {
  return await prisma.rental.findUnique({
    where,
    include: {
      item: true,
      User: true,
    },
  });
};

export const createRental = async (data: Prisma.RentalCreateInput) => {
  return await prisma.rental.create({ data });
};

export const updateRental = async (
  where: Prisma.RentalWhereUniqueInput,
  data: Prisma.RentalUpdateInput,
) => {
  return await prisma.rental.update({ where, data });
};
