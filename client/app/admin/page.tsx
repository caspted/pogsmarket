"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().nonempty().min(2).max(100),
  currentPrice: z.number().int().positive(),
  color: z.string().nonempty(),
  ticker: z.string().nonempty().toUpperCase().min(3).max(5),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      currentPrice: 0,
      color: "",
      ticker: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <main>
      <div className="ml-4">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      </div>
      <div>
        <div>
          <h2 className="text-xl font-bold mb-2 ml-4">Manage Pogs</h2>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>

            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
