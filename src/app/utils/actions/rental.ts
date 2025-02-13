"use server";

import { revalidatePath } from "next/cache";
import { createRental, updateRental, deleteRental } from "../database/rental.query";
import type { Prisma, RentalStatus } from "@prisma/client";

export const handleCreateRental = async (formData: FormData) => {
  return new Promise(async (resolve) => {
    try {
      const rental: Prisma.RentalCreateInput = {
        startDate: new Date(formData.get("startDate") as string),
        endDate: new Date(formData.get("endDate") as string),
        status: "PENDING",
        Item: { connect: { id: parseInt(formData.get("item_id") as string) } },
        User: { connect: { id: parseInt(formData.get("user_id") as string) } },
      };

      await createRental(rental);
      revalidatePath("/rentals");
      resolve({ success: true, message: "Rental request created successfully" });
    } catch (error) {
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

      await updateRental({ id: parseInt(id) }, updateData);
      revalidatePath("/rentals");
      resolve({ success: true, message: "Rental status updated successfully" });
    } catch (error) {
      resolve({ success: false, message: "Failed to update rental" });
    }
  });
};

export const handleDeleteRental = async (id: string) => {
  return new Promise(async (resolve) => {
    try {
      await deleteRental({ id: parseInt(id) });
      revalidatePath("/rentals");
      resolve({ success: true, message: "Rental deleted successfully" });
    } catch (error) {
      resolve({ success: false, message: "Failed to delete rental" });
    }
  });
};
