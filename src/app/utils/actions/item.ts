"use server"

import { revalidatePath } from "next/cache"
import { createItem, updateItem, findItem, deleteItem } from "../database/item.query"
import { handleImageDelete, imageUploader } from "./imageUpload"
import type { Prisma } from "@prisma/client"

export const handleCreateItem = async (formData: FormData) => {
  return new Promise(async (resolve) => {
    try {
        const item: Prisma.ItemCreateInput = {
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          condition: formData.get("condition") as string,
          owner: { connect: { id: Number.parseInt(formData.get("ownerId") as string) } },
        }

      const image = formData.get("image") as File

      if (!image) {
        return resolve({
          success: false,
          message: "Image is required",
        })
      }

      const uploadResult = await imageUploader(image)
      if (!uploadResult.success) {
        return resolve({ success: false, message: uploadResult.message })
      }

      if (uploadResult.url) {
        item.imageUrl = uploadResult.url
      }

      await createItem({
        ...item,
        owner: { connect: { id: Number.parseInt(formData.get("ownerId") as string) } },
      })
      revalidatePath("/items")
      return resolve({ success: true, message: "Item added successfully" })
    } catch (error) {
      return resolve({ success: false, message: "Failed to add item" })
    }
  })
}

export const handleUpdateItem = async (id: number, formData: FormData) => {
  return new Promise(async (resolve) => {
    try {
      let uploadResult
      const image = formData.get("image") as File | null
      const existingItem = await findItem({ id })

      const updateData: Prisma.ItemUpdateInput = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        condition: formData.get("condition") as string,
        available: formData.get("available") === "true",
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
        updateData.imageUrl = uploadResult.url
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

