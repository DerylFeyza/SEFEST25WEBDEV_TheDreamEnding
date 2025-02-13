"use server";

import { revalidatePath } from "next/cache";
import {
  createItem,
  updateItem,
  findItem,
  deleteItem,
} from "../database/item.query";
import { handleImageDelete, imageUploader } from "./imageUpload";

export const handleCreateItem = async (formData: FormData) => {
  try {
    let imageUrl;
    const image = formData.get("image") as File | null;

    if (image && image.size > 0) {
      const uploadResult = await imageUploader(image);
      if (!uploadResult.success) {
        return { success: false, message: uploadResult.message };
      }
      imageUrl = uploadResult.url;
    }

    const newItemData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      rent_price: Number(formData.get("rent_price")),
      item_amount: Number(formData.get("item_amount")),
      condition: formData.get("condition") as string,
      pickup_location: formData.get("pickup_location") as string,
      owner: { connect: { id: formData.get("owner_id") as string } },
      image_url: imageUrl || null,
    };

    await createItem(newItemData);
    return { success: true, message: "Successfully added item" };
  } catch (error) {
    console.error("Error creating item:", error);
    return { success: false, message: "Failed to add item" };
  }
};

export const handleUpdateItem = async (id: string, formData: FormData) => {
  try {
    let uploadResult;
    const image = formData.get("image") as File | null;
    const existingItem = await findItem({ id });

    const updateData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      rent_price: parseInt(formData.get("rent_price") as string),
      condition: formData.get("condition") as string,
      pickup_location: formData.get("pickup_location") as string,
      available: formData.get("available") === "true",
      image_url: formData.get("image") as string,
      owner: {
        connect: { id: formData.get("owner_id") as string },
      },
    };

    if (existingItem?.image_url && image) {
      const deleteResult = await handleImageDelete(existingItem.image_url);
      if (!deleteResult.success) {
        return { success: false, message: deleteResult.message };
      }
      uploadResult = await imageUploader(image);
      if (!uploadResult.success) {
        return { success: false, message: uploadResult.message };
      }
    }

    if (uploadResult?.url) {
      updateData.image_url = uploadResult.url;
    }

    await updateItem({ id }, updateData);
    revalidatePath("/items");
    return { success: true, message: "Item updated successfully" };
  } catch (error) {
    console.error(error);

    return { success: false, message: "Failed to update item" };
  }
};

export const handleDeleteItem = async (id: string) => {
  return new Promise(async (resolve) => {
    try {
      const item = await findItem({ id });
      if (item && item.image_url) {
        const deleteResult = await handleImageDelete(item.image_url);
        if (!deleteResult.success) {
          return resolve({ success: false, message: deleteResult.message });
        }
      }

      await deleteItem({ id });
      revalidatePath("/items");
      return resolve({ success: true, message: "Item deleted successfully" });
    } catch (error) {
      console.error(error);

      return resolve({ success: false, message: "Failed to delete item" });
    }
  });
};
export const getItems = async () => {
  return await prisma.item.findMany({});
};
export const getItemsByID = async (id: string, rating?: number) => {
  return await prisma.item.findUnique({
    where: { id },
    include: {
      reviews: {
        where: { rating },
        include: {
          user: true,
        },
      },
    },
  });
};
