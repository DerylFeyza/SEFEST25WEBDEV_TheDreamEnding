import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const findItem = async (where: Prisma.ItemWhereUniqueInput) => {
	return await prisma.item.findUnique({
		where: {
			...where,
			is_deleted: false,
		},
	});
};

export const findAllItems = async ({
	search,
	where,
}: {
	search?: Prisma.ItemWhereInput;
	where?: Prisma.ItemWhereInput;
}) => {
	return await prisma.item.findMany({
		where: {
			...(search?.name || search?.category
				? {
						OR: [
							search.name ? { name: { contains: search.name,mode:"insensitive" } } : undefined,
							search.category
								? { category: { contains: search.category } }
								: undefined,
						].filter(Boolean) as Prisma.ItemWhereInput[],
				  }
				: {}),
			is_deleted: false,
			...where,
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
