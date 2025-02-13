"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, Heart, Share } from "lucide-react";

function Page() {
  const [items, setItems] = useState(0);
  return (
    <div className="container grid grid-cols-4 pt-10 mx-auto">
      <div className="grid grid-cols-[auto_1fr] col-span-3">
        <div>
          <Image
            src={"https://picsum.photos/200/200"}
            alt="Placeholder"
            width={200}
            height={200}
            className="size-96"
          />
        </div>
        <div className="px-12">
          <header>
            <h1>Placeholder</h1>
            <p>nigger sales</p>
            <p>Price</p>
            <p>(Optional) Discount</p>
            <hr />
          </header>
          <main>
            <p>Details</p>
            <hr />
            <p>Store</p>
            <hr />
            <div>
              <p>Other Shit</p>
            </div>
          </main>
        </div>
        <div>nigga</div>
      </div>
      <div>
        <Card className="grid grid-rows-[auto_1fr_auto] sticky top-0">
          <CardHeader>
            <CardTitle>Rent This Shit Pls</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-4 p-4">
              <Image
                src={"https://picsum.photos/200/200"}
                alt="Placeholder"
                width={50}
                height={50}
              />
              <p className="text-sm text-gray-600 break-all">Item Name</p>
            </div>
            <hr />
            <div className="flex flex-col w-full gap-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-row items-center gap-4 border rounded-md">
                  <Button
                    onClick={() => {
                      setItems((prev) => {
                        return prev - 1;
                      });
                    }}
                    className="hover:bg-gray-200 text-foreground bg-inherit text-3xl shadow-none"
                  >
                    -
                  </Button>
                  <p>{items}</p>
                  <Button
                    onClick={() => {
                      setItems((prev) => {
                        return prev + 1;
                      });
                    }}
                    className=" hover:bg-gray-200 text-foreground bg-inherit text-3xl shadow-none"
                  >
                    +
                  </Button>
                </div>
                <p>Stock: infinite</p>
              </div>
              <div className="flex items-center gap-4">
                <p>Total : </p>
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(items * 125000)}
                </p>
              </div>
              <Link className="w-full" href="/rentals">
                <Button className="w-full bg-green-600">Rent Now</Button>
              </Link>
              <Link className="w-full" href="/rentals">
                <Button className="w-full">Add To Cart</Button>
              </Link>
              <hr />
            </div>
          </CardContent>
          <CardFooter className="justify-items-center grid items-center grid-cols-6 m-0">
            <Link href={"/chat"}>
              <Button variant={"link"}>
                <MessageSquare /> Chat
              </Button>
            </Link>
            <p className="text-center">|</p>
            <Link href={"/chat"}>
              <Button variant={"link"}>
                <Heart /> Wishlist
              </Button>
            </Link>
            <p className="text-center">|</p>
            <Link href={"/chat"}>
              <Button variant={"link"} className="text-center">
                <Share /> Share
              </Button>
            </Link>
            <p className="text-center">|</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
