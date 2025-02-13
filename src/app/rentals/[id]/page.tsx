import React from "react";
import RentPage from "./rent-page";
import { getItemsByID } from "@/services/Items";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ rating: number }>;
}) {
  const { id } = await params;
  const { rating } = await searchParams!;

  const result = await getItemsByID(id, Number(rating));
  if (!result) {
    return <div>Item not found</div>;
  }
  return <RentPage rentItems={result} />;
}
