'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const items = [
  {
    id: 'pending',
    label: 'Pending'
  },
  {
    id: 'confirmed',
    label: 'Confirmed'
  },
  {
    id: 'ongoing',
    label: 'Ongoing'
  },
  {
    id: 'completed',
    label: 'Completed'
  },
  {
    id: 'cancelled',
    label: 'Cancelled'
  }
] as const;

export function SidebarFilter() {
  const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.'
    })
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['recents', 'home']
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Filter By Status</CardTitle>
        <CardDescription>filter your rental requests here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='items'
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='items'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row items-start space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='text-sm font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
