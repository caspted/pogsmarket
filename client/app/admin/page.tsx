"use client";
import PogsForm from "@/components/PogsForm";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import priceDifference from "@/utils/utilFuncitons";
import Link from "next/link";

const pogsInMarket = [ // This is just a placeholder data
  {
    id: 1,
    name: "Apple",
    currentPrice: 1000000,
    previousPrice: 1200000,
    color: "silver",
    ticker: "AAPL"
  },
  {
    id: 2,
    name: "Alphabet Inc. (Google)",
    currentPrice: 2000000,
    previousPrice: 1900000,
    color: "red",
    ticker: "GOOG"
  },
  {
    id: 3,
    name: "Hewlett-Packard Enterprise Company",
    currentPrice: 800000,
    previousPrice: 790000,
    color: "yellow",
    ticker: "HPQ"
  },
  {
    id: 4,
    name: "Intel Corporation",
    currentPrice: 1500000,
    previousPrice: 1600000,
    color: "blue",
    ticker: "INTC"
  },
  {
    id: 5,
    name: "Berkshire Hathaway Inc.",
    currentPrice: 900000,
    previousPrice: 910000,
    color: "green",
    ticker: "BRK.A"
  },
]

export default function Home() {
  return (
    <main>
      <div className="ml-12 mt-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex flex-row mt-12 mx-12 space-x-12">
        <div className="w-1/3">
          <PogsForm />
        </div>
        <div className="w-2/3">
          <Card className="w-full p-4">
            <CardTitle className="text-xl font-bold mb-4">
              Listed Pogs
            </CardTitle>
            <Table>
              <TableCaption>A list of Pogs on the market.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="">Current Price</TableHead>
                  <TableHead className="">Previous Price</TableHead>
                  <TableHead className="w-[100px]">% Diff</TableHead>
                  <TableHead className="">Color</TableHead>
                  <TableHead className="">Ticker</TableHead>
                  <TableHead className="">Edit Pogs</TableHead>
                  <TableHead className="">Delete Pogs</TableHead>
                </TableRow>
              </TableHeader>
                <TableBody>
                {pogsInMarket.map((pogs) => {
                  const difference = priceDifference(pogs.currentPrice, pogs.previousPrice);
                  const isPositive = difference.startsWith('-') ? 'text-red-500' : 'text-green-500';

                  return (
                  <TableRow key={pogs.id}>
                    <TableCell className="font-medium">{pogs.name}</TableCell>
                    <TableCell>{pogs.currentPrice}</TableCell>
                    <TableCell>{pogs.previousPrice}</TableCell>
                    <TableCell><span className={isPositive}>{difference}</span></TableCell>
                    <TableCell>{pogs.color}</TableCell>
                    <TableCell>{pogs.ticker}</TableCell>
                    <TableCell className="">
                        <Button asChild>
                          <Link href={`/admin/pogs/${pogs.id}`}>Edit</Link>
                        </Button>
                      </TableCell>
                      <TableCell className="">
                        <Button variant="destructive">Delete</Button>
                      </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </main>
  );
}
