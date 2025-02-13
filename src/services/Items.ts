import prisma from "@/lib/prisma";

export const getItems = async () => {
  return await prisma.item.findMany({});
};
export const getItemsByID = async (id: string) => {
  return await prisma.item.findUnique({ where: { id } });
};
