import React from "react";
import RentPage from "./rent-page";
import { getItemsByID } from "@/services/Items";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getItemsByID(id);
  console.log(result);
  if (!result) {
    return <div>Item not found</div>;
  }
  return <RentPage rentItems={result} />;
}
