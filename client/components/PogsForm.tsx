'use client';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormMessage, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pogs } from "@/utils/types";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().nonempty().min(2).max(100),
  current_price: z.coerce.number(),
  previous_price: z.number(),
  color: z.string().nonempty(),
  ticker_symbol: z.string().nonempty().toUpperCase().min(3).max(5),
});

export default function PogsForm() {

  const [pogs, setPogs] = useState<Pogs>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      current_price: 0,
      previous_price: 0,
      color: "", //{},
      ticker_symbol: "",
    },
  });

  const addPogs = async (pogs: Pogs) => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/pogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pogs),
      });
      const data = await response.json();
      setPogs(data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const pogsData = {
      id: 0,
      name: data.name,
      current_price: data.current_price,
      previous_price: 0,
      color: data.color,
      ticker_symbol: data.ticker_symbol,
    };
    console.log("submitted: " + pogsData)
    console.log(data)
    await addPogs(pogsData);
    // window.location.reload();
  };
  
  return <Card className="w-full p-4">
  <CardTitle className="text-xl font-bold mb-4">
    Add Pogs
  </CardTitle>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField control={form.control} name="name" render={({ field }) => (
        <FormItem>
          <FormLabel>Pogs Name</FormLabel>
          <FormControl>
            <Input placeholder="Pogs Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}/>
      <FormField control={form.control} name="current_price" render={({ field }) => (
        <FormItem>
          <FormLabel>Current Price</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Current Price" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}/>
      <FormField control={form.control} name="color" render={({ field }) => (
        <FormItem>
          <FormLabel>Color</FormLabel>
          <FormControl>
            {/* <Input type="color" placeholder="Color" {...field} /> */}
            <Input placeholder="Color" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}/>
      <FormField control={form.control} name="ticker_symbol" render={({ field }) => (
        <FormItem>
          <FormLabel>Ticker Symbol</FormLabel>
          <FormControl>
            <Input placeholder="Ticker Symbol" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}/>
      <Button type="submit" className="mt-8" onClick={() =>
        toast("Pogs has been added", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })

      }>Add Pog</Button>
    </form>
  </Form>
</Card>
}