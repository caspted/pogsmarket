'use client';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormMessage, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().nonempty().min(2).max(100),
  currentPrice: z.string().nonempty().refine((value) => parseInt(value) > 0),
  color: z.string().nonempty(),
  // using color as object instead of string
  // .refine((value) => {
  //   const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  //   if (!hexRegex.test(value)) {
  //     throw new Error("Invalid color format");
  //   }
  //   const hex = value.replace("#", "");
  //   let r, g, b;
  //   if (hex.length === 3) {
  //     r = parseInt(hex[0] + hex[0], 16);
  //     g = parseInt(hex[1] + hex[1], 16);
  //     b = parseInt(hex[2] + hex[2], 16);
  //   } else {
  //     r = parseInt(hex[0] + hex[1], 16);
  //     g = parseInt(hex[2] + hex[3], 16);
  //     b = parseInt(hex[4] + hex[5], 16);
  //   }
  //   return { r, g, b };
  // }),
  ticker: z.string().nonempty().toUpperCase().min(3).max(5),
});

export default function PogsForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      currentPrice: "",
      color: "", //{},
      ticker: "",
    },
  });

  const handleSubmit = () => {};
  
  return <Card className="w-full p-4">
  <CardTitle className="text-xl font-bold mb-4">
    Manage Pogs
  </CardTitle>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <FormField control={form.control} name="name" render={({ field }) => {
        return <FormItem>
          <FormLabel>Pogs Name</FormLabel>
          <FormControl>
            <Input placeholder="Pogs Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      }}/>
      <FormField control={form.control} name="currentPrice" render={({ field }) => {
        return <FormItem>
          <FormLabel>Current Price</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Current Price" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      }}/>
      <FormField control={form.control} name="color" render={({ field }) => {
        return <FormItem>
          <FormLabel>Color</FormLabel>
          <FormControl>
            {/* <Input type="color" placeholder="Color" {...field} /> */}
            <Input placeholder="Color" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      }}/>
      <FormField control={form.control} name="ticker" render={({ field }) => {
        return <FormItem>
          <FormLabel>Ticker Symbol</FormLabel>
          <FormControl>
            <Input placeholder="Ticker Symbol" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      }}/>
      <Button className="mt-8" type="submit">Submit</Button>
    </form>
  </Form>
</Card>
}