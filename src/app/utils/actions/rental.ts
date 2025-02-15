'use server';

import { revalidatePath } from 'next/cache';
import { findItemRentalCount } from '../database/item.query';
import { createRental, updateRental } from '../database/rental.query';
import type { Prisma, RentalStatus } from '@prisma/client';
import { getDaysDifference } from '@/helper/days-diff';
import { calculateRentalImpact } from './environment';

export const handleCreateRental = async (formData: FormData) => {
  try {
    const itemId = String(formData.get('item_id'));
    const userId = String(formData.get('user_id'));
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
    const rent_amount = Number(formData.get('rent_amount'));
    if (endDate <= startDate) {
      return {
        success: false,
        message: 'End date must be after start date'
      };
    }

    const daysDiff = getDaysDifference(startDate, endDate);

    const item = await findItemRentalCount({
      id: itemId
    });

    if (!item) {
      return {
        success: false,
        message: 'This item doesnt exist'
      };
    }

    if (
      item.rental_counts.ongoing + item.rental_counts.confirmed >=
      item.item_amount
    ) {
      return {
        success: false,
        message: 'Item is no longer available'
      };
    }

    const impact = calculateRentalImpact(
      startDate,
      endDate,
      item?.dailyCarbonSaving ?? 0,
      item?.dailyWasteReduction ?? 0
    );

    const rental: Prisma.RentalCreateInput = {
      start_date: startDate,
      finished_date: endDate,
      sustainabilityImpact: {
        create: {
          carbon_savings: impact.carbonSavings,
          waste_reduction: impact.wasteReduction
        }
      },
      status: 'PENDING',
      item: { connect: { id: itemId } },
      User: { connect: { id: userId } },
      rent_amount: rent_amount,
      paid_amount: item.rent_price * rent_amount * daysDiff
    };

    await createRental(rental);
    revalidatePath('/', 'layout');
    return {
      success: true,
      message: 'Rental request created successfully'
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to create rental request' };
  }
};

export const handleUpdateRental = async (id: string, formData: FormData) => {
  try {
    const updateData: Prisma.RentalUpdateInput = {
      status: formData.get('status') as RentalStatus
    };
    await updateRental({ id: id }, updateData);
    revalidatePath('/', 'layout');
    return { success: true, message: 'Rental status updated successfully' };
  } catch (error) {
    console.error(error);
    
    return { success: false, message: 'Failed to update rental' };
  }
};
