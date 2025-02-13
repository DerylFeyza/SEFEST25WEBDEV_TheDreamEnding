import React from "react";
import RentPage from "./rent-page";
import { getItemsByID } from "@/services/Items";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  const result = await getItemsByID(id);

  return <RentPage rentItems={result!} />;
}
