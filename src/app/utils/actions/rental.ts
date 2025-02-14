"use server";

import { revalidatePath } from "next/cache";
import { createRental, updateRental } from "../database/rental.query";
import type { Prisma, RentalStatus } from "@prisma/client";
import prisma from "@/lib/prisma";

export const handleCreateRental = async (formData: FormData) => {
  return new Promise(async (resolve) => {
    try {
      const itemId = String(formData.get("item_id"));
      const userId = String(formData.get("user_id"));

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return resolve({
          success: false,
          message: "User not found",
        });
      }

      const startDate = new Date(formData.get("startDate") as string);
      const endDate = new Date(formData.get("endDate") as string);

      if (endDate <= startDate) {
        return resolve({
          success: false,
          message: "End date must be after start date",
        });
      }

      const item = await prisma.item.findUnique({
        where: { id: itemId },
      });

      if (!item || !item.available || item.item_amount < 1) {
        return resolve({
          success: false,
          message: "Item is no longer available",
        });
      }

      const rental: Prisma.RentalCreateInput = {
        start_date: startDate,
        finished_date: endDate,
        status: "PENDING",
        item: { connect: { id: itemId } },
        User: { connect: { id: userId } },
      };

      await createRental(rental);

      if (item.item_amount === 1) {
        await prisma.item.update({
          where: { id: itemId },
          data: { available: false, item_amount: 0 },
        });
      } else {
        await prisma.item.update({
          where: { id: itemId },
          data: { item_amount: { decrement: 1 } },
        });
      }

      revalidatePath("/rentals");
      resolve({ success: true, message: "Rental request created successfully" });
    } catch (error) {
      console.error(error);
      resolve({ success: false, message: "Failed to create rental request" });
    }
  });
};

export const handleUpdateRental = async (id: string, formData: FormData) => {
  return new Promise(async (resolve) => {
    try {
      const updateData: Prisma.RentalUpdateInput = {
        status: formData.get("status") as RentalStatus,
      };

      await updateRental({ id: id }, updateData);
      revalidatePath("/rentals");
      resolve({ success: true, message: "Rental status updated successfully" });
    } catch (error) {
      resolve({ success: false, message: "Failed to update rental" });
    }
  });
};
