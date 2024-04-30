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

const formSchema = z.object({
  name: z.string().nonempty().min(2).max(100),
  current_price: z.string().nonempty().refine((value) => parseInt(value) > 0),
  previous_price: z.string().nonempty().refine((value) => parseInt(value)),
  color: z.string().nonempty(),
  ticker_symbol: z.string().nonempty().toUpperCase().min(3).max(5),
});

export default function PogsForm() {

  const [pogs, setPogs] = useState<Pogs>();
  // const [name, setName] = useState<string>("");
  // const [current_price, setCurrentPrice] = useState<number>(0);
  // const [previous_price, setPreviousPrice] = useState<number>(0);
  // const [color, setColor] = useState<string>("");
  // const [ticker_symbol, setTickerSymbol] = useState<string>("");

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      current_price: "",
      previous_price: "",
      color: "", //{},
      ticker_symbol: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const pogsData: Pogs = { ...data, id: 0, current_price: parseInt(data.current_price), previous_price: parseInt(data.previous_price) };
    await addPogs(pogsData);
  };
  
  return <Card className="w-full p-4">
  <CardTitle className="text-xl font-bold mb-4">
    Add Pogs
  </CardTitle>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField control={form.control} name="name" render={({ field }) => {
        return <FormItem>
          <FormLabel>Pogs Name</FormLabel>
          <FormControl>
            <Input placeholder="Pogs Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      }}/>
      <FormField control={form.control} name="current_price" render={({ field }) => {
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
      <FormField control={form.control} name="ticker_symbol" render={({ field }) => {
        return <FormItem>
          <FormLabel>Ticker Symbol</FormLabel>
          <FormControl>
            <Input placeholder="Ticker Symbol" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      }}/>
      <Button className="mt-8" type="submit">Add Pog</Button>
    </form>
  </Form>
</Card>
}