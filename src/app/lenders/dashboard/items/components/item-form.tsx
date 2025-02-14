"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/file-uploader";
import { Item } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { handleCreateItem, handleUpdateItem } from "@/app/utils/actions/item";
import { toast } from "sonner";

import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  name: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  category: z.string(),
  price: z.string(),
  condition: z.string().min(2, {
    message: "Item condition must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Item location must be at least 2 characters.",
  }),
  amount: z.string(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export default function ItemForm({
  initialData,
  pageTitle,
}: {
  initialData?: Item | null;
  pageTitle?: "hi";
}) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const defaultValues = {
    image_url: initialData?.image_url || "",
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.rent_price ? initialData.rent_price.toString() : "",
    condition: initialData?.condition || "",
    amount: initialData?.item_amount ? initialData.item_amount.toString() : "",
    location: initialData?.pickup_location || "",
    description: initialData?.description || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const loadingToast = toast.loading(
      initialData ? "Updating Item..." : "Adding Item..."
    );

    try {
      if (!session?.user?.id) {
        return toast.error("User not authenticated", { id: loadingToast });
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("rent_price", values.price.toString());
      formData.append("item_amount", values.amount.toString());
      formData.append("condition", values.condition);
      formData.append("pickup_location", values.location);

      if (values.image?.length > 0) {
        formData.append("image", values.image[0]);
      }

      let result;
      if (initialData) {
        formData.append("image_url", initialData.image_url);
        result = await handleUpdateItem(initialData.id, formData);
      } else {
        formData.append("owner_id", session?.user?.id);
        result = await handleCreateItem(formData);
      }

      if (result.success) {
        setLoading(false);
        toast.success(
          initialData ? "Item updated successfully" : "Item added successfully",
          { id: loadingToast }
        );
        return router.push("/lenders/dashboard/items");
      }
      return toast.error(
        initialData ? "Item update failed" : "Item add failed",
        { id: loadingToast }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Something Went Wrong!", { id: loadingToast });
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-left">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        initialImageUrl={initialData?.image_url}
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={4 * 1024 * 1024}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className="md:grid-cols-2 grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Item name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value[field.value.length - 1]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select categories" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beauty">Beauty Items</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="sports">
                          Sports & Outdoors
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter condition" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pick Up Location</FormLabel>
                    <FormControl>
                      <Input
                        type="location"
                        placeholder="Enter Pick Up Location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Item description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              Add Item
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
