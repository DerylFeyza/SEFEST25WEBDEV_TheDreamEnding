import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import type { Rental, User, Item } from '@prisma/client';

export const getAllRentals = async ({
  where,
  include
}: {
  where?: Prisma.RentalWhereInput;
  include?: Prisma.RentalInclude;
}) => {
  return await prisma.rental.findMany({
    where,
    include,
    orderBy: { createdAt: 'desc' }
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

export const getLatestPendingRental = async (ownerId: string) => {
  try {
    const rental = await prisma.rental.findFirst({
      where: {
        status: 'PENDING',
        item: { owner_id: ownerId }
      },
      include: {
        User: true,
        item: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return rental as (Rental & { User: User; item: Item }) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};