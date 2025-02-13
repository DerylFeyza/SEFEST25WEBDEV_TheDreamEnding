"use server"

import { revalidatePath } from "next/cache"
import { createItem, updateItem, findItem, deleteItem } from "../database/item.query"
import { handleImageDelete, imageUploader } from "./imageUpload"

export const handleCreateItem = async (formData: FormData) => {
    try {
      const itemData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        rent_price: parseInt(formData.get("rent_price") as string),
        condition: formData.get("condition") as string,
        pickup_location: formData.get("pickup_location") as string,
        available: formData.get("available") === "true",
        image_url: formData.get("image") as string,
        owner: {
          connect: { id: formData.get("owner_id") as string }
        }
      }

      await createItem(itemData);
      return { success: true, message: "Berhasil Menambahkan Item" };
    } catch (error) {
      console.error("Error creating item:", error);
    }
  }

export const handleUpdateItem = async (id: number, formData: FormData) => {
  return new Promise(async (resolve) => {
    try {
      let uploadResult
      const image = formData.get("image") as File | null
      const existingItem = await findItem({ id })

      const updateData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        rent_price: parseInt(formData.get("rent_price") as string),
        condition: formData.get("condition") as string,
        pickup_location: formData.get("pickup_location") as string,
        available: formData.get("available") === "true",
        image_url: formData.get("image") as string,
        owner: {
          connect: { id: formData.get("owner_id") as string }
        }
      }

      if (existingItem?.imageUrl && image) {
        const deleteResult = await handleImageDelete(existingItem.imageUrl)
        if (!deleteResult.success) {
          return resolve({ success: false, message: deleteResult.message })
        }
        uploadResult = await imageUploader(image)
        if (!uploadResult.success) {
          return resolve({ success: false, message: uploadResult.message })
        }
      }

      if (uploadResult?.url) {
        updateData.image_url = uploadResult.url
      }

      await updateItem({ id }, updateData)
      revalidatePath("/items")
      resolve({ success: true, message: "Item updated successfully" })
    } catch (error) {
      resolve({ success: false, message: "Failed to update item" })
    }
  })
}

export const handleDeleteItem = async (id: number) => {
  return new Promise(async (resolve) => {
    try {
      const item = await findItem({ id })
      if (item && item.imageUrl) {
        const deleteResult = await handleImageDelete(item.imageUrl)
        if (!deleteResult.success) {
          return resolve({ success: false, message: deleteResult.message })
        }
      }

      await deleteItem({ id })
      revalidatePath("/items")
      return resolve({ success: true, message: "Item deleted successfully" })
    } catch (error) {
      return resolve({ success: false, message: "Failed to delete item" })
    }
  })
}

