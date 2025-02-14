import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getAllRentals = async ({
  where,
  include
}: {
  where?: Prisma.RentalWhereInput;
  include?: Prisma.RentalInclude;
}) => {
  return await prisma.rental.findMany({
    where,
    include
  });
};

export const findRental = async ({
  where,
  include
}: {
  where: Prisma.RentalWhereUniqueInput;
  include?: Prisma.RentalInclude;
}) => {
  return await prisma.rental.findUnique({
    where,
    include
  });
};

export const createRental = async (data: Prisma.RentalCreateInput) => {
  return await prisma.rental.create({ data });
};

export const updateRental = async (
  where: Prisma.RentalWhereUniqueInput,
  data: Prisma.RentalUpdateInput
) => {
  return await prisma.rental.update({ where, data });
};
