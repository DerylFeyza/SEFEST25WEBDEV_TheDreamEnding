import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllItems = async () => {
	return await prisma.item.findMany({
		orderBy: {
			createdAt: "asc",
		},
	});
};

export const findItem = async (where: Prisma.ItemWhereUniqueInput) => {
	return await prisma.item.findUnique({
		where: {
			...where,
			is_deleted: false,
		},
	});
};

export const findAllItems = async (where: Prisma.ItemWhereInput) => {
	return await prisma.item.findMany({
		where: {
			...(where.name || where.category
				? {
						OR: [
							where.name ? { name: { contains: where.name } } : undefined,
							where.category
								? { category: { contains: where.category } }
								: undefined,
						].filter(Boolean) as Prisma.ItemWhereInput[],
				  }
				: {}),
			is_deleted: false,
		},
		orderBy: {
			createdAt: "asc",
		},
	});
};

export const createItem = async (data: Prisma.ItemCreateInput) => {
	return await prisma.item.create({ data });
};

export const updateItem = async (
	where: Prisma.ItemWhereUniqueInput,
	data: Prisma.ItemUpdateInput
) => {
	return await prisma.item.update({
		where,
		data,
	});
};

export const deleteItem = async (where: Prisma.ItemWhereUniqueInput) => {
	return await prisma.item.delete({
		where,
	});
};
