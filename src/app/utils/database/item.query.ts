import prisma from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import { v2 as cloudinary } from "cloudinary"


export const getAllItems = async () => {
  return await prisma.item.findMany({})
}

export const findItem = async (where: Prisma.ItemWhereUniqueInput) => {
  return await prisma.item.findUnique({
    where: {
      ...where,
    },
  })
}

export const createItem = async (data: Prisma.ItemCreateInput) => {
  return await prisma.item.create({ data })
}

export const updateItem = async (where: Prisma.ItemWhereUniqueInput, data: Prisma.ItemUpdateInput) => {
  return await prisma.item.update({
    where,
    data,
  })
}

export const deleteItem = async (where: Prisma.ItemWhereUniqueInput) => {
  return await prisma.item.delete({
    where,
  })
}

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder: "item-images" }, (error, result) => {
      if (error) reject(error)
      else resolve(result!.secure_url)
    })

    file.arrayBuffer().then((arrayBuffer) => {
      const buffer = Buffer.from(arrayBuffer)
      uploadStream.end(buffer)
    })
  })
}

