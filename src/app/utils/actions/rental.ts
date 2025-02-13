"use server";

import { revalidatePath } from "next/cache";
import { createRental, updateRental } from "../database/rental.query";
import type { Prisma, RentalStatus } from "@prisma/client";

export const handleCreateRental = async (formData: FormData) => {
  return new Promise(async (resolve) => {
    try {
      const rental: Prisma.RentalCreateInput = {
        start_date: new Date(formData.get("startDate") as string),
        finished_date: new Date(formData.get("endDate") as string),
        status: "PENDING",
        item: { connect: { id: String(formData.get("item_id")) } },
        User: { connect: { id: String(formData.get("user_id")) } },
      };

      await createRental(rental);
      revalidatePath("/rentals");
      resolve({
        success: true,
        message: "Rental request created successfully",
      });
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

      await updateRental({ id: id }, updateData);
      revalidatePath("/rentals");
      resolve({ success: true, message: "Rental status updated successfully" });
    } catch (error) {
      resolve({ success: false, message: "Failed to update rental" });
    }
  });
};
