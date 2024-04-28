'use client';
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

const pogsInMarket = [ // This is just a placeholder data
  {
    id: 1,
    name: "Apple",
    currentPrice: "$1000000",
    previousPrice: "$1200000",
    color: "silver",
    ticker: "AAPL"
  },
  {
    id: 2,
    name: "Alphabet Inc. (Google)",
    currentPrice: "$2000000",
    previousPrice: "$1900000",
    color: "red",
    ticker: "GOOG"
  },
  {
    id: 3,
    name: "Hewlett-Packard Enterprise Company",
    currentPrice: "$800000",
    previousPrice: "$790000",
    color: "yellow",
    ticker: "HPQ"
  },
  {
    id: 4,
    name: "Intel Corporation",
    currentPrice: "$1500000",
    previousPrice: "$1600000",
    color: "blue",
    ticker: "INTC"
  },
  {
    id: 5,
    name: "Berkshire Hathaway Inc.",
    currentPrice: "$900000",
    previousPrice: "$910000",
    color: "green",
    ticker: "BRK.A"
  },
]

export default function userID() {
  return <div className="w-2/3 ml-8 mt-8">
    <Card className="w-full p-4">
      <CardTitle className="text-xl font-bold mb-4">
        Your owned Pogs
      </CardTitle>
      <Table>
        <TableCaption>A list of Pogs on the market.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="">Current Price</TableHead>
            <TableHead className="">Previous Price</TableHead>
            <TableHead className="">Color</TableHead>
            <TableHead className="">Ticker</TableHead>
            <TableHead className="">Sell this Pog</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pogsInMarket.map((pogs) => (
            <TableRow key={pogs.id}>
              <TableCell className="font-medium">{pogs.name}</TableCell>
              <TableCell>{pogs.currentPrice}</TableCell>
              <TableCell>{pogs.previousPrice}</TableCell>
              <TableCell>{pogs.previousPrice}</TableCell>
              <TableCell>{pogs.ticker}</TableCell>
              <TableCell className="">
                <Button variant="destructive">Sell</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </div>
}